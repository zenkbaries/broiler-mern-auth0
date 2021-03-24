// api/server.js

const express = require("express");
const cors = require("cors");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const mongoose = require('mongoose');
let Notes = require('./model/notes');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Create a new Express app
const app = express();

// Accept cross-origin requests from the frontend app
app.use(cors({ origin: 'http://localhost:3000' }));

// Set up Auth0 configuration
const authConfig = {
  domain: "dev-gviqn817.auth0.com",
  clientId: "rkmalq5iRbHxWuxQ808dDPlJotc9wtSw",
  audience: "https://boilerplateAPI.kellyboy.com"
};


// Define middleware that validates incoming bearer tokens
// using JWKS from dev-gviqn817.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

console.log("now connectiong");
mongoose.connect(
  process.env.DB_URI_REMOTE || process.env.DB_URI_LOCAL || 'mongodb://127.0.0.1:27017/boilerplateDB',
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
);
console.log(process.env.DB_URI_REMOTE);
const connection = mongoose.connection;

connection.on('error', (error) => console.error(error));
console.log("no error");
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});


// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!"
  });
});

// Start the app
app.listen(3001, () => console.log('API listening on 3001'));