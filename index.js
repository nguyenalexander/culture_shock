//module requirements
var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require("body-parser")
var session = require("express-session")
var flash = require('connect-flash');
var multer = require('multer');
var geocoder = require('geocoder')
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy;

var NODE_ENV = process.env.NODE_ENV || 'development';
var BASE_URL = (NODE_ENV === 'production') ? 'https://speak-to-me.herokuapp.com' : 'http://localhost:3000';

//passport setup - user serialisation //
passport.serializeUser(function(user,done){
  done(null, user.id);
});

passport.deserializeUser(function(id,done){
  db.user.find(id).then(function(user){
    done(null,user.get());
  }).catch(done);
});

// passport middleware //
passport.use(new LocalStrategy({
  usernameField: 'email'
},
  function(email,password,done){
    db.user.find({where:{email:email}}).then(function(user){
      if(user){
        user.checkPassword(password,function(err,result){
          if(err) return done(err);
          if(result){
            done(null,user.get());
          }else{
            done(null,false,{message:'Invalid password.'});
          }
        })
      }else{
        done(null,false,{message:'Unknown user specified, please sign up!'})
      }
    })
  }
))

//middleware
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(multer({ dest: './uploads/'}))

app.use(function(req,res,next){
  res.locals.alerts = req.flash();
  next();
})

app.use(function(req,res,next){
  res.locals.user = req.user;
  next();
})


//get user function
// app.use(function(req,res,next){
//   req.getUser = function(){
//     res.locals.guser = req.session.user || false;
//     // console.log(res.locals.guser)
//     return res.locals.guser;
//   }
//   next();
// });

console.log('keys',process.env.FB_APP_ID,process.env.FB_SECRET)

//storing get user output (boolean) as local object
// app.use('*', function(req,res,next){
//   var getUser = req.getUser();
//   res.locals.getUser = getUser;
//   next();
// })

//passport-facebook function
passport.use(new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: BASE_URL+"/auth/callback/facebook"
  },
  function(accessToken, refreshToken, profile, done) {
    db.provider.find({
      where:{
        pid:profile.id,
        type:profile.provider
      },
      include:[db.user]
    }).then(function(provider){
      if(provider && provider.user){
        //login
        provider.token = accessToken;
        provider.save().then(function(){
          done(null,provider.user.get());
        })
      }else{
        //signup
        var email = profile.emails[0].value;
        db.user.findOrCreate({
          where:{email:email},
          defaults:{email:email,name:profile.displayName}
        }).spread(function(user,created){
          if(created){
            //user was created
            user.createProvider({
              pid:profile.id,
              token:accessToken,
              type:profile.provider
            }).then(function(){
              done(null,user.get());
            })
          }else{
            //signup failed
            done(null,false,{message:'This email has already been signed up. Please log in!'})
          }
        });
      }
    });
  }
));

//routes
app.get('/', function(req,res){
  res.redirect('/main')
})

// passport-facebook routes
//************************************


app.use('/main', require('./controllers/main.js'));
app.use('/profile', require('./controllers/profile.js'));
app.use('/auth',require('./controllers/auth.js'));
app.use('/home', require('./controllers/home.js'));
app.use('/language', require('./controllers/language.js'));

app.get('*', function(req,res){
  req.flash('danger','404, page not found!')
  res.redirect('/main')
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Hello, server is up and running.");
})