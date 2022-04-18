const express = require('express');
const router = express.Router();

const batchController= require("../controllers/batchController")
const developerController= require("../controllers/developerController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBach", batchController.createBach )

router.get("/getBatchsData", batchController.getBatchsData)

router.post("/createDeveloper",developerController.createDeveloper  )

router.get("/getDeveloperData",developerController.getDeveloperData)

router.get("/getDevelopersWithBatchDetails",developerController.getDevelopersWithBatchDetails)
router.get("/scholarship-developers",developerController.getScholarshipDevelopers)
router.get("/developers",developerController.getdevelopers)

module.exports = router;