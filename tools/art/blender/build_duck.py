import bpy, bmesh, math, sys
from mathutils import Vector, Euler

OUT = "/home/claude/duck"
VARIANT = sys.argv[sys.argv.index("--") + 1] if "--" in sys.argv else "soldier"
import mathutils
HOVER = {"pig_rider": 0.38, "balloon": 0.0, "nurse": 0.55, "kite": 0.75, "prop": 0.5, "fan": 0.6, "plane": 0.7}.get(VARIANT, 0.0)
FLYERS = ("nurse", "kite", "prop", "fan", "plane")
EG = VARIANT in ("egret", "egret_guard")
COL = VARIANT.startswith("colonel")
RANK = {"colonel_r1": 1, "colonel_r3": 3}.get(VARIANT, 2)
CAT = VARIANT.startswith("cat_")
LEGUP, NECK = (0.22, 0.30) if EG else (0.0, 0.0)
AMP = 1.8
HIDDEN = {"whistle", "smoke", "egg", "zap"}
from mathutils.bvhtree import BVHTree
bpy.ops.wm.read_factory_settings(use_empty=True)
scn = bpy.context.scene

# ---------- materials ----------
def mat(name, rgb, rough=0.5, sss=0.0, spec=0.5, emis=None, metal=0.0, emit=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*rgb, 1)
    b.inputs["Roughness"].default_value = rough
    if name == "Gold" or metal: b.inputs["Metallic"].default_value = 1.0
    if emit:
        b.inputs["Emission Color"].default_value = (*rgb, 1); b.inputs["Emission Strength"].default_value = emit
    if sss:
        b.inputs["Subsurface Weight"].default_value = sss
        b.inputs["Subsurface Radius"].default_value = (0.3, 0.2, 0.1)
    return m

M = {
    "yellow": mat("Feather", (1.0, 0.62, 0.0), 0.55, sss=0.1),
    "yellow2": mat("FeatherDark", (0.95, 0.55, 0.02), 0.6),
    "orange": mat("Beak", (1.0, 0.22, 0.0), 0.35),
    "mouth": mat("Mouth", (0.35, 0.03, 0.04), 0.6),
    "tongue": mat("Tongue", (0.95, 0.38, 0.42), 0.4),
    "white": mat("EyeWhite", (0.97, 0.97, 0.97), 0.15),
    "iris": mat("Iris", (0.08, 0.38, 0.85), 0.2),
    "pupil": mat("Pupil", (0.01, 0.01, 0.015), 0.1),
    "brow": mat("Brow", (0.12, 0.05, 0.02), 0.6),
    "uniform": mat("Uniform", (0.07, 0.13, 0.05), 0.55),
    "gold": mat("Gold", (1.0, 0.68, 0.12), 0.25),
    "red": mat("RedBand", (0.6, 0.02, 0.03), 0.5),
    "black": mat("Visor", (0.02, 0.02, 0.025), 0.12),
    "blue": mat("RibbonBlue", (0.05, 0.15, 0.6), 0.5),
    "white2": mat("RibbonWhite", (0.95, 0.95, 0.9), 0.5),
    "wood": mat("Cane", (0.18, 0.07, 0.02), 0.3),
    "steel": mat("Steel", (0.82, 0.84, 0.88), 0.22, metal=1),
    "slingwood": mat("SlingWood", (0.42, 0.22, 0.08), 0.55),
    "rubber": mat("Rubber", (0.85, 0.25, 0.08), 0.5),
    "leather": mat("Leather", (0.28, 0.14, 0.05), 0.6),
    "stone": mat("Stone", (0.5, 0.5, 0.52), 0.8),
    "cracker": mat("Cracker", (0.85, 0.05, 0.04), 0.4),
    "fuse": mat("Fuse", (0.85, 0.8, 0.65), 0.7),
    "spark": mat("Spark", (1.0, 0.75, 0.2), 0.3, emit=6.0), "leaf": mat("Leaf", (0.15, 0.5, 0.15), 0.6), "bamboo": mat("Bamboo", (0.85, 0.72, 0.4), 0.6),
    "smoke": mat("Smoke", (0.78, 0.78, 0.8), 0.9),
    "alu": mat("Alu", (0.78, 0.8, 0.82), 0.35, metal=1),
    "iron": mat("Iron", (0.06, 0.06, 0.065), 0.45, metal=1),
    "plastic": mat("Plastic", (1.0, 0.8, 0.85), 0.25, sss=0.2),
    "basket": mat("Basket", (0.1, 0.45, 0.9), 0.4),
    "egg": mat("Egg", (0.97, 0.93, 0.82), 0.5),
    "string": mat("String", (0.9, 0.88, 0.8), 0.7),
    "pink": mat("Pink", (1.0, 0.55, 0.62), 0.5), "pig": mat("Pig", (1.0, 0.62, 0.68), 0.45, sss=0.1), "purple": mat("Purple", (0.4, 0.12, 0.65), 0.5),
    "magic": mat("Magic", (0.75, 0.3, 1.0), 0.3, emit=8.0), "cream": mat("Cream", (0.97, 0.95, 0.9), 0.5), "fishm": mat("Fish", (0.45, 0.6, 0.75), 0.3, metal=1),
    "green": mat("GreenLed", (0.2, 1.0, 0.3), 0.3, emit=5.0),
    "card": mat("Cardboard", (0.62, 0.42, 0.22), 0.85), "card2": mat("CardboardDark", (0.45, 0.29, 0.13), 0.85), "tape": mat("Tape", (0.85, 0.75, 0.5), 0.4),
}

FUR = {"cat_spatula": ((1.0, 0.5, 0.12), (0.7, 0.25, 0.04)), "cat_pan": ((0.55, 0.56, 0.6), (0.3, 0.3, 0.34)), "cat_chili": ((0.75, 0.42, 0.2), (0.45, 0.2, 0.08)),
       "cat_bomb": ((0.09, 0.09, 0.1), (0.2, 0.2, 0.22)), "cat_king": ((0.95, 0.93, 0.88), (0.6, 0.55, 0.5))}
if CAT:
    f1, f2 = FUR[VARIANT]
    M["yellow"].node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (*f1, 1)
    M["yellow2"].node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (*f2, 1)
    M["iris"].node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (0.45, 0.85, 0.1, 1)
if VARIANT == "cat_king":   # boss cat: tiger fur, orange with black stripes, cream belly
    nt = M["yellow"].node_tree; bs = nt.nodes["Principled BSDF"]
    tc = nt.nodes.new("ShaderNodeTexCoord"); wv = nt.nodes.new("ShaderNodeTexWave"); cr = nt.nodes.new("ShaderNodeValToRGB")
    wv.wave_type = "BANDS"; wv.bands_direction = "Z"; wv.inputs["Scale"].default_value = 3.2; wv.inputs["Distortion"].default_value = 6.0
    wv.inputs["Detail"].default_value = 1.5; wv.inputs["Detail Scale"].default_value = 1.2
    nt.links.new(tc.outputs["Object"], wv.inputs["Vector"]); nt.links.new(wv.outputs["Fac"], cr.inputs["Fac"])
    cr.color_ramp.interpolation = "CONSTANT"
    cr.color_ramp.elements[0].position = 0.0; cr.color_ramp.elements[0].color = (0.04, 0.03, 0.03, 1)
    cr.color_ramp.elements[1].position = 0.22; cr.color_ramp.elements[1].color = (1.0, 0.42, 0.04, 1)
    nt.links.new(cr.outputs["Color"], bs.inputs["Base Color"])
    M["yellow2"].node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (0.97, 0.9, 0.78, 1)
    M["iris"].node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (1.0, 0.78, 0.05, 1)
if EG:
    M["yellow"].node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (0.95, 0.95, 0.93, 1)
    M["yellow2"].node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (0.82, 0.82, 0.8, 1)
    M["iris"].node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (0.95, 0.6, 0.05, 1)
if COL and RANK == 1:
    M["uniform"].node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (0.2, 0.3, 0.12, 1)
if COL and RANK == 3:
    M["uniform"].node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (0.93, 0.91, 0.84, 1)
parts = []  # (obj, bone)

def finish(o, material, bone, subd=1, smooth=True):
    o.data.materials.append(M[material])
    if subd:
        md = o.modifiers.new("s", "SUBSURF"); md.levels = subd; md.render_levels = subd
    bpy.context.view_layer.objects.active = o
    o.select_set(True)
    for md in list(o.modifiers):
        bpy.ops.object.modifier_apply(modifier=md.name)
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    if smooth:
        bpy.ops.object.shade_smooth()
    o.select_set(False)
    parts.append((o, bone))
    return o

def sphere(loc, scale, material, bone, rot=(0, 0, 0), seg=24, subd=1):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg, ring_count=seg // 2, radius=1, location=loc)
    o = bpy.context.active_object
    o.scale = scale
    o.rotation_euler = [math.radians(a) for a in rot]
    return finish(o, material, bone, subd)

def cone(loc, r1, r2, depth, material, bone, rot=(0, 0, 0), subd=1):
    bpy.ops.mesh.primitive_cone_add(vertices=16, radius1=r1, radius2=r2, depth=depth, location=loc)
    o = bpy.context.active_object
    o.rotation_euler = [math.radians(a) for a in rot]
    return finish(o, material, bone, subd)

def cyl(loc, r, depth, material, bone, rot=(0, 0, 0), subd=1):
    bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=r, depth=depth, location=loc)
    o = bpy.context.active_object
    o.rotation_euler = [math.radians(a) for a in rot]
    if subd == 0:
        m = o.modifiers.new("b", "BEVEL"); m.width = 0.012; m.segments = 3
    return finish(o, material, bone, subd)

# ---------- model (faces -Y) ----------
# body: chubby egg
BODY = sphere((0, 0.02, 0.40), (0.31, 0.33, 0.31), "yellow", "body", rot=(-12, 0, 0))
# neck blend
sphere((0, -0.05, 0.62), (0.17, 0.17, 0.16), "yellow", "head")
# head (big, chibi)
sphere((0, -0.08, 0.86), (0.25, 0.24, 0.25), "yellow", "head")
# cheeks
for s in (1, -1):
    sphere((0.13 * s, -0.22, 0.78), (0.09, 0.07, 0.07), "yellow", "head")
# hair tuft: curved strands
for i, (ang, tilt, ln) in enumerate([(-25, 20, 0.20), (0, 28, 0.24), (25, 18, 0.19), (10, -10, 0.16), (-12, -8, 0.15)] if VARIANT in ("soldier", "fork", "sling", "bomber", "balloon", "thief", "fan") else []):
    a = math.radians(ang)
    base = Vector((math.sin(a) * 0.05, -0.04 + (0.03 if tilt < 0 else 0), 1.09))
    cone(base + Vector((math.sin(a) * ln * 0.4, 0.04 * (1 if tilt > 0 else -1), ln * 0.45)),
         0.028, 0.002, ln, "yellow", "head", rot=(tilt, ang, 0), subd=1)
# eyes
for s in (1, -1):
    x = 0.095 * s
    sphere((x, -0.25, 0.895), (0.092, 0.06, 0.10), "white", "head", rot=(0, 0, -12 * s))
    sphere((x * 1.02, -0.296, 0.885), (0.05, 0.025, 0.058), "iris", "head", rot=(0, 0, -12 * s))
    sphere((x * 1.02, -0.312, 0.88), (0.028, 0.015, 0.034), "pupil", "head", rot=(0, 0, -12 * s))
    sphere((x * 1.02 + 0.012 * s, -0.322, 0.905), (0.011, 0.006, 0.011), "white", "head")
    # eyebrows (playful, raised)
    sphere((x * 1.0, -0.285, 1.005), (0.075, 0.022, 0.024), "brow", "head", rot=(0, -30 * s, -8 * s))
if not EG and not CAT:
    # beak - upper (wide, slightly upturned smile)
    sphere((0, -0.38, 0.795), (0.17, 0.17, 0.05), "orange", "head", rot=(-10, 0, 0))
    for s in (1, -1):
        sphere((0.035 * s, -0.43, 0.83), (0.012, 0.01, 0.006), "mouth", "head", subd=0)
    sphere((0, -0.32, 0.735), (0.12, 0.10, 0.07), "mouth", "head")
    sphere((0, -0.35, 0.675), (0.135, 0.13, 0.038), "orange", "jaw", rot=(22, 0, 0))
    sphere((0, -0.34, 0.70), (0.085, 0.08, 0.025), "tongue", "jaw", rot=(22, 0, 0))
