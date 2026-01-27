/**
 * Image Upload Service
 * Handles image uploads using base64 encoding (stored in database)
 * Alternative: Can be extended to use Vercel Blob Storage
 */

// Validate and process base64 image
const processBase64Image = (base64String, maxSizeMB = 5) => {
  try {
    if (!base64String || typeof base64String !== 'string') {
      return { error: 'Invalid image data' };
    }

    // Check if it's a data URL
    const isDataUrl = base64String.startsWith('data:');
    let base64Data = base64String;
    let mimeType = 'image/jpeg';

    if (isDataUrl) {
      // Extract mime type and base64 data
      const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return { error: 'Invalid data URL format' };
      }
      mimeType = matches[1];
      base64Data = matches[2];
    }

    // Validate image type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(mimeType)) {
      return { error: 'Invalid image type. Allowed: JPEG, PNG, GIF, WebP' };
    }

    // Calculate size in MB
    const sizeInBytes = (base64Data.length * 3) / 4;
    const sizeInMB = sizeInBytes / (1024 * 1024);

    if (sizeInMB > maxSizeMB) {
      return { error: `Image size exceeds ${maxSizeMB}MB limit` };
    }

    // Return processed image data
    return {
      success: true,
      base64: base64Data,
      mimeType: mimeType,
      sizeMB: sizeInMB,
      dataUrl: base64String // Keep original data URL for storage
    };
  } catch (error) {
    return { error: 'Error processing image: ' + error.message };
  }
};

// Convert base64 to data URL format for storage
const createDataUrl = (base64Data, mimeType) => {
  return `data:${mimeType};base64,${base64Data}`;
};

// Validate image file from form data (if using multipart/form-data)
const validateImageFile = (file, maxSizeMB = 5) => {
  if (!file) {
    return { error: 'No file provided' };
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.mimetype)) {
    return { error: 'Invalid image type. Allowed: JPEG, PNG, GIF, WebP' };
  }

  const sizeInMB = file.size / (1024 * 1024);
  if (sizeInMB > maxSizeMB) {
    return { error: `Image size exceeds ${maxSizeMB}MB limit` };
  }

  return { success: true, file };
};

module.exports = {
  processBase64Image,
  createDataUrl,
  validateImageFile
};
