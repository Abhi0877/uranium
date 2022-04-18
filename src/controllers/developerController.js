
const developerModel= require("../models/developerModel");
const batchModel= require("../models/batchModel")

const createDeveloper= async function (req, res) {
    let developer = req.body
    let developerCreated = await developerModel.create(developer)
    res.send({data:developerCreated})
}

const getDeveloperData= async function (req, res) {
    let developers = await developerModel.find()
    res.send({data:developers})
}

const getDevelopersWithBatchDetails = async function (req, res) {
    let specificdeveloper = await developerModel.find().populate('batch_id')
    res.send({data: specificdeveloper})

}
const getScholarshipDevelopers=async function(req,res){
    let specificdeveloper = await developerModel.find({ $and: [ {gender:"female" },{ percentage: { $gt: 85} }] }).populate('batch_id')
    res.send({data: specificdeveloper})   
}

const getdevelopers=async function(req,res){
    const percentage=req.query.percentage;
    const program=req.query.program;
    const programs=await batchModel.find({name:program}).select({_id:1})
    let arrayOfProgram = []
    
    for (let i = 0; i < programs.length; i++) {
        let objId =programs[i]._id 
        arrayOfProgram.push(objId)
    }
   let specificdeveloper = await developerModel.find({ $and: [ {batch_id: {$in: arrayOfProgram}},{ percentage: { $gt: percentage} }] }).populate('batch_id')
    //let specificdeveloper = await developerModel.find({percentage: { $gt: percentage} }).populate('batch_id')
    res.send({data: specificdeveloper}) 
   // console.log(percentage)
   // console.log(programs)
    
}


module.exports={createDeveloper,getDeveloperData,getDevelopersWithBatchDetails,getScholarshipDevelopers,getdevelopers}
