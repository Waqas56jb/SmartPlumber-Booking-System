const processBase64Image = (base64String, maxSizeMB = 5) => {
  try {
    if (!base64String || typeof base64String !== 'string') {
      return {
        error: 'Invalid image data'
      };
    }
    const isDataUrl = base64String.startsWith('data:');
    let base64Data = base64String;
    let mimeType = 'image/jpeg';
    if (isDataUrl) {
      const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return {
          error: 'Invalid data URL format'
        };
      }
      mimeType = matches[1];
      base64Data = matches[2];
    }
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(mimeType)) {
      return {
        error: 'Invalid image type. Allowed: JPEG, PNG, GIF, WebP'
      };
    }
    const sizeInBytes = base64Data.length * 3 / 4;
    const sizeInMB = sizeInBytes / (1024 * 1024);
    if (sizeInMB > maxSizeMB) {
      return {
        error: `Image size exceeds ${maxSizeMB}MB limit`
      };
    }
    return {
      success: true,
      base64: base64Data,
      mimeType: mimeType,
      sizeMB: sizeInMB,
      dataUrl: base64String
    };
  } catch (error) {
    return {
      error: 'Error processing image: ' + error.message
    };
  }
};
const createDataUrl = (base64Data, mimeType) => {
  return `data:${mimeType};base64,${base64Data}`;
};
const validateImageFile = (file, maxSizeMB = 5) => {
  if (!file) {
    return {
      error: 'No file provided'
    };
  }
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.mimetype)) {
    return {
      error: 'Invalid image type. Allowed: JPEG, PNG, GIF, WebP'
    };
  }
  const sizeInMB = file.size / (1024 * 1024);
  if (sizeInMB > maxSizeMB) {
    return {
      error: `Image size exceeds ${maxSizeMB}MB limit`
    };
  }
  return {
    success: true,
    file
  };
};
module.exports = {
  processBase64Image,
  createDataUrl,
  validateImageFile
};
