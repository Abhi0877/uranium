const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema( {
     name: String,
     size:Number,
     program:{type: String,
          enum : ['backend','frontend']},

});

module.exports = mongoose.model('Batch', batchSchema)
