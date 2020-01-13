
// require 'pg-promise' but call immediately so we can configure the connection
const pgp = require('pg-promise')({
    query:e=>{
        console.log(`QUERY: ${e.query}`);
    }
});

//next, give the info about our specific database that we're talking to.
const options = {
    host: 'localhost',
    database: 'pets-owners'
};

const db = pgp(options);

module.exports = db;
