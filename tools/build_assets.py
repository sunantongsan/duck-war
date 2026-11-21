# Build the game's art from the Blender renders (see tools/art/).
#   python3 tools/build_assets.py <render_dir>
# <render_dir> holds the renders made with the game camera (yaw 45, elevation 48.6, no ground pad):
#   r45/<kind><stage>/base.png (+ base_rubble.png, head_00..15.png for turrets, meta.json with ox/oy/ppu_frac)
#   r45/hq/hq<stage>.png (+ _rubble, _meta.json), atlas/<unit>/d<dir>_c<frame>.png + meta.json for troops.
# Output: web/assets/*.webp and web/data/art.json (anchors and scales the game uses to draw everything).
import json, math, os, sys
import numpy as np
from PIL import Image, ImageFilter, ImageDraw

SRC = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/duck'
R45 = os.path.join(SRC, 'r45')
ATL = os.path.join(SRC, 'atlas')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'web', 'assets')
os.makedirs(OUT, exist_ok=True); os.makedirs(os.path.join(ROOT, 'web', 'data'), exist_ok=True)
ART = {'buildings': {}, 'turrets': {}, 'troops': {}, 'walls': {}}
Q = 88

def contact_shadow(im, ox, oy, radius_px):
    """Soft shadow under the ground point so buildings sit on the grass."""
    radius_px = float(radius_px); W, H = im.size; pad = int(radius_px * .7)
    out = Image.new('RGBA', (W + 2 * pad, H + 2 * pad))
    m = Image.new('L', out.size, 0); d = ImageDraw.Draw(m)
    rx, ry = radius_px, radius_px * .55
    cx, cy = ox + pad, oy + pad
    d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=95)
    m = m.filter(ImageFilter.GaussianBlur(rx * .16))
    s = Image.new('RGBA', out.size, (24, 48, 26, 0)); s.putalpha(m)
    out.alpha_composite(s); out.alpha_composite(im, (pad, pad))
    return out, ox + pad, oy + pad

def save_sprite(im, ox, oy, ppu, name, shadow_units=0):
    if shadow_units: im, ox, oy = contact_shadow(im, ox, oy, shadow_units * ppu * .42)
    bb = im.getbbox(); im = im.crop(bb); ox -= bb[0]; oy -= bb[1]
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=Q, method=6)
    return {'file': name + '.webp', 'ax': round(ox, 1), 'ay': round(oy, 1), 'ppu': round(ppu, 3), 'w': im.width, 'h': im.height}

SIZE = {'hq': 3, 'camp': 3}
def fit_of(im, ppu, size, fill=.95):
    """How much to enlarge the raw render so its body (no shadow) spans ~95% of the footprint diamond's screen width."""
    a = np.array(im.getchannel('A')) > 160; cols = np.where(a.any(0))[0]
    w = (cols[-1] - cols[0] + 1) / ppu if len(cols) else 1
    return float(min(3.2, size * 2 ** .5 * fill / w))

def clean(im):
    """Shadow-catcher renders leave ~1/255 alpha haze over the whole frame; it shows as faint boxes in game. Drop it."""
    a = np.array(im); a[a[..., 3] < 10] = 0; return Image.fromarray(a)

def load(dirp, fn):
    im = clean(Image.open(os.path.join(dirp, fn)).convert('RGBA')); m = json.load(open(os.path.join(dirp, 'meta.json'))); F = im.size[0]
    return im, m['ox'] * F, m['oy'] * F, m['ppu_frac'] * F, m.get('pad', 1.9)

# ---------- static buildings: 5 stages + rubble ----------
STATIC = {'hq': 'hq', 'barracks': 'barracks', 'workshop': 'redbarn', 'honeypump': 'pumpY', 'veggieblender': 'blenderG', 'syrupstove': 'stoveR',
          'honeyjar': 'jarY', 'veggiejar': 'jarG', 'syrupjar': 'jarR', 'camp': 'camp', 'airfield': 'castle', 'lab': 'lab', 'pantry': 'tech', 'hero': 'hero'}
