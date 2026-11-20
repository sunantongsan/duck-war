import bpy, math, sys, random
from mathutils import Vector
argv = sys.argv[sys.argv.index("--") + 1:]
STAGE = int(argv[0]); OUTP = argv[1]; RES = int(argv[2]) if len(argv) > 2 else 512
STATE = argv[3] if len(argv) > 3 else "normal"
random.seed(STAGE)
bpy.ops.wm.read_factory_settings(use_empty=True)
scn = bpy.context.scene

def mat(name, rgb, rough=0.6, metal=0):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*rgb, 1); b.inputs["Roughness"].default_value = rough
    if metal: b.inputs["Metallic"].default_value = 1.0
    return m
M = {k: mat(k, *v) for k, v in {
    "grass": ((0.25, 0.5, 0.12), 0.9), "dirt": ((0.45, 0.32, 0.18), 0.9),
    "wood": ((0.42, 0.24, 0.1), 0.7), "wood2": ((0.55, 0.34, 0.15), 0.7), "bamboo": ((0.78, 0.66, 0.32), 0.5),
    "tarp": ((0.08, 0.32, 0.85), 0.45), "rope": ((0.85, 0.78, 0.6), 0.8), "zinc": ((0.62, 0.66, 0.7), 0.35, 1),
    "rust": ((0.55, 0.28, 0.12), 0.7), "tile": ((0.85, 0.32, 0.1), 0.5), "brick": ((0.66, 0.26, 0.14), 0.8),
    "stone": ((0.62, 0.6, 0.58), 0.8), "stone2": ((0.5, 0.48, 0.47), 0.8), "dark": ((0.06, 0.05, 0.05), 0.7),
    "gold": ((1.0, 0.68, 0.12), 0.25, 1), "flag": ((1.0, 0.72, 0.0), 0.6), "beak": ((1.0, 0.25, 0.0), 0.5),
    "red": ((0.75, 0.06, 0.05), 0.5), "blue": ((0.1, 0.4, 0.9), 0.4), "jar": ((0.45, 0.2, 0.08), 0.35),
    "white": ((0.92, 0.9, 0.85), 0.6), "soot": ((0.08, 0.07, 0.06), 0.9), "smoke": ((0.45, 0.45, 0.47), 0.95), "smokeD": ((0.22, 0.21, 0.22), 0.95), "smokeM": ((0.5, 0.5, 0.52), 0.95), "smokeL": ((0.82, 0.82, 0.84), 0.95), "glass": ((0.55, 0.8, 0.95), 0.1), "leaf": ((0.15, 0.5, 0.15), 0.7),
}.items()}
fire = mat("fire", (1.0, 0.45, 0.05), 0.5); fb = fire.node_tree.nodes["Principled BSDF"]
fb.inputs["Emission Color"].default_value = (1.0, 0.5, 0.05, 1); fb.inputs["Emission Strength"].default_value = 9.0; M["fire"] = fire
fire2 = mat("fire2", (1.0, 0.85, 0.2), 0.5); fb = fire2.node_tree.nodes["Principled BSDF"]
fb.inputs["Emission Color"].default_value = (1.0, 0.85, 0.2, 1); fb.inputs["Emission Strength"].default_value = 12.0; M["fire2"] = fire2

def fin(o, m, bevel=0.0, smooth=False, subd=0):
    o.data.materials.append(M[m])
    if bevel:
        md = o.modifiers.new("b", "BEVEL"); md.width = bevel; md.segments = 3
    if subd:
        md = o.modifiers.new("s", "SUBSURF"); md.levels = subd; md.render_levels = subd
    if smooth:
        bpy.context.view_layer.objects.active = o; bpy.ops.object.shade_smooth()
    return o
def box(c, size, m, rot=(0, 0, 0), bevel=0.02):
    bpy.ops.mesh.primitive_cube_add(size=1, location=c); o = bpy.context.active_object
    o.scale = size; o.rotation_euler = [math.radians(a) for a in rot]
    bpy.ops.object.transform_apply(scale=True)
    return fin(o, m, bevel)
