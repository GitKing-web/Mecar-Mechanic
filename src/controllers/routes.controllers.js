const User = require('../models/model.User')
const bcrypt = require('bcrypt')
const handleSignup = async(req, res) => {
    try {
        const { username, phone, password } = req.body;
        const existingUser = await User.findOne({ phone })
        if(existingUser){
            res.status(400).send('Phone Number or email is already linked to an account')
            return
        }
        const hashedPassword = await bcrypt.hash(password, 13)
        const users = new User({
            username,
            phone,
            password: hashedPassword
        })
        const savedUser = await users.save()
        res.status(200).send('Account Created.')
    } catch (error) {
        console.log(error);
    }
}

const handleLogin = async(req, res) => {
    try {
        const { phone, password} = req.body;
        const user = await User.findOne({ phone });
        if(!user) {
            res.status(401).send('Invalid Credentials...')
            return
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) {
            res.status(401).send('Invalid Credentials...')
            return
        }
        
        res.status(200).send('login sucessful.')
    } catch (error) {
        res.status(405).send('Internal Server Error')
    }
}

module.exports = {
    handleSignup,
    handleLogin
}