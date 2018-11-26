var express=require("express");
var connection=require("./../config");

module.exports.continue=function(req,res){
    req.session.n=req.body.count;
    req.session.tempno=0//later this value is used in passenger insertion
    //  res.json({
    //     status:true,
    //     message:"People count=  "+req.session.n
    //    });

    res.redirect("/payment");
}