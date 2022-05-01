const author=require("../models/authorModel")
const Blogs=require("../models/blogsModel")

let postBlogs=async function(req,res){
    try{
   let {title,body,authorId,category,subcategory}=req.body
  
   if(!(title&&body&&authorId&&category&&subcategory)){
    return res.status(400).send({status: false, msg: "Field are Required"})  
   }

    let validAuthor=await author.findById(authorId)
   

    if(!validAuthor){
        return res.status(409).send({status: false, msg: "Author Email Does Not Exists"})  
    }

    let blogData=await Blogs.create(req.body)

    if(req.body.isPublished=="true"){
        blogData.publishedAt=new Date();
        blogData.save()
    }
    return res.status(201).send({status: true,data: blogData})
}catch(err){
    return res.status(500).send({err: err})
    
}
}

let getBlog=async function(req,res){
    try{
    let findData=req.query
    let allBlogs=await Blogs.find( { $and: [findData,{isPublished:true },{isDeleted:false} ] } )
    if(!allBlogs.length){
        return res.status(404).send({status: true,msg: "No documents are found"})  
    }
    return res.status(200).send({status: true,data: allBlogs})
    }catch(err){
        return res.status(500).send({err: err})
        
    }

}
let updateBlog=async function(req,res){
    console.log("Done")
    try {
        let blogId = req.params.blogId;

        let isBlogIdExist = await Blogs.findById(blogId)
        

        if (!isBlogIdExist) {
            return res.status(404).send({ status: false, msg: "Blog does not Exist." })
        }
        
        if(isBlogIdExist.isDeleted==true){
            return res.status(400).send({ status: false, msg: "This post Does not Exist." })
          
        }

        let data = req.body

        let updatedBlog = await Blogs.findByIdAndUpdate(
            blogId ,
            { $set: data, publishedAt: new Date() },
            { new: true }
        )

        res.status(200).send({ status: true, msg: updatedBlog })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}
let deleteBlogbyId=async function(req,res){
    try{
        let blogId = req.params.blogId
        let isBlogIdPresent = await Blogs.findById(blogId)
        
        if (!isBlogIdPresent) {
            return res.status(404).send({ status: false, msg: "BlogId not found" })
        }
     
        if (isBlogIdPresent.isDeleted==true) {
            return res.send({ status: false, msg: "You are requesting for deleted Account" })
        }

        let deletedAccount = await Blogs.findByIdAndUpdate(
            { _id: blogId },
            { isDeleted: true, deletedAt: new Date() },
            { new: true }
        )

        return res.status(202).send({ status: true, msg: "Blog is Deleted" })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
    

}

let deleteBlogbyQuery=async function(req,res){
    try{
    let deleteData=req.query;

   if(Object.keys(deleteData).length==0){
    return res.status(404).send({status: false, msg:"Enter Query"})  
   }
   console.log(req.headers.authorId)
   
     let authId=req.headers.authorId
    console.log(deleteData)
     let delData=await Blogs.updateMany({ $and: [deleteData,{isDeleted:true},{authorId:authId} ] },{ isDeleted:false, deletedAt:new Date()},{new:true})
     
     if(delData.matchedCount==0){
        return res.status(404).send({status: false, msg:"Query is not Exists"})
     }
     return res.status(200).send({status: true, msg:delData })
    }catch(err){
        return res.status(500).send({err: err})
        
    } 
}
module.exports={postBlogs,getBlog,updateBlog,deleteBlogbyId,deleteBlogbyQuery}