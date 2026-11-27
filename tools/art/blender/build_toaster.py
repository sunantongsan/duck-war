"""Blender 4.x: blender -b -t 4 -P build_toaster.py -- OUTPUT FIRST LAST
Each editable scene has a keyed lever, baker and slice. Frames 1–5 are the
rest, half-press, press, pop and recovery poses. Frame 6 is the broken base.
"""
import sys
from pathlib import Path
import bpy
from mathutils import Vector

OUTPUT, FIRST, LAST = sys.argv[sys.argv.index('--') + 1:]
output = Path(OUTPUT).resolve()
output.mkdir(parents=True, exist_ok=True)
# Four seasonal enamel finishes per chassis, in the order encountered in game.
PAINT = ('ef3649', 'ff7929', '14b7ae', '367ae3',
         'dc2681', '38aa53', 'ec4726', '6745cf',
         '087eaf', 'e32557', '06a18a', 'ed680f',
         '374db9', 'a734bd', '008c96', 'b91e42',
         '4635a8', '075e98', 'a71f69', '153569')
GOLD = 'ffb82e'
CREAM = 'fff0c7'
INK = '233347'
WHITE = 'fffbeb'


def color(hexcode):
    def linear(i):
        x = int(hexcode[i:i + 2], 16) / 255
        return ((x + .055) / 1.055) ** 2.4 if x > .04045 else x / 12.92
    return (*[linear(i) for i in (0, 2, 4)], 1)


def finish(obj, name, tint):
    obj.name = name
    mat = bpy.data.materials.get(tint) or bpy.data.materials.new(tint)
    mat.diffuse_color = color(tint)
    obj.data.materials.append(mat)
    return obj


def block(name, xyz, size, tint, radius=.06):
    bpy.ops.mesh.primitive_cube_add(size=1, location=xyz)
    obj = bpy.context.object
    obj.dimensions = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    bevel = obj.modifiers.new('Soft rolled edge', 'BEVEL')
    bevel.width = radius
    bevel.segments = 4
    obj.modifiers.new('Enamel normals', 'WEIGHTED_NORMAL')
    return finish(obj, name, tint)


def oval(name, xyz, size, tint):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=14, location=xyz)
    obj = bpy.context.object
    obj.scale = size
    for poly in obj.data.polygons:
        poly.use_smooth = True
    return finish(obj, name, tint)


def strut(name, a, b, radius, tint):
    a, b = Vector(a), Vector(b)
    obj = oval(name, (a + b) / 2, (radius, radius, (b-a).length / 2 + radius / 2), tint)
    obj.rotation_euler = (b-a).to_track_quat('Z', 'Y').to_euler()
    return obj


def animate(obj, offsets):
    start = obj.location.copy()
    for frame, (dy, dz) in enumerate(offsets, 1):
        obj.location = start + Vector((0, dy, dz))
        obj.keyframe_insert(data_path='location', frame=frame)
    return obj


def slice_mesh(x, y, z, w, h, depth, tint, name):
    # The shoulder steps and wide rounded crown give a slice its profile.
    outline = [(-.41, 0), (.41, 0), (.44, .55), (.50, .62), (.52, .74),
               (.46, .86), (.28, .95), (0, 1), (-.28, .95), (-.46, .86),
               (-.52, .74), (-.50, .62), (-.44, .55)]
    verts = [(u*w, side*depth/2, v*h) for side in (-1, 1) for u, v in outline]
    n = len(outline)
    faces = [tuple(range(n)), tuple(reversed(range(n, 2*n)))]
    faces += [(i, i+n, (i+1)%n+n, (i+1)%n) for i in range(n)]
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(verts, [], faces)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.location = (x, y, z)
    return finish(obj, name, tint)