# ONLY=veggieblender,cat_king,... rebuilds just those keys and keeps everything else from the current art.json
ONLY = set(filter(None, os.environ.get('ONLY', '').split(',')))
PREV = json.load(open(os.path.join(ROOT, 'web', 'data', 'art.json'))) if ONLY else None
def keep(section, key):
    if ONLY and key not in ONLY and key in PREV.get(section, {}): ART[section][key] = PREV[section][key]; return True
    return False
for key, src in STATIC.items():
    if keep('buildings', key): continue
    stages = []; size = SIZE.get(key, 2); fit = None
    for n in range(1, 6):
        if key == 'hq':
            p = os.path.join(R45, 'hq', f'hq{n}.png'); im = clean(Image.open(p).convert('RGBA')); F = im.size[0]; m = json.load(open(p + '_meta.json'))
            a = (im, m['ox'] * F, m['oy'] * F, m['ppu_frac'] * F, m['pad'])
        else: a = load(os.path.join(R45, f'{src}{n}'), 'base.png')
        if fit is None: fit = fit_of(a[0], a[3], size)
        stages.append(save_sprite(a[0], a[1], a[2], a[3] / fit, f'b_{key}_{n}', size))
    if key == 'hq':
        p = os.path.join(R45, 'hq', 'hq3_rubble.png'); im = clean(Image.open(p).convert('RGBA')); F = im.size[0]; m = json.load(open(os.path.join(R45, 'hq', 'hq3.png_meta.json')))
        rub = save_sprite(im, m['ox'] * F, m['oy'] * F, m['ppu_frac'] * F / fit, f'b_{key}_rubble', size)
    else:
        a = load(os.path.join(R45, f'{src}3'), 'base_rubble.png'); rub = save_sprite(a[0], a[1], a[2], a[3] / fit, f'b_{key}_rubble', size)
    ART['buildings'][key] = {'stages': stages, 'rubble': rub}
    print('building', key)

# ---------- turrets: per stage a 6x3 atlas, cells 0-15 heads (game directions), 16 base, 17 rubble ----------
ISO = .75
def game_angle_screen(d):
    a = d * 2 * math.pi / 16
    return math.atan2((math.cos(a) + math.sin(a)) * ISO, math.cos(a) - math.sin(a))
def head_angle(i):
    Y, E = math.radians(45), math.radians(48.6); th = 2 * math.pi * i / 16
    fx, fy = math.sin(th), -math.cos(th)
    sx = fx * math.cos(Y) + fy * math.sin(Y); sy = (fx * math.sin(Y) - fy * math.cos(Y)) * math.sin(E)
    return math.atan2(sy, sx), sx, sy
