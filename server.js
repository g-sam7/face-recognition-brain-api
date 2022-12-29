const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port: 5432,
    user : 'samuelgraham',
    password : '',
    database : 'face-recognition-brain'
  }
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send("Success!") });
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfile(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleApiCall());

app.listen(process.env.PORT || 3000, () => {
  console.log(`face recognition brain is running ${process.env.PORT || 3000}`);
})