if CAT:
    for s_ in (1, -1):
        sphere((0.055 * s_, -0.30, 0.78), (0.075, 0.06, 0.06), "cream", "head")
        cone((0.15 * s_, -0.06, 1.1), 0.11, 0.01, 0.22, "yellow", "head", rot=(-10, 22 * s_, 0))
        cone((0.15 * s_, -0.1, 1.09), 0.07, 0.005, 0.15, "pink", "head", rot=(-10, 22 * s_, 0))
        for k in (-1, 1):
            p1 = Vector((0.09 * s_, -0.33, 0.78)); p2 = Vector((0.3 * s_, -0.36, 0.8 + 0.04 * k))
            bpy.ops.mesh.primitive_cylinder_add(vertices=6, radius=0.005, depth=(p2 - p1).length, location=(p1 + p2) / 2)
            o = bpy.context.active_object; o.rotation_mode = "QUATERNION"; o.rotation_quaternion = (p2 - p1).normalized().to_track_quat("Z", "Y"); finish(o, "brow", "head", 0)
    sphere((0, -0.355, 0.825), (0.035, 0.025, 0.025), "pink", "head")
    sphere((0, -0.31, 0.73), (0.055, 0.04, 0.035), "mouth", "jaw")
    sphere((0, -0.33, 0.715), (0.035, 0.03, 0.015), "tongue", "jaw")
    for k in range(3):   # forehead + back stripes
        sphere(((k - 1) * 0.06, -0.21, 1.04 - abs(k - 1) * 0.02), (0.018, 0.02, 0.06), "yellow2", "head")
        sphere(((k - 1) * 0.1, 0.27, 0.55 - 0.1 * abs(k - 1)), (0.06, 0.04, 0.025), "yellow2", "body", rot=(30, 0, 0))
# wings
for s, b in ((1, "wing.L"), (-1, "wing.R")):
    sphere((0.29 * s, 0.03, 0.45), (0.06, 0.17, 0.12), "uniform" if COL else "yellow", b, rot=(-30, 15 * s, 0))
    if CAT:
        sphere((0.31 * s, -0.04, 0.36), (0.06, 0.07, 0.06), "cream", b)
    else:
        for k in range(3):
            sphere((0.32 * s, 0.12 + k * 0.05, 0.33 - k * 0.02), (0.035, 0.07, 0.04), "yellow2", b, rot=(-40, 0, 0))
# tail
if not CAT:
    for ang, h in ((0, 0.62), (-20, 0.58), (20, 0.58)):
        cone((math.sin(math.radians(ang)) * 0.08, 0.34, h), 0.05, 0.005, 0.20, "yellow", "tail", rot=(-35, ang, 0))
# legs + webbed feet
for s, b in ((1, "leg.L"), (-1, "leg.R")):
    x = 0.12 * s
    if CAT:
        cyl((x, 0.0, 0.14), 0.055, 0.2, "yellow", b)
        sphere((x, -0.05, 0.04), (0.08, 0.1, 0.045), "cream", b)
        continue
    cyl((x, 0.0, (0.24 + LEGUP) / 2 + 0.02), 0.032 if not EG else 0.024, 0.20 + LEGUP, "orange", b)
    sphere((x, -0.06, 0.025), (0.10, 0.12, 0.022), "orange", b)
    for t in (-1, 0, 1):
        sphere((x + t * 0.06, -0.16, 0.022), (0.035, 0.05, 0.02), "orange", b, rot=(0, 0, t * 25))


# ---------- troop weapons ----------
CUSTOM = []   # (obj, weightfn(vertex_co)->{bone:w})
EXTRA_BONES = []  # (name, head, tail, parent)
def along(kind, p1, p2, r1, r2, material, bone, subd=1):
    p1, p2 = Vector(p1), Vector(p2)
    d = p2 - p1
    if kind == "cyl":
        bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=r1, depth=d.length, location=(p1 + p2) / 2)
    else:
        bpy.ops.mesh.primitive_cone_add(vertices=16, radius1=r1, radius2=r2, depth=d.length, location=(p1 + p2) / 2)
    o = bpy.context.active_object
    o.rotation_mode = "QUATERNION"; o.rotation_quaternion = d.normalized().to_track_quat("Z", "Y")
    return finish(o, material, bone, subd)

def ell(center, scale, direction, material, bone):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=20, ring_count=10, radius=1, location=center)
    o = bpy.context.active_object
    o.scale = scale
    o.rotation_mode = "QUATERNION"; o.rotation_quaternion = Vector(direction).normalized().to_track_quat("Z", "Y")
    return finish(o, material, bone, 1)

def tube(points, r, material):
    cu = bpy.data.curves.new("tube", "CURVE"); cu.dimensions = "3D"
    sp = cu.splines.new("POLY"); sp.points.add(len(points) - 1)
    for i, pt in enumerate(points):
        sp.points[i].co = (*pt, 1)
    cu.bevel_depth = r; cu.bevel_resolution = 3
    o = bpy.data.objects.new("tube", cu); bpy.context.collection.objects.link(o)
    bpy.context.view_layer.objects.active = o; o.select_set(True)
    bpy.ops.object.convert(target="MESH")
    o = bpy.context.active_object
    o.data.materials.append(M[material]); bpy.ops.object.shade_smooth(); o.select_set(False)
    return o

if VARIANT == "fork":
    A = Vector((0.43, 0.02, 0.10)); B = Vector((0.44, -0.30, 0.95))
    d = (B - A).normalized()
    G = Vector((0.435, -0.12, 0.47))
    along("cyl", A, B, 0.026, 0, "steel", "weapon")
    ell(A + d * 0.06, (0.05, 0.034, 0.11), d, "steel", "weapon")
    ell(B + d * 0.03, (0.10, 0.026, 0.08), d, "steel", "weapon")
    for xo in (-0.062, -0.021, 0.021, 0.062):
        a = B + d * 0.05 + Vector((xo, 0, 0)); b = B + d * 0.33 + Vector((xo, 0, 0))
        along("cone", a, b, 0.016, 0.004, "steel", "weapon")
    EXTRA_BONES.append(("weapon", G, G + d * 0.15, "wing.L"))

if VARIANT == "sling":
    G = Vector((0.33, -0.12, 0.46)); K = 1.45
    C = G + (Vector((0.30, -0.35, 0.55)) - G) * K
    T1 = G + (Vector((0.22, -0.38, 0.72)) - G) * K; T2 = G + (Vector((0.38, -0.38, 0.72)) - G) * K
    P0 = G + (Vector((0.30, -0.30, 0.70)) - G) * K
    along("cyl", G, C, 0.032, 0, "slingwood", "weapon")
    along("cone", C, T1, 0.03, 0.022, "slingwood", "weapon")
    along("cone", C, T2, 0.03, 0.022, "slingwood", "weapon")
    sphere(tuple(C), (0.042, 0.042, 0.042), "slingwood", "weapon")
    for T in (T1, T2):
        sphere(tuple(T), (0.03, 0.03, 0.03), "slingwood", "weapon")
    sphere(tuple(P0), (0.055, 0.03, 0.045), "leather", "pouch")
    sphere(tuple(P0 + Vector((0, 0.012, 0.005))), (0.032, 0.032, 0.032), "stone", "pouch")
    for T in (T1, T2):
        pts = [T + (P0 - T) * (i / 11) for i in range(12)]
        band = tube([tuple(p) for p in pts], 0.013, "rubber")
        def wf(co, T=T):
            t = max(0.0, min(1.0, (co - T).dot(P0 - T) / (P0 - T).length_squared))
            return {"weapon": 1 - t, "pouch": t}
        CUSTOM.append((band, wf))
    EXTRA_BONES.append(("weapon", G, G + (C - G).normalized() * 0.12, "wing.L"))
    EXTRA_BONES.append(("pouch", P0, P0 + Vector((0, 0.06, 0)), "weapon"))

if VARIANT == "bomber":
    G = Vector((0.35, -0.13, 0.46))
    c0 = Vector((0.355, -0.15, 0.40)); c1 = Vector((0.355, -0.19, 0.71))
    along("cyl", c0, c1, 0.056, 0, "cracker", "weapon")
    for c in (c0, c1):
        along("cyl", c + (c1 - c0).normalized() * -0.012, c + (c1 - c0).normalized() * 0.012, 0.059, 0, "gold", "weapon", subd=0)
    fpts = [c1 + Vector((-0.045 * math.sin(i * 0.9), -0.012 * i, 0.026 * i)) for i in range(8)]
    fz = tube([tuple(p) for p in fpts], 0.009, "fuse")
    CUSTOM.append((fz, lambda co: {"weapon": 1.0}))
    tip = fpts[-1]
    sphere(tuple(tip), (0.032, 0.032, 0.032), "spark", "weapon", subd=0)
    for k in range(8):
        a = k * math.pi / 4
        dirv = Vector((math.cos(a), 0.3 * math.sin(a * 2), math.sin(a)))
        along("cone", tip, tip + dirv * 0.08, 0.011, 0.0, "spark", "weapon", subd=0)
    EXTRA_BONES.append(("weapon", G, G + Vector((0, 0, 0.12)), "wing.L"))
    # bandolier with mini firecrackers (shoulder L -> hip R)
    def bsurf(x, z, push):
        dg = bpy.context.evaluated_depsgraph_get(); bvh = BVHTree.FromObject(BODY, dg)
        for k in range(20):
            loc, nrm, i, dd = bvh.ray_cast(Vector((x * (1 - k * 0.04), -2, z)), Vector((0, 1, 0)))
            if loc is not None: return loc + nrm * push, nrm
    for k in range(12):
        t = k / 11
        p, n = bsurf(0.24 - 0.46 * t, 0.62 - 0.40 * t, 0.006)
        ell(p, (0.03, 0.03, 0.012), n, "leather", "body")
    for k in range(4):
        t = 0.15 + k * 0.22
        p, n = bsurf(0.24 - 0.46 * t, 0.62 - 0.40 * t, 0.03)
        q = n.to_track_quat("Z", "Y")
        bpy.ops.mesh.primitive_cylinder_add(vertices=12, radius=0.018, depth=0.075, location=p)
        o = bpy.context.active_object; o.rotation_mode = "QUATERNION"
        o.rotation_quaternion = q @ mathutils.Quaternion((1, 0, 0), math.radians(90))
        finish(o, "cracker", "body", 1)

# smoke puff (death), all variants
SMOKE_C = Vector((0, 0.10, 0.30))
for dx, dy, dz, r in [(0, 0, 0, 0.2), (0.17, 0.05, -0.05, 0.15), (-0.17, 0.0, -0.04, 0.16), (0.08, -0.12, 0.12, 0.13), (-0.1, 0.12, 0.14, 0.14), (0.0, 0.02, 0.24, 0.12), (0.2, -0.1, 0.1, 0.1), (-0.2, -0.08, 0.12, 0.1)]:
    sphere(tuple(SMOKE_C + Vector((dx, dy, dz))), (r, r, r * 0.9), "smoke", "smoke", seg=16)
EXTRA_BONES.append(("smoke", SMOKE_C - Vector((0, 0, 0.15)), SMOKE_C, None))

if VARIANT == "armor":
    # pot helmet
    cyl((0, -0.06, 1.08), 0.235, 0.21, "alu", "head", rot=(-8, 0, 6), subd=0)
    bpy.ops.mesh.primitive_torus_add(major_radius=0.24, minor_radius=0.02, location=(0, -0.075, 1.185))
    o = bpy.context.active_object; o.rotation_euler = (math.radians(-8), 0, math.radians(6)); finish(o, "alu", "head", 1)
    for sx in (1, -1):
        bpy.ops.mesh.primitive_torus_add(major_radius=0.045, minor_radius=0.012, location=(0.26 * sx, -0.06, 1.12 + 0.02 * sx))
        o = bpy.context.active_object; o.rotation_euler = (math.radians(90), 0, 0); finish(o, "iron", "head", 1)
    
    # wok chest armor
    sphere((0, -0.30, 0.38), (0.30, 0.10, 0.27), "iron", "body", rot=(-12, 0, 0))
    bpy.ops.mesh.primitive_torus_add(major_radius=1.0, minor_radius=0.02, location=(0, -0.265, 0.385))
    o = bpy.context.active_object; o.scale = (0.30, 0.27, 0.27); o.rotation_euler = (math.radians(78), 0, 0); finish(o, "iron", "body", 1)
    cyl((-0.42, -0.30, 0.42), 0.03, 0.22, "wood", "body", rot=(0, 90, 0))
    cyl((-0.30, -0.30, 0.42), 0.024, 0.06, "iron", "body", rot=(0, 90, 0))
    bpy.ops.mesh.primitive_torus_add(major_radius=0.04, minor_radius=0.011, location=(0.31, -0.30, 0.40))
    o = bpy.context.active_object; o.rotation_euler = (math.radians(90), 0, math.radians(90)); finish(o, "iron", "body", 1)
    # back wok + straps
    sphere((0, 0.33, 0.42), (0.26, 0.08, 0.24), "iron", "body", rot=(12, 0, 0))
    for z in (0.52, 0.28):
        bpy.ops.mesh.primitive_torus_add(major_radius=1.0, minor_radius=0.022, location=(0, 0.02, z))
        o = bpy.context.active_object; o.scale = (0.325, 0.355, 0.7); o.rotation_euler = (math.radians(-12), 0, 0); finish(o, "leather", "body", 1)

