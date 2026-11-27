"""Bake legible sunlit faces into the final isometric sprites, at export time."""
import numpy as np
from PIL import Image, ImageFilter


def light_building(image):
    rgba = np.array(image.convert("RGBA"))
    opacity = rgba[:, :, 3].astype(np.float32) / 255
    solid_y, solid_x = np.where(opacity > 0.85)
    if not len(solid_y):
        return image

    # Use the solid mesh bounds, excluding the soft cast shadow and atlas padding.
    y, x = np.ogrid[:image.height, :image.width]
    x = np.clip((x - solid_x.min()) / max(1, solid_x.max() - solid_x.min()), 0, 1)
    y = np.clip((y - solid_y.min()) / max(1, solid_y.max() - solid_y.min()), 0, 1)
    rgb = rgba[:, :, :3].astype(np.float32)
    luma = rgb @ np.array([0.213, 0.715, 0.072], dtype=np.float32)
    # A short local contrast pass picks out the eaves and trim at phone scale.
    # Suppress it at transparent boundaries to avoid a bright fringe.
    blur = Image.fromarray(luma.round().astype("uint8")).filter(ImageFilter.GaussianBlur(2.6))
    inside = np.asarray(image.getchannel("A").filter(ImageFilter.MinFilter(7))) / 255
    detail = np.clip(luma - np.asarray(blur), -22, 22) * 0.50 * inside
    midtones = 4 * (luma / 255) * (1 - luma / 255)
    sun = (0.52 - y) * 51 + (0.5 - x) * 29
    tone = np.interp(luma, [0, 45, 100, 160, 210, 255], [0, 31, 84, 168, 226, 255])
    lit = (tone + sun * midtones + detail)[:, :, None] + (rgb - luma[:, :, None]) * 1.15
    # Warm the key light and give the shaded side a cooler reflected light.
    lit += (sun * midtones)[:, :, None] * np.array([0.22, 0.00, -0.25])
    coverage = np.clip((opacity - 0.50) / 0.40, 0, 1)[:, :, None]
    rgba[:, :, :3] = np.clip(rgb + coverage * (lit - rgb), 0, 255).round().astype("uint8")
    return Image.fromarray(rgba)
