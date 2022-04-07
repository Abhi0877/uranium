const express = require('express');
const logger = require('../logger/logger.js')
const util = require('../util/helper.js')
const val = require('../validator/formatter.js')
const _ = require('lodash');

const router = express.Router();

router.get('/test-me', function (req, res) {
    logger.welcome()
   
  
});
router.get('/test-me-rout', function (req, res) {
    
    util.printDate();
    util.printMonth();
    util.getBatchInfo();

    val.trim();
    val.changeToUpperCase();
    val.changetoLowerCase();
});


router.get('/hello',function(req,res){
    const array = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const divide=_.chunk(array, 3);
    const odd=[1,3,5,7,9,11,13,15,17,19,21]
    const oddNumber=_.tail(odd);
    console.log(oddNumber)
        
    console.log(divide);
})


module.exports = router;
// adding this comment for no reason