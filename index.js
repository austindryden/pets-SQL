const http = require('http');
const express = require('express');
const app = express();
const PORT = 3012;
const server = http.createServer(app);
const pets = require('./models/pets');

app.get(`/pets`, async (req, res) => { 
        // res.send(`you want /pets`);
        const thePets = await pets.all();
        res.json(thePets);
});

app.get('/pets/:id', async (req, res) =>{
    const pet = await pets.one(req.params.id);
    res.json(pet);
});

// Create
app.get('/pets/create',(req, res)=>{
    //some HTML form goes here
});

app.post('/pets/create')

// Update
app.get('/pets/:id/edit', (req, res)=>{
    //some populated HTML form goes here
});

app.post('/pets/:id/edit')

// Delete
app.get('/pets/:id/delete', (req, res) =>{
    // some 'are you sure?' Yes/no form button goes here
});
app.post('/pets/:id/delete');


server.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
});




// const pets = require('./models/pets');


// async function main() {
//     const thePets = await pets.all();
//     console.log(thePets);
//     const aPet = await pets.one(1);
//     console.log(aPet);
//     // await pets.updateName(1, 'the amazing oakley');
//     // const result = await pets.updateBirthdate(1, new Date());
//     // console.log(result);
//     const createResult = await pets.create('billy', 'goat', new Date(), 1);
//     console.log(createResult);
// }


// main();