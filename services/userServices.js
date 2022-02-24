const User = require('../models/User.js');
const { hash, compare } = require('bcrypt');

async function register( username, password, address ){

    const existing = await getUserByUsername(username);

    if(existing){
        throw new Error('Username is taken');
    };

    const hashedPassword = await hash(password, 10);

    const user = new User({
        username,
        password: hashedPassword,
        address
    });

    await user.save();

    return user;
};

async function login(username, password){

    const user = await getUserByUsername(username);

    if(!user){
        throw new Error('Username or password are invalid')
    };

    const hasMatch = await compare(password, user.password);

    if(!hasMatch){
        throw new Error('Username or password are invalid')
    };

    return user;
};

async function getUserByUsername(username){

    return await User.findOne({ username: new RegExp(`^${username}$`, 'i')});
};

module.exports = {
    register,
    login
}