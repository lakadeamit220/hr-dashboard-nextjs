/**
 * Simulates processing a file upload on the server.
 * In a real application, this would upload the file to S3, Cloudinary, etc., 
 * and return the URL. For our mock Next.js app, we convert the File to a Base64 string.
 */
export async function processUpload(file) {
  if (!file || file.size === 0) {
    return null;
  }
  
  // Validate file type (basic image validation)
  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files are allowed for avatars.');
  }
  
  // Validate file size (e.g., max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    throw new Error('File size must be less than 2MB.');
  }

  // Convert File to Base64 using the browser-native FileReader API
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}
