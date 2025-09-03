// utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath) => {
    try {
        if(!filePath) {
            throw new Error('File path is required');
        }
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'employee_images',
            resource_type: 'auto'
        });
        fs.unlinkSync(filePath); // Delete the file after upload
        return result;
    }
    catch (error) {
        fs.unlinkSync(filePath); // Ensure file is deleted on error as well
        console.error('Error uploading image to Cloudinary:', error);
        throw new Error('Image upload failed');
        return null;
    }
}

// Upload PDF function (new)
export const uploadPDF = async (filePath) => {
    try {
        if(!filePath) {
            throw new Error('File path is required');
        }
        
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'notes_pdfs',
            resource_type: 'raw', // Important for PDF files
            use_filename: true,
            unique_filename: false,
        });
        
        fs.unlinkSync(filePath); // Delete the file after upload
        return result;
    }
    catch (error) {
        fs.unlinkSync(filePath); 
        console.error('Error uploading PDF to Cloudinary:', error);
        throw new Error('PDF upload failed');
    }
}

// Delete file from Cloudinary
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType
        });
        return result;
    }
    catch (error) {
        console.error('Error deleting file from Cloudinary:', error);
        throw new Error('File deletion failed');
    }
}