def cyl(c, r, h, m, rot=(0, 0, 0), v=20, bevel=0.01):
    bpy.ops.mesh.primitive_cylinder_add(vertices=v, radius=r, depth=h, location=c); o = bpy.context.active_object
    o.rotation_euler = [math.radians(a) for a in rot]
    return fin(o, m, bevel, smooth=v > 8)
def cone(c, r1, r2, h, m, rot=(0, 0, 0), v=20):
    bpy.ops.mesh.primitive_cone_add(vertices=v, radius1=r1, radius2=r2, depth=h, location=c); o = bpy.context.active_object
    o.rotation_euler = [math.radians(a) for a in rot]
    return fin(o, m, 0.01, smooth=v > 8)
def sph(c, s, m):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=12, radius=1, location=c); o = bpy.context.active_object
    o.scale = s; return fin(o, m, 0, smooth=True)
def rod(p1, p2, r, m):
    p1, p2 = Vector(p1), Vector(p2); d = p2 - p1
    bpy.ops.mesh.primitive_cylinder_add(vertices=10, radius=r, depth=d.length, location=(p1 + p2) / 2); o = bpy.context.active_object
    o.rotation_mode = "QUATERNION"; o.rotation_quaternion = d.normalized().to_track_quat("Z", "Y")
    return fin(o, m, 0, smooth=True)
def flag(base, h, m="flag", pole="bamboo"):
    rod(base, (base[0], base[1], base[2] + h), 0.025, pole)
    sph((base[0], base[1], base[2] + h + 0.02), (0.04, 0.04, 0.04), "gold")
    box((base[0] + 0.22, base[1], base[2] + h - 0.15), (0.4, 0.02, 0.26), m, rot=(0, 0, 0), bevel=0.01)
    sph((base[0] + 0.2, base[1] - 0.015, base[2] + h - 0.13), (0.06, 0.01, 0.06), "white")
    box((base[0] + 0.27, base[1] - 0.015, base[2] + h - 0.14), (0.07, 0.01, 0.035), "beak", bevel=0.005)
def prism(x0, x1, y0, y1, z0, h, m):
    import bmesh
    bm = bmesh.new(); ym = (y0 + y1) / 2
    v = [bm.verts.new(p) for p in [(x0, y0, z0), (x0, y1, z0), (x0, ym, z0 + h), (x1, y0, z0), (x1, y1, z0), (x1, ym, z0 + h)]]
    bm.faces.new((v[0], v[1], v[2])); bm.faces.new((v[5], v[4], v[3]))
    bm.faces.new((v[0], v[3], v[4], v[1])); bm.faces.new((v[1], v[4], v[5], v[2])); bm.faces.new((v[2], v[5], v[3], v[0]))
    me = bpy.data.meshes.new("pr"); bm.to_mesh(me); o = bpy.data.objects.new("pr", me); bpy.context.collection.objects.link(o)
    return fin(o, m, 0.0)
def gable(c, w, d, h, m, overhang=0.12, th=0.05, wall="wood2"):
    prism(c[0] - w / 2, c[0] + w / 2, c[1] - d / 2, c[1] + d / 2, c[2], h, wall)
    ang = math.degrees(math.atan2(h, d / 2)); ln = math.hypot(h, d / 2) + overhang
    for s in (1, -1):
        cy = c[1] + s * (d / 4 + overhang / 2 * math.cos(math.radians(ang))); cz = c[2] + h / 2 - overhang / 2 * math.sin(math.radians(ang)) + th / 2
        box((c[0], cy, cz), (w + 2 * overhang, ln, th), m, rot=(-s * ang, 0, 0), bevel=0.01)
    box((c[0], c[1], c[2] + h + 0.01), (w + 2 * overhang, 0.08, 0.06), m, bevel=0.02)

