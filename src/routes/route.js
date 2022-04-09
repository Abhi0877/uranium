const express = require('express');
const router = express.Router();
 
let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ],
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ],
       },
   ]
 
   router.post('/players', function (req, res) {
       let  temp=0;
       const AddPlayer=req.body
               for (let i = 0; i < players.length; i++) {
                   if(players[i].name==AddPlayer.name){
                       temp++;
                       break;
                   }
                   
               }
               console.log(AddPlayer)
          if(temp==0){
              players.push(AddPlayer)
              res.send(  { data: players , status: true }  ) 
          }else{
            res.send(  { Error: "player already exists" }  )
          }     
       
   })

module.exports = router;
