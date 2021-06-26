
import express from 'express';

export const authRouter = express.Router();

authRouter.post('/register', (req, res) => {

  res.send('register endpoint');

});

authRouter.post('/login', (req, res) => {

  res.send('login endpoint');

});