if VARIANT == "balloon":
    # Built upright, flipped upside down at the end: a plastic shopping bag tied to the LEFT foot lifts the duck,
    # which dangles head-down and drops firecrackers.
    BC = Vector((0.12, 0.02, -1.25))
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=16, radius=1, location=BC)
    o = bpy.context.active_object; o.scale = (0.48, 0.34, 0.56)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    for v in o.data.vertices:
        n = v.co.normalized()
        if v.co.z < -0.2: v.co.x *= 1.12; v.co.y *= 1.1                                    # boxy bottom of a shopping bag
        w = mathutils.noise.noise(v.co * 6.0) * 0.045 + mathutils.noise.noise(v.co * 18.0) * 0.016   # crinkled plastic
        v.co += n * w
        if v.co.z > 0.25: f = 1 - (v.co.z - 0.25) * 1.6; v.co.x *= f; v.co.y *= f
    finish(o, "plastic", "bag", 1)
    for sx in (1, -1):   # the two bag handles, gathered towards the knot
        bpy.ops.mesh.primitive_torus_add(major_radius=0.2, minor_radius=0.04, location=(BC.x + 0.13 * sx, 0.02, BC.z + 0.62))
        o = bpy.context.active_object; o.scale = (0.75, 0.45, 1.35); o.rotation_euler = (math.radians(90), math.radians(30 * sx), 0); finish(o, "plastic", "bag", 1)
    # printed red band, like a market shopping bag
    bpy.ops.mesh.primitive_torus_add(major_radius=0.43, minor_radius=0.035, location=(BC.x, 0.02, BC.z - 0.05))
    o = bpy.context.active_object; o.scale = (1.0, 0.8, 1.0); finish(o, "red", "bag", 1)
    sphere((BC.x, 0.02, BC.z + 0.84), (0.09, 0.08, 0.07), "plastic", "bag")
    # string: knot on the bag -> wrapped round the left ankle
    top = Vector((BC.x, 0.02, BC.z + 0.84)); bot = Vector((0.12, 0.0, 0.05))
    pts = [bot + (top - bot) * (i / 9) + Vector((0.03 * math.sin(i * 0.9), 0, 0)) for i in range(10)]
    st = tube([tuple(p) for p in pts], 0.008, "string")
    def wf(co, top=top, bot=bot):
        t = max(0.0, min(1.0, (co - bot).dot(top - bot) / (top - bot).length_squared))
        return {"leg.L": 1 - t, "bag": t}
    CUSTOM.append((st, wf))
    bpy.ops.mesh.primitive_torus_add(major_radius=0.05, minor_radius=0.012, location=(0.12, 0.0, 0.07))
    finish(bpy.context.active_object, "string", "leg.L", 1)
    # firecracker held in the left wing, shown while attacking
    cyl((0.34, -0.17, 0.47), 0.04, 0.16, "red", "egg")
    cyl((0.34, -0.17, 0.56), 0.042, 0.02, "gold", "egg")
    along("cyl", (0.34, -0.17, 0.57), (0.36, -0.19, 0.66), 0.006, 0, "string", "egg")
    EXTRA_BONES.append(("bag", BC + Vector((0, 0, 0.8)), BC, "leg.L"))
    EXTRA_BONES.append(("egg", Vector((0.34, -0.17, 0.45)), Vector((0.34, -0.17, 0.55)), "wing.L"))

# ---------- colonel gear ----------
def surf(x, z, obj, push=0.0):
    dg = bpy.context.evaluated_depsgraph_get()
    bvh = BVHTree.FromObject(obj, dg)
    for k in range(20):
        loc, nrm, i, d = bvh.ray_cast(Vector((x * (1 - k * 0.04), -2, z)), Vector((0, 1, 0)))
        if loc is not None:
            return loc + nrm * push, nrm
    raise RuntimeError(f"miss {x} {z}")

def disc(pos, nrm, r, thick, material, bone, sx=1.0):
    q = nrm.to_track_quat("Z", "Y")
    bpy.ops.mesh.primitive_uv_sphere_add(segments=20, ring_count=10, radius=1, location=pos)
    o = bpy.context.active_object
    o.scale = (r * sx, r, thick)
    o.rotation_mode = "QUATERNION"; o.rotation_quaternion = q
    return finish(o, material, bone, 1)

def box(pos, nrm, size, material, bone):
    q = nrm.to_track_quat("Z", "Y")
    bpy.ops.mesh.primitive_cube_add(size=1, location=pos)
    o = bpy.context.active_object
    o.scale = size
    o.rotation_mode = "QUATERNION"; o.rotation_quaternion = q
    m = o.modifiers.new("b", "BEVEL"); m.width = 0.004; m.segments = 2
    return finish(o, material, bone, 0, smooth=False)


# ---------- more troops (duck + props) ----------
def throw_prop_bone(G, top):
    EXTRA_BONES.append(("weapon", G, G + Vector((0, 0, top)), "wing.L"))

def throw_prop_bone(G, top):
    EXTRA_BONES.append(("weapon", G, G + Vector((0, 0, top)), "wing.L"))

if EG:
    # long beak + helmet (head-space coords, offset applied later)
    along("cone", (0, -0.27, 0.80), (0, -0.80, 0.74), 0.06, 0.006, "orange", "head")
    along("cone", (0, -0.27, 0.745), (0, -0.70, 0.70), 0.045, 0.005, "orange", "jaw")
    if VARIANT == "egret":
        sphere((0, -0.08, 1.02), (0.27, 0.27, 0.19), "uniform", "head")
        bpy.ops.mesh.primitive_torus_add(major_radius=0.27, minor_radius=0.025, location=(0, -0.08, 0.98))
        finish(bpy.context.active_object, "uniform", "head", 1)
    # crest plume
    for k in range(3):
        cone((0, 0.12 + k * 0.04, 1.02 - k * 0.03), 0.02, 0.003, 0.28, "yellow", "head", rot=(-60 - k * 8, 0, 0))

if VARIANT == "thief":
    bpy.ops.mesh.primitive_torus_add(major_radius=0.215, minor_radius=0.03, location=(0, -0.08, 0.99))
    o = bpy.context.active_object; o.rotation_euler = (math.radians(-8), 0, 0); finish(o, "red", "head", 1)
    sphere((0, 0.15, 1.0), (0.05, 0.04, 0.05), "red", "head")
    for sx in (1, -1):
        cone((0.05 * sx, 0.24, 0.93), 0.04, 0.01, 0.18, "red", "head", rot=(-70, 25 * sx, 0))
    # sack on back
    sphere((0.04, 0.40, 0.62), (0.22, 0.17, 0.25), "leather", "body", rot=(10, 0, -10))
    sphere((0.05, 0.36, 0.88), (0.07, 0.06, 0.06), "leather", "body")
    bpy.ops.mesh.primitive_torus_add(major_radius=0.06, minor_radius=0.012, location=(0.05, 0.36, 0.84))
    finish(bpy.context.active_object, "string", "body", 1)
    for k in range(3):
        sphere((0.12 - k * 0.07, 0.30, 0.86 + 0.02 * k), (0.035, 0.035, 0.008), "gold", "body", rot=(60, 0, k * 30))

if VARIANT == "chef":
    cyl((0, -0.07, 1.13), 0.17, 0.2, "white", "head")
    for dx, dy in ((0, 0), (0.1, 0.03), (-0.1, 0.02), (0.04, -0.09), (-0.05, 0.09)):
        sphere((dx, -0.07 + dy, 1.27), (0.12, 0.12, 0.1), "white", "head")
    G = Vector((0.35, -0.15, 0.48))
    sphere((0.37, -0.25, 0.52), (0.12, 0.12, 0.07), "white", "weapon")
    sphere((0.37, -0.25, 0.555), (0.1, 0.1, 0.02), "red", "weapon")
    for k in range(3):
        cone((0.33 + k * 0.04, -0.26, 0.58), 0.018, 0.004, 0.08, "red" if k != 1 else "iron", "weapon", rot=(0, 30 - k * 30, 0))
    throw_prop_bone(G, 0.12)

if VARIANT == "nurse":
    sphere((0, -0.07, 1.10), (0.16, 0.12, 0.07), "white", "head", rot=(-10, 0, 0))
    for sc in ((0.045, 0.012, 0.012), (0.012, 0.012, 0.045)):
        box(Vector((0, -0.19, 1.12)), Vector((0, -1, 0.3)).normalized(), sc, "red", "head")
    G = Vector((0.34, -0.12, 0.47))
    along("cyl", G, (0.33, -0.08, 1.45), 0.014, 0, "iron", "weapon")
    along("cone", (0.33, -0.08, 1.38), (0.33, -0.08, 1.62), 0.5, 0.02, "plastic", "weapon")
    sphere((0.33, -0.08, 1.63), (0.025, 0.025, 0.025), "red", "weapon")
    along("cyl", G, G + Vector((0, -0.03, -0.06)), 0.03, 0, "red", "weapon")
    throw_prop_bone(G, 0.12)
    GR = Vector((-0.34, -0.14, 0.46))
    cyl((-0.35, -0.2, 0.5), 0.045, 0.14, "basket", "spray")
    cyl((-0.35, -0.2, 0.6), 0.025, 0.06, "white", "spray")
    along("cyl", (-0.35, -0.2, 0.62), (-0.35, -0.29, 0.62), 0.016, 0, "white", "spray")
    EXTRA_BONES.append(("spray", GR, GR + Vector((0, 0, 0.12)), "wing.R"))

if VARIANT == "kite":
    import bmesh as _bm
    bmk = _bm.new(); vs = []
    for k in range(10):
        a = math.pi / 2 + k * math.pi / 5; r = 0.75 if k % 2 == 0 else 0.32
        vs.append(bmk.verts.new((r * math.cos(a), r * math.sin(a), 0.0)))
    bmk.faces.new(vs)
    me = bpy.data.meshes.new("kite"); bmk.to_mesh(me); o = bpy.data.objects.new("kite", me); bpy.context.collection.objects.link(o)
    bpy.context.view_layer.objects.active = o
    m = o.modifiers.new("so", "SOLIDIFY"); m.thickness = 0.025
    o.rotation_euler = (0, 0, math.radians(180)); o.location = (0, 0.05, 0.0)
    finish(o, "red", "root", 0, smooth=False)
    for k in range(5):
        a = math.pi / 2 + k * 2 * math.pi / 5 + math.pi
        along("cyl", (0, 0.05, 0.02), (0.75 * math.cos(a), 0.05 + 0.75 * math.sin(a), 0.02), 0.012, 0, "slingwood", "root", subd=0)
    sphere((0, 0.05, 0.03), (0.33, 0.33, 0.012), "gold", "root")
    G = Vector((0.35, -0.13, 0.46))
    along("cyl", (0.355, -0.15, 0.42), (0.355, -0.18, 0.66), 0.035, 0, "cracker", "weapon")
    along("cone", (0.355, -0.18, 0.66), (0.355, -0.19, 0.76), 0.04, 0.0, "gold", "weapon")
    along("cyl", (0.355, -0.15, 0.42), (0.355, -0.12, 0.2), 0.008, 0, "slingwood", "weapon")
    throw_prop_bone(G, 0.12)

if VARIANT == "prop":
    sphere((0, -0.08, 1.0), (0.255, 0.255, 0.17), "red", "head")
    sphere((0, -0.08, 1.17), (0.03, 0.03, 0.03), "gold", "head")
    for k in range(2):
        a = k * math.pi
        sphere((0.13 * math.cos(a), -0.08 + 0.13 * math.sin(a), 1.2), (0.13, 0.035, 0.01), "basket" if k else "gold", "prop", rot=(12 if k else -12, 0, 0))
    EXTRA_BONES.append(("prop", Vector((0, -0.08, 1.12)), Vector((0, -0.08, 1.25)), "head"))
    G = Vector((0.35, -0.13, 0.46))
    sphere((0.36, -0.2, 0.55), (0.06, 0.06, 0.03), "cracker", "weapon", rot=(70, 0, 0))
    along("cone", (0.36, -0.2, 0.55), (0.36, -0.2, 0.7), 0.012, 0.0, "fuse", "weapon")
    throw_prop_bone(G, 0.12)

