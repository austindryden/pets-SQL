const db = require('./connection');

//create
function create(){}

//retrieve
async function one(id){
    try {
        // const pet = await db.one(`select * from pets where id=${petID};`);

        // $1 is syntax specific to pg-promise
        // it means interpolate the 1st value from the array (in this case, that's the 'id' that we received as an argument)
        const pet = await db.one(`select * from pets where id=$1;`, [id]);
        console.log(pet);
        return pet;
    } catch (err){
        console.log(err);
        return null;
    }
}

async function all(){
    try {
            const thePets = await db.any(`select * from pets;`);
            console.log(thePets);
            return thePets;
    } catch (err){
        console.log(err);
        return [];
    }
}

//update
function update(){}

//delete
function del(){}


module.exports = {
    create,
    one,
    all,
    update,
    del
}