# ground pad (square, 4x4 tiles)
if STATE != "burst":
    if not __import__("os").environ.get("NOPAD"): box((0, 0, -0.05), (2.6, 2.6, 0.1), "grass", bevel=0.05)
    if not __import__("os").environ.get("NOPAD"): box((0, 0, 0.005), (2.2, 2.2, 0.02), "dirt", bevel=0.02)
    else: bpy.ops.mesh.primitive_plane_add(size=8, location=(0, 0, 0)); bpy.context.active_object.is_shadow_catcher = True
else:
    bpy.ops.mesh.primitive_plane_add(size=8, location=(0, 0, 0)); bpy.context.active_object.is_shadow_catcher = True
GROUND = set(o.name for o in bpy.data.objects)

if STATE != "rubble":
  pass
RUB = {1: ["bamboo", "tarp", "wood2", "wood"], 2: ["wood2", "zinc", "wood", "rust"], 3: ["wood2", "tile", "wood", "jar"], 4: ["brick", "brick", "stone"], 5: ["stone", "stone", "red", "stone2"]}[STATE and STAGE]

if STATE in ("rubble", "burst"):
    pass
elif STAGE == 1:   # lean-to (เพิงหมาแหงน) with tarp
    box((0, 0, 0.07), (1.5, 1.3, 0.1), "wood2")
    for x in (-0.6, -0.2, 0.2, 0.6):
        box((x, 0, 0.13), (0.3, 1.3, 0.03), "wood")
    poles = [(-0.7, -0.6, 1.25), (0.7, -0.6, 1.25), (-0.7, 0.6, 0.75), (0.7, 0.6, 0.75)]
    for x, y, h in poles:
        rod((x, y, 0), (x, y, h), 0.04, "bamboo")
    ang = math.degrees(math.atan2(0.5, 1.2))
    box((0, 0.0, 1.03), (1.75, 1.55, 0.03), "tarp", rot=(-ang, 0, 0), bevel=0.01)
    box((0, -0.77, 1.12), (1.75, 0.03, 0.22), "tarp", rot=(8, 0, 0), bevel=0.01)
    for x in (-0.87, 0.87):
        for y, z in ((-0.72, 1.22), (0.72, 0.72)):
            rod((x, y, z), (x * 1.25, y * 1.35, 0.02), 0.008, "rope")
            box((x * 1.25, y * 1.35, 0.04), (0.04, 0.04, 0.08), "wood")
    box((0.45, -0.25, 0.32), (0.32, 0.32, 0.32), "wood2", bevel=0.03)
    cyl((-0.45, -0.3, 0.3), 0.14, 0.28, "blue")
    sph((-0.2, 0.25, 0.25), (0.35, 0.25, 0.1), "red")
    flag((0.75, -0.75, 0), 1.6)

elif STAGE == 2:  # plank shack + zinc gable roof
    box((0, 0, 0.47), (1.5, 1.2, 0.9), "wood2", bevel=0.03)
    for k in range(8):
        box((-0.66 + k * 0.19, -0.605, 0.47), (0.03, 0.02, 0.9), "wood", bevel=0.005)
    box((0.3, -0.61, 0.38), (0.36, 0.04, 0.66), "dark")
    box((0.3, -0.63, 0.38), (0.32, 0.03, 0.62), "wood", bevel=0.01)
    sph((0.42, -0.66, 0.38), (0.025, 0.025, 0.025), "gold")
    box((-0.4, -0.61, 0.58), (0.34, 0.04, 0.3), "glass")
    for s in (1, -1):
        box((-0.4 + s * 0.24, -0.62, 0.58), (0.13, 0.03, 0.34), "red", rot=(0, 0, s * 15))
    gable((0, 0, 0.92), 1.5, 1.2, 0.5, "zinc")
    box((-0.3, -0.25, 1.17), (0.45, 0.35, 0.02), "tarp", rot=(-40, 0, 5))
    cyl((0.45, 0.25, 1.35), 0.08, 0.5, "zinc")
    cyl((0.45, 0.25, 1.62), 0.11, 0.06, "rust")
    box((-0.95, -0.2, 0.25), (0.35, 0.35, 0.5), "wood", bevel=0.03)
    cyl((-0.9, 0.4, 0.22), 0.16, 0.44, "blue")
    flag((0.95, -0.7, 0), 1.9)

