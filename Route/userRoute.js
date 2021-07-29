const express = require('express');
const userController = require('../controller/userController');
const auth = require('../middleware/authController')

const Router = express.Router();
Router.use(express.urlencoded({ extended: true }))
Router.use(express.json())

const responseInfo = {
    status: "",
    message: ""
}


Router.all('/', (req, res) => {
    res.send("Welcome to user route")
})

Router.get("/all-users/", userController.getAllUsers) // Fetch all users

Router.post('/signup', userController.signUp) // - Signup route handler

Router.post('/signin/', userController.login) // - Sign in route handler

Router.get('/user', auth, userController.getUserDetails) // - Fetch currently signed in user details

Router.put('/user/update/', auth, userController.updateDetails)  // - Update route handler

Router.put('/user/modify-password/', auth, userController.modifyPassword)  // - Modify Password


module.exports = Router;