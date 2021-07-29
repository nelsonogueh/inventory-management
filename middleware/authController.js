const jwt = require('jsonwebtoken');
const User = require('../model/userModel')

const responseInfo = {
    status: "",
    message: ""
}

/**
 * The auth middleware verifies the jwt token. If user is valid, it grants access
 * to the requested resource and puts user information on a new req.user object
 * @param req
 * @param res
 * @param next
 * @returns {Object<success> | Object<error>}
 */
const auth = async (req, res, next) => {
    let token = req.headers.authorization;

    try {
        const authUser = jwt.verify(token, process.env.SECRET);
        req.user = await User.findUserById(authUser.userid);

        next()
    } catch (error) {

        responseInfo.status = "error";
        responseInfo.message = "Sorry! Invalid authorization token supplied.";

        res.send(responseInfo)
    }
}

module.exports = auth;