if VARIANT == "giant":
    # aluminium food steamer (ซึ้ง) as helmet: two stacked tiers with steam holes, lid and knob
    for k, z in enumerate((1.02, 1.12)):
        cyl((0, -0.06, z), 0.25 - 0.01 * k, 0.1, "alu", "head", rot=(-8, 0, 0), subd=0)
        bpy.ops.mesh.primitive_torus_add(major_radius=0.25 - 0.01 * k, minor_radius=0.014, location=(0, -0.06 + 0.007 * k, z - 0.05))
        o = bpy.context.active_object; o.rotation_euler = (math.radians(-8), 0, 0); finish(o, "alu", "head", 1)
        for a in range(10):
            t = a * math.pi / 5
            sphere((0.252 * math.cos(t), -0.06 + 0.252 * math.sin(t), z), (0.018, 0.018, 0.018), "iron", "head", subd=0)
    sphere((0, -0.075, 1.19), (0.24, 0.24, 0.06), "alu", "head")
    sphere((0, -0.08, 1.26), (0.045, 0.045, 0.035), "iron", "head")
    for sx in (1, -1):
        bpy.ops.mesh.primitive_torus_add(major_radius=0.05, minor_radius=0.014, location=(0.27 * sx, -0.06, 1.07))
        o = bpy.context.active_object; o.rotation_euler = (math.radians(90), 0, math.radians(90)); finish(o, "iron", "head", 1)
    # cardboard box armour with tape and a hand-drawn star
    box(Vector((0, -0.05, 0.40)), Vector((0, 0, 1)), (0.62, 0.62, 0.42), "card", "body")
    for sx in (1, -1):
        box(Vector((0.18 * sx, -0.37, 0.64)), Vector((0, -0.6, 1)).normalized(), (0.26, 0.2, 0.012), "card2", "body")
    box(Vector((0, -0.362, 0.42)), Vector((0, -1, 0)), (0.62, 0.07, 0.006), "tape", "body")
    box(Vector((0, 0.262, 0.42)), Vector((0, 1, 0)), (0.62, 0.07, 0.006), "tape", "body")
    for k in range(5):
        t = -math.pi / 2 + k * 2 * math.pi / 5
        along("cyl", (0.10 * math.cos(t) - 0.02, -0.366, 0.30 + 0.10 * math.sin(-t)), (0.10 * math.cos(t + 4 * math.pi / 5) - 0.02, -0.366, 0.30 + 0.10 * math.sin(-(t + 4 * math.pi / 5))), 0.008, 0, "red", "body")
    # big frying pan
    G = Vector((0.35, -0.13, 0.46))
    along("cyl", (0.36, -0.12, 0.42), (0.42, -0.14, 0.66), 0.025, 0, "wood", "weapon")
    sphere((0.48, -0.15, 0.86), (0.04, 0.21, 0.21), "iron", "weapon")
    bpy.ops.mesh.primitive_torus_add(major_radius=0.21, minor_radius=0.02, location=(0.465, -0.15, 0.86))
    o = bpy.context.active_object; o.rotation_euler = (0, math.radians(90), 0); finish(o, "iron", "weapon", 1)
    throw_prop_bone(G, 0.12)

if VARIANT == "digger":
    sphere((0, -0.08, 1.0), (0.265, 0.265, 0.18), "gold", "head")
    bpy.ops.mesh.primitive_torus_add(major_radius=0.27, minor_radius=0.022, location=(0, -0.08, 0.96))
    finish(bpy.context.active_object, "gold", "head", 1)
    along("cyl", (0, -0.30, 1.04), (0, -0.37, 1.04), 0.045, 0, "iron", "head")
    sphere((0, -0.372, 1.04), (0.035, 0.008, 0.035), "spark", "head")
    G = Vector((0.35, -0.13, 0.46))
    along("cyl", (0.35, -0.10, 0.38), (0.35, -0.30, 0.86), 0.016, 0, "slingwood", "weapon")
    sphere((0.35, -0.33, 0.92), (0.1, 0.1, 0.05), "steel", "weapon", rot=(-60, 0, 0))
    throw_prop_bone(G, 0.12)

if VARIANT == "fan":
    FC = Vector((0, 0.42, 0.56))
    for rr in (0.24, 0.16):
        bpy.ops.mesh.primitive_torus_add(major_radius=rr, minor_radius=0.012, location=FC + Vector((0, 0.03, 0)))
        o = bpy.context.active_object; o.rotation_euler = (math.radians(90), 0, 0); finish(o, "white", "body", 1)
    for k in range(4):
        a = k * math.pi / 4
        along("cyl", FC + Vector((0.24 * math.cos(a), 0.03, 0.24 * math.sin(a))), FC + Vector((-0.24 * math.cos(a), 0.03, -0.24 * math.sin(a))), 0.006, 0, "white", "body", subd=0)
    sphere(tuple(FC + Vector((0, -0.06, 0))), (0.08, 0.09, 0.08), "basket", "body")
    for k in range(3):
        a = k * 2 * math.pi / 3
        sphere(tuple(FC + Vector((0.11 * math.cos(a), 0.06, 0.11 * math.sin(a)))), (0.11, 0.012, 0.05), "basket", "prop", rot=(0, -math.degrees(a), 0))
    EXTRA_BONES.append(("prop", FC + Vector((0, -0.04, 0)), FC + Vector((0, 0.10, 0)), "body"))
    G = Vector((0.35, -0.13, 0.46))
    along("cyl", (0.355, -0.12, 0.40), (0.355, -0.22, 0.64), 0.022, 0, "gold", "weapon")
    rc = Vector((0.355, -0.30, 0.82))
    bpy.ops.mesh.primitive_torus_add(major_radius=1.0, minor_radius=0.018, location=rc)
    o = bpy.context.active_object; o.scale = (0.1, 0.14, 1); o.rotation_euler = (math.radians(70), 0, math.radians(90)); finish(o, "basket", "weapon", 1)
    sphere(tuple(rc), (0.012, 0.13, 0.09), "smoke", "weapon", rot=(-20, 0, 0))
    for k in range(5):
        sphere(tuple(rc + Vector((0.03 * math.sin(k * 2.1), -0.05 + 0.03 * k, 0.07 * math.cos(k * 1.7)))), (0.025, 0.025, 0.025), "spark", "zap", subd=0)
    throw_prop_bone(G, 0.12)
    EXTRA_BONES.append(("zap", rc, rc + Vector((0, 0, 0.1)), "weapon"))

if VARIANT == "plane":
    import bmesh as _bm
    bmp = _bm.new()
    nose = bmp.verts.new((0, -0.95, 0.06)); tl = bmp.verts.new((-0.6, 0.55, 0.12)); tr = bmp.verts.new((0.6, 0.55, 0.12))
    ct = bmp.verts.new((0, 0.55, 0.04)); kb = bmp.verts.new((0, 0.5, -0.16))
    bmp.faces.new((nose, tl, ct)); bmp.faces.new((nose, ct, tr)); bmp.faces.new((nose, kb, ct))
    me = bpy.data.meshes.new("plane"); bmp.to_mesh(me); o = bpy.data.objects.new("plane", me); bpy.context.collection.objects.link(o)
    bpy.context.view_layer.objects.active = o
    m = o.modifiers.new("so", "SOLIDIFY"); m.thickness = 0.015
    finish(o, "white", "root", 0, smooth=False)
    # goggles + scarf
    for sx in (1, -1):
        bpy.ops.mesh.primitive_torus_add(major_radius=0.06, minor_radius=0.015, location=(0.09 * sx, -0.27, 1.04))
        o = bpy.context.active_object; o.rotation_euler = (math.radians(80), 0, 0); finish(o, "leather", "head", 1)
        sphere((0.09 * sx, -0.27, 1.04), (0.05, 0.01, 0.05), "basket", "head", rot=(-10, 0, 0))
    bpy.ops.mesh.primitive_torus_add(major_radius=0.25, minor_radius=0.022, location=(0, -0.08, 1.04))
    o = bpy.context.active_object; o.rotation_euler = (math.radians(-8), 0, 0); finish(o, "leather", "head", 1)
    bpy.ops.mesh.primitive_torus_add(major_radius=0.17, minor_radius=0.04, location=(0, -0.03, 0.66))
    o = bpy.context.active_object; o.rotation_euler = (math.radians(-10), 0, 0); finish(o, "red", "body", 1)
    sphere((0.08, 0.2, 0.62), (0.05, 0.16, 0.03), "red", "body", rot=(-20, 0, 15))
    G = Vector((0.35, -0.13, 0.46))
    along("cyl", (0.355, -0.15, 0.40), (0.355, -0.18, 0.64), 0.045, 0, "basket", "weapon")
    along("cone", (0.355, -0.18, 0.64), (0.355, -0.19, 0.74), 0.045, 0.012, "basket", "weapon")
    along("cone", (0.355, -0.15, 0.40), (0.355, -0.14, 0.34), 0.05, 0.03, "red", "weapon")
    throw_prop_bone(G, 0.12)

# ---------- cats ----------
if CAT:
    tp = [Vector((0, 0.33, 0.4)), Vector((0.03, 0.45, 0.42)), Vector((0.06, 0.55, 0.55)), Vector((0.08, 0.58, 0.72)), Vector((0.06, 0.53, 0.88)), Vector((0.02, 0.46, 0.95))]
    tl = tube([tuple(p) for p in tp], 0.045, "yellow")
    CUSTOM.append((tl, lambda co: {"tail": 1.0}))
    sphere(tuple(tp[-1]), (0.05, 0.05, 0.05), "yellow2", "tail")
def pot_helmet(scale=1.0):
    cyl((0, -0.07, 1.06), 0.21 * scale, 0.15, "alu", "head", rot=(-8, 0, 6), subd=0)
    bpy.ops.mesh.primitive_torus_add(major_radius=0.215 * scale, minor_radius=0.018, location=(0, -0.08, 1.135))
    o = bpy.context.active_object; o.rotation_euler = (math.radians(-8), 0, math.radians(6)); finish(o, "alu", "head", 1)
if VARIANT == "cat_spatula":
    pot_helmet()
    G = Vector((0.35, -0.13, 0.46))
    along("cyl", (0.35, -0.10, 0.38), (0.35, -0.28, 0.82), 0.018, 0, "wood", "weapon")
    box(Vector((0.35, -0.31, 0.93)), Vector((0, -0.6, 0.2)).normalized(), (0.12, 0.17, 0.015), "steel", "weapon")
    throw_prop_bone(G, 0.12)
if VARIANT == "cat_pan":
    pot_helmet(1.05)
    sphere((0, -0.37, 0.45), (0.25, 0.04, 0.25), "iron", "body")
    bpy.ops.mesh.primitive_torus_add(major_radius=0.25, minor_radius=0.02, location=(0, -0.385, 0.45))
    o = bpy.context.active_object; o.rotation_euler = (math.radians(90), 0, 0); finish(o, "iron", "body", 1)
    along("cyl", (-0.25, -0.39, 0.45), (-0.5, -0.4, 0.47), 0.03, 0, "wood", "body")
if VARIANT == "cat_chili":
    bpy.ops.mesh.primitive_torus_add(major_radius=0.215, minor_radius=0.03, location=(0, -0.08, 0.99))
    o = bpy.context.active_object; o.rotation_euler = (math.radians(-8), 0, 0); finish(o, "red", "head", 1)
    G = Vector((0.35, -0.13, 0.46))
    along("cone", (0.35, -0.16, 0.45), (0.37, -0.22, 0.68), 0.05, 0.008, "red", "weapon")
    along("cyl", (0.35, -0.16, 0.45), (0.34, -0.14, 0.4), 0.015, 0, "leaf", "weapon")
    throw_prop_bone(G, 0.12)
    for k in range(3): along("cone", (-0.2 + 0.08 * k, -0.28, 0.32), (-0.18 + 0.08 * k, -0.33, 0.2), 0.025, 0.005, "red", "body")
if VARIANT == "cat_bomb":
    G = Vector((0.35, -0.13, 0.46))
    sphere((0.36, -0.2, 0.55), (0.06, 0.13, 0.07), "fishm", "weapon", rot=(-30, 0, 0))
    along("cone", (0.36, -0.08, 0.48), (0.36, 0.0, 0.42), 0.06, 0.0, "fishm", "weapon")
    sphere((0.36, -0.31, 0.6), (0.015, 0.015, 0.015), "pupil", "weapon")
    along("cyl", (0.36, -0.2, 0.62), (0.36, -0.22, 0.72), 0.008, 0, "fuse", "weapon")
    sphere((0.36, -0.22, 0.74), (0.025,) * 3, "spark", "weapon", subd=0)
    throw_prop_bone(G, 0.12)
