const express = require( 'express')
const passport = require( 'passport')
const bodyParser = require( 'body-parser')
const path = require('path')
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()
const request = require('request')
const pug = require('pug')
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const base64url = require('base64url');
const crypto = require('crypto');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
require('./auth')

const app = express()
let access_token, id_token, expires_in, user

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://' + process.env.DOMAIN + '/.well-known/jwks.json'
  }),
  // Validate the audience and the issuer.
  audience: 'http://localhost:3000',
  issuer: 'https://' + process.env.DOMAIN +'/',
  algorithms: ['RS256']
});

app.set('view engine', 'pug')

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// ------------------------------------------------------------ //
// ------------- AUTHORIZATION CODE GRANT FLOW ---------------- //
// ----------------------------------------------------------- //
app.get('/login/authCode', passport.authenticate('auth0', {scope: 'openid profile'}), 
  (req, res) => {
    res.redirect('/')
  }
)

app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/?loggedIn=false' }),
  (req, res) => {
    res.redirect('/user')
  }
)

app.get('/user', ensureLoggedIn, (req, res, next) => {
  res.render('user', {
    user: req.user,
    userProfile: JSON.stringify(req.user, null, '  ')
  })
})

app.get('/logout',
  function (req, res) {
    req.logout()
    res.redirect('/')
  }
)
// ----------- END OF AUTHORIZATION CODE GRANT FLOW ----------- //

app.get('/', function(req, res, next) {
  res.render('index', {
    loggedIn: req.isAuthenticated && req.isAuthenticated(),
    clientId: process.env.AUTH0_CLIENT_ID,
    domain: process.env.DOMAIN,
    scope: 'openid profile',
    audience: process.env.AUDIENCEURL,
    code_challenge: challenge,
    redirect_uri_pkce: process.env.CALLBACKURL
  })
})

app.get('/login', function(req, res, next) {
  res.redirect('/')
})

// ------------------------------------------------------------ //
// ------------- CLIENT CREDENTIALS GRANT FLOW --------------- //
// ----------------------------------------------------------- //
app.get('/login/clientCreds',
  (req, res) => {
    const options = {
      method: 'POST',
      url: 'https://' + process.env.DOMAIN + '/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: '{"client_id":"' + process.env.AUTH0_CLIENT_ID + '","client_secret":"'+ process.env.AUTH0_CLIENT_SECRET + '","audience":"' + process.env.AUDIENCEURL + '","grant_type":"client_credentials"}'
    }
    request(options, function (error, response, body) {
      console.log(body)
      if (error) throw new Error(error)
      res.json(body)
    })
  }
)

app.get('/public', function(req, res) {
  res.jsovn({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// This route need authentication
app.get('/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});
// ------------- END OF CLIENT CREDENTIALS GRANT FLOW ------------ //

// ---------------------------------------------------------------- //
// ------------- RESOURCE OWNER PASSWORD GRANT FLOW --------------- //
// ---------------------------------------------------------------- //
app.get('/login/resourceOwnerCreds',
  (req, res) => {
    res.render('loginForm')
  }
)

app.post('/login/resourceOwnerCreds',
  (req, res) => {
    const options = {
      method: 'POST',
      url: 'https://' + process.env.DOMAIN + '/oauth/token',
      headers: { 'content-type': 'application/json' },
      body:
       { grant_type: 'password',
         username: req.body.username,
         password: req.body.password,
         audience: process.env.AUDIENCEURL,
         scope: 'openid profile',
         client_id: process.env.AUTH0_CLIENT_ID,
         client_secret: process.env.AUTH0_CLIENT_SECRET
      },
      json: true
    }
    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      access_token = body.access_token
      id_token = body.id_token
      expires_in = body.expires_in
      res.redirect('/userInfo')
    })
  }
)

app.get('/userInfo',
  (req, res) => {
    const options = {
      method: 'GET',
      url: 'https://' + process.env.DOMAIN + '/userInfo',
      headers:
        { authorization: 'Bearer ' + access_token,
         'content-type': 'application/json'
        }
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      user = JSON.parse(body)
      res.redirect('/user2')
    });
  }
)

app.get('/user2', (req, res, next) => {
  res.render('user', {
    user: user,
    userProfile: JSON.stringify(user, null, ' ')
  })
})
// ---------- END OF RESOURCE OWNER PASSWORD GRANT FLOW ------------ //

// ------------------------------------------------------------------ //
// ------------- AUTHORIZATION CODE + PKCE GRANT FLOW -------------- //
// ---------------------------------------------------------------- //
const sha256 = (buffer) => {
  return crypto.createHash('sha256').update(buffer).digest();
}

const verifier = base64url(crypto.randomBytes(32));
const challenge = base64url(sha256(verifier));

app.get('/callbackPKCE',
  (req, res) => {
    const options = {
      method: 'POST',
      url: 'https://' + process.env.DOMAIN + '/oauth/token',
      headers: { 'content-type': 'application/json' },
      body:
       { grant_type: 'authorization_code',
        client_id: process.env.AUTH0_CLIENT_ID,
        code_verifier: verifier,
        code: req.query.code,
        redirect_uri: process.env.CALLBACKURL
      },
      json: true
    }
    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      access_token = body.access_token
      id_token = body.id_token
      expires_in = body.expires_in
      res.redirect('/userInfo')
    })
  }
)


app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App is now running on http://localhost:${PORT}`)
})
