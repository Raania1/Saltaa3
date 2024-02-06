const express = require("express")
const {UserModel} = require('../models/users')
const asyncHandler = require("express-async-handler")
const bcrypt = require('bcrypt');
const path = require("path");
const fs = require('fs');
const {cloudinaryupload , cloudinaryremove} = require("../utils/cloudinary")

/**
 * @desc  Get Profile
 * @route /Profile/:id
 * @method GET
 */

const profile = asyncHandler( async (req,res) =>{
    const useer = await UserModel.findById(req.params.id).select("-password")
    res.status(200).json(useer);
})

/**
 * @desc  updat Profile
 * @route /Profile/:id
 * @method PUT
 */
const updateProfile = asyncHandler( async (req,res) =>{
 
    if (req.body.password){
     req.body.password =  bcrypt.hashSync(req.body.password,10);
    }
    const updateusr = await UserModel.findByIdAndUpdate(req.params.id , {
        $set : {
            nom: req.body.nom,
            prenom: req.body.prenom,
            nomannoncceur: req.body.nomannoncceur,
            domaine:  req.body.domaine,
            téléphone: req.body.téléphone,
            password : req.body.password,
        }
    } , {new : true}).select("-hashedpassword1")
    res.status(200).json(updateusr);
})

/**
 * @desc  nomber utilisateur
 * @route /Profile/nbr
 * @method GET
 */
const Nombreprofile = asyncHandler( async (req,res) =>{
    const nombre = await UserModel.countDocuments();
    res.status(200).json(nombre);
})

/**
 * @desc  update photo de profille
 * @route /Profile/updatephoto/:id
 * @method POST
 */
const updatepdp = asyncHandler( async (req,res) =>{
    
   
    if (!req.file){
        return res.status(400).json({ message : "no file provided"});
    }
    
    const imagepath = path.join(__dirname, `../images/${req.file.filename}`)

    
    const result = await cloudinaryupload(imagepath);
    console.log(result);
 
    const user = await UserModel.findById(req.params.id);
  
    if(user.photoprofile !== null){
        await cloudinaryremove(user.photoprofile.publicId);
    }
    
     user.photoprofile = {
        url: result.secure_url,
        publicId: result.public_id,
     }
     await user.save();

    res.status(200).json({
        message: "photo modifié avec succées" ,
         photoprofile: {url: result.secure_url, publicId: result.public_id}
    });

    fs.unlinkSync(imagepath);
})


/**
 * @desc  delete Profile
 * @route /Profile/:id
 * @method DELETE
 */

const deleteprofile = asyncHandler( async (req,res) =>{
   const user = await UserModel.findById(req.params.id);
   await cloudinaryremove(user.photoprofile.publicId);
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "profille supprimer"});
})

module.exports = {profile , updateProfile , Nombreprofile , updatepdp , deleteprofile}