if VARIANT == "cat_king":
    cyl((0, -0.07, 1.08), 0.17, 0.1, "gold", "head", rot=(-8, 0, 0), subd=0)
    for k in range(6):
        a = k * math.pi / 3
        cone((0.17 * math.cos(a), -0.07 + 0.17 * math.sin(a), 1.17), 0.04, 0.0, 0.12, "gold", "head")
        sphere((0.172 * math.cos(a + 0.5), -0.07 + 0.172 * math.sin(a + 0.5), 1.08), (0.02,) * 3, "red", "head", subd=0)
    sphere((0, 0.3, 0.45), (0.33, 0.06, 0.36), "red", "body", rot=(15, 0, 0))
    bpy.ops.mesh.primitive_torus_add(major_radius=0.16, minor_radius=0.03, location=(0, -0.02, 0.66))
    finish(bpy.context.active_object, "cream", "body", 1)
    G = Vector((0.35, -0.13, 0.46))
    along("cyl", (0.35, -0.10, 0.36), (0.35, -0.28, 0.88), 0.025, 0, "wood", "weapon")
    box(Vector((0.35, -0.3, 0.95)), Vector((0, 0, 1)), (0.24, 0.14, 0.14), "steel", "weapon")
    throw_prop_bone(G, 0.12)

# ---------- red-fluid troops ----------
if VARIANT == "pig_rider":
    pz = -0.12
    sphere((0, 0.02, pz), (0.36, 0.5, 0.29), "pig", "root")
    cyl((0, -0.52, pz + 0.02), 0.12, 0.08, "pig", "root", rot=(90, 0, 0))
    for sx in (1, -1):
        sphere((0.04 * sx, -0.565, pz + 0.02), (0.022, 0.01, 0.03), "mouth", "root", subd=0)
        cone((0.17 * sx, -0.36, pz + 0.24), 0.08, 0.0, 0.14, "pig", "root", rot=(20, 20 * sx, 0))
        sphere((0.12 * sx, -0.46, pz + 0.12), (0.04, 0.02, 0.045), "pupil", "root", subd=0)
    box(Vector((0, 0.25, pz + 0.25)), Vector((0, 0.2, 1)), (0.12, 0.025, 0.02), "pupil", "root")
    sphere((0, 0.05, pz + 0.22), (0.22, 0.25, 0.05), "leather", "root")
    for (x, y, b) in ((0.17, -0.25, "leg.L"), (-0.17, 0.25, "leg.L"), (-0.17, -0.25, "leg.R"), (0.17, 0.25, "leg.R")):
        cyl((x, y, -0.32), 0.06, 0.16, "pig", b)
        cyl((x, y, -0.39), 0.062, 0.03, "pink", b)
    bpy.ops.mesh.primitive_torus_add(major_radius=0.04, minor_radius=0.012, location=(0, 0.46, pz + 0.05))
    o = bpy.context.active_object; o.rotation_euler = (0, math.radians(90), 0); finish(o, "pig", "root", 1)
    G = Vector((0.35, -0.13, 0.46))
    along("cyl", (0.35, -0.10, 0.38), (0.35, -0.30, 0.86), 0.018, 0, "slingwood", "weapon")
    sphere((0.35, -0.33, 0.92), (0.09, 0.09, 0.04), "slingwood", "weapon", rot=(-60, 0, 0))
    throw_prop_bone(G, 0.12)
if VARIANT == "mop":
    bpy.ops.mesh.primitive_torus_add(major_radius=0.215, minor_radius=0.03, location=(0, -0.08, 0.99))
    o = bpy.context.active_object; o.rotation_euler = (math.radians(-8), 0, 0); finish(o, "purple", "head", 1)
    G = Vector((0.35, -0.13, 0.46))
    along("cyl", (0.35, -0.3, 0.2), (0.35, -0.02, 1.0), 0.018, 0, "basket", "weapon")
    top = Vector((0.35, -0.32, 0.18))
    sphere(tuple(top), (0.07, 0.07, 0.04), "basket", "weapon")
    for k in range(12):
        a = k * math.pi / 6
        along("cone", top + Vector((0.05 * math.cos(a), 0.05 * math.sin(a), 0)), top + Vector((0.13 * math.cos(a), 0.13 * math.sin(a), -0.16)), 0.024, 0.014, "cream", "weapon")
    throw_prop_bone(G, 0.12)
if VARIANT == "witch":
    cone((0, -0.05, 1.22), 0.2, 0.01, 0.42, "purple", "head", rot=(-15, 0, 10))
    bpy.ops.mesh.primitive_torus_add(major_radius=0.25, minor_radius=0.035, location=(0, -0.08, 1.04))
    o = bpy.context.active_object; o.scale = (1, 1, 0.4); finish(o, "purple", "head", 1)
    sphere((0, -0.2, 1.12), (0.035, 0.01, 0.035), "gold", "head")
    sphere((0, 0.28, 0.5), (0.3, 0.05, 0.33), "purple", "body", rot=(15, 0, 0))
    G = Vector((0.35, -0.13, 0.46))
    along("cyl", (0.35, -0.08, 0.25), (0.35, -0.32, 1.0), 0.018, 0, "slingwood", "weapon")
    tp_ = Vector((0.35, -0.08, 0.25))
    along("cone", tp_, tp_ + Vector((0, 0.08, -0.25)), 0.03, 0.12, "bamboo" if "bamboo" in M else "gold", "weapon")
    for k in range(6):
        a = k * math.pi / 3
        sphere((0.35 + 0.12 * math.cos(a), -0.34, 1.02 + 0.12 * math.sin(a)), (0.025,) * 3, "magic", "zap", subd=0)
    throw_prop_bone(G, 0.12)
    EXTRA_BONES.append(("zap", Vector((0.35, -0.34, 1.02)), Vector((0.35, -0.34, 1.12)), "weapon"))
if VARIANT == "ricecooker":
    cyl((0, 0.02, 0.42), 0.4, 0.64, "cream", "body", subd=0)
    bpy.ops.mesh.primitive_torus_add(major_radius=0.4, minor_radius=0.04, location=(0, 0.02, 0.74))
    finish(bpy.context.active_object, "cream", "body", 1)
    bpy.ops.mesh.primitive_torus_add(major_radius=0.4, minor_radius=0.03, location=(0, 0.02, 0.11))
    finish(bpy.context.active_object, "steel", "body", 1)
    box(Vector((0, -0.4, 0.4)), Vector((0, -1, 0)), (0.22, 0.14, 0.02), "pupil", "body")
    sphere((-0.05, -0.415, 0.42), (0.025, 0.01, 0.025), "red", "body", subd=0)
    sphere((0.05, -0.415, 0.42), (0.025, 0.01, 0.025), "green", "body", subd=0)
    box(Vector((0, -0.41, 0.3)), Vector((0, -1, 0)), (0.12, 0.05, 0.02), "red", "body")
    pts = [Vector((0.0, 0.38, 0.25)), Vector((0.1, 0.5, 0.15)), Vector((0.25, 0.55, 0.05)), Vector((0.4, 0.5, 0.03))]
    cd_ = tube([tuple(p) for p in pts], 0.015, "pupil"); CUSTOM.append((cd_, lambda co: {"body": 1.0}))
    box(Vector((0.42, 0.5, 0.04)), Vector((0, 0, 1)), (0.06, 0.09, 0.04), "pupil", "body")

if COL:
    jacket = sphere((0, 0.02, 0.395), (0.325, 0.345, 0.32), "uniform", "body", rot=(-12, 0, 0))
    # collar
    bpy.ops.mesh.primitive_torus_add(major_radius=0.155, minor_radius=0.03, location=(0, -0.02, 0.66))
    o = bpy.context.active_object; o.scale = (1, 1.05, 1.4); o.rotation_euler = (math.radians(-10), 0, 0)
    finish(o, "uniform", "body", 1)
    bpy.ops.mesh.primitive_torus_add(major_radius=0.16, minor_radius=0.012, location=(0, -0.02, 0.695))
    o = bpy.context.active_object; o.rotation_euler = (math.radians(-10), 0, 0)
    finish(o, "gold", "body", 1)
    # double-breasted gold buttons
    for z in (0.52, 0.43, 0.34, 0.25):
        for x in (-0.085, 0.085):
            p, n = surf(x, z, jacket, 0.004)
            disc(p, n, 0.018, 0.012, "gold", "body")
    # belt + buckle
    bpy.ops.mesh.primitive_torus_add(major_radius=1.0, minor_radius=0.028, location=(0, 0.02, 0.245))
    o = bpy.context.active_object; o.scale = (0.312, 0.332, 0.7); o.rotation_euler = (math.radians(-12), 0, 0)
    finish(o, "black", "body", 1)
    p, n = surf(0, 0.24, jacket, 0.012)
    box(p, n, (0.075, 0.06, 0.018), "gold", "body")
    # medals on duck's left chest (+X): ribbon bars + hanging medals
    cols = [("red", "gold"), ("blue", "white2"), ("gold", "red")]
    for row, z in enumerate((0.595, 0.565, 0.535)[3 - RANK if RANK > 1 else 2:] if RANK > 1 else (0.565,)):
        for c in range(3):
            x = 0.12 + c * 0.045 - row * 0.02
            p, n = surf(x, z, jacket, 0.006)
            box(p, n, (0.04, 0.022, 0.012), cols[(c + row) % 3][0], "body")
    for c in range({1: 0, 2: 3, 3: 5}[RANK]):
        x = 0.1 + c * 0.04 if RANK == 3 else 0.125 + c * 0.05
        p, n = surf(x, 0.49, jacket, 0.008)
        box(p, n, (0.022, 0.035, 0.008), cols[c % 3][1], "body")
        p, n = surf(x, 0.455, jacket, 0.012)
        disc(p, n, 0.022, 0.009, "gold", "body")
    # star medal on right chest
    if RANK >= 2:
        p, n = surf(-0.15, 0.53, jacket, 0.01)
        disc(p, n, 0.04 + 0.01 * (RANK - 2), 0.012, "gold", "body"); disc(p + n * 0.008, n, 0.022, 0.01, "red", "body")
    if RANK == 3:
        p, n = surf(-0.13, 0.44, jacket, 0.01)
        disc(p, n, 0.035, 0.012, "gold", "body"); disc(p + n * 0.008, n, 0.02, 0.01, "blue", "body")
        for k in range(10):   # red sash shoulder -> hip
            t = k / 9; p, n = surf(0.22 - 0.42 * t, 0.62 - 0.4 * t, jacket, 0.008)
            disc(p, n, 0.05, 0.012, "red", "body", sx=1.4)
        sphere((0, 0.32, 0.45), (0.33, 0.05, 0.36), "red", "body", rot=(15, 0, 0))
    # aiguillette (gold cord) hanging across right chest
    for k in (range(7) if RANK >= 2 else []):
        t = k / 6
        x = -0.25 + 0.13 * t; z = 0.60 - 0.18 * t + 0.06 * math.sin(math.pi * t)
        p, n = surf(x, z, jacket, 0.01)
        disc(p, n, 0.016, 0.016, "gold", "body")
    # epaulettes with fringe
    for s in (1, -1):
        sphere((0.25 * s, 0.0, 0.62), (0.09 + 0.015 * (RANK - 2), 0.075, 0.025), "gold" if RANK > 1 else "uniform", "body", rot=(0, 28 * s, 0))
        for k in (range(7 if RANK == 2 else 9) if RANK >= 2 else []):
            a = math.radians(-60 + k * 20)
            px = 0.25 * s + 0.085 * math.cos(a) * s * 0.9 + 0.03 * s
            py = 0.0 + 0.075 * math.sin(a)
            cyl((px, py, 0.585 - 0.015 * (RANK - 2)), 0.008, 0.06 + 0.03 * (RANK - 2), "gold", "body", rot=(0, 28 * s, 0))
    # sleeves cuffs
    for s, b in ((1, "wing.L"), (-1, "wing.R")):
        sphere((0.315 * s, 0.10, 0.36), (0.045, 0.06, 0.05), "gold", b, rot=(-30, 15 * s, 0))
    # officer cap
    capz = 1.08
    cone((0, -0.07, capz + 0.055), 0.20, 0.265, 0.11, "uniform", "head", rot=(-10, 0, 0))
    cyl((0, -0.07, capz + 0.115), 0.265, 0.025, "uniform", "head", rot=(-10, 0, 0))
    cyl((0, -0.075, capz + 0.02), 0.205, 0.055, "red", "head", rot=(-10, 0, 0))
    # visor
    sphere((0, -0.255, capz + 0.012), (0.165, 0.085, 0.014), "black", "head", rot=(14, 0, 0))
    # gold chin cord across front band
    cyl((0, -0.28, capz + 0.02), 0.008, 0.30, "gold", "head", rot=(0, 90, 0))
    for s in (1, -1):
        sphere((0.15 * s, -0.255, capz + 0.02), (0.014, 0.014, 0.014), "gold", "head")
    # cap badge
    sphere((0, -0.29, capz + 0.075), (0.045, 0.012, 0.045), "gold", "head", rot=(-10, 0, 0))
    sphere((0, -0.302, capz + 0.075), (0.02, 0.008, 0.02), "red", "head", rot=(-10, 0, 0))
    # gold leaves on visor (rank)
    for s in (1, -1):
        for k in range({1: 0, 2: 3, 3: 4}[RANK]):
            sphere((s * (0.05 + k * 0.032), -0.29 + k * 0.012, capz + 0.02 - k * 0.003), (0.018, 0.007, 0.007), "gold", "head", rot=(22, 0, s * 30))
    # cane in right wing (-X)
    if RANK == 3:
        for k in range(3): sphere((-0.1 + 0.1 * k, -0.255, capz + 0.06), (0.018, 0.008, 0.018), "gold", "head")
    cyl((0.355, -0.11, 0.25), 0.02, 0.50, "gold" if RANK == 3 else "wood", "cane", rot=(-8, -6, 0))
    sphere((0.34, -0.085, 0.50), (0.04, 0.04, 0.04), "steel" if RANK == 1 else "gold", "cane")
    if RANK == 3: sphere((0.34, -0.1, 0.52), (0.02,) * 3, "red", "cane", subd=0)
    cyl((0.37, -0.145, 0.015), 0.022, 0.03, "gold", "cane", rot=(-8, -6, 0))
    EXTRA_BONES.append(("cane", Vector((0.34, -0.085, 0.50)), Vector((0.37, -0.145, 0.02)), "wing.L"))
    # whistle at beak tip (hidden except during command)
    along("cyl", (0, -0.50, 0.775), (0, -0.64, 0.775), 0.034, 0, "gold", "whistle")
    sphere((0, -0.62, 0.75), (0.048, 0.048, 0.048), "gold", "whistle")
    EXTRA_BONES.append(("whistle", Vector((0, -0.50, 0.775)), Vector((0, -0.60, 0.775)), "head"))

