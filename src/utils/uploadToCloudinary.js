import streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.js';

// Uploads a buffer (from multer memory storage) to Cloudinary and
// returns { url, publicId }.
export function uploadBuffer(buffer, folder = 'durga-puja-2026') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

export async function deleteFromCloudinary(publicId) {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId);
}
