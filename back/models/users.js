const {Schema,model} = require('mongoose')
const joi = require("joi")

const UserSchema = new Schema({
    nom:{
        type: String,
        required : true,
        trim : true,
    },
    prenom:{
        type: String,
        required : true,
        trim : true,
    },
    nomannoncceur:{
        type: String,
        required : true,
        trim : true,
    },
    domaine:{
        type: String,
        required : true,
        trim : true,
    },
    téléphone:{
        type: String,
        required : true,
        trim : true,
        minlength : 8,
        maxlength : 8, 
    },
    email:{
        type: String,
        required : true,
        trim : true,
        unique : true,
    },
    password:{
        type:String,
        required : true,
        trim : true,
        minlength : 6,
    },
    photoprofile:{
        type : Object,
        default: {
            url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            publicId : null,
        }
    }
},{
   timestamps:true 
})

const UserModel = model("users",UserSchema)

function validationInscription(obj){
    const Schema = joi.object({
        nom: joi.string().trim().required(),
        prenom: joi.string().trim().required(),
        nomannoncceur: joi.string().trim().required(),
        domaine: joi.string().trim().required(),
        téléphone: joi.string().trim().min(8).max(8).required(),
        email : joi.string().trim().required().email(),
        password : joi.string().trim().min(6).required(),
    })
    return Schema.validate(obj);
}
function validationLogin(obj){
    const Schema = joi.object({
        email : joi.string().trim().required().email(),
        password : joi.string().trim().min(6).required(),
    })
    return Schema.validate(obj);
}

module.exports = {UserModel , validationInscription , validationLogin }