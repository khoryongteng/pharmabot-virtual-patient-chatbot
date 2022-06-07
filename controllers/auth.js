const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const emailExistence = require('email-existence');
var con = mysql.createConnection({
   host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE
});

//Function for when users login, linked together by auth.js in routes folder, which handles posts requests.
//async is used make sure server is waiting for log in action is done before proceeding to next line of code.
// async is reccomended to be used in functions that might require some time to be carried out. 

exports.login = async (req,res)=>{
    try{
        const { studentId,password} = req.body;
        
        if( !studentId || !password){
            return res.status(400).render('login.hbs', {
                message : 'Please enter both student ID and password to proceed.'
            })
        }
        
        
         //Positional parameter to avoid SQL injections, and to check student ID matches password
        con.query('SELECT * FROM users WHERE studentId = ?', [studentId], async (error,results) =>{
            console.log(results);
			
            if( results[0] == undefined || !(await bcrypt.compare(password,results[0].password)) ){
               res.status(401).render('login.hbs',{
                message: 'Invalid student ID or password'
            })
        } 
		else{
               const name = results[0].name;
               const studentId = results[0].studentId;
               //create token, take in name as identifier to create the token, 
                //JWT variables stored in .env file, just as other important passwords are
               const token = jwt.sign({name, studentId},'process.env.JWT_SECRET',{ 
                   expiresIn: process.env.JWT_EXPIRES_IN
                  })
    
            console.log("Token is : " + token);
        
            const cookieOptions = {
                expires : new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            }
            //Create cookie, and redirection after log in, change redirect. 
            res.cookie('cookie',token, cookieOptions);
            res.status(200).redirect("/select");
           }
                  
        })
        
     }catch (error){
        console.log(error);
    }
}

	
//Function for when users register, linked together by auth.js in routes folder, which handles post requests.
exports.register = (req,res) => {
    console.log(req.body);
    
    const{ name, studentId, email, password, passwordConfirm} = req.body;
	   
    //Positional parameter to avoid SQL injections, and to avoid same email being registered twice.
    con.query('SELECT studentId FROM users WHERE studentId = ?', [studentId], async (error,results) =>{
        
        if(error){
         console.log(error);
        }
	
		   
		
        if(results.length > 0 ){
            return res.render('register.hbs', {
                message: 'This student ID already exists.'
            });
       
        
        } else if (password !== passwordConfirm){
            return res.render('register.hbs', {
                message: 'The passwords entered do not match, please try again.'
            });
        } 
	
        //8 rounds of encryption 
    let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        
        con.query('INSERT INTO users SET ?', {name: name, email: email, studentId: studentId, password : hashedPassword }, (error,results) =>{
                if(error){
                         console.log(error);
            } else{
                console.log(results);
                 return res.render('login.hbs', {
                messageSuccess: 'You have successfully registered! Please log in with your credentials.'
            });
            }
        })
    });
	

	emailExistence.check(email, function(error, emailResponse){
		 if(emailResponse === false ){
			   return res.render('register.hbs', {
					message: 'Please enter a valid email.'
				});
			}
			
		   });
	
	
}

