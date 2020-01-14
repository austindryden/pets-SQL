const db = require('./connection');
const bcrypt = require('bcryptjs');

function createHash(password){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function create(username, password){
    const hash = createHash(password);
}

async function login(username, password){
    const theUser = await getByUsername(username);
    return bcrypt.compareSync(password, theUser.hash);
}

async function getByUsername(username){
    const theUser = await db.one(`
        select * from owners where name=$1;`, [username]);
    return theUser;
}

module.exports = {
    create,
    login,
    getByUsername
};