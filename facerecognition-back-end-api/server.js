const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs'); // hash password
const cors = require('cors');
const knex = require('knex'); // SQL query builder

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const id = require('./controllers/profile');
const image = require('./controllers/image');


// create connection to database
// Need to save to variable
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port: '5432',
      user : 'carlacarrasco',
      password : '',
      database : 'smart-brain'
    }
  });

app.use(express.json());
app.use(cors());

// Query statement created by Knex to Postgres
db.select('*').from('users').then(data => {
    console.log(data)
})

const database = {
    users:  [
        {
            id: "123",
            name:'Carla',
            email: 'cc@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: "124",
            name:'Selena', 
            email: 'selena@gmail.com',
            password: 'bidibidi',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'cc@gmail.com'
        }
    ]
}

//create route to insure everything is running correctly
app.get('/', (req, res)=> { res.send(db.users) })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
// Grab user
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
// put is better since we are updating profile 
app.put('/image', (req, res) => { image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => { image.handApiCall(req, res)})


app.listen(3000, ()=> {
    console.log('app is running on port 3000'); 
});

/* 
    Plan API - make sure have an idea of what it will look like
    -- > res = this is working
    - signin ->> POST = success/fail
    - register --> POST = user
    - profile/:userId --> GET = user
    - image --> PUT --> user

*/