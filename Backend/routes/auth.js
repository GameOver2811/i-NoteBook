const express = require('express');
const User = require('../models/user');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');



// for session token -- used by JWT
const JWT_SECRET = '@JWT@SECRET@TOKEN'; 

 
// Saving user database
// Route-01 :: User creation using express-validator -- No login required using Path /auth/createUser
router.post('/createUser', [
    body('username','Enter a Valid Username').isLength({min:3}),
    body('email', ' Enter correct Email').isEmail(), 
    body('password', 'Password must be 8 character long').isLength({min:8}), 
    ],async (req,res)=>{ 

        const result = validationResult(req);

        // User creation using express-validator -- No login required

        if (!result.isEmpty()) { 
            res.send({ errors: result.array()});
        }

        try {
            // check wheather user is already present
            let user = await User.findOne({email : req.body.email});
            if(user) {
                return res.status(400).json({errors : "User with this email already exist"});
            }

            // Hashing and salting  password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password,salt);

            user = await User.create({
                username : req.body.username,
                email : req.body.email,
                password : hashedPassword,
            })

            // Generating an auth token and sending it as an response
            const Data = {
                id : user.id
            }
            const authToken = jwt.sign(Data,JWT_SECRET);
            res.json({authToken});
          
        } catch (error) {
            res.status(500).send("Something went Wrong!");
        }

})


// Route-2 :: Login using Path:/auth/login
router.post('/login',[
    body('email', ' Enter correct Email').isEmail(), 
    body('password', 'Enter password').exists(), 
    ],async(req,res)=>{

        const result = validationResult(req);

        // User creation using express-validator -- No login required

        if (!result.isEmpty()) { 
            res.send({ errors: result.array()});
        }
        
        // De-structuring request
        const {email,password} = await req.body;
        try {

            // finding user with entered Email
            let user = await User.findOne({email : email});

            // checking is user with given mail exist
            if(!user){
                return res.status(400).json({errors : "Please enter correct Credentials"});
            }

            // Comparing for password
            const containsPass = await bcrypt.compare(password,user.password);
            if(!containsPass) {
                return res.status(400).json({errors : "Please enter correct Credentials"});
            }

            // if all well generate a auth token and return
            const Data = {
                id : user.id
            }
            const authToken = jwt.sign(Data,JWT_SECRET);
            res.json({authToken});

        } catch (error) {
            // console.error("Login Error:", error);
            res.status(500).send("Something went Wrong!");
        }

})

// Route-03 :: Get user data from JWT Token using using Path /auth/getUser
router.post('/getUser',fetchUser,async(req,res)=>{
        
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        } catch (error) {
            // console.error("Login Error:", error);
            res.status(500).send("Something went Wrong!");
        }

})


module.exports = router