import sys
import subprocess

try:
    from PIL import Image
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

def crop_transparent(image_path):
    try:
        img = Image.open(image_path).convert("RGBA")
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)
            img.save(image_path)
            print(f"Cropped {image_path}")
        else:
            print(f"No bounding box found (empty image) for {image_path}")
    except Exception as e:
        print(f"Failed to process {image_path}: {e}")

crop_transparent(r"c:\Users\graha\OneDrive\Desktop\pro-bio-f3d9de720982bcea801f08a3d71a10eca61cdf9f\public\logo.png")
crop_transparent(r"c:\Users\graha\OneDrive\Desktop\pro-bio-f3d9de720982bcea801f08a3d71a10eca61cdf9f\src\app\icon.png")

print("Cropping finished")
