const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const register = require('./controllers/register');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

app.get('/', (req, res) => { res.send("Success!") });

app.get('/db', async (req, res) => {
  try {
    const client = await db.connect();
    const result = await client.query('SELECT * FROM face-recognition-brain-api');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})



// app.post('/signin', signin.handleSignin(db, bcrypt));
// app.post('/register', register.handleRegister(db, bcrypt));
// app.get('/profile/:id', profile.handleProfile(db));
// app.put('/image', image.handleImage(db));
// app.post('/imageurl', image.handleApiCall());

app.listen(process.env.PORT || 3000, () => {
  console.log(`face recognition brain is running at ${process.env.PORT || 3000}`);
})