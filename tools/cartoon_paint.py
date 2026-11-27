"""Final enamel colors on lit sprites. Each successive upgrade has its own trim."""
from pathlib import Path
import numpy as np
from PIL import Image

# Main enamel, contrasting fascia, signature highlight. Resource types keep
# their own family so honey, vegetables and syrup still read from a distance.
PALETTES = {
    'hq': ('079DEA', 'E83C5D', 'FFCC22'),
    'camp': ('04C29C', 'FC7053', 'FFDB36'),
    'barracks': ('A640E8', 'FF5F96', '38E4ED'),
    'workshop': ('FA493D', '184DBE', 'FFBF25'),
    'honeypump': ('FF9C0D', '117ACC', 'FFF13A'),
    'honeyjar': ('FFB809', 'FA6831', '0CDCC9'),
    'veggieblender': ('42C925', '008F9E', 'F2DB33'),
    'veggiejar': ('72CE14', '048D95', 'CEFF38'),
    'syrupstove': ('F02975', '6F36D1', 'FFAC28'),
    'syrupjar': ('EC2974', '9327B8', 'FFC837'),
    'airfield': ('07BEE4', '2447CF', 'F85883'),
    'lab': ('8450E5', '105CA7', '22F4E3'),
    'pantry': ('09C2AE', 'F56A39', 'FFDD3C'),
    'hero': ('FDAD17', '953AAA', '27E1F1'),
    'slingshot': ('F66E20', '1299BB', 'F7DE26'),
    'boxtower': ('FF942C', '126CB8', '33E6C5'),
    'mortar': ('935AEB', 'F69917', '35D9F4'),
    'watergun': ('14B8ED', '284AC1', 'FFD83C'),
    'chili': ('F03D35', 'A7336B', 'FFD331'),
    'rockets': ('348FED', 'FA623A', 'FFDA31'),
    'fan': ('15C097', '2571C4', 'FFBF3A'),
    'lens': ('B342D8', '444CCD', 'FFD22E'),
    'wall': ('1389B4', '4249AB', 'FFD33F'),
}

def ramp(v, lo, hi):
    return np.clip((v-lo)/(hi-lo), 0, 1)

def paint(image, kind, level):
    rgba = np.array(image.convert('RGBA'))
    alpha = rgba[..., 3] / 255
    yy, xx = np.where(alpha > .83)
    if not len(xx):
        return image
    rgb = rgba[..., :3].astype(np.float32) / 255
    hsv = np.asarray(Image.fromarray(rgba[..., :3]).convert('HSV'), dtype=np.float32) / 255
    h, s, v = hsv.transpose(2, 0, 1)
    y, x = np.ogrid[:image.height, :image.width]
    x = (x - xx.min()) / max(1, xx.max()-xx.min())
    y = (y - yy.min()) / max(1, yy.max()-yy.min())
    prog = (level-1) / 14
    main, second, trim = [np.array(list(bytes.fromhex(c)), dtype=np.float32)/255
                          for c in PALETTES[kind]]
    gold = np.array([1., .79, .12])
    warm = ramp(h, .002, .035) * (1-ramp(h, .125, .16))
    solid = ramp(alpha, .54, .91) * ramp(v, .08, .29)
    material = ramp(s, .13, .43)
    # Light enamel follows the original sculpture's illuminated and shaded faces.
    shade = .22 + .81*v
    shine = .19*ramp(v, .76, 1)**2
    out = rgb.copy()
    def coat(color, mask):
        target = shade[..., None]*color + shine[...,None]*(1-color)
        weight = np.clip(mask*solid, 0, 1)[...,None]
        out[:] = out*(1-weight) + target*weight
    coat(main, material*(1-.86*warm))
    # On honey vats the warm liquid is the main material, on timber it is the fascia.
    coat(main if kind in ('honeypump','honeyjar') else second, material*warm*.88)
    # Replace dull grey panels with cool enamel. Keep the brightest whites as highlights.
    ceramic = (1-ramp(s,.12,.38))*ramp(v,.24,.57)*(1-.67*ramp(v,.88,1))
    coat(second, ceramic*(.45+.40*prog))
    # Three coats per model: a broad contrasting accent, a second pinstripe,
    # then brighter gilt. Gable bands follow the isometric projection.
    step = (level-1)%3
    if kind in ('honeyjar','veggiejar','syrupjar','honeypump','mortar','lens'):
        seam = y - .33*(x-.5)**2
    else:
        seam = y + .37*np.abs(x-.5)
    def stripe(center, width):
        return 1-ramp(np.abs(seam-center), width, width+.012)
    width = .020 + .020*prog + step*.006
    band = stripe(.62, width)
    if level >= 4 or step:
        band = np.maximum(band, stripe(.69, .009 + step*.004))
    # Each intermediate level gets a broader, more prominent secondary color
    # on its band. Repeat the sequence on the next, more elaborate silhouette.
    band_colors = (second*.32 + trim*.68, trim, trim*.48 + gold*.52)
    accent = band_colors[step]*(1-.21*prog) + gold*.21*prog
    coat(accent, band*.95)
    if level >= 7:
        coat(trim, stripe(.36, .012 + .014*prog))
    if level >= 10:
        coat(gold, stripe(.405, .009 + step*.005))
    if level >= 13:
        # Enamel diamonds on the ceremonial band of the final architecture.
        diamond = np.abs((x*5+.5)%1-.5)/.5 + np.abs(seam-.51)/(.046+step*.008)
        coat(accent, (1-ramp(diamond,.76,1))*.98)
    rgba[..., :3] = np.clip(out*255,0,255).round().astype('uint8')
    return Image.fromarray(rgba)

def save_levels(image, folder, name, kind, levels, quality):
    for index, level in enumerate(levels):
        suffix = '' if index == 0 else f'_v{index+1}'
        paint(image, kind, level).save(Path(folder)/(name+suffix+'.webp'), quality=quality, method=5)

def save_turret(sheet, folder, name, kind, stage, quality):
    size = sheet.width//6
    level = 3*stage-2
    baked = sheet.copy()
    for index in range(17):
        x, y = index%6*size, index//6*size
        tile = sheet.crop((x,y,x+size,y+size))
        baked.paste(paint(tile,kind,level),(x,y))
        if index == 16:
            # Higher sublevels replace just the pedestal, keeping all sixteen
            # head directions shared in the original atlas.
            for step in (1,2):
                paint(tile,kind,level+step).save(Path(folder)/f'{name}_v{step+1}.webp',
                                                  quality=quality,method=5)
    baked.save(Path(folder)/(name+'.webp'),quality=quality,method=5)

def wall_levels(tier):
    return range(1 + (tier-1)*15//6, 1 + tier*15//6)
