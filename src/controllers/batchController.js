const batchModel= require("../models/batchModel")

const createBach= async function (req, res) {
    let batch = req.body
    let bacthCreated = await batchModel.create(batch)
    res.send({data: bacthCreated})
}

const getBatchsData= async function (req, res) {
    let batchs = await batchModel.find()
    res.send({data: batchs})
}

module.exports={createBach,getBatchsData}