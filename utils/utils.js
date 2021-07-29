const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')
const multer = require('multer')

/**
 * This function basically compares two string passwords and
 * returns the password if it tallies, or returns null otherwise
 * @param password
 * @param confirmPassword
 * @returns {*|null}
 */
exports.getCorrectPassword = function (password, confirmPassword) {
    return password === confirmPassword ? password : null;
}

/**
 * This hashPassword() function hashes the user password
 * with bcrypt; adding salt to the password
 * @param password
 * @returns {String | null}
 */
exports.hashPassword = async (password) => {
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12)
    } catch (error) {
        console.error(error);
    }

    return hashedPassword
}

/**
 * The emailExist() function password queries the user
 * collection for a record of user with the supplied email address
 * @param email
 * @returns {Object<User>}
 */
exports.emailExist = async (email) => {
    let found
    try {
        found = await userModel.getUser(email)
    } catch (error) {
        console.error(error);
    }

    return found ? true : false
}

/**
 * This function compares two passwords (passed and the one in the database) for a match.
 * @param password
 * @param originalPassword
 * @returns {Promise<*>}
 */
exports.isCorrectPassword = async (password, originalPassword) => {
    let response;
    try {
        response = await bcrypt.compare(password, originalPassword)
    } catch (error) {
        console.error(error);
    }

    return response;
}

/**
 * This function generates a JWT token with the passed data payload
 * @param userid
 * @returns String<token>
 */
exports.genUserToken = async (userid) => {
    return await jwt.sign({userid}, process.env.SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
}


exports.sendNotFoundError = (outputHandler, sender) => {
    outputHandler.status(404).json({
        status: 'Failed!',
        message: `${sender} not found!`
    })
}

/**
 * This function defines the storage location and
 * filename of the Multer file upload module for our app
 * @type {DiskStorage}
 */
exports.fileStorageEngine = multer.diskStorage({
    destination: "./uploads/products-images/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})
//studio1

/**
 *  This function basically compares two string passwords and
 * returns a boolean
 * @param password
 * @param confirmPassword
 * @returns {boolean}
 */
exports.isPasswordMatch = function (password, confirmPassword) {
    return password === confirmPassword;
}

/**
 * this function checks whether provided password matches
 * the password stored on the database
 * @param userid
 * @param password
 * @param dbpassword
 * @returns {Promise<*>}
 */
exports.isPasswordMatchDBPassword = async (userid, password, dbpassword) => {
    let response;
    try {
        response = await bcrypt.compare(password, dbpassword)
    } catch (error) {
        console.error(error);
    }

    return response;
}