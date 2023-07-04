const { Router } = require('express')
const { handleSignup, handleLogin } = require('../controllers/routes.controllers')
const router = Router()

router.post('/register', handleSignup)
router.post('/login', handleLogin)
module.exports = router