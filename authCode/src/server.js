const express = require( 'express')
const passport = require( 'passport')
const bodyParser = require( 'body-parser')
const path = require('path')
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()
const pug = require('pug')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
require('./auth')

const app = express()

app.set('view engine', 'pug')

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

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

app.get('/', function(req, res, next) {
  res.render('index', {
    loggedIn: req.isAuthenticated && req.isAuthenticated()
  })
})

app.get('/login', function(req, res, next) {
  res.redirect('/')
})

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App is now running on http://localhost:${PORT}`)
})
