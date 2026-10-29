/**
 * Image processing utilities for client-side uploads (PC and Mobile)
 * Converts File to compressed Base64 Data URL to fit localStorage limits
 * while maintaining high visual fidelity.
 */

export interface ProcessedImage {
  dataUrl: string;
  name: string;
  size: number;
  width: number;
  height: number;
}

export async function processImageFile(
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1280,
  quality: number = 0.85
): Promise<ProcessedImage> {
  return new Promise((resolve, reject) => {
    // If not an image, reject
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file.'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // Calculate aspect ratio preserving dimensions
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to raw data url if canvas context fails
          resolve({
            dataUrl: event.target?.result as string,
            name: file.name,
            size: file.size,
            width: img.width,
            height: img.height
          });
          return;
        }

        // Draw with high quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP if supported, fallback to JPEG
        let mimeType = 'image/jpeg';
        if (file.type === 'image/png') {
          // Check if transparency exists or if small, else use jpeg for compression
          mimeType = 'image/jpeg';
        } else if (file.type === 'image/webp') {
          mimeType = 'image/webp';
        }

        const dataUrl = canvas.toDataURL(mimeType, quality);

        resolve({
          dataUrl,
          name: file.name,
          size: Math.round((dataUrl.length * 3) / 4),
          width,
          height
        });
      };

      img.onerror = () => {
        reject(new Error('Failed to load the selected image file.'));
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read image file from device.'));
    };

    reader.readAsDataURL(file);
  });
}
