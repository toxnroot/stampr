export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export function getPosition(position, imgW, imgH, logoW, logoH, offsetX = 0, offsetY = 0) {
  let x, y;

  switch (position) {
    case 'top-right':
      x = imgW - logoW;
      y = 0;
      break;
    case 'bottom-left':
      x = 0;
      y = imgH - logoH;
      break;
    case 'bottom-right':
      x = imgW - logoW;
      y = imgH - logoH;
      break;
    case 'center':
      x = (imgW - logoW) / 2;
      y = (imgH - logoH) / 2;
      break;
    default: // top-left
      x = 0;
      y = 0;
  }

  // Apply custom offsets
  return { x: x + offsetX, y: y + offsetY };
}