elif STAGE == 3:  # Thai stilt house + orange tiles + water jars
    for x in (-0.7, 0, 0.7):
        for y in (-0.55, 0, 0.55):
            rod((x, y, 0), (x, y, 0.55), 0.05, "wood")
    box((0, 0, 0.58), (1.65, 1.35, 0.1), "wood2")
    box((0, 0.05, 1.0), (1.4, 1.05, 0.75), "wood2", bevel=0.03)
    for k in range(7):
        box((-0.6 + k * 0.2, -0.48, 1.0), (0.03, 0.02, 0.75), "wood", bevel=0.005)
    box((0, -0.49, 0.92), (0.34, 0.04, 0.58), "dark")
    for s in (1, -1):
        box((s * 0.48, -0.49, 1.05), (0.26, 0.04, 0.26), "glass")
        box((s * 0.48, -0.5, 1.05), (0.3, 0.03, 0.04), "wood")
    gable((0, 0.05, 1.37), 1.4, 1.05, 0.65, "tile", overhang=0.2)
    for s in (1, -1):
        cone((s * 0.88, 0.05, 2.06), 0.06, 0.0, 0.3, "gold", rot=(0, s * 30, 0))
    for k in range(6):
        box((0, -0.75 - k * 0.11, 0.5 - k * 0.09), (0.45, 0.12, 0.04), "wood")
    for s in (1, -1):
        rod((s * 0.24, -0.72, 0.62), (s * 0.24, -1.3, 0.1), 0.02, "wood")
    for x, y in ((-0.95, -0.7), (0.95, 0.6)):
        sph((x, y, 0.3), (0.22, 0.22, 0.28), "jar"); cyl((x, y, 0.56), 0.12, 0.05, "jar")
    sph((0.95, -0.75, 0.25), (0.18, 0.18, 0.18), "leaf"); cyl((0.95, -0.75, 0.1), 0.12, 0.2, "jar")
    flag((-0.85, -0.85, 0), 2.1)

elif STAGE == 4:  # brick fort + corner tower
    box((0, 0.05, 0.5), (1.7, 1.6, 1.0), "brick", bevel=0.03)
    for i in range(7):
        for (x, y) in [(-0.8 + i * 0.267, -0.75), (-0.8 + i * 0.267, 0.85)]:
            box((x, y, 1.08), (0.16, 0.12, 0.16), "brick", bevel=0.02)
        for (x, y) in [(-0.85, -0.7 + i * 0.25), (0.85, -0.7 + i * 0.25)]:
            box((x, y, 1.08), (0.12, 0.16, 0.16), "brick", bevel=0.02)
    for z in (0.25, 0.55, 0.85):
        box((0, -0.755, z), (1.72, 0.02, 0.025), "stone", bevel=0.005)
    box((0, -0.76, 0.35), (0.5, 0.06, 0.7), "dark")
    cyl((0, -0.76, 0.7), 0.25, 0.06, "dark", rot=(90, 0, 0))
    for k in range(4):
        rod((-0.18 + k * 0.12, -0.8, 0.0), (-0.18 + k * 0.12, -0.8, 0.85), 0.015, "zinc")
    box((0.6, 0.6, 1.0), (0.6, 0.6, 2.0), "brick", bevel=0.03)
    for (dx, dy) in ((-0.22, -0.22), (0.22, -0.22), (-0.22, 0.22), (0.22, 0.22)):
        box((0.6 + dx, 0.6 + dy, 2.08), (0.16, 0.16, 0.16), "brick", bevel=0.02)
    box((0.6, 0.29, 1.4), (0.18, 0.04, 0.3), "dark")
    for s in (1, -1):
        box((s * 0.5, -0.77, 0.6), (0.3, 0.02, 0.5), "red", bevel=0.005)
        sph((s * 0.5, -0.79, 0.65), (0.07, 0.01, 0.07), "flag")
    flag((0.6, 0.6, 2.0), 1.0)
    cyl((-1.0, -0.6, 0.18), 0.15, 0.36, "blue"); box((-1.0, 0.2, 0.2), (0.3, 0.3, 0.4), "wood2", bevel=0.03)

