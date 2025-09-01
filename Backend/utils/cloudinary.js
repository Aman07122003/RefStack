import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadImage = async (filePath) => {
    try {
        if(!filePath) {
            throw new Error('File path is required');
        }
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'employee_images',
            use_filename: true,
            unique_filename: false,
        });
        fs.unlinkSync(filePath); // Delete the file after upload
        return result;
    }
    catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw new Error('Image upload failed');
    }
}

// utils/cloudinary.js
export const uploadMultipleImages = async (filePaths, folder = 'notes_images') => {
    try {
        const uploadPromises = filePaths.map(filePath => 
            uploadImage(filePath, folder)
        );
        
        const results = await Promise.all(uploadPromises);
        return results.filter(result => result !== null); // Filter out failed uploads
    } catch (error) {
        console.error('Error uploading multiple images:', error);
        return [];
    }
}