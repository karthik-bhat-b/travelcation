var Cryptr = require('cryptr');
var express=require("express");
var connection = require('./../config');
module.exports.insert=function(req,res){
    console.log("insertion package ");
    var package={
     "p_id":1313,
     "p_name":req.body.pname,
     "price":req.body.price,
     "season":req.body.season,
     "is_active":req.body.isactive,
     "S_desc":req.body.s_desc,
     "l_desc":req.body.l_desc,
     "images":req.body.image,
     "videos":req.body.video,
     "duration":"4D 3N"
    }

    connection.query('INSERT INTO packages SET ?',package,function(error,results,fields){
        if(error){
            res.json({
                status:false,
                message:'there are some error with query'
            });
        }
        else{
            res.json({
                status:true,
                message:'package added succesfully'
            });
        }
    });
}