"""Pack Blender's six poses into one phone-friendly atlas per level."""
import sys
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[2]
renders = Path(sys.argv[1])
for level in range(1, 21):
    sheet = Image.new('RGBA', (576, 384))
    for pose in range(6):
        with Image.open(renders / f'Toaster-{level:02d}-{pose+1}.png') as frame:
            sheet.paste(frame, ((pose % 3)*192, (pose // 3)*192))
    sheet.save(root / 'web/assets' / f'toaster_{level:02d}.webp', quality=88, method=6)