if EG:
    from mathutils import Matrix
    for o, b in parts:
        if b in ("head", "jaw"):
            o.data.transform(Matrix.Translation((0, -0.04, LEGUP + NECK)))
        elif b in ("body", "wing.L", "wing.R", "tail"):
            o.data.transform(Matrix.Translation((0, 0, LEGUP)))
    p0 = Vector((0, -0.02, 0.52 + LEGUP)); p1 = Vector((0, -0.10, 0.72 + LEGUP + NECK))
    pts = [p0 + (p1 - p0) * (i / 9) + Vector((0, -0.05 * math.sin(math.pi * i / 9), 0)) for i in range(10)]
    nk = tube([tuple(p) for p in pts], 0.11, "yellow")
    CUSTOM.append((nk, lambda co, p0=p0, p1=p1: (lambda t: {"body": 1 - t, "head": t})(max(0.0, min(1.0, (co - p0).dot(p1 - p0) / (p1 - p0).length_squared)))))

# ---------- armature ----------
bpy.ops.object.armature_add(enter_editmode=True, location=(0, 0, 0))
arm = bpy.context.active_object
arm.name = "DuckRig"
ebs = arm.data.edit_bones
ebs.remove(ebs[0])
BOFF = {"body": (0, 0, LEGUP), "wing.L": (0, 0, LEGUP), "wing.R": (0, 0, LEGUP), "tail": (0, 0, LEGUP),
        "head": (0, -0.04, LEGUP + NECK), "jaw": (0, -0.04, LEGUP + NECK)}
def bone(name, h, t, parent=None):
    off = Vector(BOFF.get(name, (0, 0, 0)))
    b = ebs.new(name); b.head = Vector(h) + off; b.tail = Vector(t) + off
    if parent: b.parent = ebs[parent]
    return b
bone("root", (0, 0, 0), (0, 0.15, 0))
bone("body", (0, 0.02, 0.22), (0, 0.02, 0.58), "root")
bone("head", (0, -0.05, 0.62), (0, -0.06, 1.05), "body")
bone("jaw", (0, -0.27, 0.73), (0, -0.44, 0.69), "head")
bone("wing.L", (0.27, 0.0, 0.53), (0.33, 0.12, 0.33), "body")
bone("wing.R", (-0.27, 0.0, 0.53), (-0.33, 0.12, 0.33), "body")
bone("tail", (0, 0.25, 0.45), (0, 0.40, 0.66), "body")
bone("leg.L", (0.12, 0.0, 0.24 + LEGUP), (0.12, 0.0, 0.03), "root")
bone("leg.R", (-0.12, 0.0, 0.24 + LEGUP), (-0.12, 0.0, 0.03), "root")
for nm, h, t, par in EXTRA_BONES:
    bone(nm, tuple(h), tuple(t), par)
bpy.ops.object.mode_set(mode="OBJECT")

# join parts into one skinned mesh
for o, b in parts:
    if b is None: continue
    vg = o.vertex_groups.new(name=b)
    vg.add(list(range(len(o.data.vertices))), 1.0, "REPLACE")
for o, wf in CUSTOM:
    groups = {}
    for v in o.data.vertices:
        for bn, w in wf(o.matrix_world @ v.co).items():
            if bn not in groups: groups[bn] = o.vertex_groups.new(name=bn)
            groups[bn].add([v.index], w, "REPLACE")
    parts.append((o, None))
bpy.ops.object.select_all(action="DESELECT")
for o, _ in parts:
    o.select_set(True)
bpy.context.view_layer.objects.active = parts[0][0]
bpy.ops.object.join()
duck = bpy.context.active_object
duck.name = "Duck"
duck.parent = arm
md = duck.modifiers.new("Armature", "ARMATURE"); md.object = arm
SC = {"giant": 1.45, "armor": 1.3, "prop": 0.72, "egret": 1.1, "egret_guard": 1.1, "cat_pan": 1.25, "cat_king": 1.4, "ricecooker": 1.45}.get(VARIANT, 1.0)
arm.scale = (SC, SC, SC)
if VARIANT == "bomber":
    me = duck.data
    ca = me.color_attributes.new("Soot", "FLOAT_COLOR", "CORNER")
    sootable = {}
    for i, m in enumerate(me.materials):
        if m.name.startswith(("Feather", "Beak")):
            sootable[i] = m.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value[:3]
    dark = (0.022, 0.02, 0.02)
    for poly in me.polygons:
        base = sootable.get(poly.material_index)
        for li in poly.loop_indices:
            if base is None:
                ca.data[li].color = (1, 1, 1, 1); continue
            co = me.vertices[me.loops[li].vertex_index].co
            n1 = mathutils.noise.noise(co * 11.0); n2 = mathutils.noise.noise(co * 31.0 + Vector((3, 1, 2)))
            f = max(0.0, min(0.985, 0.97 + 0.35 * n1 + 0.3 * n2))
            ca.data[li].color = (*[b * (1 - f) + dk * f for b, dk in zip(base, dark)], 1)
    for i in sootable:
        m = me.materials[i]; nt = m.node_tree
        attr = nt.nodes.new("ShaderNodeVertexColor"); attr.layer_name = "Soot"
        nt.links.new(attr.outputs["Color"], nt.nodes["Principled BSDF"].inputs["Base Color"])
        nt.nodes["Principled BSDF"].inputs["Roughness"].default_value = 0.8

# ---------- animations ----------
pb = arm.pose.bones
for p in pb:
    p.rotation_mode = "XYZ"
arm.animation_data_create()

def key(fr, data):
    for name, ch in data.items():
        p = pb[name]
        if "r" in ch:
            p.rotation_euler = [math.radians(v) for v in ch["r"]]; p.keyframe_insert("rotation_euler", frame=fr)
        if "l" in ch:
            p.location = ch["l"]; p.keyframe_insert("location", frame=fr)
        if "s" in ch:
            p.scale = ch["s"]; p.keyframe_insert("scale", frame=fr)

def reset():
    for p in pb:
        p.rotation_euler = (0, 0, 0); p.location = (0, 0, 0); p.scale = (1, 1, 1)

def new_action(name):
    a = bpy.data.actions.new(name); a.use_fake_user = True
    arm.animation_data.action = a
    reset()
    return a

ALL = ["root", "body", "head", "jaw", "wing.L", "wing.R", "tail", "leg.L", "leg.R"] + [b[0] for b in EXTRA_BONES]
def full(fr, d):
    base = {n: {"r": (0, 0, 0), "l": (0, 0, 0), "s": (0.01, 0.01, 0.01) if n in HIDDEN else (1, 1, 1)} for n in ALL}
    for n, ch in d.items():
        base[n].update(ch)
    base["body"]["s"] = tuple(1 + (v - 1) * AMP for v in base["body"]["s"])
    if "prop" in base and "prop" not in d:
        base["prop"]["r"] = (0, fr * 50, 0)
    rl = base["root"]["l"]; base["root"]["l"] = (rl[0], rl[1], rl[2] + HOVER)
    key(fr, base)

# Walk: 16 frames, waddle with squash & stretch
new_action("Walk")
N = 16
for f in range(N + 1):
    ph = 2 * math.pi * f / N
    sw = math.sin(ph)
    bounce = abs(math.cos(ph))          # 1 at contact? use for squash
    up = abs(math.sin(ph))
    sq = 1 - 0.10 * (1 - up)            # squash at contact
    full(f + 1, {
        "root": {"l": (0, 0, 0)},
        "body": {"r": (6, 0, 14 * sw), "l": (0, 0.09 * up, 0), "s": (1 + 0.06 * (1 - up), sq, 1 + 0.06 * (1 - up))},
        "head": {"r": (-6 + 6 * up, 0, -11 * sw)},
        "jaw": {"r": (8 + 6 * up, 0, 0)},
        "leg.L": {"r": (45 * sw, 0, 0)},
        "leg.R": {"r": (-45 * sw, 0, 0)},
        "wing.L": {"r": (0, 0, -18 - 24 * up)},
        "wing.R": {"r": (0, 0, 18 + 24 * up)},
        "tail": {"r": (0, 0, 20 * sw)},
    })

# Idle: 48 frames breathing + head tilt
new_action("Idle")
N = 48
for f in range(0, N + 1, 4):
    ph = 2 * math.pi * f / N
    full(f + 1, {
        "body": {"s": (1 + 0.03 * math.sin(ph), 1 - 0.03 * math.sin(ph), 1 + 0.03 * math.sin(ph))},
        "head": {"r": (3 * math.sin(ph), 0, 8 * math.sin(ph / 1))},
        "jaw": {"r": (6 + 6 * max(0, math.sin(ph * 2)), 0, 0)},
        "wing.L": {"r": (0, 0, -6 * math.sin(ph))},
        "wing.R": {"r": (0, 0, 6 * math.sin(ph))},
        "tail": {"r": (0, 0, 15 * math.sin(ph * 2))},
    })

# Attack per variant
new_action("Attack")
if VARIANT == "fork":
    poses = [
        (1, {"wing.L": {"r": (-10, 0, 0)}}),
        (7, {"body": {"r": (-14, 0, 0), "s": (1.08, 0.88, 1.08)}, "head": {"r": (-10, 0, 0)}, "wing.L": {"r": (20, 0, 0)}, "weapon": {"l": (0, -0.08, 0), "r": (-15, 0, 0)}, "wing.R": {"r": (0, 0, 40)}}),
        (10, {"body": {"r": (26, 0, 0), "s": (0.9, 1.18, 0.9), "l": (0, 0.05, 0)}, "head": {"r": (14, 0, 0)}, "jaw": {"r": (32, 0, 0)}, "wing.L": {"r": (-30, 0, 0)}, "weapon": {"l": (0, 0.2, 0), "r": (78, 0, 0)}, "wing.R": {"r": (0, 0, -30)}, "tail": {"r": (-25, 0, 0)}}),
        (14, {"body": {"r": (14, 0, 0), "s": (1.04, 0.96, 1.04)}, "head": {"r": (6, 0, 0)}, "wing.L": {"r": (-20, 0, 0)}, "weapon": {"l": (0, 0.12, 0), "r": (55, 0, 0)}}),
        (20, {"wing.L": {"r": (-10, 0, 0)}}),
    ]
elif VARIANT == "sling":
    aimL = {"r": (-35, 0, 0)}
    poses = [
        (1, {"wing.L": aimL}),
        (9, {"wing.L": aimL, "body": {"r": (-10, 0, -6), "s": (1.05, 0.93, 1.05)}, "head": {"r": (-6, 0, -8)}, "pouch": {"l": (-0.03, 0.24, -0.03)}, "wing.R": {"r": (35, 0, 0)}, "jaw": {"r": (0, 0, 0)}}),
        (12, {"wing.L": aimL, "body": {"r": (-11, 0, -6), "s": (1.06, 0.92, 1.06)}, "head": {"r": (-6, 0, -9)}, "pouch": {"l": (-0.03, 0.26, -0.035)}, "wing.R": {"r": (38, 0, 0)}}),
        (14, {"wing.L": aimL, "body": {"r": (10, 0, 2), "s": (0.95, 1.08, 0.95)}, "pouch": {"l": (0.0, -0.16, 0.0)}, "wing.R": {"r": (-20, 0, 0)}, "jaw": {"r": (28, 0, 0)}, "tail": {"r": (-20, 0, 0)}}),
        (16, {"wing.L": aimL, "pouch": {"l": (0, 0.04, -0.01)}, "jaw": {"r": (20, 0, 0)}}),
        (24, {"wing.L": aimL}),
    ]
