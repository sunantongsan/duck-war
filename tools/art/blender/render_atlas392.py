# Render a duck character into Nova's units3d392 atlas layout.
# Columns: idle 0-3, walk 4-11, attack 12-15, death 16-20. Rows: 8 grid directions (d*45deg), cell 120x128.
# Camera mirrors features/render3d/units3d.html (three.js cam at (10,16.04,10) -> blender (10,-10,16.04)).
# usage: python3.11 render_atlas392.py -- <duck_variant> <out_dir> [samples] [scale_mul]
import bpy, math, sys, os, json
from mathutils import Vector
a = sys.argv[sys.argv.index("--") + 1:]
VAR, OUT = a[0], a[1]
SAMP = int(a[2]) if len(a) > 2 else 10
MUL = float(a[3]) if len(a) > 3 else 1.0
os.makedirs(OUT, exist_ok=True)
blend = {"dog": "duck_dog", "dog_guard": "duck_dog_guard"}.get(VAR, f"duck_{VAR}")
bpy.ops.wm.open_mainfile(filepath=f"/home/claude/duck/{blend}.blend")
scn = bpy.context.scene
scn.render.engine = "CYCLES"; scn.cycles.device = "CPU"; scn.cycles.samples = SAMP; scn.cycles.use_denoising = True
_RS = float(os.environ.get("RSCALE", "1")); RX, RY = int(180 * _RS), int(192 * _RS); scn.render.resolution_x = RX; scn.render.resolution_y = RY; scn.render.use_persistent_data = True; scn.render.film_transparent = True
scn.view_settings.view_transform = "Standard"; scn.view_settings.exposure = -0.1
w = bpy.data.worlds.new("W"); scn.world = w; w.use_nodes = True
w.node_tree.nodes["Background"].inputs[0].default_value = (0.85, 0.9, 1.0, 1); w.node_tree.nodes["Background"].inputs[1].default_value = 1.0
for o in list(scn.objects):
    if o.type in ("LIGHT", "CAMERA"): bpy.data.objects.remove(o)
def light(kind, loc, e, size=1.0, col=(1, 1, 1)):
    d = bpy.data.lights.new(kind, kind); d.energy = e; d.color = col
    if kind == "AREA": d.size = size
    o = bpy.data.objects.new(kind, d); scn.collection.objects.link(o); o.location = loc
    o.rotation_euler = (Vector((0, 0, 0.5)) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
light("SUN", (-4, -6, 10), 3.6, col=(1.0, 0.96, 0.88))           # top-left key, like the original atlas
light("AREA", (6, -6, 3), 200, 4, col=(0.8, 0.88, 1.0))
light("AREA", (2, 5, 4), 260, 3, col=(1.0, 0.9, 0.7))
arm = [o for o in bpy.data.objects if o.type == "ARMATURE"][0]
piv = bpy.data.objects.new("PIV", None); scn.collection.objects.link(piv)
for o in list(scn.objects):
    if o.parent is None and o.type in ("ARMATURE", "MESH", "EMPTY") and o is not piv:
        mw = o.matrix_world.copy(); o.parent = piv; o.matrix_world = mw
ACTS = {n: bpy.data.actions[n] for n in ("Idle", "Walk", "Attack", "Death")}
def frames(act, n, death=False):
    s, e = act.frame_range
    if death: return [round(s + (e - s) * i / (n - 1)) for i in range(n)]
    return [round(s + (e - s) * i / n) for i in range(n)]
SEQ = [("Idle", frames(ACTS["Idle"], 4)), ("Walk", frames(ACTS["Walk"], 8)), ("Attack", frames(ACTS["Attack"], 4)), ("Death", frames(ACTS["Death"], 5, True))]
# --- size from idle pose
arm.animation_data.action = ACTS["Idle"]; scn.frame_set(1)
dg = bpy.context.evaluated_depsgraph_get(); pts = []
for o in scn.objects:
    if o.type == "MESH" and not o.hide_render:
        e = o.evaluated_get(dg); pts += [e.matrix_world @ v.co for v in e.data.vertices]
zmax = max(p.z for p in pts); zmin = max(min(p.z for p in pts), 0.0); H = zmax - zmin
R = max(max(abs(p.x) for p in pts), max(abs(p.y) for p in pts))
cd = bpy.data.cameras.new("C"); cam = bpy.data.objects.new("C", cd); scn.collection.objects.link(cam); scn.camera = cam
cd.type = "ORTHO"; BASE_OS = max(H * 1.45, (R + 0.25) * 2.6) / MUL; cd.ortho_scale = BASE_OS
tgt = Vector((0, 0, zmin + H * 0.55))
cam.location = tgt + Vector((10, -10, 16.04 - 0.9)); cam.rotation_euler = (tgt - cam.location).to_track_quat("-Z", "Y").to_euler()
bpy.context.view_layer.update()
from bpy_extras.object_utils import world_to_camera_view
def proj(p):
    c = world_to_camera_view(scn, cam, p); return (c.x * 240, (1 - c.y) * 256)  # in 240x256 reference space
meta = {"frames": [], "muzzle": []}
ox, oy = proj(Vector((0, 0, 0)))
i = 0
for d in range(8):
    ang = d * math.pi / 4
    piv.rotation_euler = (0, 0, -ang + math.pi / 2)        # duck faces -Y; grid dir a -> blender (cos a, -sin a)
    face = Vector((math.cos(ang), -math.sin(ang), 0))
    meta["muzzle"].append(proj(face * (R * 0.9 + 0.1) + Vector((0, 0, zmin + H * 0.55))))
    col = 0
    for name, frs in SEQ:
        arm.animation_data.action = ACTS[name]
        cd.ortho_scale = BASE_OS * (1.3 if name == "Death" else 1.0)
        for f in frs:
            scn.frame_set(f)
            scn.render.filepath = f"{OUT}/d{d}_c{col:02d}.png"; bpy.ops.render.render(write_still=True); col += 1
json.dump({"ox": ox, "oy": oy, "muzzle": meta["muzzle"], "H": H}, open(f"{OUT}/meta.json", "w"))
print("ATLAS DONE", VAR)
