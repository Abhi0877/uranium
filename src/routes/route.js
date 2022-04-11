const express = require('express');
const router = express.Router();

const UserController= require("../controllers/userController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/add_book", UserController.addbook)

router.get("/get_books", UserController.getBook)

module.exports = router;