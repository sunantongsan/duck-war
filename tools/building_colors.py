"""Paint building materials before WebP encoding, using the light from the original render."""
import numpy as np
from PIL import Image

# Timber / plaster, colored panels, and optional white enamel. A consistent livery
# across stages makes a building recognizable even when the model changes shape.
PAINT = {
    'hq':            ('B86F4B', '34B4E4', None),
    'barracks':      ('D58F70', 'AD7BE8', None),
    'camp':          ('C58B66', '39B6A8', None),
    'workshop':      ('AE513D', 'E85C43', '219AAB'),
    'honeypump':     ('E49131', '3EA7B0', None),
    'honeyjar':      ('986044', 'F9B626', None),
    'veggieblender': ('369A88', '7BCD57', None),
    'veggiejar':     ('497E77', '79C94F', None),
    'syrupstove':    ('965B97', 'ED4978', None),
    'syrupjar':      ('79578D', 'E94875', None),
    'airfield':      ('397CAB', '6AD3C8', None),
    'lab':           ('635D9E', 'A280CF', '65BDDC'),
    'pantry':        ('C47349', '39B6AF', None),
    'hero':          ('86648E', 'DDAD44', None),
    'slingshot':     ('B87738', 'E77749', '368E9D'),
    'boxtower':      ('CE8B40', '4CA9AB', None),
    'mortar':        ('9291CC', 'E0AB54', None),
    'watergun':      ('418EBC', '40BACD', None),
    'chili':         ('BA4C42', 'F17C38', None),
    'rockets':       ('538AB3', 'F2B038', None),
    'fan':           ('2F968C', '7BCAB3', None),
    'lens':          ('AE83CC', 'EEAC45', None),
}


def ramp(x, lo, hi):
    return np.clip((x - lo) / (hi - lo), 0, 1)


def paint_materials(image, kind, stage, *, turret_base=False):
    rgba = np.array(image.convert('RGBA'))
    opaque = Image.fromarray(rgba[..., 3]).point(lambda a: 255 if a > 100 else 0)
    bounds = opaque.getbbox()
    if not bounds:
        return image
    x0, y0, x1, y1 = bounds
    surface = rgba[y0:y1, x0:x1]
    rgb = surface[..., :3].astype(np.float32) / 255
    hsv = np.asarray(Image.fromarray(surface[..., :3]).convert('HSV'), dtype=np.float32)
    hue, sat, value = hsv[..., 0] * (360 / 255), hsv[..., 1] / 255, hsv[..., 2] / 255
    lit = rgb @ np.array([.299, .587, .114], dtype=np.float32)
    solid = ramp(surface[..., 3].astype(np.float32), 105, 225) * ramp(value, .15, .37)
    painted = rgb.copy()

    def layer(hex_color, mask):
        if hex_color is None:
            return
        color = np.frombuffer(bytes.fromhex(hex_color), dtype=np.uint8).astype(np.float32) / 255
        # Preserve painted planes, occlusion and highlights, including the bevels.
        shade = np.clip(.20 + .97 * lit, .2, 1.06)
        highlight = ramp(lit, .70, 1) ** 1.5
        target = color * shade[..., None] + (1 - color) * (.29 * highlight[..., None])
        opacity = (mask * solid)[..., None]
        painted[:] = painted * (1 - opacity) + target * opacity

    body, accent, enamel = PAINT[kind]
    timber = ramp(hue, 0, 10) * (1 - ramp(hue, 39, 50)) * ramp(sat, .09, .24)
    # Warm amber liquid and the ducklings' light yellow feathers keep their own colors.
    if kind == 'honeyjar':
        timber *= 1 - ramp(sat, .36, .53)
    layer(body, timber)
    colored = ramp(sat, .24, .48) * np.maximum(1 - ramp(hue, 3, 11), ramp(hue, 55, 68))
    if kind == 'camp' or kind == 'hero':
        colored = np.maximum(colored, ramp(hue, 42, 53) * ramp(sat, .09, .20) * (1 - ramp(value, .90, .98)))
    if kind == 'honeyjar':
        colored = np.maximum(colored, ramp(hue, 28, 39) * (1 - ramp(hue, 53, 61)) * ramp(sat, .36, .53))
    layer(accent, colored * .85)
    layer(enamel, (1 - ramp(sat, .06, .20)) * ramp(value, .55, .85))
    # The fourth tier uses steel instead of timber. Keep the rotating head
    # metallic and enamel just the light steel panels of the fixed pedestal.
    if turret_base and stage == 4 and enamel is None:
        layer(body, (1 - ramp(sat, .15, .36)) * ramp(value, .40, .78) * .85)
    # The first duck house is a canvas awning. Paint woven bands in the
    # direction of its pitched roof, clipped to the blue canvas material.
    yy, xx = np.ogrid[:y1-y0, :x1-x0]
    x = xx / max(1, x1-x0-1)
    y = yy / max(1, y1-y0-1)
    if kind in ('hq', 'barracks') and stage > 1:
        # Later roof panels are bright apricot, while supports are darker timber.
        panels = timber * ramp(hue, 22, 29) * ramp(value, .88, .99)
        layer(accent, panels)
    if kind == 'hq' and stage == 1:
        fabric = ramp(hue, 185, 204) * (1 - ramp(hue, 225, 241)) * ramp(sat, .25, .48)
        along = y + .42 * x
        bands = ramp(along, .345, .351) * (1-ramp(along, .418, .424))
        piping = ramp(along, .448, .454) * (1-ramp(along, .471, .477))
        layer('FFE4A0', fabric * (bands + piping) * (y < .52))
    if kind == 'camp' and stage == 1:
        canvas = (1-ramp(sat, .25, .36)) * ramp(value, .86, .92)
        layer('55CDBB', canvas * ramp(hue, 16, 30) * (1 - ramp(y, .39, .47)))
    if kind == 'honeypump' and stage == 1:
        # An enamel band follows the curved lower side of the honey vat.
        curve = y + .74 * (x - .59) ** 2
        band = ramp(curve, .58, .59) * (1-ramp(curve, .65, .66))
        layer('6BC5C1', timber * band * ramp(x, .33, .35))
    surface[..., :3] = np.rint(np.clip(painted, 0, 1) * 255).astype(np.uint8)
    return Image.fromarray(rgba)