def make(level):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.name = f'Toast battery {level:02d}'
    tier, step = divmod(level-1, 4)
    paint = PAINT[level-1]
    trim = ('ffe4a1', 'ffd452', 'ffbf32', 'ffaf18', 'ffd65d')[tier]
    h = .90 + .052*tier + .022*step
    w = 1.40 + .035*step
    x = -.34
    base = block('Cast iron footing', (0, 0, .12), (2.45, 1.54, .20), INK, .10)
    block('Plinth piping', (0, 0, .22), (2.41, 1.50, .12), trim)
    block('Glazed plinth', (0, 0, .275), (2.35, 1.45, .10), '337d82')
    block('Toaster crumb drawer', (x, 0, .40), (w+.08, 1.10, .21), INK, .10)
    block('Rounded enamel shell', (x, 0, .43+h/2), (w, 1.02, h), paint, .18)
    block('Chrome collar', (x, 0, .41+h), (w-.08, .89, .12), trim, .055)
    block('Insulated slot', (x, 0, .48+h), (w-.26, .41, .075), INK, .035)
    for y in (-.165, .165):
        block('Incandescent element', (x, y, .52+h), (w-.37, .035, .04), 'ff7828', .015)
    block('Crumb drawer handle', (x, -.568, .42), (.51, .10, .075), trim)
    # Front badge and horizontal speedlines vary in shape as well as colour.
    oval('Badge rim', (x, -.508, .47+h*.51), (.26, .052, .255), trim)
    oval('Badge inset', (x, -.558, .47+h*.51), (.205, .026, .201), INK)
    oval('Badge duck head', (x-.021, -.584, .50+h*.51), (.109, .021, .110), GOLD)
    oval('Badge bill', (x+.067, -.60, .465+h*.51), (.097, .019, .036), 'ff8028')
    for side in (-1, 1):
        for i in range(step+1):
            block('Stamped speedline', (x+side*(.41+.016*i), -.511, .62+.078*i),
                  (.23-.033*i, .043, .043), trim, .016)
    for k in range(tier):
        for side in (-1, 1):
            fin = block('Flared cooling fin', (x+side*(w/2-.035), .11+.14*k, .66+h*.47),
                        (.14, .075, .40+.10*k), trim, .035)
            fin.rotation_euler.y = side*.21
    if tier >= 2:
        block('Racing stripe', (x-.46, -.50, .49+h*.51), (.10, .046, h*.72), CREAM)
    if tier >= 3:
        for sx in (-.48,.48):
            oval('Amber pilot lamp', (x+sx, -.39, h+.45), (.078,.069,.06), 'ff6c18')
    if tier == 4:
        for sx in (-.53,.53):
            fin = block('Golden crown tip', (x+sx,.31,h+.50), (.16,.14,.31+.027*step), trim)
            fin.rotation_euler.y = sx*.64

    if tier >= 1:
        dial_x = x-.53
        oval('Clockwork timer rim', (dial_x,-.52,.94), (.135,.055,.135), trim)
        oval('Porcelain timer', (dial_x,-.57,.94), (.103,.022,.103), CREAM)
        strut('Timer hand', (dial_x,-.599,.94), (dial_x+.054,-.60,1.00), .019, INK)
    if tier >= 2:
        # Swept fins project above the left shoulder, visible at play scale.
        for i in range(2 + (tier >= 3)):
            blade = block('Retro cooling blade', (x-.68-.043*i,.17+.125*i,h+.43+.069*i),
                          (.115,.12,.36+.10*i), trim, .055)
            blade.rotation_euler.y = -.55
    if tier >= 3:
        strut('Steam return', (x-.53,.31,h+.48), (x-.53,.31,h+.84), .085, INK)
        strut('Bent return tip', (x-.53,.31,h+.84), (x-.32,.31,h+.86), .084, trim)
    if tier == 4:
        # A winged crown ring gives the final chassis its own top silhouette.
        for sx in (-1,1):
            for feather in range(3):
                wing = oval('Crown wing feather', (x+sx*(.52+.06*feather),.36,h+.62+.05*feather),
                            (.088,.065,.20+.036*feather), trim)
                wing.rotation_euler.y = sx*(.40+.18*feather)
        oval('Ruby shoulder jewel', (x+.45,-.41,h+.48), (.10,.081,.086), 'f02757')

    bread = slice_mesh(x, 0, h+.24, .90, .71, .15, 'a44720', 'Slice / crust')
    face = slice_mesh(0, -.083, .042, .79, .615, .016, 'ffcb74', 'Slice / crumb')
    face.parent = bread
    for px,pz,size in ((-.20,.28,.032),(.22,.40,.039),(-.13,.48,.025),(.11,.22,.032)):
        o = oval('Toast mark', (px,-.10,pz), (size,.013,size*.70),'c8813c')
        o.parent = bread
    animate(bread, [(0,0),(0,-.16),(0,-.40),(0,-.88),(0,-.06)])
    # A full-sized baker, one orange foot on each side of the operator platform.
    dx, dy = .79, -.08
    for sx in (-.13,.13):
        oval('Webbed foot', (dx+sx,dy-.12,.35), (.12,.20,.055),'ff8a22')
    body = oval('Duck / body', (dx,dy,.71), (.29,.255,.36), WHITE)
    oval('Duck / apron', (dx,dy-.12,.65), (.275,.155,.235), paint)
    block('Apron bib', (dx,dy-.24,.79), (.32,.07,.18), trim)
    head = bpy.data.objects.new('Duck / head movement', None)
    bpy.context.collection.objects.link(head)
    head.location = (dx-.045,dy-.045,1.12)
    def feature(name, loc, dims, col):
        o = oval(name, loc, dims, col)
        o.parent = head
        return o
    feature('Soft white cheeks', (0,0,0), (.30,.265,.29), WHITE)
    feature('Lower bill', (-.045,-.244,-.080), (.169,.119,.047), 'ed6b1f')
    feature('Upper bill', (-.045,-.25,-.048), (.176,.132,.052), 'ffae27')
    for sx in (-.122,.122):
        feature('Espresso eye', (sx,-.228,.04), (.042,.026,.056), '201e2a')
        feature('Catchlight', (sx+.008,-.251,.059), (.014,.010,.016), WHITE)
    feature('Cap band', (0,0,.208), (.26,.229,.071), paint)
    feature('Baker beret', (.02,.01,.278), (.295,.26,.108+.019*tier), CREAM)
    if tier >= 1:
        for sx in (-.13,0,.13):
            feature('Toque pleat', (sx,.02,.328), (.109,.143,.078+.018*tier), WHITE)
    animate(head, [(0,0),(-.035,-.045),(-.08,-.12),(.04,.09),(0,.022)])
    oval('Resting wing', (dx+.236,dy-.025,.77), (.103,.152,.205), WHITE)
    block('Lever guide', (.40,-.41,.76), (.105,.13,.62), INK)
    lever = block('Lever / brass shaft', (.50,-.44,.99), (.35,.10,.074), trim)
    handle = oval('Lever / paddle', (.62,-.455,.99), (.14,.115,.08), 'ff8d26')
    hand = strut('Operating wing', (dx+.005,dy-.15,.87), (.62,-.45,1.025), .113, WHITE)
    press = [(0,0),(0,-.14),(0,-.31),(0,.065),(0,.008)]
    for obj in (lever,handle,hand):
        animate(obj,press)
    # Frame six only: a scorched case, loose dial, spring and split slice.
    intact = list(scene.objects)
    rubble = [block('Buckled case',(-.22,0,.33),(1.21,.87,.30),paint,.12),
              block('Broken rail',(.39,-.19,.38),(.78,.12,.10),trim),
              oval('Loose dial',(.58,.21,.34),(.16,.15,.07),INK)]
    rubble[0].rotation_euler.z = -.20
    rubble[1].rotation_euler.z = .76
    for obj in intact + rubble:
        if obj == base:
            continue
        for frame, broken in ((1, False), (6, True)):
            hidden = (obj in rubble) != broken
            for prop in ('hide_render', 'hide_viewport'):
                setattr(obj, prop, hidden)
                obj.keyframe_insert(data_path=prop, frame=frame)
    target = Vector((0,0,.84))
    bpy.ops.object.camera_add(location=target + Vector((2.8,-6.1,3.95)))
    camera = bpy.context.object
    camera.rotation_euler = (target-camera.location).to_track_quat('-Z','Y').to_euler()
    camera.data.type='ORTHO'; camera.data.ortho_scale=3.05
    scene.camera=camera
    scene.render.engine='CYCLES'; scene.cycles.samples=48
    scene.cycles.use_denoising=False
    scene.world=bpy.data.worlds.new('Soft box')
    scene.world.use_nodes=True
    scene.world.node_tree.nodes['Background'].inputs[0].default_value=(.8,.86,1,1)
    scene.world.node_tree.nodes['Background'].inputs[1].default_value=.55
    for pos,power,size in [((-3,-4,6),345,4),((3,2,4),220,3)]:
        bpy.ops.object.light_add(type='AREA', location=pos)
        light=bpy.context.object; light.data.energy=power; light.data.shape='DISK'; light.data.size=size
        light.rotation_euler=(target-light.location).to_track_quat('-Z','Y').to_euler()
    scene.view_settings.view_transform='Standard'
    scene.render.film_transparent=True; scene.render.resolution_percentage=100
    scene.render.resolution_x=scene.render.resolution_y=192
    scene.frame_end=6; scene.frame_set(1)
    for area in bpy.context.screen.areas:
        if area.type=='VIEW_3D':
            area.spaces.active.region_3d.view_perspective='CAMERA'
            area.spaces.active.shading.color_type='MATERIAL'
    name=f'Toaster-{level:02d}'
    bpy.ops.wm.save_as_mainfile(filepath=str(output/(name+'.blend')),compress=True)
    for frame in range(1,7):
        scene.frame_set(frame)
        scene.render.filepath=str(output/f'{name}-{frame}.png')
        bpy.ops.render.render(write_still=True)


for level in range(int(FIRST),int(LAST)+1):
    make(level)
