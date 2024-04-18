
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const useRouter = require('./routes/user.route')
const auth = require('./routes/auth.route')
require("dotenv").config();

mongoose.connect('mongodb://localhost:27017/real-estate',{
}).then(()=>{
    console.log("connection successful")
}).catch((e)=>{
    console.log(('No connection'))
})
 
const app = express()


app.use(express.json())
app.use(cors());

app.use('/api/user/', useRouter)
app.use('/api/auth/', auth)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(3000, ()=> {
    console.log('server is running on port 3000')
})