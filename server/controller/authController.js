const dotenv = require('dotenv');
dotenv.config();

// To handle data related to User registration, login and token generation
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



// require('dotenv').config();

const { getAuthUserModel } = require ('../postgres/postgres.js');

const { SECRET_KEY } = process.env;

// User registration (will deal with AuthUser table)
const registerUser = async (req, res) => {  // async functions always return a promise
    const {username, password, id} = req.body;
    try{
        const AuthUserModel = getAuthUserModel();   // model created - - - associated to AuthUser table

        const existingUser = await AuthUserModel.findOne({where: {username}});
        if(existingUser){
            return res.status(400).json({message: 'Username already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // add row in the model
        await AuthUserModel.create({username, password: hashedPassword,id:id});

        res.status(201).json({message: 'User registered successfully'});
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
};

// User login (will deal with AuthUser table)
const loginUser = async (req, res) => {
    const {username, password} = req.body;
    try{
        console.log("SECRET_KEY:", SECRET_KEY);
        // Check if the SECRET_KEY is available
        if (!SECRET_KEY) {
            console.error("SECRET_KEY is not defined in environment variables.");
            return res.status(500).json({ error: "Internal server error: SECRET_KEY not defined" });
        }

        const AuthUserModel = getAuthUserModel(); // link model to AuthUser table
        
        // find user by username
        const user = await AuthUserModel.findOne({where: {username}});
        if(!user){
            return res.status(400).json({message: 'User doesnt exist'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Password doesnt match'});
        }

        // Generating JWT token
        const token = jwt.sign({id: user.id, username: user.username}, SECRET_KEY, {expiresIn: '1h'});
        res.status(200).json({token});
    } catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
};

module.exports = {registerUser, loginUser};