elif VARIANT == "bomber":
    poses = [
        (1, {}),
        (8, {"wing.L": {"r": (-150, 0, 0)}, "body": {"r": (-14, 0, 8), "s": (1.06, 0.9, 1.06)}, "head": {"r": (-10, 0, 0)}, "wing.R": {"r": (0, 0, 35)}}),
        (11, {"wing.L": {"r": (-40, 0, 0)}, "body": {"r": (24, 0, -6), "s": (0.92, 1.14, 0.92), "l": (0, 0.05, 0)}, "head": {"r": (12, 0, 0)}, "jaw": {"r": (34, 0, 0)}, "wing.R": {"r": (0, 0, -30)}, "tail": {"r": (-25, 0, 0)}}),
        (12, {"wing.L": {"r": (-30, 0, 0)}, "weapon": {"s": (0.01, 0.01, 0.01)}, "body": {"r": (20, 0, -4)}, "jaw": {"r": (30, 0, 0)}}),
        (18, {"weapon": {"s": (0.01, 0.01, 0.01)}, "body": {"r": (4, 0, 0)}}),
        (21, {"weapon": {"s": (1, 1, 1)}}),
        (24, {}),
    ]
elif VARIANT in ("chef", "kite", "prop", "plane", "cat_chili", "cat_bomb"):
    hide = VARIANT != "chef"
    pour = {"r": (70, 0, 0)} if VARIANT == "chef" else {"s": (0.01, 0.01, 0.01)}
    poses = [
        (1, {}),
        (8, {"wing.L": {"r": (-150, 0, 0)}, "body": {"r": (-14, 0, 8), "s": (1.06, 0.9, 1.06)}, "head": {"r": (-10, 0, 0)}, "wing.R": {"r": (0, 0, 35)}}),
        (11, {"wing.L": {"r": (-40, 0, 0)}, "body": {"r": (24, 0, -6), "s": (0.92, 1.14, 0.92), "l": (0, 0.05, 0)}, "head": {"r": (12, 0, 0)}, "jaw": {"r": (34, 0, 0)}, "wing.R": {"r": (0, 0, -30)}, "tail": {"r": (-25, 0, 0)}, "weapon": {"r": (50, 0, 0)} if not hide else {}}),
        (12, {"wing.L": {"r": (-30, 0, 0)}, "weapon": pour, "body": {"r": (20, 0, -4)}, "jaw": {"r": (30, 0, 0)}}),
        (16, {"weapon": pour if hide else {"r": (40, 0, 0)}, "body": {"r": (4, 0, 0)}}),
        (20, {"weapon": {"s": (1, 1, 1)}}),
        (24, {}),
    ]
elif VARIANT in ("egret", "egret_guard"):
    poses = [
        (1, {}),
        (7, {"head": {"r": (-35, 0, 0)}, "body": {"r": (-16, 0, 0), "s": (1.06, 0.9, 1.06)}, "jaw": {"r": (0, 0, 0)}, "wing.L": {"r": (0, 0, -45)}, "wing.R": {"r": (0, 0, 45)}}),
        (10, {"head": {"r": (60, 0, 0)}, "body": {"r": (30, 0, 0), "s": (0.9, 1.15, 0.9)}, "root": {"l": (0, -0.08, 0)}, "jaw": {"r": (25, 0, 0)}, "wing.L": {"r": (0, 0, 25)}, "wing.R": {"r": (0, 0, -25)}, "tail": {"r": (-30, 0, 0)}}),
        (12, {"head": {"r": (52, 0, 0)}, "body": {"r": (26, 0, 0), "s": (1.1, 0.88, 1.1)}, "root": {"l": (0, -0.08, 0)}, "jaw": {"r": (0, 0, 0)}}),
        (16, {"head": {"r": (10, 0, 0)}, "body": {"r": (6, 0, 0)}}),
        (22, {}),
    ]
elif VARIANT == "nurse":
    poses = [
        (1, {}),
        (5, {"wing.R": {"r": (-60, 0, 0)}, "body": {"r": (6, 0, 0)}, "head": {"r": (6, 0, -10)}}),
        (8, {"wing.R": {"r": (-62, 0, 0)}, "spray": {"s": (1.1, 0.85, 1.1)}, "body": {"s": (1.05, 0.95, 1.05)}, "jaw": {"r": (20, 0, 0)}}),
        (10, {"wing.R": {"r": (-58, 0, 0)}, "spray": {"s": (1, 1, 1)}}),
        (12, {"wing.R": {"r": (-62, 0, 0)}, "spray": {"s": (1.1, 0.85, 1.1)}, "body": {"s": (1.05, 0.95, 1.05)}, "jaw": {"r": (20, 0, 0)}}),
        (14, {"wing.R": {"r": (-58, 0, 0)}}),
        (20, {}),
    ]
elif VARIANT in ("digger", "cat_spatula", "cat_king", "pig_rider", "giant"):
    poses = [
        (1, {}),
        (8, {"wing.L": {"r": (-160, 0, 0)}, "weapon": {"r": (-30, 0, 0)}, "body": {"r": (-16, 0, 6), "s": (1.06, 0.9, 1.06)}, "head": {"r": (-12, 0, 0)}}),
        (11, {"wing.L": {"r": (-10, 0, 0)}, "weapon": {"r": (60, 0, 0)}, "body": {"r": (28, 0, -6), "s": (1.12, 0.84, 1.12)}, "head": {"r": (15, 0, 0)}, "jaw": {"r": (30, 0, 0)}, "tail": {"r": (-25, 0, 0)}}),
        (13, {"wing.L": {"r": (-20, 0, 0)}, "weapon": {"r": (50, 0, 0)}, "body": {"r": (22, 0, 0), "s": (0.95, 1.06, 0.95)}}),
        (20, {}),
    ]
elif VARIANT == "fan":
    poses = [
        (1, {}),
        (7, {"wing.L": {"r": (-150, 0, 0)}, "weapon": {"r": (-20, 0, 0)}, "body": {"r": (-12, 0, 8), "s": (1.06, 0.9, 1.06)}, "head": {"r": (-10, 0, 0)}}),
        (10, {"wing.L": {"r": (-30, 0, 0)}, "weapon": {"r": (40, 0, 0)}, "zap": {"s": (1.4, 1.4, 1.4)}, "body": {"r": (22, 0, -6), "s": (0.92, 1.12, 0.92)}, "jaw": {"r": (32, 0, 0)}}),
        (12, {"wing.L": {"r": (-28, 0, 0)}, "weapon": {"r": (35, 0, 0)}, "zap": {"s": (0.8, 0.8, 0.8)}, "body": {"r": (18, 0, 0)}}),
        (14, {"wing.L": {"r": (-28, 0, 0)}, "weapon": {"r": (35, 0, 0)}, "zap": {"s": (1.2, 1.2, 1.2)}}),
        (16, {"wing.L": {"r": (-20, 0, 0)}}),
        (22, {}),
    ]
elif VARIANT in ("armor", "cat_pan", "ricecooker"):
    poses = [
        (1, {}),
        (8, {"body": {"r": (-28, 0, 0), "s": (1.12, 0.84, 1.12)}, "head": {"r": (-15, 0, 0)}, "root": {"l": (0, 0.07, 0)}, "wing.L": {"r": (0, 0, -55)}, "wing.R": {"r": (0, 0, 55)}, "leg.L": {"r": (-15, 0, 0)}, "leg.R": {"r": (-15, 0, 0)}}),
        (11, {"body": {"r": (6, 0, 0), "s": (0.92, 0.92, 1.25)}, "head": {"r": (8, 0, 0)}, "jaw": {"r": (35, 0, 0)}, "root": {"l": (0, -0.16, 0)}, "wing.L": {"r": (0, 0, 35)}, "wing.R": {"r": (0, 0, -35)}, "leg.L": {"r": (35, 0, 0)}, "leg.R": {"r": (-25, 0, 0)}, "tail": {"r": (-30, 0, 0)}}),
        (13, {"body": {"r": (2, 0, 0), "s": (1.15, 0.88, 0.85)}, "head": {"r": (-12, 0, 0)}, "jaw": {"r": (20, 0, 0)}, "root": {"l": (0, -0.14, 0)}}),
        (16, {"body": {"r": (-4, 0, 0), "s": (0.96, 1.06, 1.0)}, "root": {"l": (0, -0.06, 0)}}),
        (22, {}),
    ]
elif VARIANT == "balloon":
    poses = [
        (1, {}),
        (6, {"egg": {"s": (1, 1, 1)}, "wing.L": {"r": (-70, 0, 0)}, "body": {"r": (-10, 0, 0), "s": (1.06, 0.92, 1.06)}, "head": {"r": (-12, 0, 0)}, "bag": {"s": (1.05, 0.95, 1.05)}}),
        (10, {"egg": {"s": (1, 1, 1)}, "wing.L": {"r": (40, 0, 0)}, "body": {"r": (32, 0, 0), "s": (0.9, 1.12, 0.9)}, "head": {"r": (22, 0, 0)}, "jaw": {"r": (30, 0, 0)}, "bag": {"s": (0.94, 1.08, 0.94)}, "root": {"l": (0, 0, -0.04)}}),
        (11, {"wing.L": {"r": (45, 0, 0)}, "body": {"r": (30, 0, 0)}, "head": {"r": (20, 0, 0)}, "jaw": {"r": (30, 0, 0)}}),
        (15, {"body": {"r": (6, 0, 0), "s": (1.04, 0.97, 1.04)}, "bag": {"s": (1.04, 0.96, 1.04)}, "root": {"l": (0, 0, 0.03)}}),
        (22, {}),
    ]
elif VARIANT == "mop":
    poses = [(1, {})]
    poses.append((6, {"root": {"r": (0, 0, -40)}, "body": {"s": (1.08, 0.9, 1.08)}, "wing.L": {"r": (0, 0, 40)}}))
    for i, f in enumerate(range(8, 19, 2)):
        poses.append((f, {"root": {"r": (0, 0, -40 + 140 * (i + 1))}, "wing.L": {"r": (-60, 0, -75)}, "weapon": {"r": (70, 0, 0)}, "body": {"s": (1.1, 0.88, 1.1) if i % 2 else (0.92, 1.1, 0.92)}, "jaw": {"r": (30, 0, 0)}}))
    poses.append((21, {"root": {"r": (0, 0, 720)}, "body": {"s": (1.06, 0.94, 1.06)}}))
    poses.append((26, {"root": {"r": (0, 0, 720)}}))
elif VARIANT == "witch":
    poses = [
        (1, {}),
        (8, {"wing.L": {"r": (-150, 0, 0)}, "zap": {"s": (0.4, 0.4, 0.4)}, "body": {"r": (-10, 0, 0), "s": (0.92, 1.1, 0.92)}, "head": {"r": (-15, 0, 0)}}),
        (12, {"wing.L": {"r": (-160, 0, 0)}, "zap": {"s": (1.5, 1.5, 1.5)}, "body": {"r": (-14, 0, 0), "s": (0.88, 1.16, 0.88)}, "head": {"r": (-20, 0, 0)}, "jaw": {"r": (35, 0, 0)}, "wing.R": {"r": (0, 0, 60)}}),
        (16, {"wing.L": {"r": (-150, 0, 0)}, "zap": {"s": (1.0, 1.0, 1.0)}, "body": {"s": (1.05, 0.95, 1.05)}}),
        (22, {}),
    ]
elif COL:
    poses = [
        (1, {}),
        (7, {"wing.L": {"r": (-150, 0, 0)}, "cane": {"r": (-30, 0, 0)}, "body": {"r": (-12, 0, -8), "s": (1.06, 0.9, 1.06)}, "head": {"r": (-10, 0, 0)}, "wing.R": {"r": (0, 0, 35)}}),
        (11, {"wing.L": {"r": (-25, 0, 0)}, "cane": {"r": (45, 0, 0)}, "body": {"r": (22, 0, 6), "s": (0.92, 1.12, 0.92), "l": (0, 0.04, 0)}, "head": {"r": (12, 0, 0)}, "jaw": {"r": (30, 0, 0)}, "wing.R": {"r": (0, 0, -30)}, "tail": {"r": (-25, 0, 0)}}),
        (14, {"wing.L": {"r": (-30, 0, 0)}, "cane": {"r": (35, 0, 0)}, "body": {"r": (16, 0, 4), "s": (1.05, 0.95, 1.05)}, "jaw": {"r": (20, 0, 0)}}),
        (22, {}),
    ]
