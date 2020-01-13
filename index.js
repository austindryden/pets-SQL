const pets = require('./models/pets');


async function main() {
    const thePets = await pets.all();
    console.log(thePets);
    const aPet = await pets.one(1);
    console.log(aPet);
}


main();