else:  # STAGE 5: small castle
    # outer walls
    for (c, s) in [((0, -0.9, 0.42), (1.8, 0.22, 0.84)), ((0, 0.9, 0.42), (1.8, 0.22, 0.84)), ((-0.9, 0, 0.42), (0.22, 1.8, 0.84)), ((0.9, 0, 0.42), (0.22, 1.8, 0.84))]:
        box(c, s, "stone", bevel=0.03)
    for i in range(7):
        t = -0.66 + i * 0.22
        for (x, y, sx, sy) in [(t, -0.9, 0.13, 0.24), (t, 0.9, 0.13, 0.24), (-0.9, t, 0.24, 0.13), (0.9, t, 0.24, 0.13)]:
            box((x, y, 0.92), (sx, sy, 0.16), "stone", bevel=0.02)
    for z in (0.2, 0.5):
        box((0, -1.012, z), (1.6, 0.01, 0.03), "stone2", bevel=0.0)
    # corner towers with red funnel roofs
    for x in (-0.9, 0.9):
        for y in (-0.9, 0.9):
            cyl((x, y, 0.65), 0.3, 1.3, "stone", v=24)
            cyl((x, y, 1.32), 0.34, 0.08, "stone2", v=24)
            cone((x, y, 1.66), 0.38, 0.03, 0.62, "red", v=24)
            sph((x, y, 2.0), (0.04, 0.04, 0.04), "gold")
            box((x, y - 0.3 if y < 0 else y + 0.3, 0.9), (0.08, 0.04, 0.2), "dark")
    # gate
    box((0, -1.02, 0.36), (0.5, 0.06, 0.72), "dark")
    cyl((0, -1.02, 0.72), 0.25, 0.06, "dark", rot=(90, 0, 0))
    for k in range(4):
        rod((-0.18 + k * 0.12, -1.06, 0.0), (-0.18 + k * 0.12, -1.06, 0.85), 0.015, "gold")
    # keep
    box((0, 0.1, 0.85), (0.95, 0.95, 1.7), "stone", bevel=0.04)
    for z in (0.5, 1.0, 1.5):
        box((0, -0.38, z), (0.97, 0.01, 0.03), "stone2", bevel=0.0)
    for s in (1, -1):
        box((s * 0.24, -0.38, 1.2), (0.16, 0.04, 0.3), "glass")
        cyl((s * 0.24, -0.38, 1.35), 0.08, 0.04, "glass", rot=(90, 0, 0))
        box((s * 0.24, -0.39, 0.7), (0.24, 0.02, 0.45), "flag", bevel=0.005)
    cone((0, 0.1, 2.05), 0.72, 0.03, 0.75, "red", v=4, rot=(0, 0, 45))
    sph((0, 0.1, 2.55), (0.13, 0.13, 0.17), "gold")   # golden egg
    flag((0.35, 0.45, 1.7), 1.1)
    flag((-0.9, 0.9, 2.0), 0.6)


