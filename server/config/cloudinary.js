const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dp4lzyo05',
    api_key: process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'G3W_AL19dvn2amSF5Jw4LlpQMYU'
});

/**
 * Uploads a local file to Cloudinary and removes the local file.
 * Handles both images and videos automatically.
 * Returns the permanent HTTPS secure_url.
 */
async function uploadToCloudinary(filePath, folder = 'ias_website') {
    if (!filePath || !fs.existsSync(filePath)) {
        return null;
    }

    // If Cloudinary credentials are missing, do not attempt
    if (!process.env.CLOUDINARY_API_KEY && !cloudinary.config().api_key) {
        return null;
    }

    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder,
            resource_type: 'auto'
        });

        // Clean up temporary local file
        fs.unlink(filePath, () => {});

        return result.secure_url;
    } catch (err) {
        console.error('Cloudinary upload error:', err);
        throw err;
    }
}

module.exports = {
    cloudinary,
    uploadToCloudinary
};
