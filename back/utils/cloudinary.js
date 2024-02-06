const cloudinary = require("cloudinary")
          
cloudinary.config({ 
  cloud_name: 'daahvfm7m', 
  api_key: '788922746211389', 
  api_secret: 'xBBbjpRAXzlIurQbQW1SaZm21ec' 
});

//cloudinary upload image
const cloudinaryupload = async(fileToUpload) =>{
    try{
        const data = await cloudinary.uploader.upload(fileToUpload , {
            resource_type: 'auto',
        });
        return data;
    }
    catch(error){
        return error;
    }
}

//cloudinary remove image
const cloudinaryremove = async(imagepublicId) =>{
    try{
        const result = await cloudinary.uploader.destroy(imagepublicId);
        return result;
    }
    catch(error){
        return error;
    }
}

module.exports = {cloudinaryupload , cloudinaryremove}