import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath) => {
  try {
    if (!filePath) {
      throw new Error("File path is required");
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: "RefStack/photos",
      resource_type: "auto",
    });

    // Delete local file after successful upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {

    // Delete file if upload fails
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.log("CLOUDINARY UPLOAD ERROR:", error);
    return null;
  }
};

export const deleteImage = async (publicId) => {
    try {
        if(!publicId) return false;
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    }
    catch (error) {
        console.error('Error deleting Image from Cloudinary:', error);
        throw new Error('Image deletion failed');
    }
}

export const uploadDocument = async (filePath) => {
    try {
      if (!filePath) {
        throw new Error("File path is required");
      }
  
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "RefStack/documents",
        resource_type: "auto"
      });
  
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
  
      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error) {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
  
      console.log("CLOUDINARY UPLOAD ERROR:", error);
      return null;
    }
  };

export const deleteDocument = async (publicId) => {
    try {
        if(!publicId) return false;
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    }
    catch (error) {
        console.error('Error deleting file from Cloudinary:', error);
        throw new Error('File deletion failed');
    }
}