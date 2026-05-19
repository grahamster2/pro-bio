const sharp = require('sharp');
const path = require('path');

async function cleanLogo() {
  const logoPath = path.resolve('public', 'logo.png');
  const outputPath = path.resolve('public', 'logo-clean.png');

  // Read raw pixel data
  const image = sharp(logoPath);
  const metadata = await image.metadata();
  const { width, height, channels } = metadata;

  const rawBuffer = await image
    .ensureAlpha()
    .raw()
    .toBuffer();

  console.log(`Image: ${width}x${height}, ${channels} channels`);

  // Process each pixel:
  // Keep blue arrow pixels, make everything else fully transparent
  // The blue arrow is roughly RGB (30-80, 150-210, 220-255) — a strong cyan/blue
  const pixelCount = width * height;
  const output = Buffer.from(rawBuffer);

  for (let i = 0; i < pixelCount; i++) {
    const offset = i * 4;
    const r = output[offset];
    const g = output[offset + 1];
    const b = output[offset + 2];
    const a = output[offset + 3];

    // Skip already-transparent pixels
    if (a === 0) continue;

    // Detect blue arrow pixels:
    // Blue channel should be dominant, with decent saturation
    const isBlue = b > 150 && b > r * 1.5 && (g > 100 || b > g);
    // Also catch lighter blue edges
    const isLightBlue = b > 180 && r < 150 && g > 80;
    // Catch the core blue (around #1A9FD4 / rgb(26,159,212))
    const isCoreBlue = r < 120 && g > 80 && g < 220 && b > 160;

    if (isBlue || isLightBlue || isCoreBlue) {
      // Keep this pixel, ensure fully opaque
      output[offset + 3] = 255;
    } else {
      // Make background fully transparent
      output[offset] = 0;
      output[offset + 1] = 0;
      output[offset + 2] = 0;
      output[offset + 3] = 0;
    }
  }

  await sharp(output, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(outputPath);

  console.log(`Clean logo saved to ${outputPath}`);

  // Also show some sample pixel colors to verify
  const samplePixels = [
    { x: Math.floor(width / 2), y: Math.floor(height / 4) },
    { x: Math.floor(width / 2), y: Math.floor(height / 2) },
    { x: 10, y: 10 },
    { x: width - 10, y: height - 10 },
  ];

  for (const { x, y } of samplePixels) {
    const off = (y * width + x) * 4;
    console.log(`Pixel (${x},${y}): R=${rawBuffer[off]} G=${rawBuffer[off+1]} B=${rawBuffer[off+2]} A=${rawBuffer[off+3]}`);
  }
}

cleanLogo().catch(console.error);
