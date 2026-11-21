import bpy, math, sys, random, os
from mathutils import Vector
argv = sys.argv[sys.argv.index("--") + 1:]
DEF = argv[0]; STAGE = int(argv[1]); OUT = argv[2]; RES = int(argv[3]) if len(argv) > 3 else 384
DIRS = int(argv[4]) if len(argv) > 4 else 16
STATE = argv[5] if len(argv) > 5 else ""
random.seed(STAGE * 7 + len(DEF))
bpy.ops.wm.read_factory_settings(use_empty=True)
scn = bpy.context.scene
os.makedirs(OUT, exist_ok=True)

def mat(name, rgb, rough=0.6, metal=0, emit=0):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*rgb, 1); b.inputs["Roughness"].default_value = rough
    if metal: b.inputs["Metallic"].default_value = 1.0
    if emit:
        b.inputs["Emission Color"].default_value = (*rgb, 1); b.inputs["Emission Strength"].default_value = emit
    return m
M = {k: mat(k, *v) for k, v in {
    "grass": ((0.25, 0.5, 0.12), 0.9), "dirt": ((0.45, 0.32, 0.18), 0.9),
    "wood": ((0.42, 0.24, 0.1), 0.7), "wood2": ((0.55, 0.34, 0.15), 0.7), "bark": ((0.32, 0.18, 0.08), 0.8),
    "brick": ((0.66, 0.26, 0.14), 0.8), "stone": ((0.62, 0.6, 0.58), 0.8), "stone2": ((0.5, 0.48, 0.47), 0.8),
    "gold": ((1.0, 0.68, 0.12), 0.25, 1), "iron": ((0.15, 0.15, 0.17), 0.4, 1), "steel": ((0.75, 0.77, 0.8), 0.3, 1),
    "sand": ((0.72, 0.62, 0.4), 0.9), "rope": ((0.85, 0.78, 0.6), 0.8), "rubber": ((0.85, 0.2, 0.08), 0.5),
    "leather": ((0.3, 0.15, 0.06), 0.6), "rock": ((0.45, 0.43, 0.42), 0.9), "flag": ((1.0, 0.72, 0.0), 0.6),
    "jug": ((0.25, 0.6, 0.95), 0.15), "water": ((0.4, 0.75, 1.0), 0.05), "toyO": ((1.0, 0.45, 0.05), 0.35),
    "toyG": ((0.2, 0.75, 0.25), 0.35), "toyY": ((1.0, 0.85, 0.1), 0.35), "toyP": ((0.6, 0.2, 0.85), 0.35), "red": ((0.75, 0.06, 0.05), 0.5),
    "white": ((0.95, 0.95, 0.95), 0.15), "black": ((0.02, 0.02, 0.02), 0.2), "duck": ((1.0, 0.62, 0.0), 0.55),
    "soot": ((0.08, 0.07, 0.06), 0.9), "smokeD": ((0.22, 0.21, 0.22), 0.95), "smokeM": ((0.5, 0.5, 0.52), 0.95), "smokeL": ((0.82, 0.82, 0.84), 0.95),
    "fire": ((1.0, 0.45, 0.05), 0.5, 0, 9), "fire2": ((1.0, 0.85, 0.2), 0.5, 0, 12),
    "card": ((0.72, 0.52, 0.28), 0.85),
    "honey": ((1.0, 0.62, 0.02), 0.08), "veg": ((0.3, 0.85, 0.15), 0.1), "syrup": ((0.85, 0.03, 0.08), 0.08), "jarglass": ((0.95, 0.97, 1.0), 0.03),
    "canvas": ((0.78, 0.7, 0.5), 0.8), "canvas2": ((0.45, 0.52, 0.3), 0.8), "hay": ((0.92, 0.78, 0.35), 0.9), "roofred": ((0.72, 0.1, 0.07), 0.6),
    "copper": ((0.9, 0.48, 0.25), 0.3, 1), "foliage": ((0.18, 0.52, 0.16), 0.8), "foliage2": ((0.32, 0.68, 0.2), 0.8), "clay": ((0.72, 0.36, 0.2), 0.8),
    "ember": ((1.0, 0.3, 0.05), 0.5, 0, 6), "ropeP": ((1.0, 0.35, 0.6), 0.6), "ropeG": ((0.25, 0.8, 0.45), 0.6), "zinc": ((0.62, 0.66, 0.7), 0.35, 1),
    "rust": ((0.55, 0.26, 0.1), 0.85), "bamboo": ((0.82, 0.7, 0.35), 0.5), "tile": ((0.85, 0.32, 0.1), 0.5), "cream": ((0.97, 0.94, 0.86), 0.5), "teal": ((0.1, 0.55, 0.6), 0.5), "card2": ((0.62, 0.44, 0.22), 0.85), "tape": ((0.88, 0.78, 0.55), 0.25),
    "glass": ((0.75, 0.92, 1.0), 0.03), "blue": ((0.1, 0.4, 0.9), 0.4), "zap": ((0.3, 0.7, 1.0), 0.3, 0, 10), "chili": ((0.85, 0.05, 0.02), 0.3), "chiliG": ((1.0, 0.1, 0.02), 0.3, 0, 4),
    "meat": ((0.45, 0.25, 0.15), 0.6), "cheese": ((1.0, 0.8, 0.15), 0.5), "banana": ((1.0, 0.85, 0.15), 0.5), "bananaB": ((0.35, 0.25, 0.05), 0.6), "balloon": ((0.2, 0.55, 1.0), 0.2),
    "beak": ((1.0, 0.22, 0.0), 0.35), "dark": ((0.06, 0.06, 0.07), 0.35, 1), "lava": ((1.0, 0.35, 0.02), 0.5, 0, 8), "gunmetal": ((0.22, 0.23, 0.26), 0.3, 1), "jug2": ((0.08, 0.25, 0.6), 0.15), "redrub": ((0.6, 0.02, 0.02), 0.45), "brow": ((0.12, 0.05, 0.02), 0.6), "iris": ((0.08, 0.38, 0.85), 0.2), "army": ((0.07, 0.13, 0.05), 0.55),
}.items()}

_jb = M["jarglass"].node_tree.nodes["Principled BSDF"]; _jb.inputs["Transmission Weight"].default_value = 1.0; _jb.inputs["IOR"].default_value = 1.4
BASE, HEAD = [], []
CUR = BASE
def fin(o, m, bevel=0.0, smooth=False):
    o.data.materials.append(M[m])
    if bevel:
        md = o.modifiers.new("b", "BEVEL"); md.width = bevel; md.segments = 3
    if smooth:
        bpy.context.view_layer.objects.active = o; bpy.ops.object.shade_smooth()
    CUR.append(o); return o
def box(c, size, m, rot=(0, 0, 0), bevel=0.02):
    bpy.ops.mesh.primitive_cube_add(size=1, location=c); o = bpy.context.active_object
    o.scale = size; o.rotation_euler = [math.radians(a) for a in rot]; bpy.ops.object.transform_apply(scale=True)
    return fin(o, m, bevel)
def cyl(c, r, h, m, rot=(0, 0, 0), v=20, bevel=0.01):
    bpy.ops.mesh.primitive_cylinder_add(vertices=v, radius=r, depth=h, location=c); o = bpy.context.active_object
    o.rotation_euler = [math.radians(a) for a in rot]; return fin(o, m, bevel, smooth=v > 8)
def sph(c, s, m, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=12, radius=1, location=c); o = bpy.context.active_object
    o.scale = s; o.rotation_euler = [math.radians(a) for a in rot]; return fin(o, m, 0, smooth=True)
def rod(p1, p2, r, m, r2=None):
    p1, p2 = Vector(p1), Vector(p2); d = p2 - p1
    if r2 is None:
        bpy.ops.mesh.primitive_cylinder_add(vertices=14, radius=r, depth=d.length, location=(p1 + p2) / 2)
    else:
        bpy.ops.mesh.primitive_cone_add(vertices=14, radius1=r, radius2=r2, depth=d.length, location=(p1 + p2) / 2)
    o = bpy.context.active_object; o.rotation_mode = "QUATERNION"; o.rotation_quaternion = d.normalized().to_track_quat("Z", "Y")
    return fin(o, m, 0, smooth=True)
def tor(c, R, r, m, rot=(0, 0, 0), sc=(1, 1, 1)):
    bpy.ops.mesh.primitive_torus_add(major_radius=R, minor_radius=r, location=c); o = bpy.context.active_object
    o.rotation_euler = [math.radians(a) for a in rot]; o.scale = sc; return fin(o, m, 0, smooth=True)
def qdisc(c, r, th, n, m):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=28, ring_count=14, radius=1, location=c); o = bpy.context.active_object
    o.scale = (r, r, th); o.rotation_mode = "QUATERNION"; o.rotation_quaternion = Vector(n).normalized().to_track_quat("Z", "Y")
    return fin(o, m, 0, smooth=True)
def qtor(c, R, r, n, m):
    bpy.ops.mesh.primitive_torus_add(major_radius=R, minor_radius=r, location=c); o = bpy.context.active_object
    o.rotation_mode = "QUATERNION"; o.rotation_quaternion = Vector(n).normalized().to_track_quat("Z", "Y")
    return fin(o, m, 0, smooth=True)
def fort_base(S, w=0.75):
    HB = [0.35, 0.45, 0.55, 0.6, 0.7][S - 1]
    if S == 1:
        box((0, 0, 0.17), (w * 0.95, w * 0.95, 0.34), "wood2", bevel=0.03)
        for k in range(3): box((0, -w * 0.48, 0.06 + k * 0.11), (w * 0.97, 0.02, 0.03), "wood", bevel=0.005)
    elif S == 2:
        box((0, 0, 0.22), (w, w, 0.44), "wood2", bevel=0.03)
        for a in range(8):
            ang = a * math.pi / 4; sph((0.55 * math.cos(ang), 0.55 * math.sin(ang), 0.1), (0.16, 0.1, 0.09), "sand")
    elif S == 3:
        box((0, 0, 0.27), (w * 1.13, w * 1.13, 0.54), "brick", bevel=0.03)
        for z in (0.12, 0.3, 0.46): box((0, -w * 0.57, z), (w * 1.15, 0.01, 0.02), "stone", bevel=0)
    elif S == 4:
        box((0, 0, 0.3), (w * 1.2, w * 1.2, 0.6), "stone2", bevel=0.04)
        box((0, 0, 0.58), (w * 1.28, w * 1.28, 0.06), "dark", bevel=0.02)
        for sx in (1, -1):
            for sy in (1, -1): spike((w * 0.62 * sx, w * 0.62 * sy, 0.55), (sx, sy, 0.8), 0.22, 0.04)
    else:
        cyl((0, 0, 0.35), 0.58, 0.7, "stone2", v=8)
        cyl((0, 0, 0.7), 0.62, 0.06, "gold", v=8)
        spike_ring((0, 0), 0.6, 8, 0.24, 0.045, 0.32)
        for k in range(8):
            a3 = k * math.pi / 4 + math.pi / 8; box((0.585 * math.cos(a3), 0.585 * math.sin(a3), 0.4), (0.04, 0.16, 0.55), "red", rot=(0, 0, math.degrees(a3)), bevel=0.005)
        flag((-0.62, 0.62, 0.0), 1.6)
    return HB
def prism(x0, x1, y0, y1, z0, h, m):
    import bmesh
    bm = bmesh.new(); ym = (y0 + y1) / 2
    v = [bm.verts.new(p) for p in [(x0, y0, z0), (x0, y1, z0), (x0, ym, z0 + h), (x1, y0, z0), (x1, y1, z0), (x1, ym, z0 + h)]]
    bm.faces.new((v[0], v[1], v[2])); bm.faces.new((v[5], v[4], v[3]))
    bm.faces.new((v[0], v[3], v[4], v[1])); bm.faces.new((v[1], v[4], v[5], v[2])); bm.faces.new((v[2], v[5], v[3], v[0]))
    me = bpy.data.meshes.new("pr"); bm.to_mesh(me); o = bpy.data.objects.new("pr", me); bpy.context.collection.objects.link(o)
    return fin(o, m, 0.0)
def gable(c, w, d, h, m, overhang=0.1, th=0.05, wall="wood2"):
    prism(c[0] - w / 2, c[0] + w / 2, c[1] - d / 2, c[1] + d / 2, c[2], h, wall)
    ang = math.degrees(math.atan2(h, d / 2)); ln = math.hypot(h, d / 2) + overhang
    for s_ in (1, -1):
        cy = c[1] + s_ * (d / 4 + overhang / 2 * math.cos(math.radians(ang))); cz = c[2] + h / 2 - overhang / 2 * math.sin(math.radians(ang)) + th / 2
        box((c[0], cy, cz), (w + 2 * overhang, ln, th), m, rot=(-s_ * ang, 0, 0), bevel=0.01)
    box((c[0], c[1], c[2] + h + 0.01), (w + 2 * overhang, 0.07, 0.05), m, bevel=0.02)
def tent(c, w, d, h, m, rotz=0):
    bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=1, radius2=0, depth=h, location=(c[0], c[1], c[2] + h / 2))
    o = bpy.context.active_object; o.scale = (w * 0.71, d * 0.71, 1); o.rotation_euler = (0, 0, math.radians(45 + rotz)); bpy.ops.object.transform_apply(scale=True)
    return fin(o, m, 0.01)
def jar(c, r, h, liquid, fill, lid="steel"):
    c = Vector(c)
    cyl(tuple(c + Vector((0, 0, h * fill / 2))), r * 0.93, h * fill, liquid, v=32)
    cyl(tuple(c + Vector((0, 0, h / 2))), r, h, "jarglass", v=32, bevel=0.03)
    sph(tuple(c + Vector((0, 0, h))), (r, r, r * 0.35), "jarglass")
    cyl(tuple(c + Vector((0, 0, h + r * 0.3))), r * 0.55, r * 0.22, lid, v=32, bevel=0.01)
    for k in range(3): tor(tuple(c + Vector((0, 0, h + r * 0.24 + k * 0.035))), r * 0.56, 0.008, lid)
def spike(p, d, ln, r, m="steel"):
    p = Vector(p); return rod(p, p + Vector(d).normalized() * ln, r, m, r2=0.002)
def spike_ring(c, R, n, ln, r, z, m="steel", out=True):
    for k in range(n):
        a = 2 * math.pi * k / n
        spike((c[0] + R * math.cos(a), c[1] + R * math.sin(a), z), (math.cos(a), math.sin(a), 0.6 if out else 1.5), ln, r, m)
def flag(base, h):
    rod(base, (base[0], base[1], base[2] + h), 0.02, "wood")
    box((base[0] + 0.16, base[1], base[2] + h - 0.1), (0.3, 0.02, 0.19), "flag", bevel=0.01)
    sph((base[0] + 0.15, base[1] - 0.015, base[2] + h - 0.09), (0.045, 0.01, 0.045), "white")
def mini_duck(c, s=1.0, helmet=True, hat=None):
    c = Vector(c)
    sph(c + Vector((0, 0, 0.16)) * s, (0.15 * s, 0.16 * s, 0.15 * s), "duck")
    sph(c + Vector((0, -0.03, 0.36)) * s, (0.13 * s,) * 3, "duck")
    sph(c + Vector((0, -0.17, 0.33)) * s, (0.08 * s, 0.08 * s, 0.025 * s), "beak")
    sph(c + Vector((0, -0.15, 0.3)) * s, (0.06 * s, 0.06 * s, 0.02 * s), "beak", rot=(20, 0, 0))
    for sx in (1, -1):
        sph(c + Vector((0.05 * sx, -0.12, 0.4)) * s, (0.04 * s, 0.03 * s, 0.05 * s), "white")
        sph(c + Vector((0.05 * sx, -0.145, 0.395)) * s, (0.022 * s, 0.012 * s, 0.026 * s), "black")
        box(c + Vector((0.05 * sx, -0.13, 0.46)) * s, (0.06 * s, 0.015 * s, 0.015 * s), "brow", rot=(0, -28 * sx, 0), bevel=0.004)
        sph(c + Vector((0.15 * sx, 0.0, 0.17)) * s, (0.04 * s, 0.09 * s, 0.07 * s), "duck")
        sph(c + Vector((0.06 * sx, -0.06, 0.01)) * s, (0.05 * s, 0.07 * s, 0.015 * s), "beak")
    if hat == "chef":
        cyl(tuple(c + Vector((0, -0.03, 0.52)) * s), 0.1 * s, 0.14 * s, "white")
        for dx in (-0.06, 0, 0.06): sph(c + Vector((dx, -0.03, 0.62)) * s, (0.08 * s,) * 3, "white")
    elif helmet:
        sph(c + Vector((0, -0.03, 0.46)) * s, (0.14 * s, 0.14 * s, 0.09 * s), "army")

# ground pad 3x3 tiles
PAD = {"camp": 2.6, "builder": 1.3, "wall": 0.0}.get(DEF, 1.9)
import os as _os
if _os.environ.get("NOPAD"):
    # invisible ground that only receives shadows: real contact shadows, transparent everywhere else
    bpy.ops.mesh.primitive_plane_add(size=12, location=(0, 0, 0)); bpy.context.active_object.is_shadow_catcher = True
elif DEF.startswith("trap"):
    box((0, 0, -0.03), (0.7, 0.7, 0.06), "grass", bevel=0.03)
elif DEF == "wall":
    pass
elif PAD != 1.9:
    box((0, 0, -0.05), (PAD, PAD, 0.1), "grass", bevel=0.05)
    box((0, 0, 0.005), (PAD - 0.3, PAD - 0.3, 0.02), "dirt", bevel=0.02)
else:
    box((0, 0, -0.05), (1.9, 1.9, 0.1), "grass", bevel=0.05)
    box((0, 0, 0.005), (1.6, 1.6, 0.02), "dirt", bevel=0.02)
GROUND = list(BASE); BASE.clear()

S = STAGE
if DEF == "aa":   # multi-barrel water gun AA
    HB = [0.35, 0.45, 0.55, 0.6, 0.7][S - 1]
    if S == 1:
        box((0, 0, 0.17), (0.7, 0.7, 0.34), "wood2", bevel=0.03)
        for k in range(3): box((0, -0.36, 0.06 + k * 0.11), (0.72, 0.02, 0.03), "wood", bevel=0.005)
    elif S == 2:
        box((0, 0, 0.22), (0.75, 0.75, 0.44), "wood2", bevel=0.03)
        for a in range(8):
            ang = a * math.pi / 4; sph((0.55 * math.cos(ang), 0.55 * math.sin(ang), 0.1), (0.16, 0.1, 0.09), "sand")
    elif S == 3:
        box((0, 0, 0.27), (0.85, 0.85, 0.54), "brick", bevel=0.03)
        for z in (0.12, 0.3, 0.46): box((0, -0.43, z), (0.86, 0.01, 0.02), "stone", bevel=0)
    elif S == 4:
        box((0, 0, 0.3), (0.9, 0.9, 0.6), "stone", bevel=0.04)
        box((0, 0, 0.58), (0.96, 0.96, 0.06), "gold", bevel=0.02)
        for sx in (1, -1):
            for sy in (1, -1): box((0.4 * sx, 0.4 * sy, 0.68), (0.12, 0.12, 0.16), "stone", bevel=0.02)
    else:
        cyl((0, 0, 0.35), 0.55, 0.7, "stone2", v=8)
        spike_ring((0, 0), 0.58, 8, 0.22, 0.04, 0.3)
        cyl((0, 0, 0.7), 0.6, 0.06, "gold", v=8)
        for k in range(8):
            a = k * math.pi / 4 + math.pi / 8; box((0.55 * math.cos(a), 0.55 * math.sin(a), 0.8), (0.13, 0.13, 0.16), "stone", rot=(0, 0, math.degrees(a)), bevel=0.02)
        flag((-0.6, 0.6, 0.0), 1.5)
    # turntable ring (base)
    cyl((0, 0, HB + 0.03), 0.3, 0.06, "iron")
    CUR = HEAD
    cyl((0, 0, HB + 0.1), 0.26 + 0.02 * S, 0.1, ["toyO", "toyG", "gunmetal", "dark", "dark"][S - 1])
    if S >= 4: spike_ring((0, 0), 0.3 + 0.02 * S, 8 if S == 4 else 12, 0.14, 0.03, HB + 0.1, "steel" if S == 4 else "gold")
    # big water jug tank
    jr = 0.17 + 0.02 * S
    sph((0, 0.12, HB + 0.32), (jr, jr, jr * 1.15), "jug" if S < 4 else "jug2")
    if S >= 3:
        for z in (-0.06, 0.08): tor((0, 0.12, HB + 0.32 + z), jr * 0.98, 0.014, "iron" if S < 5 else "gold")
    cyl((0, 0.12, HB + 0.32 + jr * 1.1), 0.06, 0.08, "toyY")
    # barrels angled up 40 deg toward -Y
    nb = [1, 2, 3, 4, 6][S - 1]
    up = math.radians(40)
    d = Vector((0, -math.cos(up), math.sin(up)))
    bl = 0.5 + 0.04 * S
    for i in range(nb):
        if nb == 6:
            a = i * math.pi / 3; off = Vector((0.09 * math.cos(a), 0.09 * math.sin(a) * math.sin(up), 0.09 * math.sin(a) * math.cos(up)))
        else:
            off = Vector(((i - (nb - 1) / 2) * 0.12, 0, 0))
        p0 = Vector((0, -0.08, HB + 0.25)) + off
        rod(p0, p0 + d * bl, 0.04 + 0.006 * S, ["toyO", "toyG", "gunmetal", "dark", "dark"][S - 1])
        rod(p0 + d * bl, p0 + d * (bl + 0.08), 0.055 + 0.005 * S, ["toyY", "toyY", "redrub", "redrub", "gold"][S - 1], r2=0.035)
        if S >= 3: tor(tuple(p0 + d * (bl * 0.5)), 0.05 + 0.006 * S, 0.012, "iron" if S < 5 else "gold", rot=(90 - 40, 0, 0))
        cyl(tuple(p0 + d * (bl + 0.09)), 0.02, 0.01, "black", rot=(-50, 0, 0))
    sph((0, -0.05, HB + 0.25), (0.13 + 0.01 * S,) * 3, ["toyY", "toyY", "gunmetal", "dark", "dark"][S - 1])
    if S >= 4:   # armor shield plate with spikes
        box((0, -0.2, HB + 0.18), (0.42 + 0.05 * S, 0.04, 0.2), "dark", rot=(-20, 0, 0), bevel=0.02)
        for xx in (-0.15, 0, 0.15): spike((xx, -0.24, HB + 0.2), (0, -1, 0.3), 0.12, 0.025, "steel" if S == 4 else "gold")
    # pump handle + hose
    rod((0.18, 0.1, HB + 0.25), (0.25, 0.25, HB + 0.55), 0.025, "iron")
    box((0.25, 0.25, HB + 0.57), (0.12, 0.05, 0.05), "toyO", bevel=0.01)
    rod((0, 0.0, HB + 0.3), (0, -0.05, HB + 0.25), 0.03, "jug")
    PIV = Vector((0, 0, HB))

