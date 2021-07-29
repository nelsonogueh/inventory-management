const mongoose = require('./db/database')

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true}
}, {versionKey: false});

const Users = mongoose.model('Users', userSchema)

/**
 * A function that adds a single user to the database
 * @param user
 * @returns Object<User>
 */
exports.addUser = async (user) => {
    let response

    try {
        response = await Users.create({...user})
    } catch (error) {
        console.log(error);
    }
    return response;
}

/**
 * A function that updates user details by user ID
 * @param id
 * @param update
 * @returns Object<User>
 */
exports.updateUser = async (id, update) => {
    let response

    try {
        response = Users.findByIdAndUpdate(id, {...update})
    } catch (error) {
        console.log(error)
    }

    return response
}

/**
 * A function that fetches user details by user email
 * @param email
 * @returns {Object<User>}
 */
exports.getUser = async (email) => {
    let user

    try {
        user = await Users.findOne({email})
    } catch (error) {

    }
    return user;
}

/**
 * A function that fetches user details by ID
 * @param id
 * @returns {Object<User>}
 */
exports.findUserById = async (id) => {
    let user;
    try {
        user = await Users.findById(id)
    } catch (error) {
        console.error(error);
    }
    return user
}

/**
 * A simple function that fetches all users in the database
 * @returns Array<User>   - Returns an array of user objects
 */
exports.fetchAllUsers = async () => {
    let user1 = null;
    try {
        user1 = await Users.find({});
    } catch (err) {
        console.error(err);
    }
    return user1;
}

/**
 * @type {{Users: Model<Users>}}
 */
exports.Users = {Users:Users}
