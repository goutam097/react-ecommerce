
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

const allUsers = async(req,res)=>{
    try{
        console.log("userid all Users",req.userId)

        const allUsers = await userModel.find()
        
        res.json({
            message : "All User ",
            data : allUsers,
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

const userDetailsController = async(req,res) => {
    try{
        const userId = req.query.userId;
        console.log("userId",userId)
        const user = await userModel.findById(userId)
        // console.log("userId",req.userId)
        // const user = await userModel.findById(req.userId)

        res.status(200).json({
            data : user,
            error : false,
            success : true,
            message : "User details"
        })

        console.log("user",user)

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

const updateUser = async (req,res)=>{
    try{
        const sessionUser = req.userId

        const { userId , email, name, role} = req.body

        const payload = {
            ...( email && { email : email}),
            ...( name && { name : name}),
            ...( role && { role : role}),
        }

        const user = await userModel.findById(sessionUser)

        console.log("user.role",user.role)



        const updateUser = await userModel.findByIdAndUpdate(userId,payload)

        
        res.json({
            data : updateUser,
            message : "User Updated",
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = { 
    register,
    login,
    allUsers,
    userDetailsController,
    updateUser
    };