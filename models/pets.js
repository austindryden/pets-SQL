const db = require('./connection');

//create
async function create(name, species, dateObj, owner_id){
    const birthdate = birthdateConverter(dateObj);
    const result = await db.one(`
        insert into pets
            (name, species, birthdate, owner_id)
        values
            ($1, $2, $3, $4)
        RETURNING id;
        `, [name, species, birthdate, owner_id]);
    return result.id;
}

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

async function oneByName(name){
    try {
        // const pet = await db.one(`select * from pets where id=${petID};`);

        // $1 is syntax specific to pg-promise
        // it means interpolate the 1st value from the array (in this case, that's the 'id' that we received as an argument)
        const pet = await db.one(`select * from pets where name=$1;`, [name]);
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
async function updateName(id, name){
    const result = await db.one(`
        update pets set
            name=$1
        where id=$2
        RETURNING id;
    `, [name, id]);
    console.log(result);
    return result.id;    
}

async function updateBirthdate(id, dateObj){
    const dateString = birthdateConverter(dateObj);
    const result = await db.result(`
        update pets set
            birthdate=$1
        where id=$2
        `,[dateString, id]);
    if (result.rowCount === 1){
        return id;
    } else {
        return null;
    }
}

function birthdateConverter(dateObj){
    const year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    if(month < 10){
        month = `0${month}`;
    }
    let day = dateObj.getDate();
    if(day < 10){
        day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
}

//delete
async function del(id){
    const result = await db.result(`delete from pets where id=$1`, [id]);
    console.log(result);
    if (result.rowCount === 1){
            return id;
    } else {
        return null;
    }
}


module.exports = {
    create,
    one,
    oneByName,
    all,
    updateName,
    updateBirthdate,
    birthdateConverter,
    del
}