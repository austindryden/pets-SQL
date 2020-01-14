const db = require('./connection');
const bcrypt = require('bcryptjs');

function createHash(password){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function create(username, password){
    const hash = createHash(password);
}

function login(username, password){
    const theUser = getUser(username);
    return bcrypt.compareSync(password, theUser.hash);

}

function getByUsername(username){}

module.exports = {
    create,
    login
};