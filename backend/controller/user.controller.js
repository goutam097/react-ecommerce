// const { hashPassword, comparePassword } from "../helpers/authHelper.js";
// const userModel from "../model/user.model.js";
// const JWT from 'jsonwebtoken';
const userModel = require("../model/user.model");
const JWT = require('jsonwebtoken')

const {hashPassword, comparePassword} = require("../helpers/authHelper.js")


 const register = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        
        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        
        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: 'Already registered, please log in.',
            });
        }
        
        // Hash the password
        const hashedPassword = await hashPassword(password);
        
        // Create a new user and save it to the database
        const user = await new userModel({ name, email, phone, address,answer, password: hashedPassword }).save();
        
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: 'Error in registration',
            error: err,
        });
    }
};

const login = async (req, res) => {
    try {
        const {email, password, answer} = req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password',
                error
            });
        }
        //Checking if the user is exist
        const user = await userModel.findOne({email})
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not register',
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Invalid Password',
            })
        }
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        return res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        });
    }
}

module.exports = { 
    register,
    login
    };