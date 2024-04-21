const bcrypt = require('bcrypt')
const errorHandler = require("../utilis/error")
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
require("dotenv").config();

const signup = async(req, res, next) => {
    try{
        const {username, email, password} = req.body
        const hashPassword = bcrypt.hashSync(password, 10)
        const newUser = new User({username, email, password: hashPassword})
        await newUser.save()
        res.status(201).json('user created successfully!') 
    }catch(e){
        next(e)
    }
}

const signIn = async(req, res, next) => {
    const {email, password} = req.body
    try{
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, 'User not Found'))
        const validPassword = bcrypt.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(401, 'Wrong credentials!'))
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        const {password:pass, ...rest} = validUser._doc
        res.status(200).cookie('token', token, {httpOnly: true}).json(rest)
    }catch(error){
        next(error)
    }
}

module.exports = {signup, signIn}