const { hash } = require('bcrypt');
const schemas =require('../models/schemas.js')

exports.getLogin= (req,res)=> {
   res.render('login', {title: 'Login', loggedIn: false, error: null})
};
exports.getSignup= (req,res)=> {
   res.render('signup', {title: 'Sign Up', loggedIn: false, error: null})
};
exports.getLogout= (req,res)=> {
   req.session.destroy();
   res.redirect('/');
};

exports.postLogin= async (req,res)=> {
   let email= req.body.emailInput;
   let pass= req.body.pwdInput;
   let session= req.session;
   session.loggedIn= false;

   let users= schemas.users;
   let qry= {email: email}

   if (email !='' && pass !==''){
      let usersResult = await users.findOne(qry)
      .then(async(data)=> {
         if (data){
            let passResult= await bcrypt.compare(pass, data.pwd)
            .then((isMatch)=> {
               if (isMatch){
                  session.loggedIn= true;
               }
            })
         }
      })
   }
   if (session.loggedIn===true){
      res.redirect('/')
   }else{
      res.render('signup', {title: 'Login', loggedIn: false, error: 'Invalid Login!'});
   }
};

exports.postSignUp= async (req,res)=> {
   let email= req.body.emailInput;
   let pass= req.body.pwdInput;
   
   if(email !=='' && pass !==''){
      let users= schema.users
      let qry= {email:email}

      let userSearch= await users.findOne(qry)
      .then(async(data)=>{
         if(!data){
            let saltRounds=8
            let passSalt= await bcrypt.genSalt(saltRounds, async(err,salt)=>{
               let passHash= await bcrypt.hash(pass, salt, async(err,salt)=>{
                  let acct= {email:email, pwd:hash, level:'admin'};
                  let newUser= new schemas.users(acct);
                  let saveUSer= await newUser.save();
               })
            })
         }
      })
      res.render('login', {title: 'Login', loggedIn: false, error: 'Please login with your new account.'});
   } else {
      res.render('signup', {title: 'Sign Up', loggedIn: false, error: 'All fields are required. Please check and try again.'});
   }
};