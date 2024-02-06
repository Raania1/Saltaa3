const express = require("express")
const {UserModel , validationLogin} = require('../models/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler")

/**
 * @desc connexion d'un utilisateur
 * @route /login
 * @method POST
 */

const login = ("/", asyncHandler( async (req,res)=>{

    const {error} = validationLogin(req.body);
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }

    const {email,password} = req.body
    const usr = await UserModel.findOne({email})


  if (!usr) {
        return res.status(400).json({ message: "L'email ou le mot de passe est incorrect" });
    }
    
    const isPasswordValid = await bcrypt.compare(password , usr.password);
    
    if (!isPasswordValid) {
        return res.status(400).json({ message: "L'email ou le mot de passe est incorrect" });
    }
    const token = jwt.sign({id:usr._id}, process.env.SECRET)
    return res.json({token,UserId:usr._id})

}))



module.exports = login;