# ---------- damage states ----------
def puff(c, size, m):
    for k in range(7):
        a = random.uniform(0, 6.28); r = size * random.uniform(0.25, 0.6)
        rr = size * random.uniform(0.45, 0.75)
        sph((c.x + r * math.cos(a), c.y + r * math.sin(a), c.z + random.uniform(-0.2, 0.35) * size), (rr, rr, rr * 0.9), m)
    sph((c.x, c.y, c.z + 0.15 * size), (size * 0.7,) * 3, m)
def smoke_col(p, sc=1.0, n=4):
    wind = Vector((0.07, 0.05, 0))
    for k in range(n):
        m = ["smokeD", "smokeM", "smokeM", "smokeL", "smokeL"][min(k, 4)]
        c = Vector((p.x, p.y, p.z)) + Vector((0, 0, 0.22 * sc + k * 0.26 * sc)) + wind * k * sc
        puff(c, (0.11 + 0.05 * k) * sc, m)
def fire_at(p, sc=1.0):
    for k in range(3):
        a = k * 2.1
        cone((p.x + 0.05 * math.cos(a) * sc, p.y + 0.05 * math.sin(a) * sc, p.z + 0.1 * sc), 0.07 * sc, 0.0, 0.26 * sc * random.uniform(0.8, 1.2), "fire", v=8)
    cone((p.x, p.y, p.z + 0.08 * sc), 0.045 * sc, 0.0, 0.16 * sc, "fire2", v=8)
    pass  # smoke_col(p + Vector((0, 0, 0.12 * sc)), sc)
def surface_points(n):
    dg = bpy.context.evaluated_depsgraph_get(); pts = []; tries = 0
    while len(pts) < n and tries < 200:
        tries += 1
        hit, loc, nrm, idx, ob, mx = scn.ray_cast(dg, Vector((random.uniform(-0.7, 0.7), random.uniform(-0.7, 0.7), 6)), Vector((0, 0, -1)))
        if hit and ob.name not in GROUND and loc.z > 0.4 and nrm.z > 0.3:
            if all((loc - q).length > 0.45 for q in pts): pts.append(loc)
    return pts
def debris(n, mats, rad=1.0, zmax=0.06, big=1.0):
    for k in range(n):
        a = random.uniform(0, 2 * math.pi); r = rad * math.sqrt(random.random())
        sz = random.uniform(0.06, 0.16) * big
        box((r * math.cos(a), r * math.sin(a), sz * 0.3 + random.uniform(0, zmax)), (sz, sz * random.uniform(0.5, 1.2), sz * random.uniform(0.3, 0.8)),
            random.choice(mats), rot=(random.uniform(-30, 30), random.uniform(-30, 30), random.uniform(0, 90)), bevel=0.01)

if STATE == "damaged":
    bld = [o for o in bpy.data.objects if o.type == "MESH" and o.name not in GROUND]
    bpy.context.view_layer.update()
    def ctr(o):
        return sum((o.matrix_world @ Vector(c) for c in o.bound_box), Vector()) / 8
    for o in bld:
        c = ctr(o)
        if c.x - 0.35 * c.y > 0.05:      # front-right half caves in
            o.location.z = o.location.z * random.uniform(0.25, 0.45) - 0.02
            o.location.x += random.uniform(0.0, 0.15)
            o.rotation_euler.x += math.radians(random.uniform(-35, 35)); o.rotation_euler.y += math.radians(random.uniform(-35, 35))
            o.scale.z *= random.uniform(0.6, 0.9)
        else:
            o.rotation_euler.x += math.radians(random.uniform(-3, 3)); o.rotation_euler.y += math.radians(random.uniform(-3, 3))
    bpy.context.view_layer.update()
    # rubble heap on collapsed side
    for k in range(34):
        a = random.uniform(-1.2, 0.9); r = random.uniform(0.15, 0.95); sz = random.uniform(0.08, 0.2)
        box((abs(r * math.cos(a)) + 0.05, r * math.sin(a) * 0.9, random.uniform(0.02, 0.3)), (sz, sz * random.uniform(0.5, 1.2), sz * random.uniform(0.3, 0.7)),
            random.choice(RUB), rot=(random.uniform(-35, 35), random.uniform(-35, 35), random.uniform(0, 90)), bevel=0.012)
    sph((0.5, -0.05, 0.0), (0.6, 0.85, 0.12), "soot")
    pts = surface_points(1)
    for p in pts:
        sph((p.x, p.y, p.z), (0.2, 0.2, 0.03), "soot"); fire_at(p, 1.0)
    fire_at(Vector((0.55, -0.1, 0.3)), 1.1)
    debris(12, RUB, rad=1.05)
