require('dotenv').config({path: '../.env'});

const {PORT, NODE_ENV} = process.env;

const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');

const { createDatabase } = require('./controller/seed.controller')
const { authRouter } = require('./router/auth.router')
const { ListsRouter } = require('./router/lists.router');

app.use(
  session({
    secret: SESSION_SECRET,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/seed', createDatabase);
app.use('/auth', authRouter);
app.use('/lists', listsRouter);

const publicDir = path.join(__dirname, '../client/public/');
const protectedDir = path.join(__dirname, '../client/protected');

app.get('/', (req, res) => res.redirect('/login'));
app.use(express.static(publicDir));

app.use(
  '/protected', 
  (req, res, next) => {
    if (req.session?.user?.id) {
      next();
    } else {
      res.redirect('/login')
    }
  },
  express.static(protectedDir)
  );

// app.post('/seed', createDatabase);
// app.post('/auth/sign-up', handleSignUp);
// app.post('/auth/login', handleLogin);
// app.get('/login', (req, res) =>{})

app.listen(PORT, () => {
    if (NODE_ENV === 'development') {
      console.log(`Server running on http://localhost:${PORT}`);
    } else {
      console.log(`Server listening on ${PORT}`);
    }
  });
