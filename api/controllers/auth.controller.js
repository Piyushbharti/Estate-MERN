const  User  = require("../models/user.model")
const bcrypt = require('bcrypt')
const signup = async(req, res) => {
    try{
        const {username, email, password} = req.body
        const hashPassword = bcrypt.hashSync(password, 10)
        const newUser = new User({username, email, password: hashPassword})
        await newUser.save()
        res.status(201).json('user created successfully!')
    }catch(e){
        res.status(401).json(e)
    }
}

module.exports = signup