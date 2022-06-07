const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 50000;
const cookieParser = require('cookie-parser');
const sessionId = uuid.v4();
const jwt = require('jsonwebtoken');
var jsonParser = bodyParser.json();
let intentMatcher = require("./controllers/IntentMatcher.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });

app.post('/send-msg',(req,res)=>{
    console.log(req.body.botnum);
    
    var payload = getJWTPayload(req.cookies['cookie']);
    var sessionData = {studentId: payload['studentId'], sessionId: payload['iat']};
    //console.log(sessionData);
    runSample(req.body.MSG, req.body.botnum, sessionData).then(data=>{
        res.send({Reply:data})
    })
})

function getJWTPayload(token){
    
    return(jwt.verify(token, 'process.env.JWT_SECRET', {ignoreExpiration:true}));
    
}

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(userQuery, id, sessionData) {
var projectId

   if (id == 1){
 var fileName = require('./counselling-1-rlbm-838891a46377');
    projectId = 'counselling-1-rlbm';
  }else if (id == 2){
 var fileName = require('./counselling-2-cefa-eabaf3e74be8 ');
    projectId = 'counselling-2-cefa';
 
  }else if (id == 3){
 var fileName = require('./counselling-3-orlp-ffda2e217e8a');
    projectId = 'counselling-3-orlp';
  }   

    
const credentials = {
    client_email: fileName.client_email,
    private_key: fileName.private_key,
};

const sessionClient = new dialogflow.SessionsClient(
    {
        projectId: projectId,
        credentials
    }
);


const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
    
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text:  {
        // The query to send to the dialogflow agent
        text: userQuery,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  //console.log('Detected intent');
    
  const result = responses[0].queryResult;
  console.log(`${result.queryText}`);
  console.log(`${result.fulfillmentText}`);
    
    //Intent Matching
  if (result.intent) {
    var chatResponse =  intentMatcher.match(con, id, sessionData, result);
  } else {
    console.log(`  No intent matched.`);
  }
  
	
  return chatResponse;
}

/*******************
DATABASE
********************/
var mysql = require('mysql');
var session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');


dotenv.config({path:'./.env'})

var con = mysql.createConnection({
   host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE
});


const publicDirectory = path.join(__dirname,'./views/assets');
app.use(express.static(publicDirectory)); 
//Parse data as JSON
app.use(express.json());
//Parse URL-encoded bodies sent by HTML Forms. Makes sure data can be grabbed from any form.
//app.use(express.urlencoded({ extended:true}));
app.use(cookieParser());

app.set('view engine','hbs');
app.set('view engine', 'ejs');

con.connect(function(err) {
  if (err){
      console.log(err);
  } else{
       console.log("Connected!");
  }
});

/******************
ROUTES AND RENDERING
*******************/

app.use('/',require('./routes/routes'))
app.use('/auth',require('./routes/auth'));
app.listen(port,()=>{
    console.log("Running on port " + port);
})

