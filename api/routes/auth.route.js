const express = require('express')
const router =  express.Router()
const signup = require('../controllers/auth.controller')


router.post('/signUp',signup)

module.exports = router