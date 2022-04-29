const express = require('express');
const router = express.Router();
const AuthorController=require("../controllers/authorController")
const BlogsController=require("../controllers/blogsController")
const auth=require("../middleware/auth")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//PHASE 1

//Author9-
router.post("/authors",AuthorController.createrAuthor)
//blogs
router.post("/blogs",auth.authrAuth2,BlogsController.postBlogs)
router.get("/blogs",BlogsController.getBlog)
router.put("/blogs/:blogId",auth.authrAuth,BlogsController.updateBlog)
router.delete("/blogs/:blogId",auth.authrAuth,BlogsController.deleteBlogbyId)
router.delete("/blogs",BlogsController.deleteBlogbyQuery)

//PHASE 2
router.post("/login",AuthorController.loginAuthor)



module.exports = router;