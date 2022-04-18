const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const developerSchema = new mongoose.Schema( {
    name: String,
    gender:{type: String,
        enum : ['male','female','other'],},

    percentage:Number,

    batch_id: {
        type: ObjectId,
        ref: "Batch"
    },
   


});


module.exports = mongoose.model('Developer', developerSchema)
