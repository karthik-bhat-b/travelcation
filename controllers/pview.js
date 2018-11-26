var express=require('express');
var connection = require('./../config');

module.exports.viewthat=function(req,res){
    var vid=req.body.view;
    req.session.pid=vid;
    
    // res.json({
    //     status:false,
    //     message:"Email and password does not match  "+req.session.pid
    //    });
    res.redirect('/packdetails')
}