elif DEF == "sling":  # giant slingshot + duck operator (ground)
    HB = [0.25, 0.3, 0.4, 0.45, 0.55][S - 1]
    if S == 1:
        cyl((0, 0, 0.12), 0.45, 0.24, "bark", v=16)
        cyl((0, 0, 0.245), 0.43, 0.01, "wood2", v=16)
    elif S == 2:
        box((0, 0, 0.15), (0.8, 0.8, 0.3), "wood2", bevel=0.03)
        for k in range(4): box((-0.3 + k * 0.2, 0, 0.305), (0.18, 0.8, 0.02), "wood", bevel=0.005)
    elif S == 3:
        box((0, 0, 0.2), (0.85, 0.85, 0.4), "stone", bevel=0.04)
    elif S == 4:
        box((0, 0, 0.22), (0.9, 0.9, 0.45), "brick", bevel=0.04)
        box((0, 0, 0.44), (0.94, 0.94, 0.05), "iron", bevel=0.02)
        for sx in (1, -1):
            for sy in (1, -1): spike((0.45 * sx, 0.45 * sy, 0.45), (sx, sy, 0.8), 0.22, 0.04)
    else:
        cyl((0, 0, 0.27), 0.58, 0.55, "stone2", v=8)
        cyl((0, 0, 0.55), 0.62, 0.05, "gold", v=8)
        spike_ring((0, 0), 0.6, 8, 0.25, 0.045, 0.45)
        for k in range(8):
            a3 = k * math.pi / 4 + math.pi / 8; box((0.585 * math.cos(a3), 0.585 * math.sin(a3), 0.3), (0.04, 0.16, 0.5), "red", rot=(0, 0, math.degrees(a3)), bevel=0.005)
        flag((0.6, 0.6, 0.0), 1.5)
    # ammo pile (base)
    for k in range(6):
        sph((0.5 + 0.08 * (k % 3), 0.5 - 0.08 * (k // 3), HB * 0.3 + 0.07 + 0.06 * (k // 3)), (0.07,) * 3, "rock")
    cyl((0, 0, HB + 0.02), 0.3, 0.04, "iron")
    CUR = HEAD
    fr = ["bark", "wood2", "wood", "dark", "dark"][S - 1]
    sc = [0.8, 0.95, 1.1, 1.25, 1.4][S - 1]
    nt = [2, 2, 3, 4, 5][S - 1]
    base = Vector((0, -0.15, HB))
    C = base + Vector((0, 0, 0.42 * sc))
    rod(base, C, (0.05 + 0.012 * S) * sc, fr)
    tips = []
    for i in range(nt):
        t = (i / (nt - 1)) * 2 - 1
        T = C + Vector(((0.34 if nt < 4 else 0.42) * sc * t, -0.05, (0.42 - 0.06 * abs(t) * (nt > 3)) * sc + (0.08 * sc if nt % 2 == 1 and i == nt // 2 else 0)))
        rod(C, T, (0.045 + 0.01 * S) * sc, fr, r2=(0.032 + 0.008 * S) * sc)
        tips.append(T)
    sph(tuple(C), ((0.07 + 0.01 * S) * sc,) * 3, fr)
    for T in tips:
        if S >= 2: tor(tuple(T - Vector((0, 0, 0.1 * sc))), 0.045 * sc, 0.014, "rope" if S < 4 else "gold")
        if S >= 4:
            spike(T, (0, 0, 1), 0.16 * sc, 0.03 * sc, "steel" if S == 4 else "gold")
            spike(T, (T.x - C.x, -0.2, 0.3), 0.12 * sc, 0.022 * sc, "steel")
        else:
            sph(tuple(T), (0.045 * sc,) * 3, fr)
    if S >= 3:   # iron bands / studs on trunk
        for z in (0.15, 0.3):
            tor(tuple(base + Vector((0, 0, z * sc))), (0.07 + 0.012 * S) * sc, 0.016, "iron" if S < 5 else "gold")
    if S >= 4:   # chain draped between outer tips
        A0, A1 = tips[0], tips[-1]
        for k in range(9):
            t = k / 8; p = A0 + (A1 - A0) * t + Vector((0, -0.02, -0.18 * sc * math.sin(math.pi * t)))
            tor(tuple(p), 0.025, 0.008, "steel", rot=(90 if k % 2 else 0, 0, 90))
    P = Vector((0, 0.34, HB + 0.33 + 0.04 * S))
    band = ["rubber", "rubber", "rubber", "redrub", "redrub"][S - 1]
    for T in tips: rod(T, P, 0.016 + 0.004 * S, band)
    sph(tuple(P), (0.07 + 0.012 * S, 0.05, 0.06 + 0.01 * S), "leather")
    if S <= 3:
        sph(tuple(P + Vector((0, -0.02, 0.03))), ((0.05 + 0.01 * S),) * 3, "rock")
    elif S == 4:
        sph(tuple(P + Vector((0, -0.02, 0.04))), (0.08,) * 3, "dark")
        for k in range(8):
            a2 = k * math.pi / 4; spike(P + Vector((0.07 * math.cos(a2), -0.02, 0.04 + 0.07 * math.sin(a2))), (math.cos(a2), -0.3, math.sin(a2)), 0.06, 0.018)
    else:
        sph(tuple(P + Vector((0, -0.02, 0.05))), (0.1,) * 3, "lava")
        for k in range(5):
            a2 = k * 2 * math.pi / 5
            rod(P + Vector((0.05 * math.cos(a2), -0.02 + 0.05 * math.sin(a2), 0.1)), P + Vector((0.04 * math.cos(a2), 0.02 * math.sin(a2), 0.3)), 0.035, "lava", r2=0.0)
    mini_duck(Vector((0, 0.44, HB)), s=1.15)
    if S == 5:
        box((0, 0.42, HB + 0.42), (0.3, 0.02, 0.05), "red", bevel=0.01)
    PIV = Vector((0, 0, HB))

elif DEF == "boxtower":   # cardboard-box tower with slingshot ducks (archer tower)
    HB = [0.45, 0.8, 1.1, 1.25, 1.4][S - 1]
    nbox = [1, 2, 3, 3, 4][S - 1]
    z = 0; sizes = []
    for i in range(nbox):
        w = 0.85 - 0.06 * i; h = HB / nbox
        rz = random.uniform(-6, 6) if S < 4 else random.uniform(-2, 2)
        box((random.uniform(-0.02, 0.02), random.uniform(-0.02, 0.02), z + h / 2), (w, w, h), "card" if i % 2 == 0 else "card2", rot=(0, 0, rz), bevel=0.015)
        box((0, 0, z + h - 0.001), (w * 1.002, 0.09, 0.012), "tape", rot=(0, 0, rz), bevel=0.0)
        box((0, -w / 2 - 0.002, z + h * 0.75), (0.09, 0.012, h * 0.5), "tape", rot=(0, 0, rz), bevel=0.0)
        if S >= 2 and i % 2 == 1:
            box((0.18, -w / 2 - 0.004, z + h * 0.4), (0.22, 0.01, 0.06), "red", rot=(0, 0, rz), bevel=0.0)
        for sx in (1, -1):   # printed arrows / handle holes
            box((sx * (w / 2 + 0.002), 0, z + h * 0.65), (0.01, 0.14, 0.05), "black", bevel=0.0)
        if S >= 4:
            for sx in (1, -1):
                for sy in (1, -1):
                    box((sx * w / 2, sy * w / 2, z + h / 2), (0.06, 0.06, h * 1.02), "dark" if S == 4 else "gold", bevel=0.01)
                    spike((sx * w / 2, sy * w / 2, z + h * 0.6), (sx, sy, 0.3), 0.14, 0.03, "steel" if S == 4 else "gold")
        sizes.append(w); z += h
    # crenellation of small boxes on top edge
    w = sizes[-1]
    if S >= 3:
        for k in range(4):
            for sx, sy in ((1, 1), (-1, 1), (1, -1), (-1, -1)):
                pass
        for (x, y) in [(w / 2 - 0.08, w / 2 - 0.08), (-w / 2 + 0.08, w / 2 - 0.08), (w / 2 - 0.08, -w / 2 + 0.08), (-w / 2 + 0.08, -w / 2 + 0.08)]:
            box((x, y, HB + 0.08), (0.16, 0.16, 0.16), "card2", rot=(0, 0, random.uniform(-10, 10)), bevel=0.01)
    if S == 5:
        flag((w / 2 - 0.05, w / 2 - 0.05, HB + 0.16), 0.9)
        for k in range(4):
            a3 = k * math.pi / 2; box((0.43 * math.cos(a3), 0.43 * math.sin(a3), HB * 0.55), (0.03 if k % 2 == 0 else 0.25, 0.25 if k % 2 == 0 else 0.03, 0.4), "red", bevel=0.005)
    cyl((0, 0, HB + 0.01), 0.25, 0.02, "iron")
    CUR = HEAD
    nd = [1, 1, 2, 2, 3][S - 1]
    xs = {1: [0], 2: [-0.17, 0.17], 3: [-0.24, 0, 0.24]}[nd]
    for x in xs:
        dc = Vector((x, 0.05, HB + 0.01))
        mini_duck(dc, s=0.85)
        fm = ["wood2", "wood2", "wood", "dark", "gold"][S - 1]
        G = dc + Vector((0, -0.2, 0.2)); Cc = G + Vector((0, -0.03, 0.08))
        rod(G, Cc, 0.018, fm)
        T1 = Cc + Vector((-0.06, -0.01, 0.08)); T2 = Cc + Vector((0.06, -0.01, 0.08))
        rod(Cc, T1, 0.016, fm); rod(Cc, T2, 0.016, fm)
        Pp = dc + Vector((0, -0.08, 0.3))
        rod(T1, Pp, 0.007, "rubber" if S < 4 else "redrub"); rod(T2, Pp, 0.007, "rubber" if S < 4 else "redrub")
        sph(tuple(Pp), (0.025,) * 3, "rock" if S < 5 else "lava")
    PIV = Vector((0, 0, HB))

elif DEF == "mortar":   # pressure-cooker meatball mortar
    HB = fort_base(S)
    for k in range(6):
        p = Vector((0.42 + 0.09 * (k % 3), -0.45 + 0.09 * (k // 3), HB * 0.0 + 0.06 + 0.07 * (k // 3)))
        if S < 4: sph(tuple(p), (0.06,) * 3, "meat")
        elif S == 4:
            sph(tuple(p), (0.06,) * 3, "dark"); spike(p, (0, 0, 1), 0.06, 0.015)
        else: sph(tuple(p), (0.065,) * 3, "lava")
    cyl((0, 0, HB + 0.03), 0.32, 0.06, "iron")
    CUR = HEAD
    cyl((0, 0, HB + 0.1), 0.3 + 0.02 * S, 0.1, ["wood", "gunmetal", "gunmetal", "dark", "dark"][S - 1])
    up = math.radians(55); d = Vector((0, -math.cos(up), math.sin(up)))
    n = S; pm = ["steel", "steel", "steel", "dark", "dark"][S - 1]; rm = ["steel", "iron", "iron", "steel", "gold"][S - 1]
    r = 0.1 + 0.012 * S
    for i in range(n):
        off = Vector(((i - (n - 1) / 2) * (2.1 * r), 0.05 * abs(i - (n - 1) / 2), 0))
        p0 = Vector((0, 0.05, HB + 0.2)) + off
        rod(p0 - d * 0.1, p0 + d * 0.28, r, pm)
        qtor(tuple(p0 + d * 0.28), r, 0.02, d, rm)
        qdisc(tuple(p0 + d * 0.285), r * 0.85, 0.01, d, "lava" if S == 5 else "black")
        for sx in (1, -1): box(tuple(p0 + d * 0.15 + Vector((sx * (r + 0.03), 0, 0))), (0.06, 0.03, 0.025), "black", bevel=0.005)
        vp = p0 + d * 0.08 + Vector((0, 0.07, 0.09))
        cyl(tuple(vp), 0.02, 0.06, "black"); sph(tuple(vp + Vector((0, 0, 0.04))), (0.025,) * 3, "red" if S < 5 else "gold")
        if S >= 2:
            for k in range(3): sph(tuple(vp + Vector((0.02 * k, 0.02 * k, 0.09 + 0.06 * k))), ((0.03 + 0.012 * k),) * 3, "white")
        if S >= 3: qtor(tuple(p0 + d * 0.05), r * 1.03, 0.014, d, "iron" if S < 5 else "gold")
        if S >= 4:
            for a2 in (0, math.pi):
                spike(p0 + d * 0.05 + Vector((math.cos(a2) * r, 0, 0)), (math.cos(a2), 0.2, 0.3), 0.1, 0.022, "steel" if S == 4 else "gold")
    PIV = Vector((0, 0, HB))

elif DEF == "lens":   # magnifying-glass sun beam (inferno-like)
    HB = [0.6, 0.75, 0.9, 1.0, 1.15][S - 1]
    if S == 1:
        box((0, 0, 0.1), (0.5, 0.5, 0.2), "wood2", bevel=0.03); rod((0, 0, 0.2), (0, 0, HB), 0.07, "wood")
    elif S == 2:
        for k in range(3):
            a2 = k * 2 * math.pi / 3; rod((0.35 * math.cos(a2), 0.35 * math.sin(a2), 0), (0, 0, HB), 0.05, "wood")
        box((0, 0, HB - 0.03), (0.3, 0.3, 0.06), "wood2")
    elif S == 3:
        box((0, 0, HB / 2), (0.55, 0.55, HB), "brick", bevel=0.03)
        for z in (0.2, 0.45, 0.7): box((0, -0.28, z), (0.56, 0.01, 0.02), "stone", bevel=0)
    elif S == 4:
        box((0, 0, HB / 2), (0.6, 0.6, HB), "stone2", bevel=0.04)
        box((0, 0, HB - 0.03), (0.7, 0.7, 0.06), "dark", bevel=0.02)
        for sx in (1, -1):
            for sy in (1, -1): spike((0.33 * sx, 0.33 * sy, HB - 0.05), (sx, sy, 0.6), 0.2, 0.04)
    else:
        cyl((0, 0, HB / 2), 0.4, HB, "stone2", v=8)
        for z in (0.3, 0.7, HB - 0.03): cyl((0, 0, z), 0.43, 0.05, "gold", v=8)
        spike_ring((0, 0), 0.42, 8, 0.22, 0.04, HB - 0.1, "gold")
        flag((0.55, 0.55, 0.0), 1.9)
    cyl((0, 0, HB + 0.02), 0.22, 0.05, "iron")
    CUR = HEAD
    beam = Vector((0, -0.55, -0.83)).normalized()
    nl = [1, 1, 2, 3, 3][S - 1]; R0 = [0.2, 0.25, 0.25, 0.27, 0.32][S - 1]
    rimm = ["wood", "gold", "gold", "dark", "gold"][S - 1]; armm = ["wood", "wood2", "iron", "dark", "dark"][S - 1]
    cyl((0, 0, HB + 0.08), 0.18, 0.08, armm)
    for i in range(nl):
        x = [0, -0.3, 0.3][i] if nl > 1 else 0
        rr = R0 if i == 0 else R0 * 0.7
        c = Vector((x, -0.2, HB + 0.5 - (0 if i == 0 else 0.12)))
        rod((0, 0, HB + 0.1), c + Vector((0, 0.05, -rr * 0.7)), 0.03, armm)
        qdisc(tuple(c), rr, 0.035, beam, "glass")
        qtor(tuple(c), rr, 0.028, beam, rimm)
        if S >= 4:
            for a2 in range(4):
                spike(c + Vector((math.cos(a2 * 1.57) * rr, 0, math.sin(a2 * 1.57) * rr)), (math.cos(a2 * 1.57), 0.2, math.sin(a2 * 1.57)), 0.09, 0.02, "steel" if S == 4 else "gold")
        if S >= 3:
            sph(tuple(c + beam * 0.35), ((0.04 + 0.01 * S),) * 3, "lava")
    PIV = Vector((0, 0, HB))

elif DEF == "rocket":   # matchbox firework battery
    HB = fort_base(S)
    cyl((0, 0, HB + 0.03), 0.32, 0.06, "iron")
    CUR = HEAD
    cyl((0, 0, HB + 0.1), 0.28 + 0.02 * S, 0.1, ["wood", "gunmetal", "gunmetal", "dark", "dark"][S - 1])
    rows, cols = [(1, 2), (2, 2), (2, 3), (3, 3), (3, 4)][S - 1]
    tilt = math.radians(25); d = Vector((0, -math.cos(tilt), math.sin(tilt))); u = Vector((0, math.sin(tilt), math.cos(tilt)))
    W = 0.16 * cols + 0.1; Hh = 0.15 * rows + 0.08; L = 0.5 + 0.03 * S
    c = Vector((0, 0.02, HB + 0.15 + Hh / 2))
    bm = ["wood2", "wood2", "toyY", "dark", "dark"][S - 1]
    box(tuple(c), (W, L, Hh), bm, rot=(-25, 0, 0), bevel=0.02)
    for sx in (1, -1):   # matchbox striker label stripes
        box(tuple(c + Vector((sx * (W / 2 + 0.005), 0, 0))), (0.01, L * 0.9, Hh * 0.5), "red" if S < 5 else "gold", rot=(-25, 0, 0), bevel=0)
        box(tuple(c + Vector((sx * (W / 2 + 0.008), 0, 0))), (0.01, L * 0.9, Hh * 0.15), "toyY" if S < 4 else "red", rot=(-25, 0, 0), bevel=0)
    for i in range(rows):
        for j in range(cols):
            off = Vector(((j - (cols - 1) / 2) * 0.16, 0, 0)) + u * ((i - (rows - 1) / 2) * 0.15)
            p0 = c + off - d * (L * 0.3); p1 = c + off + d * (L / 2 + 0.1)
            rod(p0, p1, 0.05, "red" if (i + j) % 2 == 0 else "white")
            rod(p1, p1 + d * 0.11, 0.055, "gold" if S >= 4 else "toyY", r2=0.0)
            if S == 5: sph(tuple(p0 - d * 0.02), (0.03,) * 3, "lava")
    if S >= 4:
        for k in range(cols + 1):
            spike(c + u * (Hh / 2) + Vector(((k - cols / 2) * 0.16, 0, 0)), u + Vector((0, 0.3, 0)), 0.14, 0.03, "steel" if S == 4 else "gold")
    PIV = Vector((0, 0, HB))

elif DEF == "chef":   # chef tower splashing chili
    HB = [0.6, 0.75, 0.9, 1.0, 1.1][S - 1]
    if S == 1:
        for sx in (1, -1):
            for sy in (1, -1): rod((0.32 * sx, 0.32 * sy, 0), (0.28 * sx, 0.28 * sy, HB), 0.04, "bamboo" if False else "wood")
        box((0, 0, HB - 0.03), (0.75, 0.75, 0.06), "wood2")
    elif S == 2:
        box((0, 0, HB / 2), (0.75, 0.75, HB), "wood2", bevel=0.03)
        for k in range(6): box((-0.31 + k * 0.125, -0.38, HB / 2), (0.025, 0.01, HB), "wood", bevel=0)
    elif S == 3:
        box((0, 0, HB / 2), (0.8, 0.8, HB), "brick", bevel=0.03)
    elif S == 4:
        box((0, 0, HB / 2), (0.85, 0.85, HB), "stone2", bevel=0.04)
        for sx in (1, -1):
            for sy in (1, -1): spike((0.45 * sx, 0.45 * sy, HB - 0.05), (sx, sy, 0.6), 0.22, 0.04)
    else:
        cyl((0, 0, HB / 2), 0.52, HB, "stone2", v=8)
        cyl((0, 0, HB), 0.56, 0.06, "gold", v=8)
        spike_ring((0, 0), 0.55, 8, 0.24, 0.045, HB - 0.12, "gold")
        flag((0.6, -0.6, 0.0), 2.0)
    for k in range(3):   # hanging chili strings
        x = -0.2 + 0.2 * k
        for j in range(3): rod((x, -0.42, HB - 0.08 - j * 0.09), (x, -0.43, HB - 0.15 - j * 0.09), 0.025, "chili", r2=0.003)
    CUR = HEAD
    cyl((0, 0, HB + 0.04), 0.3, 0.06, "iron")
    pr = [0.16, 0.2, 0.24, 0.27, 0.3][S - 1]; pm = ["steel", "dark", "dark", "dark", "dark"][S - 1]
    pc = Vector((0, -0.18, HB + 0.12 + pr * 0.5))
    if S >= 4:
        for k in range(5):
            a2 = k * 1.256; rod(pc + Vector((0.08 * math.cos(a2), 0.08 * math.sin(a2), -pr * 0.9)), pc + Vector((0.06 * math.cos(a2), 0.06 * math.sin(a2), -pr * 0.3)), 0.04, "lava", r2=0.0)
    sph(tuple(pc), (pr, pr, pr * 0.75), pm)
    cyl(tuple(pc + Vector((0, 0, pr * 0.55))), pr * 0.92, 0.02, "chiliG" if S == 5 else "chili")
    tor(tuple(pc + Vector((0, 0, pr * 0.55))), pr * 0.95, 0.02, "gold" if S >= 3 else "iron")
    for k in range(min(S + 1, 5)):
        a2 = k * 1.3; rod(pc + Vector((0.1 * math.cos(a2), 0.1 * math.sin(a2), pr * 0.5)), pc + Vector((0.12 * math.cos(a2), 0.12 * math.sin(a2), pr * 0.5 + 0.1)), 0.02, "chili", r2=0.003)
    mini_duck(Vector((0, 0.18, HB + 0.05)), s=1.0 + 0.05 * S, helmet=False, hat="chef")
    rod((0.15, 0.05, HB + 0.3), (0.05, -0.2, HB + 0.25 + pr), 0.015, "steel")
    sph((0.05, -0.2, HB + 0.25 + pr), (0.05, 0.05, 0.025), "steel")
    if S == 5: box((0, 0.1, HB + 0.38), (0.32, 0.02, 0.05), "red", bevel=0.01)
    PIV = Vector((0, 0, HB))

elif DEF == "fan":   # giant fan air blower
    HB = fort_base(S)
    cyl((0, 0, HB + 0.03), 0.3, 0.06, "iron")
    CUR = HEAD
    R2 = [0.28, 0.33, 0.38, 0.42, 0.47][S - 1]
    cage = ["white", "white", "steel", "dark", "gold"][S - 1]; blade = ["blue", "toyG", "toyO", "redrub", "redrub"][S - 1]
    rod((0, 0.05, HB + 0.05), (0, 0.05, HB + 0.25 + R2), 0.05, ["white", "white", "gunmetal", "dark", "dark"][S - 1])
    c = Vector((0, -0.05, HB + 0.3 + R2))
    sph(tuple(c + Vector((0, 0.15, 0))), (0.14, 0.18, 0.14), ["white", "white", "gunmetal", "dark", "dark"][S - 1])
    n_ = Vector((0, -1, 0))
    for rr in (R2, R2 * 0.66, R2 * 0.33):
        qtor(tuple(c + Vector((0, -0.04, 0))), rr, 0.012 + 0.002 * S, n_, cage)
    nsp = 8 + 2 * S
    for k in range(nsp // 2):
        a2 = k * 2 * math.pi / nsp
        rod(c + Vector((R2 * math.cos(a2), -0.04, R2 * math.sin(a2))), c + Vector((-R2 * math.cos(a2), -0.04, -R2 * math.sin(a2))), 0.006, cage)
    nb = [3, 3, 4, 5, 5][S - 1]
    for k in range(nb):
        a2 = k * 2 * math.pi / nb
        a2 = a2 + (math.radians(180 / nb) if STATE == "blade2" else 0)
        bc = c + Vector((R2 * 0.45 * math.cos(a2), 0.0, R2 * 0.45 * math.sin(a2)))
        sph(tuple(bc), (R2 * 0.42, 0.012, R2 * 0.2), blade, rot=(0, -math.degrees(a2), 0))
    sph(tuple(c + Vector((0, -0.05, 0))), (0.06, 0.04, 0.06), "gold" if S == 5 else cage)
    if S >= 4:
        for k in range(8):
            a2 = k * math.pi / 4
            spike(c + Vector((R2 * math.cos(a2), -0.04, R2 * math.sin(a2))), (math.cos(a2), -0.3, math.sin(a2)), 0.12, 0.025, "steel" if S == 4 else "gold")
    PIV = Vector((0, 0, HB))

elif DEF == "racket":   # hidden mosquito racket (tesla) - static
    box((0, 0, 0.03), (1.3, 1.3, 0.06), ["dirt", "wood2", "stone", "stone2", "stone2"][S - 1], bevel=0.03)
    if S == 5: box((0, 0, 0.065), (1.35, 1.35, 0.02), "gold", bevel=0.01)
    if STATE == "hidden":
        sph((0, 0, 0.05), (0.55, 0.55, 0.14), "dirt")
        cyl((0, 0, 0.18), 0.36, 0.04, ["wood", "wood", "iron", "dark", "dark"][S - 1])
        for k in range(3 + S):
            a2 = k * 2 * math.pi / (3 + S); sph((0.2 * math.cos(a2), 0.2 * math.sin(a2), 0.21), (0.03,) * 3, "zap")
        box((0.38, -0.38, 0.2), (0.16, 0.02, 0.12), "toyY", bevel=0.01); rod((0.38, -0.38, 0), (0.38, -0.38, 0.14), 0.012, "wood")
    else:
        cyl((0, 0, 0.09), 0.3, 0.06, "dark")
        nr = [1, 1, 2, 2, 3][S - 1]; sc = [1.3, 1.45, 1.55, 1.7, 1.85][S - 1]
        for i in range(nr):
            x = [0, -0.36, 0.36][i] if nr == 3 else ([0] if nr == 1 else [-0.26, 0.26])[i]
            hm = ["toyY", "toyY", "gunmetal", "dark", "gold"][S - 1]
            rod((x, 0, 0.1), (x, 0, 0.1 + 0.45 * sc), 0.035, hm)
            hc = Vector((x, 0, 0.1 + 0.45 * sc + 0.28 * sc))
            tor(tuple(hc), 1.0, 0.025, ["blue", "blue", "iron", "dark", "gold"][S - 1], rot=(90, 0, 0), sc=(0.2 * sc, 0.28 * sc, 1))
            sph(tuple(hc), (0.2 * sc, 0.008, 0.28 * sc), "glass")
            for k in range(6 + 2 * S):
                a2 = random.uniform(0, 6.28); rr = random.uniform(0.05, 0.25) * sc
                sph(tuple(hc + Vector((rr * 0.75 * math.cos(a2), -0.02, rr * math.sin(a2)))), (0.022,) * 3, "zap")
            if S >= 4:
                for a2 in range(6):
                    spike(hc + Vector((0.2 * sc * math.cos(a2 * 1.05), 0, 0.28 * sc * math.sin(a2 * 1.05))), (math.cos(a2 * 1.05), 0, math.sin(a2 * 1.05)), 0.1, 0.02, "steel" if S == 4 else "gold")
    HB = 0.1; PIV = Vector((0, 0, 0.1))

elif DEF == "mtrap":   # giant mousetrap vs heavy troops - static
    sc = [1.1, 1.25, 1.35, 1.45, 1.55][S - 1]
    bw, bl = 0.7 * sc, 1.0 * sc
    box((0, 0, 0.05), (bw, bl, 0.1), ["wood2", "wood2", "wood", "dark", "dark"][S - 1], bevel=0.02)
    if S == 5:
        box((0, 0, 0.105), (bw + 0.04, bl + 0.04, 0.02), "gold", bevel=0.01)
    for sx in (1, -1): tor((sx * bw * 0.32, 0.05, 0.14), 0.05, 0.015, "steel", rot=(0, 90, 0))
    cheese = Vector((0, -bl * 0.25, 0.16))
    box(tuple(cheese), (0.16 * sc, 0.12 * sc, 0.1 * sc), "cheese", rot=(0, 0, 20), bevel=0.02)
    for k in range(4): sph(tuple(cheese + Vector((0.03 * (k - 1.5), -0.061 * sc, 0.01 * (k % 2)))), (0.012,) * 3, "dark")
    if S >= 4:
        for sx in (1, -1):
            for sy in (1, -1): spike((sx * bw / 2, sy * bl / 2, 0.1), (sx, sy, 0.5), 0.18, 0.035, "steel" if S == 4 else "gold")
    bar_m = ["steel", "steel", "iron", "dark", "gold"][S - 1]
    if STATE == "snap":
        pts = [(-bw * 0.4, 0.05, 0.14), (-bw * 0.4, -bl * 0.42, 0.14), (bw * 0.4, -bl * 0.42, 0.14), (bw * 0.4, 0.05, 0.14)]
    else:
        pts = [(-bw * 0.4, 0.05, 0.14), (-bw * 0.4, bl * 0.45, 0.14), (bw * 0.4, bl * 0.45, 0.14), (bw * 0.4, 0.05, 0.14)]
    for i in range(3): rod(pts[i], pts[i + 1], 0.025, bar_m)
    if S >= 3:
        a0, a1 = Vector(pts[1]), Vector(pts[2])
        for k in range(7):
            p = a0 + (a1 - a0) * (k / 6); spike(p, (0, 0, 1) if STATE == "snap" else (0, 0.3, 1), 0.08 + 0.03 * (S - 3), 0.022, "steel" if S < 5 else "gold")
    box((0, bl * 0.35, 0.13), (bw * 0.8, 0.05, 0.04), bar_m, bevel=0.01)
    HB = 0.1; PIV = Vector((0, 0, 0.1))

elif DEF == "pumpY":   # honey hand-pump well
    HB = [0.5, 0.6, 0.7, 0.8, 0.9][S - 1]
    wm = ["wood2", "stone", "stone", "brick", "stone2"][S - 1]
    cyl((0, 0.15, 0.18), 0.38 + 0.02 * S, 0.36, wm, v=20)
    cyl((0, 0.15, 0.33), 0.33 + 0.02 * S, 0.04, "honey", v=20)
    tor((0, 0.15, 0.36), 0.38 + 0.02 * S, 0.03, "wood" if S < 5 else "gold")
    npumps = [1, 1, 2, 2, 3][S - 1]
    for i in range(npumps):
        x = (i - (npumps - 1) / 2) * 0.32
        pm = ["iron", "iron", "teal", "copper", "gold"][S - 1]
        cyl((x, -0.25, 0.3 + 0.03 * S), 0.07, 0.6 + 0.06 * S, pm)
        cyl((x, -0.25, 0.62 + 0.06 * S), 0.09, 0.06, pm)
        rod((x, -0.25, 0.55 + 0.06 * S), (x, -0.42, 0.42 + 0.05 * S), 0.025, pm)
        rod((x, -0.25, 0.62 + 0.06 * S), (x + 0.02, 0.12, 0.78 + 0.08 * S), 0.022, pm)
        sph((x + 0.02, 0.12, 0.78 + 0.08 * S), (0.035,) * 3, "red" if S < 5 else "gold")
        rod((x, -0.42, 0.38 + 0.05 * S), (x, -0.45, 0.2), 0.03, "honey")
    cyl((0, -0.5, 0.1), 0.13, 0.2, "wood" if S < 4 else "copper")
    cyl((0, -0.5, 0.19), 0.115, 0.02, "honey")
    if S >= 3:
        for k in range(3): sph((0.55 - 0.12 * k, -0.45, 0.12), (0.09, 0.09, 0.12), "honey")
    if S >= 4:
        for sx in (1, -1): tor((sx * 0.5, 0.35, 0.45), 0.14, 0.03, "copper" if S == 4 else "gold", rot=(0, 90, 0))
        cyl((-0.55, 0.45, 0.35), 0.18, 0.7, "wood2"); tor((-0.55, 0.45, 0.6), 0.185, 0.015, "iron"); tor((-0.55, 0.45, 0.15), 0.185, 0.015, "iron")
    if S == 5: flag((0.65, 0.6, 0), 1.4)

elif DEF == "blenderG":   # giant veggie blender
    HB = [0.8, 0.95, 1.05, 1.15, 1.25][S - 1]
    nj = [1, 1, 2, 2, 3][S - 1]
    bm_ = ["white", "teal", "teal", "gunmetal", "gold"][S - 1]
    box((0.08, -0.08, 0.035), (1.5, 1.3, 0.07), "wood2", bevel=0.025)               # wooden deck: everything stands on it
    for k in range(5): box((0.08, -0.08 - 0.52 + 0.26 * k, 0.072), (1.46, 0.012, 0.006), "bark", bevel=0)
    box((0, 0.05, 0.25), (0.75 + 0.1 * (nj - 1), 0.6, 0.36), bm_, bevel=0.06)
    for k in range(3): sph((-0.2 + 0.2 * k, -0.26, 0.27), (0.04, 0.02, 0.04), ["red", "green" if "green" in M else "toyG", "toyY"][k])
    for i in range(nj):
        x = (i - (nj - 1) / 2) * 0.42
        jh = 0.5 + 0.06 * S
        cyl((x, 0.05, 0.43 + jh * 0.35), 0.17, jh * 0.7, "veg", v=24)
        cyl((x, 0.05, 0.43 + jh / 2), 0.19, jh, "jarglass", v=24, bevel=0.02)
        cyl((x, 0.05, 0.43 + jh + 0.03), 0.2, 0.06, "black" if S < 5 else "gold", v=24)
        rod((x + 0.19, 0.05, 0.62), (x + 0.28, 0.05, 0.82), 0.03, "black")
        for k in range(4):
            a = k * math.pi / 2 + 0.4; sph((x + 0.09 * math.cos(a), 0.05 + 0.09 * math.sin(a), 0.52), (0.06, 0.012, 0.03), "steel")
    box((0.5, -0.5, 0.17), (0.36, 0.3, 0.2), "wood", bevel=0.015)                     # veggie crate on the deck
    for k in range(4 + S):
        a = k * 1.1; sph((0.5 + 0.09 * math.cos(a) * (k % 3) * 0.8, -0.5 + 0.06 * math.sin(a), 0.29 + 0.04 * (k % 2)), (0.08, 0.08, 0.07), "foliage2" if k % 2 else "foliage")
    if S >= 3: cyl((-0.5, -0.5, 0.17), 0.1, 0.2, "red")
    if S >= 4:
        rod((-0.4, 0.4, 0.3), (-0.6, 0.6, 0.6), 0.05, "copper"); spike((0.45, 0.35, 0.36), (1, 1, 0.5), 0.2, 0.04, "steel" if S == 4 else "gold")
    if S == 5: flag((0.65, 0.65, 0), 1.6)
    mini_duck(Vector((0.55, 0.1, 0.07)), s=0.9, helmet=False, hat=None)

elif DEF == "stoveR":   # red syrup pot on charcoal stove
    HB = [0.6, 0.7, 0.8, 1.0, 1.1][S - 1]
    ns = [1, 1, 2, 2, 1][S - 1]
    for i in range(ns):
        x = (i - (ns - 1) / 2) * 0.55
        stm = ["clay", "brick", "brick", "iron", "dark"][S - 1]
        if S < 4:
            cyl((x, 0, 0.17), 0.24, 0.34, stm, v=16); cyl((x, 0, 0.35), 0.21, 0.03, "ember", v=16)
            box((x, -0.23, 0.12), (0.14, 0.04, 0.1), "black")
        else:
            box((x, 0.02, 0.22), (0.7, 0.6, 0.44), stm, bevel=0.04); box((x, -0.29, 0.18), (0.2, 0.03, 0.14), "ember")
            cyl((x + 0.25, 0.22, 0.7), 0.07, 0.6, stm)
        pr = 0.2 + 0.04 * S if ns == 1 else 0.2 + 0.02 * S
        pz = 0.37 if S < 4 else 0.46
        pm = ["clay", "steel", "steel", "copper", "gold"][S - 1]
        sph((x, 0, pz + pr * 0.6), (pr, pr, pr * 0.75), pm)
        cyl((x, 0, pz + pr * 1.1), pr * 0.9, 0.03, "syrup", v=24)
        tor((x, 0, pz + pr * 1.12), pr * 0.92, 0.022, pm)
        for sx in (1, -1): tor((x + sx * pr, 0, pz + pr * 0.95), 0.05, 0.015, pm, rot=(90, 0, 0))
        for k in range(3): sph((x + 0.05 * k - 0.05, 0.02 * k, pz + pr * 1.3 + 0.1 * k), (0.06 + 0.02 * k,) * 3, "white")
    for k in range(5): box((0.6 - 0.07 * k, -0.55 + 0.05 * (k % 2), 0.04), (0.1, 0.07, 0.06), "black", rot=(0, 0, 20 * k), bevel=0.01)
    if S >= 2:
        for k in range(2 + S): cyl((-0.6, -0.5 + 0.13 * k, 0.12), 0.05, 0.22, "syrup")
    if S >= 4:
        rod((0.0, 0.3, 0.9), (-0.55, 0.55, 0.45), 0.04, "copper"); spike_ring((0, 0.02), 0.5, 6, 0.15, 0.03, 0.3, "steel" if S == 4 else "gold")
    if S == 5: flag((0.65, 0.65, 0), 1.7)

elif DEF in ("jarY", "jarG", "jarR"):   # glass-jar storages
    liq = {"jarY": "honey", "jarG": "veg", "jarR": "syrup"}[DEF]
    HB = [0.7, 0.85, 1.0, 1.15, 1.3][S - 1]
    r = [0.32, 0.36, 0.4, 0.44, 0.48][S - 1]
    bm_ = ["wood2", "wood2", "stone", "stone2", "stone2"][S - 1]
    cyl((0, 0, 0.06), r + 0.12, 0.12, bm_, v=8 if S >= 4 else 24, bevel=0.02)
    if S == 5: cyl((0, 0, 0.125), r + 0.13, 0.03, "gold", v=8)
    jar((0, 0, 0.12), r, HB - 0.12, liq, [0.45, 0.55, 0.65, 0.75, 0.85][S - 1], lid=["steel", "steel", "copper", "dark", "gold"][S - 1])
    if S >= 2:
        for k in range(2 if S < 4 else 3):
            tor((0, 0, 0.3 + k * (HB - 0.3) / 3), r + 0.012, 0.014, "rope" if S < 3 else ("iron" if S < 5 else "gold"))
    if S >= 3:
        for k in range(4):
            a = k * math.pi / 2 + math.pi / 4; rod((math.cos(a) * (r + 0.02), math.sin(a) * (r + 0.02), 0.12), (math.cos(a) * (r + 0.02), math.sin(a) * (r + 0.02), HB - 0.05), 0.02, "iron" if S < 5 else "gold")
    if S >= 4:
        for k in range(4):
            a = k * math.pi / 2 + math.pi / 4; spike((math.cos(a) * (r + 0.1), math.sin(a) * (r + 0.1), 0.1), (math.cos(a), math.sin(a), 0.6), 0.18, 0.035, "steel" if S == 4 else "gold")
    sph((0, -r - 0.005, HB * 0.6), (0.09, 0.01, 0.06), "cream")
    box((0, -r - 0.012, HB * 0.6), (0.11, 0.005, 0.03), {"jarY": "toyY", "jarG": "toyG", "jarR": "red"}[DEF], bevel=0)
    if S == 5: flag((r + 0.25, r + 0.25, 0), 1.6)

elif DEF == "camp":   # army camp: one trodden-dirt clearing with a log palisade; tents gathered round the campfire
    HB = [0.5, 0.55, 0.6, 0.7, 0.9][S - 1]
    cyl((0, 0, 0.012), 1.02, 0.024, "dirt", v=40, bevel=0.012)                       # the clearing ties everything together
    cyl((0.05, -0.05, 0.03), 0.3, 0.05, "stone2", v=12)
    for k in range(7): rod((0.05 + 0.2 * math.cos(k), -0.05 + 0.2 * math.sin(k), 0.05), (0.05 - 0.17 * math.cos(k), -0.05 - 0.17 * math.sin(k), 0.12), 0.03, "bark")
    for k in range(3): rod((0.05 + 0.05 * math.cos(k * 2.1), -0.05 + 0.05 * math.sin(k * 2.1), 0.08), (0.05, -0.05, 0.36), 0.055, "ember", r2=0.0)
    # palisade of short logs round the edge, gap at the front (towards the camera) as the gate
    np_ = 30
    for k in range(np_):
        a = 2 * math.pi * k / np_; ca, sa = math.cos(a), math.sin(a)
        if abs(math.atan2(sa - ca, -(ca + sa))) < 0.45: continue                     # front gate
        hgt = 0.2 + 0.05 * (k % 2) + 0.03 * S
        rod((0.97 * ca, 0.97 * sa, 0), (0.97 * ca, 0.97 * sa, hgt), 0.05, "bark")
        sph((0.97 * ca, 0.97 * sa, hgt), (0.055, 0.055, 0.03), "wood")
    for k in range(4):                                                                 # log benches facing the fire
        a = k * 1.57 + 0.78; x, y = 0.05 + 0.5 * math.cos(a), -0.05 + 0.5 * math.sin(a)
        rod((x - 0.14 * math.sin(a), y + 0.14 * math.cos(a), 0.06), (x + 0.14 * math.sin(a), y - 0.14 * math.cos(a), 0.06), 0.06, "bark")
    nt = [1, 2, 3, 4, 4][S - 1]
    tm = ["canvas", "canvas", "canvas2", "canvas2", "roofred"][S - 1]
    pos = [(-0.45, 0.45), (0.2, 0.62), (-0.62, -0.2), (0.5, 0.2)]                    # back of the clearing first
    for i in range(nt):
        x, y = pos[i]; tw = 0.5 + 0.03 * S; rz = math.atan2(-0.05 - y, 0.05 - x) - math.pi / 2
        tent((x, y, 0.0), tw, tw, 0.5 + 0.05 * S, tm, rotz=math.degrees(rz))
        rod((x, y, 0), (x, y, 0.68 + 0.05 * S), 0.015, "wood")
        if S >= 4: sph((x, y, 0.71 + 0.05 * S), (0.04,) * 3, "gold")
    if S >= 3:
        for k in range(5): sph((0.72 - 0.1 * k, -0.45 - 0.1 * k, 0.07), (0.11, 0.07, 0.07), "sand")
    if S >= 4:
        for (x, y) in ((-0.8, 0.45), (0.45, -0.8)):
            rod((x, y, 0), (x, y, 0.7), 0.03, "wood"); rod((x, y, 0.7), (x, y, 0.85), 0.05, "ember", r2=0.0)
    if S == 5: flag((-0.25, 0.8, 0), 1.8)

elif DEF == "barracks":   # training yard
    HB = [0.6, 0.8, 0.95, 1.1, 1.25][S - 1]
    if S == 1:
        for k in range(4):
            a = k * math.pi / 2 + 0.78; rod((0.7 * math.cos(a), 0.7 * math.sin(a), 0), (0.7 * math.cos(a), 0.7 * math.sin(a), 0.35), 0.03, "wood")
        for k in range(4):
            a1 = k * math.pi / 2 + 0.78; a2 = a1 + math.pi / 2
            rod((0.7 * math.cos(a1), 0.7 * math.sin(a1), 0.3), (0.7 * math.cos(a2), 0.7 * math.sin(a2), 0.3), 0.012, "rope")
    else:
        hm = ["wood2", "wood2", "brick", "stone", "stone2"][S - 1]
        box((0, 0.35, HB / 2), (1.2, 0.5, HB), hm, bevel=0.03)
        gable((0, 0.35, HB), 1.2, 0.5, 0.3, ["zinc", "zinc", "tile", "dark", "roofred"][S - 1], wall=hm)
        box((0, 0.09, 0.3), (0.3, 0.03, 0.5), "dark", bevel=0)
        if S >= 4:
            for sx in (1, -1): box((sx * 0.42, 0.09, 0.55), (0.24, 0.02, 0.5), "red", bevel=0.005); sph((sx * 0.42, 0.08, 0.6), (0.07, 0.01, 0.07), "flag")
    ndum = [2, 2, 3, 3, 4][S - 1]
    for i in range(ndum):
        x = (i - (ndum - 1) / 2) * 0.38; y = -0.35
        rod((x, y, 0), (x, y, 0.5), 0.025, "wood"); rod((x - 0.15, y, 0.38), (x + 0.15, y, 0.38), 0.02, "wood")
        sph((x, y, 0.42), (0.12, 0.1, 0.16), "hay"); sph((x, y, 0.62), (0.08,) * 3, "hay")
        if S >= 3: sph((x, y - 0.02, 0.69), (0.085, 0.085, 0.05), "iron")
    rod((-0.7, -0.1, 0.0), (-0.7, -0.1, 0.7), 0.025, "wood"); rod((-0.7, -0.1, 0.7), (-0.7, -0.1, 0.58), 0.008, "rope")
    sph((-0.7, -0.1, 0.45), (0.1, 0.1, 0.16), "leather")
    if S == 5: flag((0.7, 0.7, 0), 1.9)

elif DEF == "redbarn":   # red-fluid barracks: red barn
    HB = [0.7, 0.85, 1.0, 1.1, 1.2][S - 1]
    w = 0.85 + 0.08 * S
    box((0, 0.05, HB / 2), (w, 0.8, HB), "roofred", bevel=0.02)
    for k in range(int(w / 0.12)):
        box((-w / 2 + 0.06 + k * 0.12, -0.355, HB / 2), (0.015, 0.01, HB), "white" if k % 3 == 0 else "roofred", bevel=0)
    gable((0, 0.05, HB), w, 0.8, 0.45, ["wood2", "zinc", "zinc", "dark", "dark"][S - 1], wall="roofred")
    box((0, -0.36, HB * 0.38), (0.4, 0.03, HB * 0.72), "white", bevel=0.01)
    for sg in (1, -1): rod((-0.18, -0.38, HB * 0.05 + (0 if sg > 0 else HB * 0.66)), (0.18, -0.38, HB * 0.71 - (0 if sg > 0 else HB * 0.66)), 0.018, "white")
    sph((0, -0.36, HB + 0.18), (0.1, 0.02, 0.1), "white")
    for k in range(3): sph((0.55 + 0.05 * k, -0.45, 0.1 + 0.15 * k), (0.12, 0.1, 0.09), "hay")
    if S >= 3:
        cyl((-0.65, 0.35, 0.55), 0.18, 1.1, "zinc"); sph((-0.65, 0.35, 1.1), (0.18, 0.18, 0.12), "roofred")
    if S >= 4:
        cyl((0.65, 0.4, 0.3), 0.16, 0.6, "jarglass"); cyl((0.65, 0.4, 0.22), 0.15, 0.44, "syrup")
        spike_ring((0, 0.05), 0.75, 8, 0.15, 0.03, 0.15, "steel" if S == 4 else "gold")
    rod((0, 0.05, HB + 0.45), (0, 0.05, HB + 0.75), 0.015, "iron" if S < 5 else "gold")
    box((0.08, 0.05, HB + 0.72), (0.16, 0.02, 0.08), "iron" if S < 5 else "gold", bevel=0.005)

elif DEF == "lab":   # test kitchen laboratory
    HB = [0.6, 0.9, 1.0, 1.15, 1.3][S - 1]
    if S == 1:
        box((0, 0, 0.35), (0.9, 0.5, 0.06), "wood2"); 
        for sx in (1, -1):
            for sy in (1, -1): rod((sx * 0.4, sy * 0.2, 0), (sx * 0.4, sy * 0.2, 0.33), 0.025, "wood")
        zc = 0.38
    else:
        lm = ["wood2", "cream", "brick", "teal", "white"][S - 1]
        box((0, 0.1, HB / 2), (1.1, 0.8, HB), lm, bevel=0.03)
        if S == 5:
            sph((0, 0.1, HB), (0.5, 0.4, 0.4), "jarglass"); tor((0, 0.1, HB), 0.5, 0.02, "gold", sc=(1, 0.8, 1))
        else:
            gable((0, 0.1, HB), 1.1, 0.8, 0.35, ["zinc", "zinc", "tile", "copper"][S - 2], wall=lm)
        box((0, -0.31, HB * 0.55), (0.6, 0.03, 0.3), "glass")
        cyl((0.35, 0.3, HB + 0.35), 0.08, 0.5, "steel" if S < 4 else "copper")
        box((0, -0.45, 0.3), (0.9, 0.3, 0.06), "wood")
        zc = 0.33
    for k in range(3 + min(S, 3)):
        x = -0.35 + 0.15 * k
        if k % 2 == 0:
            sph((x, -0.45 if S > 1 else 0, zc + 0.08), (0.06, 0.06, 0.08), "jarglass"); sph((x, -0.45 if S > 1 else 0, zc + 0.06), (0.05, 0.05, 0.05), ["veg", "syrup", "honey"][k % 3])
            rod((x, -0.45 if S > 1 else 0, zc + 0.14), (x, -0.45 if S > 1 else 0, zc + 0.24), 0.015, "jarglass")
        else:
            cyl((x, -0.45 if S > 1 else 0, zc + 0.06), 0.06, 0.12, "steel"); sph((x, -0.45 if S > 1 else 0, zc + 0.18), (0.05,) * 3, "white")
    if S >= 4:
        rod((-0.55, -0.1, 0.6), (-0.55, -0.5, 0.9), 0.04, "copper"); tor((-0.55, -0.5, 0.9), 0.1, 0.03, "copper", rot=(90, 0, 0))
    if S == 5: flag((0.65, 0.65, 0), 1.9)

elif DEF == "tech":   # herbal pharmacy (items)
    HB = [0.6, 0.85, 1.0, 1.2, 1.4][S - 1]
    if S == 1:
        for sx in (1, -1): rod((sx * 0.45, -0.3, 0), (sx * 0.45, -0.3, 0.75), 0.025, "bamboo" if "bamboo" in M else "wood")
        box((0, -0.4, 0.78), (1.0, 0.45, 0.03), "teal", rot=(-20, 0, 0)); box((0, 0.1, 0.35), (1.0, 0.5, 0.7), "wood2", bevel=0.02)
    else:
        tm_ = ["wood2", "wood2", "teal", "teal", "roofred"][S - 1]
        box((0, 0.1, HB / 2), (1.05, 0.8, HB), tm_ if S < 5 else "cream", bevel=0.03)
        for tier in range(1 if S < 4 else 2):
            z0 = HB + tier * 0.3; ww = 1.3 - tier * 0.35
            box((0, 0.1, z0 + 0.05), (ww, 1.0 - tier * 0.3, 0.06), ["tile", "tile", "teal", "roofred", "gold"][S - 1], bevel=0.02)
            bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=ww * 0.72, radius2=ww * 0.3, depth=0.25, location=(0, 0.1, z0 + 0.2))
            o = bpy.context.active_object; o.rotation_euler = (0, 0, math.radians(45)); fin(o, ["tile", "tile", "teal", "roofred", "roofred"][S - 1], 0.01)
            if tier == 1: box((0, 0.1, z0 - 0.1), (0.7, 0.5, 0.3), "cream", bevel=0.02)
        box((0, -0.31, HB * 0.85), (0.5, 0.03, 0.15), "cream" if S < 5 else "gold", bevel=0.01)
        box((0, -0.31, HB * 0.35), (0.3, 0.03, HB * 0.6), "dark", bevel=0)
    for k in range(4 + S):
        sph((-0.45 + 0.13 * (k % 7), -0.5 if S > 1 else -0.2, 0.25 + 0.15 * (k // 7)), (0.05, 0.05, 0.07), ["veg", "syrup", "honey", "jarglass"][k % 4])
    sph((0.6, -0.45, 0.12), (0.16, 0.16, 0.1), "stone"); rod((0.6, -0.45, 0.15), (0.7, -0.45, 0.4), 0.03, "stone")
    for k in range(3): rod((-0.6, -0.55 + 0.1 * k, 0.5), (-0.6, -0.55 + 0.1 * k, 0.3), 0.02, "foliage")
    if S == 5: flag((0.65, 0.65, 0), 2.0)

elif DEF == "castle":   # treehouse garrison (clan castle)
    HB = [0.9, 1.2, 1.5, 1.7, 1.9][S - 1]
    tr = 0.14 + 0.03 * S
    cyl((0, 0.1, HB / 2), tr, HB, "bark", v=12)
    for k in range(4): rod((0, 0.1, 0.15), (0.35 * math.cos(k * 1.57 + 0.4), 0.1 + 0.35 * math.sin(k * 1.57 + 0.4), 0.0), 0.06, "bark", r2=0.02)
    for k in range(5 + S):
        a = k * 2.3; rr = 0.35 + 0.05 * S
        sph((rr * 0.8 * math.cos(a), 0.1 + rr * 0.8 * math.sin(a), HB + 0.25 + 0.15 * (k % 3)), (rr * 0.7,) * 3, "foliage" if k % 2 else "foliage2")
    pz = HB * 0.6; hw = 0.55 + 0.06 * S
    box((0, 0.1, pz), (hw + 0.2, hw + 0.2, 0.06), "wood2")
    hm = ["wood2", "wood2", "wood", "wood", "cream"][S - 1]
    box((0, 0.1, pz + 0.22), (hw, hw * 0.8, 0.38), hm, bevel=0.02)
    gable((0, 0.1, pz + 0.41), hw, hw * 0.8, 0.25, ["canvas", "tile", "tile", "roofred", "gold"][S - 1], wall=hm)
    box((0, 0.1 - hw * 0.4, pz + 0.2), (0.14, 0.02, 0.24), "dark", bevel=0)
    for k in range(int(pz / 0.12)):
        box((0.05 + tr, 0.1 - tr * 0.3, 0.08 + k * 0.12), (0.18, 0.04, 0.025), "wood")
    if S >= 3:
        for sx in (1, -1): rod((sx * (hw / 2 + 0.1), 0.1 - hw / 2 - 0.1, pz), (sx * (hw / 2 + 0.1), 0.1 - hw / 2 - 0.1, pz + 0.3), 0.015, "wood")
        rod((-(hw / 2 + 0.1), 0.1 - hw / 2 - 0.1, pz + 0.28), (hw / 2 + 0.1, 0.1 - hw / 2 - 0.1, pz + 0.28), 0.012, "rope")
    if S >= 4:
        box((0.75, -0.6, 0.35), (0.35, 0.35, 0.7), "wood2", bevel=0.02)
        rod((0.6, -0.45, 0.7), (0.25, -0.15, pz), 0.012, "rope"); rod((0.6, -0.5, 0.65), (0.25, -0.2, pz - 0.05), 0.012, "rope")
    flag((hw / 2, 0.1 + hw / 2, pz + 0.4), 0.6 + 0.12 * S)
    if S == 5:
        for k in range(3): box((-0.25 + 0.25 * k, 0.1 - hw * 0.4 - 0.02, pz + 0.05), (0.12, 0.01, 0.25), "red", bevel=0.003)

elif DEF == "hero":   # colonel's hall -> monument
    HB = [0.7, 0.85, 1.0, 1.1, 1.6][S - 1]
    if S <= 2:
        tw = 0.9 + 0.15 * S
        tent((0, 0.1, 0), tw, tw * 0.8, 0.75 + 0.1 * S, "canvas2")
        box((0, 0.1 - tw * 0.29, 0.25), (0.25, 0.02, 0.45), "dark", bevel=0)
        box((0.5, -0.45, 0.3), (0.4, 0.3, 0.04), "wood2"); box((0.5, -0.45, 0.33), (0.3, 0.22, 0.005), "cream", bevel=0)
        for sx in (1, -1): rod((0.5 + sx * 0.15, -0.45, 0), (0.5 + sx * 0.15, -0.45, 0.3), 0.02, "wood")
    elif S <= 4:
        hm = "wood2" if S == 3 else "stone"
        box((0, 0.1, HB / 2), (1.1, 0.9, HB), hm, bevel=0.03)
        gable((0, 0.1, HB), 1.1, 0.9, 0.4, "canvas2" if S == 3 else "roofred", wall=hm)
        box((0, -0.36, HB * 0.38), (0.32, 0.03, HB * 0.7), "dark", bevel=0)
        for sx in (1, -1):
            box((sx * 0.38, -0.36, HB * 0.55), (0.18, 0.02, 0.5), "canvas2" if S == 3 else "red", bevel=0.003)
            sph((sx * 0.38, -0.375, HB * 0.62), (0.06, 0.01, 0.06), "gold")
        sph((0, -0.37, HB + 0.15), (0.12, 0.02, 0.12), "gold")
    else:
        for k in range(3): box((0, 0, 0.08 + k * 0.16), (1.2 - 0.25 * k, 1.2 - 0.25 * k, 0.16), "stone" if k % 2 == 0 else "stone2", bevel=0.02)
        box((0, 0, 0.62), (0.55, 0.55, 0.3), "gold", bevel=0.02)
        CURm = None
        n0 = len(BASE)
        mini_duck(Vector((0, 0.05, 0.77)), s=1.8, helmet=False)
        for o in BASE[n0:]: o.data.materials[0] = M["gold"]
        cyl((0, 0.0, 1.62), 0.17, 0.1, "gold"); sph((0, -0.17, 1.55), (0.23, 0.15, 0.03), "gold")
        rod((0.32, -0.15, 0.85), (0.4, -0.25, 1.4), 0.025, "gold")
        for sx in (1, -1):
            for sy in (1, -1):
                rod((sx * 0.62, sy * 0.62, 0), (sx * 0.62, sy * 0.62, 0.6), 0.03, "iron"); rod((sx * 0.62, sy * 0.62, 0.6), (sx * 0.62, sy * 0.62, 0.75), 0.05, "ember", r2=0.0)
        flag((0.75, 0.75, 0), 1.6); flag((-0.75, 0.75, 0), 1.6)

elif DEF == "builder":   # builder's tool shed
    HB = 0.7
    box((0, 0.1, 0.32), (0.75, 0.55, 0.64), "wood2", bevel=0.02)
    box((0, 0.1, 0.68), (0.9, 0.7, 0.05), "zinc", rot=(-12, 0, 0), bevel=0.01)
    box((0, -0.18, 0.28), (0.25, 0.02, 0.45), "dark", bevel=0)
    rod((0.42, -0.25, 0.0), (0.42, -0.2, 0.45), 0.02, "wood"); box((0.42, -0.2, 0.47), (0.12, 0.05, 0.05), "iron", bevel=0.01)
    box((-0.42, -0.25, 0.25), (0.02, 0.35, 0.12), "steel", rot=(0, 70, 0), bevel=0)
    cyl((0.3, -0.45, 0.1), 0.09, 0.2, "toyY"); cyl((0.3, -0.45, 0.205), 0.08, 0.01, "toyO")
    for k in range(3): box((-0.3 + 0.03 * k, -0.42, 0.04 + 0.05 * k), (0.4, 0.08, 0.04), "wood", rot=(0, 0, 8 * k), bevel=0.005)
    mini_duck(Vector((0.05, -0.45, 0.0)), s=0.8, helmet=True)

elif DEF == "wall":   # chunky wall blocks (STATE: post/linkx/linky): posts at tile centres, links fill half a tile towards a neighbour
    T = S   # 1..6 tier: straw-rope hay bales, bamboo bundles, rusty zinc, log palisade, sandbags, spiked brick
    def recol(name, rgb):
        M[name].node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (*rgb, 1)
    # walls sit in full sun, so use deeper colours than the buildings do
    recol("hay", (0.78, 0.52, 0.1)); recol("bamboo", (0.42, 0.55, 0.12)); recol("rope", (0.55, 0.42, 0.22))
    recol("zinc", (0.42, 0.46, 0.5)); recol("rust", (0.45, 0.18, 0.06)); recol("sand", (0.55, 0.43, 0.24))
    recol("brick", (0.5, 0.17, 0.09)); recol("stone", (0.36, 0.34, 0.33)); recol("wood", (0.4, 0.24, 0.1)); recol("wood2", (0.5, 0.31, 0.14))
    H = [0.5, 0.6, 0.62, 0.7, 0.58, 0.76][T - 1]; HB = H
    piece = STATE or "post"
    W, LW = 0.66, 0.5        # post width, link thickness
    random.seed(7 + T)
    def bands(cx, cy, sx, sy, zs, m, t=0.035):
        for z in zs: box((cx, cy, z), (sx + 0.03, sy + 0.03, t), m, bevel=0.006)
    def seg(dx, dy):
        L = 0.5; ex, ey = dx * L, dy * L; cx, cy = ex / 2, ey / 2
        sx, sy = (L + 0.02, LW) if dx else (LW, L + 0.02)
        if T == 1:
            box((cx, cy, H * 0.45), (sx, sy * 0.92, H * 0.9), "hay", bevel=0.05)
            bands(cx, cy, sx * 0.98, sy * 0.92, (H * 0.25, H * 0.62), "ropeP")
        elif T == 2:
            for row in (-1, 1):
                for k in range(3):
                    t = (k + 0.5) / 3; ox, oy = (ex * t, row * 0.13) if dx else (row * 0.13, ey * t)
                    rod((ox, oy, 0), (ox, oy, H * (0.92 + 0.08 * ((k + row) % 2))), 0.07, "bamboo")
            bands(cx, cy, sx, sy * 0.7, (H * 0.3, H * 0.7), "rope", 0.03)
        elif T == 3:
            box((cx, cy, H * 0.48), (sx, sy * 0.8, H * 0.96), "zinc", bevel=0.01)
            for k in range(5):
                t = (k + 0.5) / 5
                for side in (-1, 1):
                    ox, oy = (ex * t, side * sy * 0.41) if dx else (side * sx * 0.41, ey * t)
                    box((ox, oy, H * 0.48), (0.03 if dx else 0.03, 0.03, H * 0.94), "zinc", bevel=0.004)
            for k in range(3): sph((ex * random.uniform(0.15, 0.85), ey * random.uniform(0.15, 0.85) + (0 if dy else -sy * 0.4), random.uniform(0.15, H * 0.8)), (0.07, 0.03, 0.06), "rust")
        elif T == 4:
            for row in (-1, 1):
                for k in range(3):
                    t = (k + 0.5) / 3; ox, oy = (ex * t, row * 0.12) if dx else (row * 0.12, ey * t)
                    hh = H * (0.88 + 0.08 * ((k + row) % 2))
                    rod((ox, oy, 0), (ox, oy, hh), 0.085, "wood2" if (k + row) % 2 else "wood"); rod((ox, oy, hh), (ox, oy, hh + 0.12), 0.085, "wood", r2=0.0)
            bands(cx, cy, sx, sy * 0.6, (H * 0.55,), "iron", 0.04)
        elif T == 5:
            for row in range(3):
                for k in range(2):
                    for d2 in (-1, 1):
                        t = (k + 0.5 + 0.25 * (row % 2)) / 2.1; ox, oy = (ex * t, d2 * 0.12) if dx else (d2 * 0.12, ey * t)
                        sph((ox, oy, 0.09 + row * 0.17), (0.15 if dx else 0.12, 0.12 if dx else 0.15, 0.09), "sand")
        else:
            box((cx, cy, H * 0.45), (sx, sy, H * 0.9), "brick", bevel=0.015)
            for z in (H * 0.3, H * 0.6): box((cx, cy, z), (sx + 0.01, sy + 0.01, 0.015), "stone", bevel=0)
            box((cx, cy, H * 0.92), (sx, sy + 0.06, 0.06), "stone", bevel=0.01)
            for k in range(2): spike((ex * (k + 0.5) / 2, ey * (k + 0.5) / 2, H * 0.95), (0, 0, 1), 0.2, 0.045)
    if piece == "post":
        if T == 1:
            box((0, 0, H * 0.5), (W, W, H), "hay", bevel=0.06); bands(0, 0, W, W, (H * 0.28, H * 0.7), "ropeG")
            sph((0, 0, H + 0.02), (0.1, 0.1, 0.05), "ropeP")
        elif T == 2:
            for k in range(7):
                a = k / 7 * 6.283; r = 0 if k == 0 else 0.2
                ox, oy = (0, 0) if k == 0 else (r * math.cos(a), r * math.sin(a))
                rod((ox, oy, 0), (ox, oy, H * (1.15 if k == 0 else 1.0 + 0.06 * (k % 2))), 0.08, "bamboo")
            tor((0, 0, H * 0.35), 0.29, 0.03, "rope"); tor((0, 0, H * 0.75), 0.29, 0.03, "rope")
        elif T == 3:
            box((0, 0, H * 0.52), (W * 0.92, W * 0.92, H * 1.04), "zinc", bevel=0.015)
            box((0, 0, H * 1.06), (W, W, 0.05), "zinc", bevel=0.01)
            for k in range(3): sph((random.uniform(-0.2, 0.2), -W * 0.46, random.uniform(0.15, H * 0.85)), (0.08, 0.02, 0.07), "rust")
        elif T == 4:
            rod((0, 0, 0), (0, 0, H * 1.1), 0.2, "wood"); rod((0, 0, H * 1.1), (0, 0, H * 1.1 + 0.22), 0.2, "wood", r2=0.0)
            tor((0, 0, H * 0.4), 0.2, 0.03, "iron"); tor((0, 0, H * 0.8), 0.2, 0.03, "iron")
        elif T == 5:
            for row in range(4):
                for k in range(4):
                    a = k * math.pi / 2 + (0.785 if row % 2 else 0)
                    sph((0.15 * math.cos(a), 0.15 * math.sin(a), 0.09 + row * 0.16), (0.16, 0.13, 0.09), "sand", rot=(0, 0, math.degrees(a)))
        else:
            box((0, 0, H * 0.52), (W, W, H * 1.04), "brick", bevel=0.02)
            for z in (H * 0.3, H * 0.62): box((0, 0, z), (W + 0.01, W + 0.01, 0.015), "stone", bevel=0)
            box((0, 0, H * 1.07), (W + 0.08, W + 0.08, 0.07), "stone", bevel=0.015)
            spike((0, 0, H * 1.1), (0, 0, 1), 0.3, 0.06)
            for sx2 in (1, -1):
                for sy2 in (1, -1): spike((sx2 * 0.25, sy2 * 0.25, H * 1.1), (sx2 * 0.4, sy2 * 0.4, 1), 0.2, 0.04)
    elif piece == "linkx":
        seg(1, 0)
    else:
        seg(0, 1)

elif DEF.startswith("trap"):
    box((0, 0, -0.03), (0.7, 0.7, 0.06), "grass", bevel=0.03)
elif DEF == "wall":
    pass
elif PAD != 1.9:
    box((0, 0, -0.05), (PAD, PAD, 0.1), "grass", bevel=0.05)
    box((0, 0, 0.005), (PAD - 0.3, PAD - 0.3, 0.02), "dirt", bevel=0.02)
else:
    box((0, 0, -0.05), (1.9, 1.9, 0.1), "grass", bevel=0.05)
    box((0, 0, 0.005), (1.6, 1.6, 0.02), "dirt", bevel=0.02)
GROUND = list(BASE); BASE.clear()

S = STAGE
if DEF == "aa":   # multi-barrel water gun AA
    HB = [0.35, 0.45, 0.55, 0.6, 0.7][S - 1]
    if S == 1:
        box((0, 0, 0.17), (0.7, 0.7, 0.34), "wood2", bevel=0.03)
        for k in range(3): box((0, -0.36, 0.06 + k * 0.11), (0.72, 0.02, 0.03), "wood", bevel=0.005)
    elif S == 2:
        box((0, 0, 0.22), (0.75, 0.75, 0.44), "wood2", bevel=0.03)
        for a in range(8):
            ang = a * math.pi / 4; sph((0.55 * math.cos(ang), 0.55 * math.sin(ang), 0.1), (0.16, 0.1, 0.09), "sand")
    elif S == 3:
        box((0, 0, 0.27), (0.85, 0.85, 0.54), "brick", bevel=0.03)
        for z in (0.12, 0.3, 0.46): box((0, -0.43, z), (0.86, 0.01, 0.02), "stone", bevel=0)
    elif S == 4:
        box((0, 0, 0.3), (0.9, 0.9, 0.6), "stone", bevel=0.04)
        box((0, 0, 0.58), (0.96, 0.96, 0.06), "gold", bevel=0.02)
        for sx in (1, -1):
            for sy in (1, -1): box((0.4 * sx, 0.4 * sy, 0.68), (0.12, 0.12, 0.16), "stone", bevel=0.02)
    else:
        cyl((0, 0, 0.35), 0.55, 0.7, "stone2", v=8)
        spike_ring((0, 0), 0.58, 8, 0.22, 0.04, 0.3)
        cyl((0, 0, 0.7), 0.6, 0.06, "gold", v=8)
        for k in range(8):
            a = k * math.pi / 4 + math.pi / 8; box((0.55 * math.cos(a), 0.55 * math.sin(a), 0.8), (0.13, 0.13, 0.16), "stone", rot=(0, 0, math.degrees(a)), bevel=0.02)
        flag((-0.6, 0.6, 0.0), 1.5)
    # turntable ring (base)
    cyl((0, 0, HB + 0.03), 0.3, 0.06, "iron")
    CUR = HEAD
    cyl((0, 0, HB + 0.1), 0.26 + 0.02 * S, 0.1, ["toyO", "toyG", "gunmetal", "dark", "dark"][S - 1])
    if S >= 4: spike_ring((0, 0), 0.3 + 0.02 * S, 8 if S == 4 else 12, 0.14, 0.03, HB + 0.1, "steel" if S == 4 else "gold")
    # big water jug tank
    jr = 0.17 + 0.02 * S
    sph((0, 0.12, HB + 0.32), (jr, jr, jr * 1.15), "jug" if S < 4 else "jug2")
    if S >= 3:
        for z in (-0.06, 0.08): tor((0, 0.12, HB + 0.32 + z), jr * 0.98, 0.014, "iron" if S < 5 else "gold")
    cyl((0, 0.12, HB + 0.32 + jr * 1.1), 0.06, 0.08, "toyY")
    # barrels angled up 40 deg toward -Y
    nb = [1, 2, 3, 4, 6][S - 1]
    up = math.radians(40)
    d = Vector((0, -math.cos(up), math.sin(up)))
    bl = 0.5 + 0.04 * S
    for i in range(nb):
        if nb == 6:
            a = i * math.pi / 3; off = Vector((0.09 * math.cos(a), 0.09 * math.sin(a) * math.sin(up), 0.09 * math.sin(a) * math.cos(up)))
        else:
            off = Vector(((i - (nb - 1) / 2) * 0.12, 0, 0))
        p0 = Vector((0, -0.08, HB + 0.25)) + off
        rod(p0, p0 + d * bl, 0.04 + 0.006 * S, ["toyO", "toyG", "gunmetal", "dark", "dark"][S - 1])
        rod(p0 + d * bl, p0 + d * (bl + 0.08), 0.055 + 0.005 * S, ["toyY", "toyY", "redrub", "redrub", "gold"][S - 1], r2=0.035)
        if S >= 3: tor(tuple(p0 + d * (bl * 0.5)), 0.05 + 0.006 * S, 0.012, "iron" if S < 5 else "gold", rot=(90 - 40, 0, 0))
        cyl(tuple(p0 + d * (bl + 0.09)), 0.02, 0.01, "black", rot=(-50, 0, 0))
    sph((0, -0.05, HB + 0.25), (0.13 + 0.01 * S,) * 3, ["toyY", "toyY", "gunmetal", "dark", "dark"][S - 1])
    if S >= 4:   # armor shield plate with spikes
        box((0, -0.2, HB + 0.18), (0.42 + 0.05 * S, 0.04, 0.2), "dark", rot=(-20, 0, 0), bevel=0.02)
        for xx in (-0.15, 0, 0.15): spike((xx, -0.24, HB + 0.2), (0, -1, 0.3), 0.12, 0.025, "steel" if S == 4 else "gold")
    # pump handle + hose
    rod((0.18, 0.1, HB + 0.25), (0.25, 0.25, HB + 0.55), 0.025, "iron")
    box((0.25, 0.25, HB + 0.57), (0.12, 0.05, 0.05), "toyO", bevel=0.01)
    rod((0, 0.0, HB + 0.3), (0, -0.05, HB + 0.25), 0.03, "jug")
    PIV = Vector((0, 0, HB))

elif DEF == "sling":  # giant slingshot + duck operator (ground)
    HB = [0.25, 0.3, 0.4, 0.45, 0.55][S - 1]
    if S == 1:
        cyl((0, 0, 0.12), 0.45, 0.24, "bark", v=16)
        cyl((0, 0, 0.245), 0.43, 0.01, "wood2", v=16)
    elif S == 2:
        box((0, 0, 0.15), (0.8, 0.8, 0.3), "wood2", bevel=0.03)
        for k in range(4): box((-0.3 + k * 0.2, 0, 0.305), (0.18, 0.8, 0.02), "wood", bevel=0.005)
    elif S == 3:
        box((0, 0, 0.2), (0.85, 0.85, 0.4), "stone", bevel=0.04)
    elif S == 4:
        box((0, 0, 0.22), (0.9, 0.9, 0.45), "brick", bevel=0.04)
        box((0, 0, 0.44), (0.94, 0.94, 0.05), "iron", bevel=0.02)
        for sx in (1, -1):
            for sy in (1, -1): spike((0.45 * sx, 0.45 * sy, 0.45), (sx, sy, 0.8), 0.22, 0.04)
    else:
        cyl((0, 0, 0.27), 0.58, 0.55, "stone2", v=8)
        cyl((0, 0, 0.55), 0.62, 0.05, "gold", v=8)
        spike_ring((0, 0), 0.6, 8, 0.25, 0.045, 0.45)
        for k in range(8):
            a3 = k * math.pi / 4 + math.pi / 8; box((0.585 * math.cos(a3), 0.585 * math.sin(a3), 0.3), (0.04, 0.16, 0.5), "red", rot=(0, 0, math.degrees(a3)), bevel=0.005)
        flag((0.6, 0.6, 0.0), 1.5)
    # ammo pile (base)
    for k in range(6):
        sph((0.5 + 0.08 * (k % 3), 0.5 - 0.08 * (k // 3), HB * 0.3 + 0.07 + 0.06 * (k // 3)), (0.07,) * 3, "rock")
    cyl((0, 0, HB + 0.02), 0.3, 0.04, "iron")
    CUR = HEAD
    fr = ["bark", "wood2", "wood", "dark", "dark"][S - 1]
    sc = [0.8, 0.95, 1.1, 1.25, 1.4][S - 1]
    nt = [2, 2, 3, 4, 5][S - 1]
    base = Vector((0, -0.15, HB))
    C = base + Vector((0, 0, 0.42 * sc))
    rod(base, C, (0.05 + 0.012 * S) * sc, fr)
    tips = []
    for i in range(nt):
        t = (i / (nt - 1)) * 2 - 1
        T = C + Vector(((0.34 if nt < 4 else 0.42) * sc * t, -0.05, (0.42 - 0.06 * abs(t) * (nt > 3)) * sc + (0.08 * sc if nt % 2 == 1 and i == nt // 2 else 0)))
        rod(C, T, (0.045 + 0.01 * S) * sc, fr, r2=(0.032 + 0.008 * S) * sc)
        tips.append(T)
    sph(tuple(C), ((0.07 + 0.01 * S) * sc,) * 3, fr)
    for T in tips:
        if S >= 2: tor(tuple(T - Vector((0, 0, 0.1 * sc))), 0.045 * sc, 0.014, "rope" if S < 4 else "gold")
        if S >= 4:
            spike(T, (0, 0, 1), 0.16 * sc, 0.03 * sc, "steel" if S == 4 else "gold")
            spike(T, (T.x - C.x, -0.2, 0.3), 0.12 * sc, 0.022 * sc, "steel")
        else:
            sph(tuple(T), (0.045 * sc,) * 3, fr)
    if S >= 3:   # iron bands / studs on trunk
        for z in (0.15, 0.3):
            tor(tuple(base + Vector((0, 0, z * sc))), (0.07 + 0.012 * S) * sc, 0.016, "iron" if S < 5 else "gold")
    if S >= 4:   # chain draped between outer tips
        A0, A1 = tips[0], tips[-1]
        for k in range(9):
            t = k / 8; p = A0 + (A1 - A0) * t + Vector((0, -0.02, -0.18 * sc * math.sin(math.pi * t)))
            tor(tuple(p), 0.025, 0.008, "steel", rot=(90 if k % 2 else 0, 0, 90))
    P = Vector((0, 0.34, HB + 0.33 + 0.04 * S))
    band = ["rubber", "rubber", "rubber", "redrub", "redrub"][S - 1]
    for T in tips: rod(T, P, 0.016 + 0.004 * S, band)
    sph(tuple(P), (0.07 + 0.012 * S, 0.05, 0.06 + 0.01 * S), "leather")
    if S <= 3:
        sph(tuple(P + Vector((0, -0.02, 0.03))), ((0.05 + 0.01 * S),) * 3, "rock")
    elif S == 4:
        sph(tuple(P + Vector((0, -0.02, 0.04))), (0.08,) * 3, "dark")
        for k in range(8):
            a2 = k * math.pi / 4; spike(P + Vector((0.07 * math.cos(a2), -0.02, 0.04 + 0.07 * math.sin(a2))), (math.cos(a2), -0.3, math.sin(a2)), 0.06, 0.018)
    else:
        sph(tuple(P + Vector((0, -0.02, 0.05))), (0.1,) * 3, "lava")
        for k in range(5):
            a2 = k * 2 * math.pi / 5
            rod(P + Vector((0.05 * math.cos(a2), -0.02 + 0.05 * math.sin(a2), 0.1)), P + Vector((0.04 * math.cos(a2), 0.02 * math.sin(a2), 0.3)), 0.035, "lava", r2=0.0)
    mini_duck(Vector((0, 0.44, HB)), s=1.15)
    if S == 5:
        box((0, 0.42, HB + 0.42), (0.3, 0.02, 0.05), "red", bevel=0.01)
    PIV = Vector((0, 0, HB))

elif DEF == "boxtower":   # cardboard-box tower with slingshot ducks (archer tower)
    HB = [0.45, 0.8, 1.1, 1.25, 1.4][S - 1]
    nbox = [1, 2, 3, 3, 4][S - 1]
    z = 0; sizes = []
    for i in range(nbox):
        w = 0.85 - 0.06 * i; h = HB / nbox
        rz = random.uniform(-6, 6) if S < 4 else random.uniform(-2, 2)
        box((random.uniform(-0.02, 0.02), random.uniform(-0.02, 0.02), z + h / 2), (w, w, h), "card" if i % 2 == 0 else "card2", rot=(0, 0, rz), bevel=0.015)
        box((0, 0, z + h - 0.001), (w * 1.002, 0.09, 0.012), "tape", rot=(0, 0, rz), bevel=0.0)
        box((0, -w / 2 - 0.002, z + h * 0.75), (0.09, 0.012, h * 0.5), "tape", rot=(0, 0, rz), bevel=0.0)
        if S >= 2 and i % 2 == 1:
            box((0.18, -w / 2 - 0.004, z + h * 0.4), (0.22, 0.01, 0.06), "red", rot=(0, 0, rz), bevel=0.0)
        for sx in (1, -1):   # printed arrows / handle holes
            box((sx * (w / 2 + 0.002), 0, z + h * 0.65), (0.01, 0.14, 0.05), "black", bevel=0.0)
        if S >= 4:
            for sx in (1, -1):
                for sy in (1, -1):
                    box((sx * w / 2, sy * w / 2, z + h / 2), (0.06, 0.06, h * 1.02), "dark" if S == 4 else "gold", bevel=0.01)
                    spike((sx * w / 2, sy * w / 2, z + h * 0.6), (sx, sy, 0.3), 0.14, 0.03, "steel" if S == 4 else "gold")
        sizes.append(w); z += h
    # crenellation of small boxes on top edge
    w = sizes[-1]
    if S >= 3:
        for k in range(4):
            for sx, sy in ((1, 1), (-1, 1), (1, -1), (-1, -1)):
                pass
        for (x, y) in [(w / 2 - 0.08, w / 2 - 0.08), (-w / 2 + 0.08, w / 2 - 0.08), (w / 2 - 0.08, -w / 2 + 0.08), (-w / 2 + 0.08, -w / 2 + 0.08)]:
            box((x, y, HB + 0.08), (0.16, 0.16, 0.16), "card2", rot=(0, 0, random.uniform(-10, 10)), bevel=0.01)
    if S == 5:
        flag((w / 2 - 0.05, w / 2 - 0.05, HB + 0.16), 0.9)
        for k in range(4):
            a3 = k * math.pi / 2; box((0.43 * math.cos(a3), 0.43 * math.sin(a3), HB * 0.55), (0.03 if k % 2 == 0 else 0.25, 0.25 if k % 2 == 0 else 0.03, 0.4), "red", bevel=0.005)
    cyl((0, 0, HB + 0.01), 0.25, 0.02, "iron")
    CUR = HEAD
    nd = [1, 1, 2, 2, 3][S - 1]
    xs = {1: [0], 2: [-0.17, 0.17], 3: [-0.24, 0, 0.24]}[nd]
    for x in xs:
        dc = Vector((x, 0.05, HB + 0.01))
        mini_duck(dc, s=0.85)
        fm = ["wood2", "wood2", "wood", "dark", "gold"][S - 1]
        G = dc + Vector((0, -0.2, 0.2)); Cc = G + Vector((0, -0.03, 0.08))
        rod(G, Cc, 0.018, fm)
        T1 = Cc + Vector((-0.06, -0.01, 0.08)); T2 = Cc + Vector((0.06, -0.01, 0.08))
        rod(Cc, T1, 0.016, fm); rod(Cc, T2, 0.016, fm)
        Pp = dc + Vector((0, -0.08, 0.3))
        rod(T1, Pp, 0.007, "rubber" if S < 4 else "redrub"); rod(T2, Pp, 0.007, "rubber" if S < 4 else "redrub")
        sph(tuple(Pp), (0.025,) * 3, "rock" if S < 5 else "lava")
    PIV = Vector((0, 0, HB))

elif DEF == "mortar":   # pressure-cooker meatball mortar
    HB = fort_base(S)
    for k in range(6):
        p = Vector((0.42 + 0.09 * (k % 3), -0.45 + 0.09 * (k // 3), HB * 0.0 + 0.06 + 0.07 * (k // 3)))
        if S < 4: sph(tuple(p), (0.06,) * 3, "meat")
        elif S == 4:
            sph(tuple(p), (0.06,) * 3, "dark"); spike(p, (0, 0, 1), 0.06, 0.015)
        else: sph(tuple(p), (0.065,) * 3, "lava")
    cyl((0, 0, HB + 0.03), 0.32, 0.06, "iron")
    CUR = HEAD
    cyl((0, 0, HB + 0.1), 0.3 + 0.02 * S, 0.1, ["wood", "gunmetal", "gunmetal", "dark", "dark"][S - 1])
    up = math.radians(55); d = Vector((0, -math.cos(up), math.sin(up)))
    n = S; pm = ["steel", "steel", "steel", "dark", "dark"][S - 1]; rm = ["steel", "iron", "iron", "steel", "gold"][S - 1]
    r = 0.1 + 0.012 * S
    for i in range(n):
        off = Vector(((i - (n - 1) / 2) * (2.1 * r), 0.05 * abs(i - (n - 1) / 2), 0))
        p0 = Vector((0, 0.05, HB + 0.2)) + off
        rod(p0 - d * 0.1, p0 + d * 0.28, r, pm)
        qtor(tuple(p0 + d * 0.28), r, 0.02, d, rm)
        qdisc(tuple(p0 + d * 0.285), r * 0.85, 0.01, d, "lava" if S == 5 else "black")
        for sx in (1, -1): box(tuple(p0 + d * 0.15 + Vector((sx * (r + 0.03), 0, 0))), (0.06, 0.03, 0.025), "black", bevel=0.005)
        vp = p0 + d * 0.08 + Vector((0, 0.07, 0.09))
        cyl(tuple(vp), 0.02, 0.06, "black"); sph(tuple(vp + Vector((0, 0, 0.04))), (0.025,) * 3, "red" if S < 5 else "gold")
        if S >= 2:
            for k in range(3): sph(tuple(vp + Vector((0.02 * k, 0.02 * k, 0.09 + 0.06 * k))), ((0.03 + 0.012 * k),) * 3, "white")
        if S >= 3: qtor(tuple(p0 + d * 0.05), r * 1.03, 0.014, d, "iron" if S < 5 else "gold")
        if S >= 4:
            for a2 in (0, math.pi):
                spike(p0 + d * 0.05 + Vector((math.cos(a2) * r, 0, 0)), (math.cos(a2), 0.2, 0.3), 0.1, 0.022, "steel" if S == 4 else "gold")
    PIV = Vector((0, 0, HB))

elif DEF == "lens":   # magnifying-glass sun beam (inferno-like)
    HB = [0.6, 0.75, 0.9, 1.0, 1.15][S - 1]
    if S == 1:
        box((0, 0, 0.1), (0.5, 0.5, 0.2), "wood2", bevel=0.03); rod((0, 0, 0.2), (0, 0, HB), 0.07, "wood")
    elif S == 2:
        for k in range(3):
            a2 = k * 2 * math.pi / 3; rod((0.35 * math.cos(a2), 0.35 * math.sin(a2), 0), (0, 0, HB), 0.05, "wood")
        box((0, 0, HB - 0.03), (0.3, 0.3, 0.06), "wood2")
    elif S == 3:
        box((0, 0, HB / 2), (0.55, 0.55, HB), "brick", bevel=0.03)
        for z in (0.2, 0.45, 0.7): box((0, -0.28, z), (0.56, 0.01, 0.02), "stone", bevel=0)
    elif S == 4:
        box((0, 0, HB / 2), (0.6, 0.6, HB), "stone2", bevel=0.04)
        box((0, 0, HB - 0.03), (0.7, 0.7, 0.06), "dark", bevel=0.02)
        for sx in (1, -1):
            for sy in (1, -1): spike((0.33 * sx, 0.33 * sy, HB - 0.05), (sx, sy, 0.6), 0.2, 0.04)
    else:
        cyl((0, 0, HB / 2), 0.4, HB, "stone2", v=8)
        for z in (0.3, 0.7, HB - 0.03): cyl((0, 0, z), 0.43, 0.05, "gold", v=8)
        spike_ring((0, 0), 0.42, 8, 0.22, 0.04, HB - 0.1, "gold")
        flag((0.55, 0.55, 0.0), 1.9)
    cyl((0, 0, HB + 0.02), 0.22, 0.05, "iron")
    CUR = HEAD
    beam = Vector((0, -0.55, -0.83)).normalized()
    nl = [1, 1, 2, 3, 3][S - 1]; R0 = [0.2, 0.25, 0.25, 0.27, 0.32][S - 1]
    rimm = ["wood", "gold", "gold", "dark", "gold"][S - 1]; armm = ["wood", "wood2", "iron", "dark", "dark"][S - 1]
    cyl((0, 0, HB + 0.08), 0.18, 0.08, armm)
    for i in range(nl):
        x = [0, -0.3, 0.3][i] if nl > 1 else 0
        rr = R0 if i == 0 else R0 * 0.7
        c = Vector((x, -0.2, HB + 0.5 - (0 if i == 0 else 0.12)))
        rod((0, 0, HB + 0.1), c + Vector((0, 0.05, -rr * 0.7)), 0.03, armm)
        qdisc(tuple(c), rr, 0.035, beam, "glass")
        qtor(tuple(c), rr, 0.028, beam, rimm)
        if S >= 4:
            for a2 in range(4):
                spike(c + Vector((math.cos(a2 * 1.57) * rr, 0, math.sin(a2 * 1.57) * rr)), (math.cos(a2 * 1.57), 0.2, math.sin(a2 * 1.57)), 0.09, 0.02, "steel" if S == 4 else "gold")
        if S >= 3:
            sph(tuple(c + beam * 0.35), ((0.04 + 0.01 * S),) * 3, "lava")
    PIV = Vector((0, 0, HB))

elif DEF == "rocket":   # matchbox firework battery
    HB = fort_base(S)
    cyl((0, 0, HB + 0.03), 0.32, 0.06, "iron")
    CUR = HEAD
    cyl((0, 0, HB + 0.1), 0.28 + 0.02 * S, 0.1, ["wood", "gunmetal", "gunmetal", "dark", "dark"][S - 1])
    rows, cols = [(1, 2), (2, 2), (2, 3), (3, 3), (3, 4)][S - 1]
    tilt = math.radians(25); d = Vector((0, -math.cos(tilt), math.sin(tilt))); u = Vector((0, math.sin(tilt), math.cos(tilt)))
    W = 0.16 * cols + 0.1; Hh = 0.15 * rows + 0.08; L = 0.5 + 0.03 * S
    c = Vector((0, 0.02, HB + 0.15 + Hh / 2))
    bm = ["wood2", "wood2", "toyY", "dark", "dark"][S - 1]
    box(tuple(c), (W, L, Hh), bm, rot=(-25, 0, 0), bevel=0.02)
    for sx in (1, -1):   # matchbox striker label stripes
        box(tuple(c + Vector((sx * (W / 2 + 0.005), 0, 0))), (0.01, L * 0.9, Hh * 0.5), "red" if S < 5 else "gold", rot=(-25, 0, 0), bevel=0)
        box(tuple(c + Vector((sx * (W / 2 + 0.008), 0, 0))), (0.01, L * 0.9, Hh * 0.15), "toyY" if S < 4 else "red", rot=(-25, 0, 0), bevel=0)
    for i in range(rows):
        for j in range(cols):
            off = Vector(((j - (cols - 1) / 2) * 0.16, 0, 0)) + u * ((i - (rows - 1) / 2) * 0.15)
            p0 = c + off - d * (L * 0.3); p1 = c + off + d * (L / 2 + 0.1)
            rod(p0, p1, 0.05, "red" if (i + j) % 2 == 0 else "white")
            rod(p1, p1 + d * 0.11, 0.055, "gold" if S >= 4 else "toyY", r2=0.0)
            if S == 5: sph(tuple(p0 - d * 0.02), (0.03,) * 3, "lava")
    if S >= 4:
        for k in range(cols + 1):
            spike(c + u * (Hh / 2) + Vector(((k - cols / 2) * 0.16, 0, 0)), u + Vector((0, 0.3, 0)), 0.14, 0.03, "steel" if S == 4 else "gold")
    PIV = Vector((0, 0, HB))

elif DEF == "chef":   # chef tower splashing chili
    HB = [0.6, 0.75, 0.9, 1.0, 1.1][S - 1]
    if S == 1:
        for sx in (1, -1):
            for sy in (1, -1): rod((0.32 * sx, 0.32 * sy, 0), (0.28 * sx, 0.28 * sy, HB), 0.04, "bamboo" if False else "wood")
        box((0, 0, HB - 0.03), (0.75, 0.75, 0.06), "wood2")
    elif S == 2:
        box((0, 0, HB / 2), (0.75, 0.75, HB), "wood2", bevel=0.03)
        for k in range(6): box((-0.31 + k * 0.125, -0.38, HB / 2), (0.025, 0.01, HB), "wood", bevel=0)
    elif S == 3:
        box((0, 0, HB / 2), (0.8, 0.8, HB), "brick", bevel=0.03)
    elif S == 4:
        box((0, 0, HB / 2), (0.85, 0.85, HB), "stone2", bevel=0.04)
        for sx in (1, -1):
            for sy in (1, -1): spike((0.45 * sx, 0.45 * sy, HB - 0.05), (sx, sy, 0.6), 0.22, 0.04)
    else:
        cyl((0, 0, HB / 2), 0.52, HB, "stone2", v=8)
        cyl((0, 0, HB), 0.56, 0.06, "gold", v=8)
        spike_ring((0, 0), 0.55, 8, 0.24, 0.045, HB - 0.12, "gold")
        flag((0.6, -0.6, 0.0), 2.0)
    for k in range(3):   # hanging chili strings
        x = -0.2 + 0.2 * k
        for j in range(3): rod((x, -0.42, HB - 0.08 - j * 0.09), (x, -0.43, HB - 0.15 - j * 0.09), 0.025, "chili", r2=0.003)
    CUR = HEAD
    cyl((0, 0, HB + 0.04), 0.3, 0.06, "iron")
    pr = [0.16, 0.2, 0.24, 0.27, 0.3][S - 1]; pm = ["steel", "dark", "dark", "dark", "dark"][S - 1]
    pc = Vector((0, -0.18, HB + 0.12 + pr * 0.5))
    if S >= 4:
        for k in range(5):
            a2 = k * 1.256; rod(pc + Vector((0.08 * math.cos(a2), 0.08 * math.sin(a2), -pr * 0.9)), pc + Vector((0.06 * math.cos(a2), 0.06 * math.sin(a2), -pr * 0.3)), 0.04, "lava", r2=0.0)
    sph(tuple(pc), (pr, pr, pr * 0.75), pm)
    cyl(tuple(pc + Vector((0, 0, pr * 0.55))), pr * 0.92, 0.02, "chiliG" if S == 5 else "chili")
    tor(tuple(pc + Vector((0, 0, pr * 0.55))), pr * 0.95, 0.02, "gold" if S >= 3 else "iron")
    for k in range(min(S + 1, 5)):
        a2 = k * 1.3; rod(pc + Vector((0.1 * math.cos(a2), 0.1 * math.sin(a2), pr * 0.5)), pc + Vector((0.12 * math.cos(a2), 0.12 * math.sin(a2), pr * 0.5 + 0.1)), 0.02, "chili", r2=0.003)
    mini_duck(Vector((0, 0.18, HB + 0.05)), s=1.0 + 0.05 * S, helmet=False, hat="chef")
    rod((0.15, 0.05, HB + 0.3), (0.05, -0.2, HB + 0.25 + pr), 0.015, "steel")
    sph((0.05, -0.2, HB + 0.25 + pr), (0.05, 0.05, 0.025), "steel")
    if S == 5: box((0, 0.1, HB + 0.38), (0.32, 0.02, 0.05), "red", bevel=0.01)
    PIV = Vector((0, 0, HB))

elif DEF == "fan":   # giant fan air blower
    HB = fort_base(S)
    cyl((0, 0, HB + 0.03), 0.3, 0.06, "iron")
    CUR = HEAD
    R2 = [0.28, 0.33, 0.38, 0.42, 0.47][S - 1]
    cage = ["white", "white", "steel", "dark", "gold"][S - 1]; blade = ["blue", "toyG", "toyO", "redrub", "redrub"][S - 1]
    rod((0, 0.05, HB + 0.05), (0, 0.05, HB + 0.25 + R2), 0.05, ["white", "white", "gunmetal", "dark", "dark"][S - 1])
    c = Vector((0, -0.05, HB + 0.3 + R2))
    sph(tuple(c + Vector((0, 0.15, 0))), (0.14, 0.18, 0.14), ["white", "white", "gunmetal", "dark", "dark"][S - 1])
    n_ = Vector((0, -1, 0))
    for rr in (R2, R2 * 0.66, R2 * 0.33):
        qtor(tuple(c + Vector((0, -0.04, 0))), rr, 0.012 + 0.002 * S, n_, cage)
    nsp = 8 + 2 * S
    for k in range(nsp // 2):
        a2 = k * 2 * math.pi / nsp
        rod(c + Vector((R2 * math.cos(a2), -0.04, R2 * math.sin(a2))), c + Vector((-R2 * math.cos(a2), -0.04, -R2 * math.sin(a2))), 0.006, cage)
    nb = [3, 3, 4, 5, 5][S - 1]
    for k in range(nb):
        a2 = k * 2 * math.pi / nb
        a2 = a2 + (math.radians(180 / nb) if STATE == "blade2" else 0)
        bc = c + Vector((R2 * 0.45 * math.cos(a2), 0.0, R2 * 0.45 * math.sin(a2)))
        sph(tuple(bc), (R2 * 0.42, 0.012, R2 * 0.2), blade, rot=(0, -math.degrees(a2), 0))
    sph(tuple(c + Vector((0, -0.05, 0))), (0.06, 0.04, 0.06), "gold" if S == 5 else cage)
    if S >= 4:
        for k in range(8):
            a2 = k * math.pi / 4
            spike(c + Vector((R2 * math.cos(a2), -0.04, R2 * math.sin(a2))), (math.cos(a2), -0.3, math.sin(a2)), 0.12, 0.025, "steel" if S == 4 else "gold")
    PIV = Vector((0, 0, HB))

elif DEF == "racket":   # hidden mosquito racket (tesla) - static
    box((0, 0, 0.03), (1.3, 1.3, 0.06), ["dirt", "wood2", "stone", "stone2", "stone2"][S - 1], bevel=0.03)
    if S == 5: box((0, 0, 0.065), (1.35, 1.35, 0.02), "gold", bevel=0.01)
    if STATE == "hidden":
        sph((0, 0, 0.05), (0.55, 0.55, 0.14), "dirt")
        cyl((0, 0, 0.18), 0.36, 0.04, ["wood", "wood", "iron", "dark", "dark"][S - 1])
        for k in range(3 + S):
            a2 = k * 2 * math.pi / (3 + S); sph((0.2 * math.cos(a2), 0.2 * math.sin(a2), 0.21), (0.03,) * 3, "zap")
        box((0.38, -0.38, 0.2), (0.16, 0.02, 0.12), "toyY", bevel=0.01); rod((0.38, -0.38, 0), (0.38, -0.38, 0.14), 0.012, "wood")
    else:
        cyl((0, 0, 0.09), 0.3, 0.06, "dark")
        nr = [1, 1, 2, 2, 3][S - 1]; sc = [1.3, 1.45, 1.55, 1.7, 1.85][S - 1]
        for i in range(nr):
            x = [0, -0.36, 0.36][i] if nr == 3 else ([0] if nr == 1 else [-0.26, 0.26])[i]
            hm = ["toyY", "toyY", "gunmetal", "dark", "gold"][S - 1]
            rod((x, 0, 0.1), (x, 0, 0.1 + 0.45 * sc), 0.035, hm)
            hc = Vector((x, 0, 0.1 + 0.45 * sc + 0.28 * sc))
            tor(tuple(hc), 1.0, 0.025, ["blue", "blue", "iron", "dark", "gold"][S - 1], rot=(90, 0, 0), sc=(0.2 * sc, 0.28 * sc, 1))
            sph(tuple(hc), (0.2 * sc, 0.008, 0.28 * sc), "glass")
            for k in range(6 + 2 * S):
                a2 = random.uniform(0, 6.28); rr = random.uniform(0.05, 0.25) * sc
                sph(tuple(hc + Vector((rr * 0.75 * math.cos(a2), -0.02, rr * math.sin(a2)))), (0.022,) * 3, "zap")
            if S >= 4:
                for a2 in range(6):
                    spike(hc + Vector((0.2 * sc * math.cos(a2 * 1.05), 0, 0.28 * sc * math.sin(a2 * 1.05))), (math.cos(a2 * 1.05), 0, math.sin(a2 * 1.05)), 0.1, 0.02, "steel" if S == 4 else "gold")
    HB = 0.1; PIV = Vector((0, 0, 0.1))

elif DEF == "mtrap":   # giant mousetrap vs heavy troops - static
    sc = [1.1, 1.25, 1.35, 1.45, 1.55][S - 1]
    bw, bl = 0.7 * sc, 1.0 * sc
    box((0, 0, 0.05), (bw, bl, 0.1), ["wood2", "wood2", "wood", "dark", "dark"][S - 1], bevel=0.02)
    if S == 5:
        box((0, 0, 0.105), (bw + 0.04, bl + 0.04, 0.02), "gold", bevel=0.01)
    for sx in (1, -1): tor((sx * bw * 0.32, 0.05, 0.14), 0.05, 0.015, "steel", rot=(0, 90, 0))
    cheese = Vector((0, -bl * 0.25, 0.16))
    box(tuple(cheese), (0.16 * sc, 0.12 * sc, 0.1 * sc), "cheese", rot=(0, 0, 20), bevel=0.02)
    for k in range(4): sph(tuple(cheese + Vector((0.03 * (k - 1.5), -0.061 * sc, 0.01 * (k % 2)))), (0.012,) * 3, "dark")
    if S >= 4:
        for sx in (1, -1):
            for sy in (1, -1): spike((sx * bw / 2, sy * bl / 2, 0.1), (sx, sy, 0.5), 0.18, 0.035, "steel" if S == 4 else "gold")
    bar_m = ["steel", "steel", "iron", "dark", "gold"][S - 1]
    if STATE == "snap":
        pts = [(-bw * 0.4, 0.05, 0.14), (-bw * 0.4, -bl * 0.42, 0.14), (bw * 0.4, -bl * 0.42, 0.14), (bw * 0.4, 0.05, 0.14)]
    else:
        pts = [(-bw * 0.4, 0.05, 0.14), (-bw * 0.4, bl * 0.45, 0.14), (bw * 0.4, bl * 0.45, 0.14), (bw * 0.4, 0.05, 0.14)]
    for i in range(3): rod(pts[i], pts[i + 1], 0.025, bar_m)
    if S >= 3:
        a0, a1 = Vector(pts[1]), Vector(pts[2])
        for k in range(7):
            p = a0 + (a1 - a0) * (k / 6); spike(p, (0, 0, 1) if STATE == "snap" else (0, 0.3, 1), 0.08 + 0.03 * (S - 3), 0.022, "steel" if S < 5 else "gold")
    box((0, bl * 0.35, 0.13), (bw * 0.8, 0.05, 0.04), bar_m, bevel=0.01)
    HB = 0.1; PIV = Vector((0, 0, 0.1))

elif DEF == "pumpY":   # honey hand-pump well
    HB = [0.5, 0.6, 0.7, 0.8, 0.9][S - 1]
    wm = ["wood2", "stone", "stone", "brick", "stone2"][S - 1]
    cyl((0, 0.15, 0.18), 0.38 + 0.02 * S, 0.36, wm, v=20)
    cyl((0, 0.15, 0.33), 0.33 + 0.02 * S, 0.04, "honey", v=20)
    tor((0, 0.15, 0.36), 0.38 + 0.02 * S, 0.03, "wood" if S < 5 else "gold")
    npumps = [1, 1, 2, 2, 3][S - 1]
    for i in range(npumps):
        x = (i - (npumps - 1) / 2) * 0.32
        pm = ["iron", "iron", "teal", "copper", "gold"][S - 1]
        cyl((x, -0.25, 0.3 + 0.03 * S), 0.07, 0.6 + 0.06 * S, pm)
        cyl((x, -0.25, 0.62 + 0.06 * S), 0.09, 0.06, pm)
        rod((x, -0.25, 0.55 + 0.06 * S), (x, -0.42, 0.42 + 0.05 * S), 0.025, pm)
        rod((x, -0.25, 0.62 + 0.06 * S), (x + 0.02, 0.12, 0.78 + 0.08 * S), 0.022, pm)
        sph((x + 0.02, 0.12, 0.78 + 0.08 * S), (0.035,) * 3, "red" if S < 5 else "gold")
        rod((x, -0.42, 0.38 + 0.05 * S), (x, -0.45, 0.2), 0.03, "honey")
    cyl((0, -0.5, 0.1), 0.13, 0.2, "wood" if S < 4 else "copper")
    cyl((0, -0.5, 0.19), 0.115, 0.02, "honey")
    if S >= 3:
        for k in range(3): sph((0.55 - 0.12 * k, -0.45, 0.12), (0.09, 0.09, 0.12), "honey")
    if S >= 4:
        for sx in (1, -1): tor((sx * 0.5, 0.35, 0.45), 0.14, 0.03, "copper" if S == 4 else "gold", rot=(0, 90, 0))
        cyl((-0.55, 0.45, 0.35), 0.18, 0.7, "wood2"); tor((-0.55, 0.45, 0.6), 0.185, 0.015, "iron"); tor((-0.55, 0.45, 0.15), 0.185, 0.015, "iron")
    if S == 5: flag((0.65, 0.6, 0), 1.4)

elif DEF == "blenderG":   # giant veggie blender
    HB = [0.8, 0.95, 1.05, 1.15, 1.25][S - 1]
    nj = [1, 1, 2, 2, 3][S - 1]
    bm_ = ["white", "teal", "teal", "gunmetal", "gold"][S - 1]
    box((0.08, -0.08, 0.035), (1.5, 1.3, 0.07), "wood2", bevel=0.025)               # wooden deck: everything stands on it
    for k in range(5): box((0.08, -0.08 - 0.52 + 0.26 * k, 0.072), (1.46, 0.012, 0.006), "bark", bevel=0)
    box((0, 0.05, 0.25), (0.75 + 0.1 * (nj - 1), 0.6, 0.36), bm_, bevel=0.06)
    for k in range(3): sph((-0.2 + 0.2 * k, -0.26, 0.27), (0.04, 0.02, 0.04), ["red", "green" if "green" in M else "toyG", "toyY"][k])
    for i in range(nj):
        x = (i - (nj - 1) / 2) * 0.42
        jh = 0.5 + 0.06 * S
        cyl((x, 0.05, 0.43 + jh * 0.35), 0.17, jh * 0.7, "veg", v=24)
        cyl((x, 0.05, 0.43 + jh / 2), 0.19, jh, "jarglass", v=24, bevel=0.02)
        cyl((x, 0.05, 0.43 + jh + 0.03), 0.2, 0.06, "black" if S < 5 else "gold", v=24)
        rod((x + 0.19, 0.05, 0.62), (x + 0.28, 0.05, 0.82), 0.03, "black")
        for k in range(4):
            a = k * math.pi / 2 + 0.4; sph((x + 0.09 * math.cos(a), 0.05 + 0.09 * math.sin(a), 0.52), (0.06, 0.012, 0.03), "steel")
    box((0.5, -0.5, 0.17), (0.36, 0.3, 0.2), "wood", bevel=0.015)                     # veggie crate on the deck
    for k in range(4 + S):
        a = k * 1.1; sph((0.5 + 0.09 * math.cos(a) * (k % 3) * 0.8, -0.5 + 0.06 * math.sin(a), 0.29 + 0.04 * (k % 2)), (0.08, 0.08, 0.07), "foliage2" if k % 2 else "foliage")
    if S >= 3: cyl((-0.5, -0.5, 0.17), 0.1, 0.2, "red")
    if S >= 4:
        rod((-0.4, 0.4, 0.3), (-0.6, 0.6, 0.6), 0.05, "copper"); spike((0.45, 0.35, 0.36), (1, 1, 0.5), 0.2, 0.04, "steel" if S == 4 else "gold")
    if S == 5: flag((0.65, 0.65, 0), 1.6)
    mini_duck(Vector((0.55, 0.1, 0.07)), s=0.9, helmet=False, hat=None)

elif DEF == "stoveR":   # red syrup pot on charcoal stove
    HB = [0.6, 0.7, 0.8, 1.0, 1.1][S - 1]
    ns = [1, 1, 2, 2, 1][S - 1]
    for i in range(ns):
        x = (i - (ns - 1) / 2) * 0.55
        stm = ["clay", "brick", "brick", "iron", "dark"][S - 1]
        if S < 4:
            cyl((x, 0, 0.17), 0.24, 0.34, stm, v=16); cyl((x, 0, 0.35), 0.21, 0.03, "ember", v=16)
            box((x, -0.23, 0.12), (0.14, 0.04, 0.1), "black")
        else:
            box((x, 0.02, 0.22), (0.7, 0.6, 0.44), stm, bevel=0.04); box((x, -0.29, 0.18), (0.2, 0.03, 0.14), "ember")
            cyl((x + 0.25, 0.22, 0.7), 0.07, 0.6, stm)
        pr = 0.2 + 0.04 * S if ns == 1 else 0.2 + 0.02 * S
        pz = 0.37 if S < 4 else 0.46
        pm = ["clay", "steel", "steel", "copper", "gold"][S - 1]
        sph((x, 0, pz + pr * 0.6), (pr, pr, pr * 0.75), pm)
        cyl((x, 0, pz + pr * 1.1), pr * 0.9, 0.03, "syrup", v=24)
        tor((x, 0, pz + pr * 1.12), pr * 0.92, 0.022, pm)
        for sx in (1, -1): tor((x + sx * pr, 0, pz + pr * 0.95), 0.05, 0.015, pm, rot=(90, 0, 0))
        for k in range(3): sph((x + 0.05 * k - 0.05, 0.02 * k, pz + pr * 1.3 + 0.1 * k), (0.06 + 0.02 * k,) * 3, "white")
    for k in range(5): box((0.6 - 0.07 * k, -0.55 + 0.05 * (k % 2), 0.04), (0.1, 0.07, 0.06), "black", rot=(0, 0, 20 * k), bevel=0.01)
    if S >= 2:
        for k in range(2 + S): cyl((-0.6, -0.5 + 0.13 * k, 0.12), 0.05, 0.22, "syrup")
    if S >= 4:
        rod((0.0, 0.3, 0.9), (-0.55, 0.55, 0.45), 0.04, "copper"); spike_ring((0, 0.02), 0.5, 6, 0.15, 0.03, 0.3, "steel" if S == 4 else "gold")
    if S == 5: flag((0.65, 0.65, 0), 1.7)

elif DEF in ("jarY", "jarG", "jarR"):   # glass-jar storages
    liq = {"jarY": "honey", "jarG": "veg", "jarR": "syrup"}[DEF]
    HB = [0.7, 0.85, 1.0, 1.15, 1.3][S - 1]
    r = [0.32, 0.36, 0.4, 0.44, 0.48][S - 1]
    bm_ = ["wood2", "wood2", "stone", "stone2", "stone2"][S - 1]
    cyl((0, 0, 0.06), r + 0.12, 0.12, bm_, v=8 if S >= 4 else 24, bevel=0.02)
    if S == 5: cyl((0, 0, 0.125), r + 0.13, 0.03, "gold", v=8)
    jar((0, 0, 0.12), r, HB - 0.12, liq, [0.45, 0.55, 0.65, 0.75, 0.85][S - 1], lid=["steel", "steel", "copper", "dark", "gold"][S - 1])
    if S >= 2:
        for k in range(2 if S < 4 else 3):
            tor((0, 0, 0.3 + k * (HB - 0.3) / 3), r + 0.012, 0.014, "rope" if S < 3 else ("iron" if S < 5 else "gold"))
    if S >= 3:
        for k in range(4):
            a = k * math.pi / 2 + math.pi / 4; rod((math.cos(a) * (r + 0.02), math.sin(a) * (r + 0.02), 0.12), (math.cos(a) * (r + 0.02), math.sin(a) * (r + 0.02), HB - 0.05), 0.02, "iron" if S < 5 else "gold")
    if S >= 4:
        for k in range(4):
            a = k * math.pi / 2 + math.pi / 4; spike((math.cos(a) * (r + 0.1), math.sin(a) * (r + 0.1), 0.1), (math.cos(a), math.sin(a), 0.6), 0.18, 0.035, "steel" if S == 4 else "gold")
    sph((0, -r - 0.005, HB * 0.6), (0.09, 0.01, 0.06), "cream")
    box((0, -r - 0.012, HB * 0.6), (0.11, 0.005, 0.03), {"jarY": "toyY", "jarG": "toyG", "jarR": "red"}[DEF], bevel=0)
    if S == 5: flag((r + 0.25, r + 0.25, 0), 1.6)

elif DEF == "camp":   # army camp: one trodden-dirt clearing with a log palisade; tents gathered round the campfire
    HB = [0.5, 0.55, 0.6, 0.7, 0.9][S - 1]
    cyl((0, 0, 0.012), 1.02, 0.024, "dirt", v=40, bevel=0.012)                       # the clearing ties everything together
    cyl((0.05, -0.05, 0.03), 0.3, 0.05, "stone2", v=12)
    for k in range(7): rod((0.05 + 0.2 * math.cos(k), -0.05 + 0.2 * math.sin(k), 0.05), (0.05 - 0.17 * math.cos(k), -0.05 - 0.17 * math.sin(k), 0.12), 0.03, "bark")
    for k in range(3): rod((0.05 + 0.05 * math.cos(k * 2.1), -0.05 + 0.05 * math.sin(k * 2.1), 0.08), (0.05, -0.05, 0.36), 0.055, "ember", r2=0.0)
    # palisade of short logs round the edge, gap at the front (towards the camera) as the gate
    np_ = 30
    for k in range(np_):
        a = 2 * math.pi * k / np_; ca, sa = math.cos(a), math.sin(a)
        if abs(math.atan2(sa - ca, -(ca + sa))) < 0.45: continue                     # front gate
        hgt = 0.2 + 0.05 * (k % 2) + 0.03 * S
        rod((0.97 * ca, 0.97 * sa, 0), (0.97 * ca, 0.97 * sa, hgt), 0.05, "bark")
        sph((0.97 * ca, 0.97 * sa, hgt), (0.055, 0.055, 0.03), "wood")
    for k in range(4):                                                                 # log benches facing the fire
        a = k * 1.57 + 0.78; x, y = 0.05 + 0.5 * math.cos(a), -0.05 + 0.5 * math.sin(a)
        rod((x - 0.14 * math.sin(a), y + 0.14 * math.cos(a), 0.06), (x + 0.14 * math.sin(a), y - 0.14 * math.cos(a), 0.06), 0.06, "bark")
    nt = [1, 2, 3, 4, 4][S - 1]
    tm = ["canvas", "canvas", "canvas2", "canvas2", "roofred"][S - 1]
    pos = [(-0.45, 0.45), (0.2, 0.62), (-0.62, -0.2), (0.5, 0.2)]                    # back of the clearing first
    for i in range(nt):
        x, y = pos[i]; tw = 0.5 + 0.03 * S; rz = math.atan2(-0.05 - y, 0.05 - x) - math.pi / 2
        tent((x, y, 0.0), tw, tw, 0.5 + 0.05 * S, tm, rotz=math.degrees(rz))
        rod((x, y, 0), (x, y, 0.68 + 0.05 * S), 0.015, "wood")
        if S >= 4: sph((x, y, 0.71 + 0.05 * S), (0.04,) * 3, "gold")
    if S >= 3:
        for k in range(5): sph((0.72 - 0.1 * k, -0.45 - 0.1 * k, 0.07), (0.11, 0.07, 0.07), "sand")
    if S >= 4:
        for (x, y) in ((-0.8, 0.45), (0.45, -0.8)):
            rod((x, y, 0), (x, y, 0.7), 0.03, "wood"); rod((x, y, 0.7), (x, y, 0.85), 0.05, "ember", r2=0.0)
    if S == 5: flag((-0.25, 0.8, 0), 1.8)

elif DEF == "barracks":   # training yard
    HB = [0.6, 0.8, 0.95, 1.1, 1.25][S - 1]
    if S == 1:
        for k in range(4):
            a = k * math.pi / 2 + 0.78; rod((0.7 * math.cos(a), 0.7 * math.sin(a), 0), (0.7 * math.cos(a), 0.7 * math.sin(a), 0.35), 0.03, "wood")
        for k in range(4):
            a1 = k * math.pi / 2 + 0.78; a2 = a1 + math.pi / 2
            rod((0.7 * math.cos(a1), 0.7 * math.sin(a1), 0.3), (0.7 * math.cos(a2), 0.7 * math.sin(a2), 0.3), 0.012, "rope")
    else:
        hm = ["wood2", "wood2", "brick", "stone", "stone2"][S - 1]
        box((0, 0.35, HB / 2), (1.2, 0.5, HB), hm, bevel=0.03)
        gable((0, 0.35, HB), 1.2, 0.5, 0.3, ["zinc", "zinc", "tile", "dark", "roofred"][S - 1], wall=hm)
        box((0, 0.09, 0.3), (0.3, 0.03, 0.5), "dark", bevel=0)
        if S >= 4:
            for sx in (1, -1): box((sx * 0.42, 0.09, 0.55), (0.24, 0.02, 0.5), "red", bevel=0.005); sph((sx * 0.42, 0.08, 0.6), (0.07, 0.01, 0.07), "flag")
    ndum = [2, 2, 3, 3, 4][S - 1]
    for i in range(ndum):
        x = (i - (ndum - 1) / 2) * 0.38; y = -0.35
        rod((x, y, 0), (x, y, 0.5), 0.025, "wood"); rod((x - 0.15, y, 0.38), (x + 0.15, y, 0.38), 0.02, "wood")
        sph((x, y, 0.42), (0.12, 0.1, 0.16), "hay"); sph((x, y, 0.62), (0.08,) * 3, "hay")
        if S >= 3: sph((x, y - 0.02, 0.69), (0.085, 0.085, 0.05), "iron")
    rod((-0.7, -0.1, 0.0), (-0.7, -0.1, 0.7), 0.025, "wood"); rod((-0.7, -0.1, 0.7), (-0.7, -0.1, 0.58), 0.008, "rope")
    sph((-0.7, -0.1, 0.45), (0.1, 0.1, 0.16), "leather")
    if S == 5: flag((0.7, 0.7, 0), 1.9)

elif DEF == "redbarn":   # red-fluid barracks: red barn
    HB = [0.7, 0.85, 1.0, 1.1, 1.2][S - 1]
    w = 0.85 + 0.08 * S
    box((0, 0.05, HB / 2), (w, 0.8, HB), "roofred", bevel=0.02)
    for k in range(int(w / 0.12)):
        box((-w / 2 + 0.06 + k * 0.12, -0.355, HB / 2), (0.015, 0.01, HB), "white" if k % 3 == 0 else "roofred", bevel=0)
    gable((0, 0.05, HB), w, 0.8, 0.45, ["wood2", "zinc", "zinc", "dark", "dark"][S - 1], wall="roofred")
    box((0, -0.36, HB * 0.38), (0.4, 0.03, HB * 0.72), "white", bevel=0.01)
    for sg in (1, -1): rod((-0.18, -0.38, HB * 0.05 + (0 if sg > 0 else HB * 0.66)), (0.18, -0.38, HB * 0.71 - (0 if sg > 0 else HB * 0.66)), 0.018, "white")
    sph((0, -0.36, HB + 0.18), (0.1, 0.02, 0.1), "white")
    for k in range(3): sph((0.55 + 0.05 * k, -0.45, 0.1 + 0.15 * k), (0.12, 0.1, 0.09), "hay")
    if S >= 3:
        cyl((-0.65, 0.35, 0.55), 0.18, 1.1, "zinc"); sph((-0.65, 0.35, 1.1), (0.18, 0.18, 0.12), "roofred")
    if S >= 4:
        cyl((0.65, 0.4, 0.3), 0.16, 0.6, "jarglass"); cyl((0.65, 0.4, 0.22), 0.15, 0.44, "syrup")
        spike_ring((0, 0.05), 0.75, 8, 0.15, 0.03, 0.15, "steel" if S == 4 else "gold")
    rod((0, 0.05, HB + 0.45), (0, 0.05, HB + 0.75), 0.015, "iron" if S < 5 else "gold")
    box((0.08, 0.05, HB + 0.72), (0.16, 0.02, 0.08), "iron" if S < 5 else "gold", bevel=0.005)

elif DEF == "lab":   # test kitchen laboratory
    HB = [0.6, 0.9, 1.0, 1.15, 1.3][S - 1]
    if S == 1:
        box((0, 0, 0.35), (0.9, 0.5, 0.06), "wood2"); 
        for sx in (1, -1):
            for sy in (1, -1): rod((sx * 0.4, sy * 0.2, 0), (sx * 0.4, sy * 0.2, 0.33), 0.025, "wood")
        zc = 0.38
    else:
        lm = ["wood2", "cream", "brick", "teal", "white"][S - 1]
        box((0, 0.1, HB / 2), (1.1, 0.8, HB), lm, bevel=0.03)
        if S == 5:
            sph((0, 0.1, HB), (0.5, 0.4, 0.4), "jarglass"); tor((0, 0.1, HB), 0.5, 0.02, "gold", sc=(1, 0.8, 1))
        else:
            gable((0, 0.1, HB), 1.1, 0.8, 0.35, ["zinc", "zinc", "tile", "copper"][S - 2], wall=lm)
        box((0, -0.31, HB * 0.55), (0.6, 0.03, 0.3), "glass")
        cyl((0.35, 0.3, HB + 0.35), 0.08, 0.5, "steel" if S < 4 else "copper")
        box((0, -0.45, 0.3), (0.9, 0.3, 0.06), "wood")
        zc = 0.33
    for k in range(3 + min(S, 3)):
        x = -0.35 + 0.15 * k
        if k % 2 == 0:
            sph((x, -0.45 if S > 1 else 0, zc + 0.08), (0.06, 0.06, 0.08), "jarglass"); sph((x, -0.45 if S > 1 else 0, zc + 0.06), (0.05, 0.05, 0.05), ["veg", "syrup", "honey"][k % 3])
            rod((x, -0.45 if S > 1 else 0, zc + 0.14), (x, -0.45 if S > 1 else 0, zc + 0.24), 0.015, "jarglass")
        else:
            cyl((x, -0.45 if S > 1 else 0, zc + 0.06), 0.06, 0.12, "steel"); sph((x, -0.45 if S > 1 else 0, zc + 0.18), (0.05,) * 3, "white")
    if S >= 4:
        rod((-0.55, -0.1, 0.6), (-0.55, -0.5, 0.9), 0.04, "copper"); tor((-0.55, -0.5, 0.9), 0.1, 0.03, "copper", rot=(90, 0, 0))
    if S == 5: flag((0.65, 0.65, 0), 1.9)

elif DEF == "tech":   # herbal pharmacy (items)
    HB = [0.6, 0.85, 1.0, 1.2, 1.4][S - 1]
    if S == 1:
        for sx in (1, -1): rod((sx * 0.45, -0.3, 0), (sx * 0.45, -0.3, 0.75), 0.025, "bamboo" if "bamboo" in M else "wood")
        box((0, -0.4, 0.78), (1.0, 0.45, 0.03), "teal", rot=(-20, 0, 0)); box((0, 0.1, 0.35), (1.0, 0.5, 0.7), "wood2", bevel=0.02)
    else:
        tm_ = ["wood2", "wood2", "teal", "teal", "roofred"][S - 1]
        box((0, 0.1, HB / 2), (1.05, 0.8, HB), tm_ if S < 5 else "cream", bevel=0.03)
        for tier in range(1 if S < 4 else 2):
            z0 = HB + tier * 0.3; ww = 1.3 - tier * 0.35
            box((0, 0.1, z0 + 0.05), (ww, 1.0 - tier * 0.3, 0.06), ["tile", "tile", "teal", "roofred", "gold"][S - 1], bevel=0.02)
            bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=ww * 0.72, radius2=ww * 0.3, depth=0.25, location=(0, 0.1, z0 + 0.2))
            o = bpy.context.active_object; o.rotation_euler = (0, 0, math.radians(45)); fin(o, ["tile", "tile", "teal", "roofred", "roofred"][S - 1], 0.01)
            if tier == 1: box((0, 0.1, z0 - 0.1), (0.7, 0.5, 0.3), "cream", bevel=0.02)
        box((0, -0.31, HB * 0.85), (0.5, 0.03, 0.15), "cream" if S < 5 else "gold", bevel=0.01)
        box((0, -0.31, HB * 0.35), (0.3, 0.03, HB * 0.6), "dark", bevel=0)
    for k in range(4 + S):
        sph((-0.45 + 0.13 * (k % 7), -0.5 if S > 1 else -0.2, 0.25 + 0.15 * (k // 7)), (0.05, 0.05, 0.07), ["veg", "syrup", "honey", "jarglass"][k % 4])
    sph((0.6, -0.45, 0.12), (0.16, 0.16, 0.1), "stone"); rod((0.6, -0.45, 0.15), (0.7, -0.45, 0.4), 0.03, "stone")
    for k in range(3): rod((-0.6, -0.55 + 0.1 * k, 0.5), (-0.6, -0.55 + 0.1 * k, 0.3), 0.02, "foliage")
    if S == 5: flag((0.65, 0.65, 0), 2.0)

elif DEF == "castle":   # treehouse garrison (clan castle)
    HB = [0.9, 1.2, 1.5, 1.7, 1.9][S - 1]
    tr = 0.14 + 0.03 * S
    cyl((0, 0.1, HB / 2), tr, HB, "bark", v=12)
    for k in range(4): rod((0, 0.1, 0.15), (0.35 * math.cos(k * 1.57 + 0.4), 0.1 + 0.35 * math.sin(k * 1.57 + 0.4), 0.0), 0.06, "bark", r2=0.02)
    for k in range(5 + S):
        a = k * 2.3; rr = 0.35 + 0.05 * S
        sph((rr * 0.8 * math.cos(a), 0.1 + rr * 0.8 * math.sin(a), HB + 0.25 + 0.15 * (k % 3)), (rr * 0.7,) * 3, "foliage" if k % 2 else "foliage2")
    pz = HB * 0.6; hw = 0.55 + 0.06 * S
    box((0, 0.1, pz), (hw + 0.2, hw + 0.2, 0.06), "wood2")
    hm = ["wood2", "wood2", "wood", "wood", "cream"][S - 1]
    box((0, 0.1, pz + 0.22), (hw, hw * 0.8, 0.38), hm, bevel=0.02)
    gable((0, 0.1, pz + 0.41), hw, hw * 0.8, 0.25, ["canvas", "tile", "tile", "roofred", "gold"][S - 1], wall=hm)
    box((0, 0.1 - hw * 0.4, pz + 0.2), (0.14, 0.02, 0.24), "dark", bevel=0)
    for k in range(int(pz / 0.12)):
        box((0.05 + tr, 0.1 - tr * 0.3, 0.08 + k * 0.12), (0.18, 0.04, 0.025), "wood")
    if S >= 3:
        for sx in (1, -1): rod((sx * (hw / 2 + 0.1), 0.1 - hw / 2 - 0.1, pz), (sx * (hw / 2 + 0.1), 0.1 - hw / 2 - 0.1, pz + 0.3), 0.015, "wood")
        rod((-(hw / 2 + 0.1), 0.1 - hw / 2 - 0.1, pz + 0.28), (hw / 2 + 0.1, 0.1 - hw / 2 - 0.1, pz + 0.28), 0.012, "rope")
    if S >= 4:
        box((0.75, -0.6, 0.35), (0.35, 0.35, 0.7), "wood2", bevel=0.02)
        rod((0.6, -0.45, 0.7), (0.25, -0.15, pz), 0.012, "rope"); rod((0.6, -0.5, 0.65), (0.25, -0.2, pz - 0.05), 0.012, "rope")
    flag((hw / 2, 0.1 + hw / 2, pz + 0.4), 0.6 + 0.12 * S)
    if S == 5:
        for k in range(3): box((-0.25 + 0.25 * k, 0.1 - hw * 0.4 - 0.02, pz + 0.05), (0.12, 0.01, 0.25), "red", bevel=0.003)

elif DEF == "hero":   # colonel's hall -> monument
    HB = [0.7, 0.85, 1.0, 1.1, 1.6][S - 1]
    if S <= 2:
        tw = 0.9 + 0.15 * S
        tent((0, 0.1, 0), tw, tw * 0.8, 0.75 + 0.1 * S, "canvas2")
        box((0, 0.1 - tw * 0.29, 0.25), (0.25, 0.02, 0.45), "dark", bevel=0)
        box((0.5, -0.45, 0.3), (0.4, 0.3, 0.04), "wood2"); box((0.5, -0.45, 0.33), (0.3, 0.22, 0.005), "cream", bevel=0)
        for sx in (1, -1): rod((0.5 + sx * 0.15, -0.45, 0), (0.5 + sx * 0.15, -0.45, 0.3), 0.02, "wood")
    elif S <= 4:
        hm = "wood2" if S == 3 else "stone"
        box((0, 0.1, HB / 2), (1.1, 0.9, HB), hm, bevel=0.03)
        gable((0, 0.1, HB), 1.1, 0.9, 0.4, "canvas2" if S == 3 else "roofred", wall=hm)
        box((0, -0.36, HB * 0.38), (0.32, 0.03, HB * 0.7), "dark", bevel=0)
        for sx in (1, -1):
            box((sx * 0.38, -0.36, HB * 0.55), (0.18, 0.02, 0.5), "canvas2" if S == 3 else "red", bevel=0.003)
            sph((sx * 0.38, -0.375, HB * 0.62), (0.06, 0.01, 0.06), "gold")
        sph((0, -0.37, HB + 0.15), (0.12, 0.02, 0.12), "gold")
    else:
        for k in range(3): box((0, 0, 0.08 + k * 0.16), (1.2 - 0.25 * k, 1.2 - 0.25 * k, 0.16), "stone" if k % 2 == 0 else "stone2", bevel=0.02)
        box((0, 0, 0.62), (0.55, 0.55, 0.3), "gold", bevel=0.02)
        CURm = None
        n0 = len(BASE)
        mini_duck(Vector((0, 0.05, 0.77)), s=1.8, helmet=False)
        for o in BASE[n0:]: o.data.materials[0] = M["gold"]
        cyl((0, 0.0, 1.62), 0.17, 0.1, "gold"); sph((0, -0.17, 1.55), (0.23, 0.15, 0.03), "gold")
        rod((0.32, -0.15, 0.85), (0.4, -0.25, 1.4), 0.025, "gold")
        for sx in (1, -1):
            for sy in (1, -1):
                rod((sx * 0.62, sy * 0.62, 0), (sx * 0.62, sy * 0.62, 0.6), 0.03, "iron"); rod((sx * 0.62, sy * 0.62, 0.6), (sx * 0.62, sy * 0.62, 0.75), 0.05, "ember", r2=0.0)
        flag((0.75, 0.75, 0), 1.6); flag((-0.75, 0.75, 0), 1.6)

elif DEF == "builder":   # builder's tool shed
    HB = 0.7
    box((0, 0.1, 0.32), (0.75, 0.55, 0.64), "wood2", bevel=0.02)
    box((0, 0.1, 0.68), (0.9, 0.7, 0.05), "zinc", rot=(-12, 0, 0), bevel=0.01)
    box((0, -0.18, 0.28), (0.25, 0.02, 0.45), "dark", bevel=0)
    rod((0.42, -0.25, 0.0), (0.42, -0.2, 0.45), 0.02, "wood"); box((0.42, -0.2, 0.47), (0.12, 0.05, 0.05), "iron", bevel=0.01)
    box((-0.42, -0.25, 0.25), (0.02, 0.35, 0.12), "steel", rot=(0, 70, 0), bevel=0)
    cyl((0.3, -0.45, 0.1), 0.09, 0.2, "toyY"); cyl((0.3, -0.45, 0.205), 0.08, 0.01, "toyO")
    for k in range(3): box((-0.3 + 0.03 * k, -0.42, 0.04 + 0.05 * k), (0.4, 0.08, 0.04), "wood", rot=(0, 0, 8 * k), bevel=0.005)
    mini_duck(Vector((0.05, -0.45, 0.0)), s=0.8, helmet=True)

elif DEF == "wall":   # wall tier pieces (STATE: post/linkx/linky)
    T = S   # 1..6 tier
    HB = [0.35, 0.5, 0.55, 0.6, 0.5, 0.7][T - 1]
    piece = STATE or "post"
    def seg(dx, dy):
        L = 1.0 if piece == "module" else 0.5
        ex, ey = dx * L, dy * L
        if T == 1:
            for z, m in ((0.22, "ropeP"), (0.32, "ropeG")): rod((0, 0, z), (ex, ey, z - 0.03), 0.015, m)
        elif T == 2:
            for k in range(1, 4): rod((ex * k / 4, ey * k / 4, 0), (ex * k / 4, ey * k / 4, 0.42 + 0.04 * (k % 2)), 0.035, "bamboo" if "bamboo" in M else "hay")
            rod((0, 0, 0.3), (ex, ey, 0.3), 0.015, "rope")
        elif T == 3:
            box((ex / 2, ey / 2, 0.25), (abs(ex) + 0.04 if dx else 0.03, abs(ey) + 0.04 if dy else 0.03, 0.5), "zinc", rot=(0, 0, random.uniform(-4, 4)), bevel=0.005)
            for k in range(6): box((ex * (k + 0.5) / 6, ey * (k + 0.5) / 6, 0.25), (0.03 if dx else 0.045, 0.03 if dy else 0.045, 0.5), "zinc", bevel=0.004)
            for k in range(4): sph((ex * random.uniform(0.1, 0.9), ey * random.uniform(0.1, 0.9), random.uniform(0.1, 0.4)), (0.06 if dx else 0.03, 0.06 if dy else 0.03, 0.05), "rust")
        elif T == 4:
            for k in range(1, 5): box((ex * k / 5, ey * k / 5, 0.29), (0.09 if dx else 0.05, 0.09 if dy else 0.05, 0.56 + 0.04 * (k % 2)), "wood2" if k % 2 else "wood", bevel=0.008)
            rod((0, 0, 0.42), (ex, ey, 0.42), 0.015, "iron")
        elif T == 5:
            for row in range(3):
                for k in range(2):
                    t = (k + 0.5 + 0.5 * (row % 2)) / 2.2
                    sph((ex * t, ey * t, 0.08 + row * 0.15), (0.14 if dx else 0.11, 0.14 if dy else 0.11, 0.08), "sand")
        else:
            box((ex / 2, ey / 2, 0.3), (abs(ex) + 0.02 if dx else 0.22, abs(ey) + 0.02 if dy else 0.22, 0.6), "brick", bevel=0.01)
            for k in range(2): spike((ex * (k + 0.5) / 2, ey * (k + 0.5) / 2, 0.6), (0, 0, 1), 0.15, 0.03)
    if piece == "module":
        n0 = len(BASE)
        STATE_SAVE = piece
    if piece in ("post", "module"):
        if T == 1:
            rod((0, 0, 0), (0, 0, 0.4), 0.035, "wood"); sph((0, 0, 0.4), (0.04,) * 3, "ropeP")
        elif T == 2:
            rod((0, 0, 0), (0, 0, 0.55), 0.05, "bamboo" if "bamboo" in M else "hay"); tor((0, 0, 0.3), 0.055, 0.012, "rope")
        elif T == 3:
            box((0, 0, 0.3), (0.12, 0.12, 0.6), "zinc", bevel=0.01); sph((0.0, -0.06, 0.4), (0.05, 0.02, 0.06), "rust")
        elif T == 4:
            box((0, 0, 0.33), (0.14, 0.14, 0.66), "wood", bevel=0.01); rod((0, 0, 0.66), (0, 0, 0.78), 0.05, "wood", r2=0.0)
        elif T == 5:
            for row in range(4): sph((0, 0, 0.08 + row * 0.14), (0.15, 0.15, 0.08), "sand")
        else:
            box((0, 0, 0.36), (0.3, 0.3, 0.72), "brick", bevel=0.02); box((0, 0, 0.73), (0.34, 0.34, 0.05), "stone", bevel=0.01)
            spike((0, 0, 0.75), (0, 0, 1), 0.2, 0.04)
            for sx in (1, -1): spike((sx * 0.16, -0.16, 0.5), (sx, -1, 0.3), 0.14, 0.03)
    if piece == "module":
        n1 = len(BASE)
        for o in BASE[n0:n1]:
            o2 = o.copy(); o2.data = o.data.copy(); scn.collection.objects.link(o2) if False else bpy.context.collection.objects.link(o2); o2.location.x += 1.0; BASE.append(o2)
        seg(1, 0)
    elif piece == "linkx":
        seg(1, 0)
    else:
        seg(0, 1)

elif DEF.startswith("trap"):
    if DEF == "trap_cracker":
        sph((0, 0, 0.0), (0.22, 0.22, 0.07), "dirt")
        rod((0.02, 0, 0.0), (0.04, -0.02, 0.1), 0.04, "red"); rod((0.04, -0.02, 0.1), (0.07, -0.06, 0.2), 0.008, "rope")
        sph((0.07, -0.06, 0.21), (0.015,) * 3, "lava")
    elif DEF == "trap_banana":
        for k in range(4):
            a2 = k * math.pi / 2 + 0.3; sph((0.13 * math.cos(a2), 0.13 * math.sin(a2), 0.015), (0.16, 0.05, 0.015), "banana", rot=(0, 0, math.degrees(a2)))
        sph((0, 0, 0.03), (0.06, 0.06, 0.03), "banana"); rod((0, 0, 0.04), (0.02, 0.0, 0.1), 0.015, "bananaB")
    else:
        box((0, 0, 0.04), (0.06, 0.06, 0.08), "wood"); rod((0, 0, 0.08), (0.05, -0.03, 0.6), 0.004, "rope")
        sph((0.06, -0.04, 0.72), (0.12, 0.12, 0.14), "balloon"); sph((0.06, -0.04, 0.585), (0.02,) * 3, "balloon")
    HB = 0.1; PIV = Vector((0, 0, 0.1))

# ---------- damage states (base only) ----------
DMG = STATE in ("damaged", "rubble")
if DMG:
    RUBM = {"boxtower": ["card", "card2", "tape"], "camp": ["canvas", "canvas2", "bark"], "redbarn": ["roofred", "white", "wood"], "castle": ["wood2", "bark", "foliage"],
            "jarY": ["jarglass", "honey", "stone"], "jarG": ["jarglass", "veg", "stone"], "jarR": ["jarglass", "syrup", "stone"]}.get(DEF, [["wood2", "wood", "bark"], ["wood2", "sand", "wood"], ["brick", "brick", "stone"], ["stone2", "dark", "stone"], ["stone2", "gold", "red"]][S - 1])
    def puff(c, size, m):
        for k in range(6):
            a = random.uniform(0, 6.28); r = size * random.uniform(0.25, 0.6); rr = size * random.uniform(0.45, 0.75)
            sph((c.x + r * math.cos(a), c.y + r * math.sin(a), c.z + random.uniform(-0.2, 0.35) * size), (rr, rr, rr * 0.9), m)
    def smoke_col(p, sc=1.0, n=4):
        for k in range(n):
            m = ["smokeD", "smokeM", "smokeM", "smokeL"][min(k, 3)]
            puff(Vector((p.x + 0.05 * k * sc, p.y + 0.04 * k * sc, p.z + 0.2 * sc + k * 0.22 * sc)), (0.09 + 0.04 * k) * sc, m)
    def fire_at(p, sc=0.8):
        for k in range(3):
            a = k * 2.1
            bpy.ops.mesh.primitive_cone_add(vertices=8, radius1=0.06 * sc, radius2=0, depth=0.24 * sc, location=(p.x + 0.04 * math.cos(a) * sc, p.y + 0.04 * math.sin(a) * sc, p.z + 0.1 * sc))
            fin(bpy.context.active_object, "fire")
    def heap(n, rad, zr, big=1.0, cx=0.0):
        for k in range(n):
            a = random.uniform(0, 2 * math.pi); r = rad * math.sqrt(random.random()); sz = random.uniform(0.07, 0.15) * big
            box((cx + r * math.cos(a), r * math.sin(a), random.uniform(0.02, zr)), (sz, sz * random.uniform(0.5, 1.2), sz * random.uniform(0.3, 0.7)), random.choice(RUBM),
                rot=(random.uniform(-35, 35), random.uniform(-35, 35), random.uniform(0, 90)), bevel=0.01)
    for o in HEAD: o.hide_render = True
    CUR = BASE
    if STATE == "damaged":
        bpy.context.view_layer.update()
        for o in list(BASE):
            c = sum((o.matrix_world @ Vector(cc) for cc in o.bound_box), Vector()) / 8
            if c.x - 0.35 * c.y > 0.05:
                o.location.z = o.location.z * random.uniform(0.3, 0.5); o.rotation_euler.x += math.radians(random.uniform(-30, 30)); o.rotation_euler.y += math.radians(random.uniform(-30, 30))
            else:
                o.rotation_euler.x += math.radians(random.uniform(-3, 3)); o.rotation_euler.y += math.radians(5); o.location.z -= 0.03
        heap(22, 0.55, 0.25, 1.1, cx=0.35)
        sph((0.35, -0.05, 0.0), (0.45, 0.6, 0.08), "soot")
        fire_at(Vector((0.35, -0.1, 0.25)), 0.9)
        fire_at(Vector((-0.2, 0.15, HB * 0.9)), 0.7)
    else:
        for o in list(BASE): o.hide_render = True
        sph((0, 0, 0.0), (0.7, 0.7, 0.16), "soot")
        heap(26, 0.62, 0.1, 1.4); heap(14, 0.4, 0.22, 1.3); heap(6, 0.22, 0.34, 1.2)
        pass

if "PIV" not in dir(): PIV = Vector((0, 0, 0.1))
# pivot for head rotation
bpy.ops.object.empty_add(location=PIV); piv = bpy.context.active_object
for o in HEAD:
    o.parent = piv; o.matrix_parent_inverse = piv.matrix_world.inverted()

# lights + camera (same as HQ)
world = bpy.data.worlds.new("W"); scn.world = world; world.use_nodes = True
world.node_tree.nodes["Background"].inputs[0].default_value = (0.75, 0.82, 0.95, 1); world.node_tree.nodes["Background"].inputs[1].default_value = 0.8
def light(kind, loc, e, rot, size=1):
    d = bpy.data.lights.new(kind, kind); d.energy = e
    if kind == "AREA": d.size = size
    o = bpy.data.objects.new(kind, d); scn.collection.objects.link(o); o.location = loc; o.rotation_euler = rot
light("SUN", (2, -3, 5), 3.2, (math.radians(40), math.radians(15), math.radians(30)))
light("AREA", (-3, -2, 3), 150, (math.radians(60), 0, math.radians(-50)), 4)
cd = bpy.data.cameras.new("C"); cam = bpy.data.objects.new("C", cd); scn.collection.objects.link(cam); scn.camera = cam
EXT = {"camp": (4.1, 0.55), "builder": (2.2, 0.45), "wall": (2.1, 0.4), "castle": (3.5, 0.95), "hero": (3.2, 0.8)}.get(DEF, (2.9, 0.6))
cd.type = "ORTHO"; cd.ortho_scale = EXT[0]
if EXT[0] != 2.9: RES = int(round(RES * EXT[0] / 2.9))
tgt = Vector((0, 0, EXT[1])); ang = math.radians(float(_os.environ.get("ELEV", "48.6"))); yaw = math.radians(float(_os.environ.get("YAW", "35"))); dist = 8
cam.location = tgt + Vector((dist * math.cos(ang) * math.sin(yaw), -dist * math.cos(ang) * math.cos(yaw), dist * math.sin(ang)))
cam.rotation_euler = (tgt - cam.location).to_track_quat("-Z", "Y").to_euler()
bpy.context.view_layer.update()
if _os.environ.get("META"):
    from bpy_extras.object_utils import world_to_camera_view as _w2c0
    import json as _js0
    _o = _w2c0(scn, cam, Vector((0, 0, 0)))
    _js0.dump({"ox": _o.x, "oy": 1 - _o.y, "ppu_frac": 1.0 / cd.ortho_scale, "pad": PAD}, open(OUT + "/meta.json" if _os.path.isdir(OUT) else OUT + "_meta.json", "w"))
if DEF == "wall" and STATE == "module":
    cd.ortho_scale = 2.0; RES = 512
    tgt = Vector((0.5, 0, 0.35)); ang = math.radians(25); yaw = math.radians(-18)
    cam.location = tgt + Vector((dist * math.cos(ang) * math.sin(yaw), -dist * math.cos(ang) * math.cos(yaw), dist * math.sin(ang)))
    cam.rotation_euler = (tgt - cam.location).to_track_quat("-Z", "Y").to_euler()
    bpy.context.view_layer.update()
    from bpy_extras.object_utils import world_to_camera_view as _w2c
    import json as _json
    _f = [_w2c(scn, cam, Vector(p)) for p in [(0, 0, 0), (1, 0, 0)]]
    _json.dump([[q.x, 1 - q.y] for q in _f], open(OUT + "_feet.json", "w"))
scn.render.engine = "CYCLES"; scn.cycles.device = "CPU"; scn.cycles.samples = 12; scn.cycles.use_denoising = True
scn.render.resolution_x = scn.render.resolution_y = RES; scn.render.film_transparent = True
scn.view_settings.view_transform = "Standard"; scn.view_settings.exposure = -0.3

def show(objs, on):
    for o in objs: o.hide_render = not on
# base (with ground), head hidden
show(HEAD, False)
if not DMG: show(BASE + GROUND, True)
scn.render.filepath = f"{OUT}/base{('_' + STATE) if STATE else ''}.png"; bpy.ops.render.render(write_still=True)
# head in DIRS directions (base hidden, ground as shadow catcher only)
show(BASE, False); show(HEAD, True)
for g in GROUND: g.is_shadow_catcher = True
for k in range(DIRS):
    piv.rotation_euler = (0, 0, 2 * math.pi * k / DIRS)
    scn.render.filepath = f"{OUT}/head_{k:02d}.png"; bpy.ops.render.render(write_still=True)
print("DONE")
