var express=require("express");

module.exports.continue=function(req,res){
    req.session.n=req.body.count;
    //  res.json({
    //     status:true,
    //     message:"People count=  "+req.session.n
    //    });
    res.redirect("/reservation");
}