elif STATE == "rubble":
    sph((0, 0, 0.0), (0.95, 0.95, 0.22), "soot")
    for layer, (rad, z, n, big) in enumerate([(0.85, 0.08, 26, 1.6), (0.6, 0.2, 18, 1.5), (0.35, 0.32, 10, 1.4)]):
        for k in range(n):
            a = random.uniform(0, 2 * math.pi); r = rad * math.sqrt(random.random()); sz = random.uniform(0.08, 0.16) * big
            box((r * math.cos(a), r * math.sin(a), z + random.uniform(0, 0.05)), (sz, sz * random.uniform(0.5, 1.2), sz * random.uniform(0.3, 0.7)),
                random.choice(RUB), rot=(random.uniform(-35, 35), random.uniform(-35, 35), random.uniform(0, 90)), bevel=0.012)
    debris(10, RUB, rad=1.1)
    if STAGE in (1, 2, 3):
        for k in range(3):
            a = random.uniform(0, 6.28)
            rod((0.6 * math.cos(a), 0.6 * math.sin(a), 0), (0.6 * math.cos(a) + 0.2, 0.6 * math.sin(a), random.uniform(0.25, 0.45)), 0.04, "wood")
    else:
        box((-0.55, -0.5, 0.2), (0.5, 0.18, 0.4), RUB[0], rot=(0, 0, 10), bevel=0.02)
        box((0.6, 0.55, 0.3), (0.2, 0.45, 0.6), RUB[0], rot=(0, 0, -5), bevel=0.02)
    rod((0.7, -0.8, 0.02), (1.15, -0.35, 0.1), 0.025, "bamboo")
    box((1.1, -0.2, 0.09), (0.35, 0.02, 0.22), "flag", rot=(80, 0, 40), bevel=0.01)
    for p in [Vector((0.15, 0.1, 0.35)), Vector((-0.35, -0.2, 0.25))]:
        pass  # no baked smoke; the game animates smoke


if STATE == "burst":
    HT = {1: 1.0, 2: 1.2, 3: 1.6, 4: 1.5, 5: 1.8}[STAGE]
    FR = 18; g = -9.0; dt = 1 / 24
    pieces = []
    for k in range(16):
        sz = random.uniform(0.07, 0.15)
        o = box((0, 0, 0), (sz, sz * random.uniform(0.5, 1.3), sz * random.uniform(0.3, 0.7)), random.choice(RUB), bevel=0.01)
        a = random.uniform(0, 2 * math.pi)
        p = Vector((0.45 * math.cos(a), 0.45 * math.sin(a), random.uniform(0.4, 0.85) * HT))
        v = Vector((math.cos(a), math.sin(a), 0)) * random.uniform(1.0, 2.2) + Vector((0, 0, random.uniform(1.8, 3.4)))
        w = Vector([random.uniform(-14, 14) for _ in range(3)])
        rot = Vector((0, 0, 0))
        for f in range(1, FR + 1):
            o.location = p; o.rotation_euler = rot
            sc = 1.0 if f < FR - 4 else max(0.01, (FR - f) / 4)
            o.scale = (sc, sc, sc)
            o.keyframe_insert("location", frame=f); o.keyframe_insert("rotation_euler", frame=f); o.keyframe_insert("scale", frame=f)
            v.z += g * dt; p = p + v * dt; rot = rot + w * dt
            if p.z < sz * 0.3:
                p.z = sz * 0.3; v.z = -v.z * 0.45; v.x *= 0.6; v.y *= 0.6; w *= 0.5
    # dust puffs at base
    for k in range(4):
        a = k * math.pi / 2 + 0.4
        c = Vector((0.75 * math.cos(a), 0.75 * math.sin(a), 0.12))
        bpy.ops.object.empty_add(location=c); e = bpy.context.active_object
        objs = []
        for j in range(5):
            rr = random.uniform(0.08, 0.14)
            ob = sph((c.x + random.uniform(-0.1, 0.1), c.y + random.uniform(-0.1, 0.1), c.z + random.uniform(-0.03, 0.08)), (rr, rr, rr * 0.8), "smokeL")
            ob.parent = e; ob.matrix_parent_inverse = e.matrix_world.inverted()
        for f, sc in ((1, 0.01), (3, 0.9), (8, 1.3), (13, 1.1), (16, 0.01)):
            e.scale = (sc, sc, sc); e.keyframe_insert("scale", frame=f)

