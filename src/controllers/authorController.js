const author=require("../models/authorModel")
var jwt = require('jsonwebtoken');
const authorModel = require("../models/authorModel");
var validator = require("email-validator");

let createrAuthor= async function(req,res){
    try{
   let {fname,lname,title,email,password}=req.body
    
   if(!(fname&&lname&&title&&email&&password)){
   return res.status(400).send({status: false, msg: "All fields are required"})
   }
   let emailValidator=validator.validate(email);
   
   if(emailValidator==false){
    return res.status(400).send({status: false, msg: "Email is worng"})  
   }
   
    let validEmail=await author.findOne({email:email})
   if(validEmail){
    return res.status(409).send({status: false,msg: "Email Already Exists"}) 
   }

    let dataAuthor=await author.create({fname,lname,title,email,password})
    console.log("done ")
    return res.status(201).send({status: true,data: dataAuthor})
    }catch(err){
        return res.status(500).send({err: err})
    }
}

const loginAuthor=async function(req,res){
    try{
   let {email,password}=req.body
   if(!(email&&password)){
    return res.status(400).send({status: false,data: "Email & Password are required"})  
   }
   let author = await authorModel.findOne({ email: email, password: password });
  if (!author){
    return res.status(404).send({status: false,data: "Enter Valid Email And Password"})  
  }
      const token=jwt.sign({authorId: author._id.toString()},"functionUpgroupnumber32")

      res.setHeader("x-auth-token", token);
       return res.status(200).send({ status: true, data: token });
    }catch(err){

    }
return res.status(500).send({err: err})
}

module.exports={createrAuthor,loginAuthor}