const { PORT, 
    CONNECTION_URL, 
    JWT_SECRET,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET } = process.env;
module.exports = {
    port: PORT,
    connectionUrl: CONNECTION_URL,
    jwtSecret: JWT_SECRET,
    cloudinary_cloud_name:CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key:CLOUDINARY_API_KEY,
    cloudinary_api_secret:CLOUDINARY_API_SECRET
}