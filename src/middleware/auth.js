const author=require("../models/authorModel")
const Blogs=require("../models/blogsModel")
var jwt = require('jsonwebtoken');

let authrAuth=async function(req,res,next){
    let token=req.headers["x-api-key"]
    let authordata=jwt.verify(token,"functionUpgroupnumber32")
    if(!authordata){
        return res.status(404).send({ status: true, msg: "token is not valid"})
    }
    console.log(authordata.authorId)
    let blogId=req.params.blogId
    
           
    let validBlog=await Blogs.findById(blogId)
    console.log(validBlog.authorId)
    if(authordata.authorId!=validBlog.authorId){
        return res.status(403).send({ status: true, msg: "Not Valid Author"})
    }
    next()
}

let authrAuth2=async function(req,res,next){
    let token=req.headers["x-api-key"]

    let authordata=jwt.verify(token,"functionUpgroupnumber32")

    if(!authordata){
        return res.status(404).send({ status: true, msg: "token is not valid"})
    }
    console.log(authordata.authorId)
   
    req.headers.authorId=authordata.authorId
    

    next()
}


module.exports={authrAuth,authrAuth2}