PICK = [min(range(16), key=lambda i: abs(math.atan2(math.sin(head_angle(i)[0] - game_angle_screen(d)), math.cos(head_angle(i)[0] - game_angle_screen(d))))) for d in range(16)]
TURRETS = {'slingshot': 'sling', 'boxtower': 'boxtower', 'mortar': 'mortar', 'watergun': 'aa', 'chili': 'chef', 'rockets': 'rocket', 'fan': 'fan', 'lens': 'lens'}
CELL = 192
for key, src in TURRETS.items():
    if keep('turrets', key): continue
    stages = []; tfit = None
    for n in range(1, 6):
        d = os.path.join(R45, f'{src}{n}'); base, ox, oy, ppu, pad = load(d, 'base.png');
        if tfit is None: tfit = fit_of(base, ppu, 2, .9)
        rub = clean(Image.open(os.path.join(d, 'base_rubble.png')).convert('RGBA'))
        heads = []
        for i in range(16):
            h = np.array(Image.open(os.path.join(d, f'head_{i:02d}.png')).convert('RGBA')); h[h[..., 3] < 30] = 0; heads.append(Image.fromarray(h))
        base, sox, soy = contact_shadow(base, ox, oy, 2 * ppu / tfit * .42)
        pad_px = (base.size[0] - heads[0].size[0]) // 2
        def padded(im):
            o = Image.new('RGBA', base.size); o.alpha_composite(im, (pad_px, pad_px)); return o
        heads = [padded(h) for h in heads]; rub = padded(rub)
        U = np.zeros(base.size[::-1], bool)
        for im in [base, rub] + heads: U |= np.array(im.split()[3]) > 10
        ys, xs = np.where(U); x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
        half = max(sox - x0, x1 - sox); x0, x1 = int(sox - half), int(math.ceil(sox + half))
        sc = min(CELL / (x1 - x0), CELL / (y1 - y0))
        def cell(im):
            c = im.crop((x0, y0, x1, y1)); c = c.resize((max(1, round(c.width * sc)), max(1, round(c.height * sc))), Image.LANCZOS)
            o = Image.new('RGBA', (CELL, CELL)); o.alpha_composite(c, ((CELL - c.width) // 2, CELL - c.height)); return o, (CELL - c.width) // 2, CELL - c.height
        sheet = Image.new('RGBA', (CELL * 6, CELL * 3)); tips = []
        for dgame in range(16):
            hi = PICK[dgame]; c, offx, offy = cell(heads[hi]); sheet.alpha_composite(c, ((dgame % 6) * CELL, (dgame // 6) * CELL))
            _, sx, sy = head_angle(hi); pts = np.argwhere(np.array(heads[hi].split()[3]) > 200)
            if len(pts):
                cy, cx = pts.mean(0); q = pts[((pts[:, 1] - cx) * sx + (pts[:, 0] - cy) * sy).argmax()]
                tips.append([round((q[1] - x0) * sc + offx, 1), round((q[0] - y0) * sc + offy, 1)])
            else: tips.append([CELL / 2, CELL / 2])
        c, offx, offy = cell(base); sheet.alpha_composite(c, (4 * CELL, 2 * CELL))
        c2, _, _ = cell(rub); sheet.alpha_composite(c2, (5 * CELL, 2 * CELL))
        name = f't_{key}_{n}'; sheet.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=Q, method=6)
        stages.append({'file': name + '.webp', 'cell': CELL, 'ax': round((sox - x0) * sc + offx, 1), 'ay': round((soy - y0) * sc + offy, 1), 'ppu': round(ppu * sc, 3), 'tips': tips})
    ART['turrets'][key] = {'stages': stages, 'fit': round(tfit, 3)}
    print('turret', key)

# ---------- walls: 6 tiers x (post, link along +x, link along +y) ----------
for t in range(1, 7):
    if ONLY and keep('walls', str(t)): continue
    pieces = {}
    for p in ('post', 'linkx', 'linky'):
        d = os.path.join(R45, f'wall{t}{p}')
        if not os.path.exists(os.path.join(d, 'meta.json')): continue
        im, ox, oy, ppu, pad = load(d, 'base' + ('_' + p) + '.png') if os.path.exists(os.path.join(d, 'base_' + p + '.png')) else load(d, 'base.png')
        pieces[p] = save_sprite(im, ox, oy, ppu, f'w_{t}_{p}')
    ART['walls'][str(t)] = pieces
print('walls', len(ART['walls']))

# ---------- troops: 8 directions x 21 frames (idle 0-3, walk 4-11, attack 12-15, death 16-20), 180x192 cells ----------
TROOPS = {'fork': 'fork', 'sling': 'sling', 'giant': 'giant', 'nurse': 'nurse', 'digger': 'digger', 'pot': 'armor', 'chef': 'chef', 'pig': 'pig_rider',
          'bomber': 'bomber', 'witch': 'witch', 'dog': 'dog', 'egret': 'egret', 'cat_spatula': 'cat_spatula', 'cat_pan': 'cat_pan', 'cat_chili': 'cat_chili', 'cat_bomb': 'cat_bomb', 'cat_king': 'cat_king', 'colonel': 'colonel_big', 'balloon': 'balloon', 'plane': 'plane'}
BIG = {'colonel': 1.5, 'balloon': 1.5}   # heroes are drawn much bigger, so they get bigger cells
CW, CH = 180, 192
def outline(im):
    a = im.split()[3].point(lambda v: 255 if v > 90 else 0).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(.5))
    o = Image.new('RGBA', im.size, (58, 38, 22, 0)); o.putalpha(a.point(lambda v: int(v * .85))); o.alpha_composite(im); return o
OLD = json.load(open(os.path.join(ROOT, 'web', 'data', 'art.json'))) if os.environ.get('SKIP_TROOPS') else None
for key, src in TROOPS.items():
    if keep('troops', key): continue
    if OLD:
        if key in OLD['troops']: ART['troops'][key] = OLD['troops'][key]
        continue
    d = os.path.join(ATL, src)
    if not os.path.exists(os.path.join(d, 'meta.json')): print('skip troop (not rendered yet)', key); continue
    m = json.load(open(os.path.join(d, 'meta.json')))
    sc = BIG.get(key, 1); cw, ch = int(CW * sc), int(CH * sc)
    sheet = Image.new('RGBA', (21 * cw, 8 * ch)); top = ch
    for dd in range(8):
        for c in range(21):
            im = outline(Image.open(os.path.join(d, f'd{dd}_c{c:02d}.png')).convert('RGBA').resize((cw, ch), Image.LANCZOS))
            sheet.alpha_composite(im, (c * cw, dd * ch))
            if c == 0:
                bb = im.split()[3].point(lambda v: 255 if v > 60 else 0).getbbox()
                if bb: top = min(top, bb[1])
    sheet.save(os.path.join(OUT, f'u_{key}.webp'), 'WEBP', quality=Q, method=6)
    ax, ay = m['ox'] * .75 * sc, m['oy'] * .75 * sc
    ART['troops'][key] = {'file': f'u_{key}.webp', 'ax': round(ax, 1), 'ay': round(ay, 1), 'h': round(ay - top, 1)}
    if sc != 1: ART['troops'][key].update({'cw': cw, 'ch': ch})
    print('troop', key)
ART['troopLayout'] = {'cw': CW, 'ch': CH, 'dirs': 8, 'idle': [0, 4], 'walk': [4, 8], 'attack': [12, 4], 'death': [16, 5]}
json.dump(ART, open(os.path.join(ROOT, 'web', 'data', 'art.json'), 'w'), separators=(',', ':'))
print('art.json written')

# ---------- UI: resource icons, troop portraits, welcome art ----------
UI = os.path.join(SRC, 'ui'); LIB = os.path.join(SRC, 'lib')
for r, f in [('honey', 'res_Y_honey.png'), ('veggie', 'res_G_veggie.png'), ('syrup', 'res_R_syrup.png')]:
    im = Image.open(os.path.join(UI, f)).convert('RGBA'); im = im.crop(im.getbbox()); im.thumbnail((96, 96), Image.LANCZOS); im.save(os.path.join(OUT, f'ic_{r}.webp'), 'WEBP', quality=90)
coin = os.path.join(ROOT, 'tools', 'art', 'coin.png')
if os.path.exists(coin): im = Image.open(coin).convert('RGBA'); im.thumbnail((96, 96), Image.LANCZOS); im.save(os.path.join(OUT, 'ic_coin.webp'), 'WEBP', quality=90)
for key, src in [('fork', 'fork'), ('sling', 'sling'), ('giant', 'giant'), ('digger', 'digger'), ('pot', 'armor'), ('nurse', 'nurse'), ('chef', 'chef'), ('pig', 'pig_rider'), ('dog', 'dog'), ('balloon', '@balloon'), ('plane', 'plane')]:
    p = os.path.join(ATL, src[1:], 'd1_c00.png') if src.startswith('@') else os.path.join(LIB, f'u_{src}.png')   # @ = take the portrait from the new atlas
    if not os.path.exists(p): continue
    im = Image.open(p).convert('RGBA'); im = im.crop(im.getbbox()); im.thumbnail((128, 128), Image.LANCZOS); im.save(os.path.join(OUT, f'p_{key}.webp'), 'WEBP', quality=88)
wel = os.path.join(ROOT, 'tools', 'art', 'welcome.png')
if os.path.exists(wel): Image.open(wel).convert('RGB').save(os.path.join(OUT, 'welcome.webp'), 'WEBP', quality=86)
print('ui done')
