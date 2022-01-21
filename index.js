require("dotenv").config()
'use strict'

const express = require('express') //load our app server using express
var cors = require('cors')
const app = express()
const morgan = require('morgan')
const requestIp = require('request-ip')
const Router = require("./functions/router")
const db = require("./models")

app.use(requestIp.mw({ requestIp : requestIp }));


// Before anything else, handle incoming request
app.use((err, req, res, next) => {

    const clientIp = requestIp.getClientIp(req); 
    console.log(`clientIp: ${clientIp}`);

    next();
});


var allowedOrigins = ['http://localhost', 'http://localhost:4200']; //Add your list of IPs here for whitelisting
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    console.log(origin);
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


app.use(morgan('combined')) //display access logs in console
app.use(express.json());
app.use("/api", Router);


db.sequelize.sync().then((re) => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`API is up and listening on ${process.env.PORT}...\n`)
  });
});

