var connection = require("./../config");
var express=require("express");
module.exports.addpassengers=function(req,res){

//     var jsonObject={}
//    var key="details"
//    jsonObject[key]=[]
//    for(var i=0;i<req.session.n;i++){
//        var details={
//         "r_id":2915,
//         "passengerName" : req.body.name,
//         "age" : Number(req.body.age),
//         "gender" : req.body.gender,
//         "passengerID" : req.body.id
//        }
      
//        jsonObject[key].push(details);
//    }
//    res.json(details);

var details={
            "r_id":2015,
            "passengerName" : req.body.name,
            "age" : Number(req.body.age),
            "gender" : req.body.gender,
            "passengerID" : req.body.id
           }
           req.session.tempno=req.session.tempno+1;  
connection.query('INSERT INTO passengers SET ?',details,function(err,rows,fields){
    if(err){
        res.json({
            status:false,
            message:'there are some error with query'
        });
    }else{
        res.render('./pages/reservation',{n:req.session.n,k:req.session.tempno});
        
    }
});

}