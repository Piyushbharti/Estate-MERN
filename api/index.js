
const express = require('express')

const mongoose = require('mongoose')
const useRouter = require('./routes/user.route')
const auth = require('./routes/auth.route')

mongoose.connect('mongodb://localhost:27017/real-estate',{
}).then(()=>{
    console.log("connection successful")
}).catch((e)=>{
    console.log(('No connection'))
})
 
const app = express()

app.use(express.json())

app.use('/api/user/', useRouter)
app.use('/api/auth/', auth)

app.listen(3000, ()=> {
    console.log('server is running on port 3000')
})