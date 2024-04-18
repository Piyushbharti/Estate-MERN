const express = require('express')
const router =  express.Router()
const {signup, signIn} = require('../controllers/auth.controller')


router.post('/signUp',signup)
router.post('/signIn',signIn)

module.exports = router