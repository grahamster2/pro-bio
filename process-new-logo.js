const sharp = require('sharp');
const fs = require('fs');

async function processLogo() {
  const inputPath = 'C:/Users/graha/.gemini/antigravity/brain/92bf24b3-2715-4491-8ee4-c0a59d1e83eb/media__1778202079633.png';
  const outputPath = 'public/logo.png';

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  const rawBuffer = await image.ensureAlpha().raw().toBuffer();
  const output = Buffer.from(rawBuffer);

  let minX = width, minY = height, maxX = 0, maxY = 0;

  for (let i = 0; i < output.length; i += 4) {
    const r = output[i];
    const g = output[i + 1];
    const b = output[i + 2];
    
    // Check if it's blue-ish (the arrow)
    const isBlue = b > 150 && b > r + 30 && (g > 80);
    const isCoreBlue = r < 120 && g > 80 && g < 220 && b > 160;

    if (isBlue || isCoreBlue) {
      // Keep opacity
      const pixelIndex = i / 4;
      const x = pixelIndex % width;
      const y = Math.floor(pixelIndex / width);
      
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    } else {
      // Make transparent
      output[i] = 0;
      output[i + 1] = 0;
      output[i + 2] = 0;
      output[i + 3] = 0;
    }
  }

  // First save the cleaned version with transparency
  const cleanedBuffer = await sharp(output, { raw: { width, height, channels: 4 } }).png().toBuffer();

  // Then crop it to the bounding box of the blue pixels
  await sharp(cleanedBuffer)
    .extract({
      left: Math.max(0, minX - 5),
      top: Math.max(0, minY - 5),
      width: Math.min(width - minX + 5, maxX - minX + 10),
      height: Math.min(height - minY + 5, maxY - minY + 10)
    })
    .toFile(outputPath);

  console.log(`Processed and saved to ${outputPath}`);
}

processLogo().catch(console.error);