else:
    poses = [
        (1, {}),
        (6, {"body": {"r": (-14, 0, 0), "s": (1.08, 0.86, 1.08)}, "head": {"r": (-12, 0, 0)}, "wing.L": {"r": (0, 0, -45)}, "wing.R": {"r": (0, 0, 45)}, "jaw": {"r": (-2, 0, 0)}}),
        (10, {"body": {"r": (24, 0, 0), "s": (0.92, 1.16, 0.92), "l": (0, 0.06, 0)}, "head": {"r": (18, 0, 0)}, "jaw": {"r": (30, 0, 0)}, "wing.L": {"r": (0, 0, 25)}, "wing.R": {"r": (0, 0, -25)}, "tail": {"r": (-25, 0, 0)}}),
        (14, {"body": {"r": (10, 0, 0), "s": (1.05, 0.95, 1.05)}, "head": {"r": (6, 0, 0)}, "jaw": {"r": (0, 0, 0)}}),
        (20, {}),
    ]
for fr, d in poses:
    full(fr, d)

if COL:
    bpy.data.actions.remove(bpy.data.actions["Idle"])
    new_action("Idle")
    full(1, {})
    full(6, {"wing.L": {"r": (-55, 0, 0)}, "body": {"s": (1.02, 1.02, 1.02)}})
    for k, f in enumerate(range(8, 27, 2)):
        full(f, {"wing.L": {"r": (-55 + 6 * math.sin(k), 0, 0)}, "cane": {"r": (-80 * (k + 1), 0, 0)}, "head": {"r": (-5, 0, 6 * math.sin(k * 0.7))}})
    full(28, {"wing.L": {"r": (-50, 0, 0)}, "cane": {"r": (-800, 0, 0)}, "body": {"s": (1.05, 0.95, 1.05)}})
    full(32, {"wing.L": {"r": (0, 0, 0)}, "cane": {"r": (-720, 0, 0)}, "body": {"s": (1.04, 1.03, 1.04)}, "head": {"r": (-6, 0, 0)}})
    full(40, {"cane": {"r": (-720, 0, 0)}, "body": {"s": (1.05, 1.03, 1.05)}, "head": {"r": (-8, 0, 15)}})
    full(48, {"cane": {"r": (-720, 0, 0)}, "head": {"r": (-6, 0, -12)}})
    full(49, {})
    new_action("Whistle")
    W = {"s": (1, 1, 1)}
    full(1, {})
    full(5, {"whistle": W, "head": {"r": (-14, 0, 0)}, "body": {"r": (-6, 0, 0), "s": (1.1, 1.06, 1.1)}, "jaw": {"r": (0, 0, 0)}})
    for k, f in enumerate(range(8, 29, 3)):
        a = 1 if k % 2 == 0 else -1
        full(f, {"whistle": W, "head": {"r": (-18 + 3 * a, 0, 4 * a)}, "body": {"r": (-4, 0, 3 * a), "s": (1.0 - 0.03 * a, 1.05 + 0.03 * a, 1.0 - 0.03 * a)},
                 "wing.L": {"r": (-95, 0, 0)}, "cane": {"r": (70, 0, 0)}, "wing.R": {"r": (0, 0, 55 + 10 * a)}, "tail": {"r": (0, 0, 20 * a)}})
    full(32, {"whistle": W, "head": {"r": (-6, 0, 0)}})
    full(34, {})
    full(36, {})


if VARIANT == "balloon":
    for nm in ("Idle", "Walk"):
        bpy.data.actions.remove(bpy.data.actions[nm])
    new_action("Idle")
    for f in range(0, 49, 4):
        ph = 2 * math.pi * f / 48
        full(f + 1, {"root": {"l": (0, 0, 0.05 * math.sin(ph))}, "bag": {"s": (1 + 0.04 * math.sin(ph + 1.2), 1 - 0.05 * math.sin(ph + 1.2), 1 + 0.04 * math.sin(ph + 1.2)), "r": (4 * math.sin(ph * 2), 0, 0)},
                     "body": {"r": (0, 0, 5 * math.sin(ph))}, "head": {"r": (0, 0, 14 * math.sin(ph))}, "wing.L": {"r": (0, 0, -10 * math.sin(ph * 2))}, "wing.R": {"r": (0, 0, 10 * math.sin(ph * 2))}})
    new_action("Walk")
    for f in range(0, 25, 3):
        ph = 2 * math.pi * f / 24
        full(f + 1, {"root": {"l": (0, 0, 0.06 * math.sin(ph)), "r": (10, 0, 4 * math.sin(ph))}, "bag": {"r": (-6 + 3 * math.sin(ph), 0, 0), "s": (1 + 0.05 * math.sin(ph * 2), 1 - 0.06 * math.sin(ph * 2), 1 + 0.05 * math.sin(ph * 2))},
                     "body": {"r": (6, 0, 6 * math.sin(ph))}, "leg.L": {"r": (5 * math.sin(ph * 2), 0, 0)}, "leg.R": {"r": (-35 * math.sin(ph * 2), 0, 0)},
                     "wing.L": {"r": (0, 0, -30 - 25 * abs(math.sin(ph * 2)))}, "wing.R": {"r": (0, 0, 30 + 25 * abs(math.sin(ph * 2)))}})

if VARIANT in FLYERS:
    for nm in ("Idle", "Walk"):
        bpy.data.actions.remove(bpy.data.actions[nm])
    new_action("Idle")
    for f in range(0, 49, 4):
        ph = 2 * math.pi * f / 48
        full(f + 1, {"root": {"l": (0, 0, 0.06 * math.sin(ph)), "r": (3 * math.sin(ph * 2), 0, 4 * math.sin(ph))}, "body": {"r": (0, 0, 5 * math.sin(ph)), "s": (1 + 0.03 * math.sin(ph * 2), 1 - 0.04 * math.sin(ph * 2), 1 + 0.03 * math.sin(ph * 2))},
                     "head": {"r": (0, 0, 14 * math.sin(ph))}, "wing.R": {"r": (0, 0, 15 + 12 * math.sin(ph * 2))}, "leg.L": {"r": (20 * math.sin(ph * 2), 0, 0)}, "leg.R": {"r": (-20 * math.sin(ph * 2), 0, 0)}})
    new_action("Walk")
    for f in range(0, 25, 3):
        ph = 2 * math.pi * f / 24
        full(f + 1, {"root": {"l": (0, 0, 0.07 * math.sin(ph)), "r": (12, 0, 6 * math.sin(ph))}, "body": {"r": (6, 0, 6 * math.sin(ph))},
                     "leg.L": {"r": (40 * math.sin(ph * 2), 0, 0)}, "leg.R": {"r": (-40 * math.sin(ph * 2), 0, 0)},
                     "wing.R": {"r": (0, 0, 30 + 25 * abs(math.sin(ph * 2)))}, "head": {"r": (-6, 0, 8 * math.sin(ph))}})

# ---------- Death: fall on back, smoke, dissolve ----------
new_action("Death")
H = HOVER
def DD(fr, d, persist=None):
    dd = {k: dict(v) for k, v in d.items()}
    for k, v in (persist or {}).items():
        dd.setdefault(k, {}).update(v)
    full(fr, dd)
P = {"bag": {"s": (0.01, 0.01, 0.01)}} if VARIANT == "balloon" else {}
DD(1, {})
hit = {"body": {"s": (0.85, 1.25, 0.85)}, "head": {"r": (-25, 0, 0)}, "jaw": {"r": (35, 0, 0)}, "wing.L": {"r": (0, 0, -60)}, "wing.R": {"r": (0, 0, 60)}}
if VARIANT == "balloon": hit["bag"] = {"s": (1.35, 1.3, 1.35)}
DD(3, hit)
DD(5, {"body": {"s": (0.9, 1.15, 0.9)}, "head": {"r": (-30, 0, 0)}, "jaw": {"r": (35, 0, 0)}, "root": {"l": (0, 0.03, 0.06 - H * 0.3)}, "wing.L": {"r": (0, 0, -80)}, "wing.R": {"r": (0, 0, 80)}}, P)
DD(8, {"root": {"r": (-60, 0, 0), "l": (0, 0.05, 0.2 - H * 0.75)}, "body": {"s": (0.9, 1.12, 0.9)}, "head": {"r": (-20, 0, 0)}, "jaw": {"r": (30, 0, 0)}, "leg.L": {"r": (-40, 0, 0)}, "leg.R": {"r": (-50, 0, 0)}, "wing.L": {"r": (0, 0, -70)}, "wing.R": {"r": (0, 0, 70)}}, P)
def lying(z, bs, ll, lr, rs=(1, 1, 1), sm=None):
    d = {"root": {"r": (-90, 0, 0), "l": (0, 0, z - H), "s": rs}, "body": {"s": bs}, "head": {"r": (-10, 0, 0)}, "jaw": {"r": (25, 0, 0)},
         "leg.L": {"r": (ll, 0, 0), "s": (1.3, 1.9, 1.3)}, "leg.R": {"r": (lr, 0, 0), "s": (1.3, 1.9, 1.3)}, "wing.L": {"r": (0, 0, -65)}, "wing.R": {"r": (0, 0, 65)}}
    if sm: d["smoke"] = {"s": sm}
    return d
DD(10, lying(0.32, (1.14, 0.86, 1.14), -80, -95), P)
DD(12, lying(0.44, (0.93, 1.08, 0.93), -65, -105), P)
DD(14, lying(0.32, (1.1, 0.92, 1.1), -100, -70), P)
DD(17, lying(0.32, (1, 1, 1), -70, -100), P)
DD(20, lying(0.32, (1, 1, 1), -90, -80, sm=(0.45, 0.45, 0.45)), P)
DD(24, lying(0.32, (1, 1, 1), -85, -85, rs=(0.5, 0.5, 0.5), sm=(1.1, 1.1, 1.15)), P)
DD(27, lying(0.32, (1, 1, 1), -85, -85, rs=(0.01, 0.01, 0.01), sm=(1.35, 1.35, 1.5)), P)
DD(32, lying(0.32, (1, 1, 1), -85, -85, rs=(0.01, 0.01, 0.01), sm=(0.01, 0.01, 0.01)), P)

if VARIANT == "balloon":
    # Death: the bag pops, the duck drops (local +z is down once flipped), poofs into smoke
    bpy.data.actions.remove(bpy.data.actions["Death"]); new_action("Death")
    full(1, {})
    full(3, {"bag": {"s": (1.4, 1.35, 1.4)}, "body": {"s": (0.85, 1.2, 0.85)}, "jaw": {"r": (35, 0, 0)}, "wing.L": {"r": (0, 0, -60)}, "wing.R": {"r": (0, 0, 60)}})
    full(5, {"bag": {"s": (0.01, 0.01, 0.01)}, "body": {"s": (0.9, 1.15, 0.9)}, "jaw": {"r": (35, 0, 0)}, "root": {"l": (0, 0, 0.25)}, "wing.L": {"r": (0, 0, -80)}, "wing.R": {"r": (0, 0, 80)}})
    full(9, {"bag": {"s": (0.01, 0.01, 0.01)}, "body": {"s": (1.15, 0.85, 1.15)}, "root": {"l": (0, 0, 1.25)}, "wing.L": {"r": (0, 0, -70)}, "wing.R": {"r": (0, 0, 70)}})
    full(12, {"bag": {"s": (0.01, 0.01, 0.01)}, "root": {"l": (0, 0, 1.2)}, "smoke": {"s": (0.6, 0.6, 0.6)}})
    full(16, {"bag": {"s": (0.01, 0.01, 0.01)}, "root": {"l": (0, 0, 1.25), "s": (0.4, 0.4, 0.4)}, "smoke": {"s": (1.2, 1.2, 1.25)}})
    full(20, {"bag": {"s": (0.01, 0.01, 0.01)}, "root": {"l": (0, 0, 1.25), "s": (0.01, 0.01, 0.01)}, "smoke": {"s": (0.01, 0.01, 0.01)}})
    # flip the whole rig head-down and lift it so the bag floats above
    arm.rotation_euler = (0, math.pi, 0); arm.location = (0, 0, 1.75)
    bpy.context.view_layer.update()

# ---------- export GLB ----------
arm.animation_data.action = bpy.data.actions["Idle"]
bpy.ops.object.select_all(action="DESELECT")
arm.select_set(True); duck.select_set(True)
bpy.ops.export_scene.gltf(filepath=f"{OUT}/duck_{VARIANT}_rigged.glb", export_format="GLB",
                          use_selection=True, export_animations=True,
                          export_animation_mode="ACTIONS", export_skins=True)
bpy.ops.wm.save_as_mainfile(filepath=f"{OUT}/duck_{VARIANT}.blend")
print("DONE", len(duck.data.vertices))
