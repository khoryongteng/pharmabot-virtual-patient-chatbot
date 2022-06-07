const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

/**************
ROUTING AND RENDERING FOR LOGIN, REGISTRATION AND SELECT PAGES
**************/
router.get('/',(req,res,next)=>{
    res.render('login.hbs');
})

router.get('/login',(req,res,next)=>{
    res.render('login.hbs');
})

router.get('/register',(req,res,next)=>{
    res.render('register.hbs');
})

router.get('/select',(req,res,next)=>{
    res.render('select.ejs');
})

/**************
ROUTING AND RENDERING FOR COUNSELLING
**************/

router.get('/counselling-1',(req,res)=>{
	console.log(req.query.botnum);
	
	var init = {
	    
	   studentID: "Student ID: " + getJWTPayload(req.cookies['cookie'])['studentId']
	    
	}
	
	res.render('counselling-1', {
		botnum: req.query.botnum,
		init:init
	})
	
})

router.get('/counselling-2',(req,res)=>{
	console.log(req.query.botnum);
	
	var init = {
	    
	   studentID: "Student ID: " + getJWTPayload(req.cookies['cookie'])['studentId']
	    
	}
	
	res.render('counselling-2', {
		botnum: req.query.botnum,
		init:init
	})
})

router.get('/counselling-3',(req,res)=>{
	console.log(req.query.botnum);
	
	var init = {
	    
	   studentID: "Student ID: " + getJWTPayload(req.cookies['cookie'])['studentId']
	    
	}
	
	res.render('counselling-3', {
		botnum: req.query.botnum,
		init:init
	})
})

function getJWTPayload(token){
    
    return(jwt.verify(token, 'process.env.JWT_SECRET', {ignoreExpiration:true}));
    
}

module.exports=router;