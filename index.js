const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const PORT = 3000;

const session = require('express-session');
const fileStore = require('session-file-store')(session);
app.use(session({
        sote: new fileStore({}),
        secret: 'sljsls'
}));

app.use((req, res, next) =>{
    console.log('*****************');
    console.log(req.session);
    console.log('*****************');
    next();
});

const morgan = require("morgan");
const logger = morgan("tiny");
app.use(logger);
const helmet = require("helmet");
app.use(helmet());

const es6renderer = require('express-es6-template-engine');
app.engine('html', es6renderer);
app.set("views", 'templates');
app.set("view engine", 'html');
app.use(express.static("public"));

const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({extended:true});

const pets = require('./models/pets');
const owners = require(`./models/owners`);

app.get("/", (req, res) =>{
    res.send("heres the pet db page");
});


app.get(`/pets`, async (req, res) => { 
        // res.send(`you want /pets`);
        const thePets = await pets.all();
        res.json(thePets);
});

// Create
app.get('/pets/create',(req, res)=>{
    console.log("hey heres /pets/create!!!");
    res.render('create');
    //some HTML form goes her
});

app.post('/pets/create', parseForm, async (req, res) => {
    const { name, species, owner_id } = req.body;
    const id = await pets.create(name, species, new Date(), owner_id);
    console.log(id);
    res.redirect(`/pets/${id}`);
});

// Update
app.get('/pets/:id/edit', async (req, res)=>{
    let petName = await pets.one(req.params.id);
    // console.log("petName stufff");
    // console.log(petName);
    
    petName = petName.name;
    // console.log(petName);
    res.render('edit',{
        locals: {
            petName
        }
    },);
});

app.post('/pets/:id/edit', parseForm, async (req, res) => {
    const newName = req.body.name;
    console.log("before updateName");
    let result = await pets.updateName(req.params.id, newName);
    console.log("result ====");
    console.log(result);
    res.redirect(`/pets/${result}`);
});

// Delete


app.get('/pets/:id/delete', (req, res) =>{
    res.render('delete');
});

app.post('/pets/:id/delete', parseForm, async (req, res)=>{
    const del = req.body.rating;
    if (del == 1){
        pets.del(req.params.id);
        res.redirect("/");
    } else {
        res.send("No pet found");
    }
});


app.get('/pets/:id', async (req, res) =>{
    const pet = await pets.one(req.params.id);
    res.json(pet);
});

app.get('/login', (req, res) =>{
    res.render("auth");
});

app.post('/login', parseForm, async (req, res)=>{
    console.log("here you did it!");
    console.log(req.body);
    const { name, password } = req.body;
    const didLoginSuccessfully = await owners.login(name, password);
    if (didLoginSuccessfully){
        console.log("success!");
        const theUser = await owners.getByUsername(name);
        req.session.user = {
            name,
            id:theUser.id
        };
        req.session.save(()=>{
            console.log("session has been saveds");
            res.redirect('/profile');
        });
        
    }else{
        console.log("FAILLLL!!!!");
    }
});

app.get('/logout', (req,res)=>{
    req.session.destroy(()=> {
        res.redirect('/login');
    });
    
});

app.get('/profile', (req, res) => {
    res.send(`Welcome back ${req.session.user.name}`)
});

server.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
});
