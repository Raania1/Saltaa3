const express = require("express")
const {UserModel , validationInscription} = require('../models/users')
const asyncHandler = require("express-async-handler")
const bcrypt = require('bcrypt');

/**
 * @desc créer nouvelle utilisateur
 * @route /inscription
 * @method POST
 */

const inscription = asyncHandler( async (req,res)=>{

    const {error} = validationInscription(req.body);
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }

    
    const {nom,prenom,nomannoncceur,domaine,téléphone,email,password} = req.body
    const usr = await UserModel.findOne({email})

    if(usr){
        return res.status(400).json({message:"email non valid"})
    }
    const hashedpassword =  bcrypt.hashSync(password,10)
    const newusr=new UserModel({
        nom:nom,
        prenom:prenom,
        nomannoncceur:nomannoncceur,
        domaine:domaine,
        téléphone:téléphone,
        email:email,
        password:hashedpassword
    });
    await newusr.save();
    return res.status(201).json({message:"User created"})
})
module.exports = inscription