# lights + camera (game angle ~48 deg, iso yaw 35)
world = bpy.data.worlds.new("W"); scn.world = world; world.use_nodes = True
world.node_tree.nodes["Background"].inputs[0].default_value = (0.75, 0.82, 0.95, 1); world.node_tree.nodes["Background"].inputs[1].default_value = 0.8
def light(kind, loc, e, rot, size=1):
    d = bpy.data.lights.new(kind, kind); d.energy = e
    if kind == "AREA": d.size = size
    o = bpy.data.objects.new(kind, d); scn.collection.objects.link(o); o.location = loc; o.rotation_euler = rot
light("SUN", (2, -3, 5), 3.2, (math.radians(40), math.radians(15), math.radians(30)))
light("AREA", (-3, -2, 3), 150, (math.radians(60), 0, math.radians(-50)), 4)
cd = bpy.data.cameras.new("C"); cam = bpy.data.objects.new("C", cd); scn.collection.objects.link(cam); scn.camera = cam
cd.type = "ORTHO"; cd.ortho_scale = 3.9
tgt = Vector((0, 0, 0.75)); ang = math.radians(48.6); yaw = math.radians(float(__import__("os").environ.get("YAW", "35"))); d = 8
cam.location = tgt + Vector((d * math.cos(ang) * math.sin(yaw), -d * math.cos(ang) * math.cos(yaw), d * math.sin(ang)))
cam.rotation_euler = (tgt - cam.location).to_track_quat("-Z", "Y").to_euler()
scn.render.engine = "CYCLES"; scn.cycles.device = "CPU"; scn.cycles.samples = 24; scn.cycles.use_denoising = True
scn.render.resolution_x = scn.render.resolution_y = RES; scn.render.film_transparent = True
scn.view_settings.view_transform = "Standard"; scn.view_settings.exposure = -0.3
if STATE == "burst":
    scn.frame_start = 1; scn.frame_end = 18; scn.cycles.samples = 14
    scn.render.filepath = OUTP; bpy.ops.render.render(animation=True)
else:
    import os as _o2, json as _j2
    if _o2.environ.get("META"):
        bpy.context.view_layer.update()
        from bpy_extras.object_utils import world_to_camera_view as _w2
        _p = _w2(scn, cam, Vector((0, 0, 0))); _j2.dump({"ox": _p.x, "oy": 1 - _p.y, "ppu_frac": 1 / cd.ortho_scale, "pad": 2.6}, open(OUTP + "_meta.json", "w"))
    scn.render.filepath = OUTP; bpy.ops.render.render(write_still=True)
bpy.ops.wm.save_as_mainfile(filepath=f"/home/claude/duck/hq_stage{STAGE}_{STATE}.blend")
print("RENDERED")
