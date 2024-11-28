import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { usersRouter } from './controllers/users';
import { loginRouter } from './controllers/login';
import { registerRouter } from './controllers/register';

export const app = express();

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:20717/calendar-db", {
    useNewUrlParser: true,
    useUnifiedToplogy: true
});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter)
app.use('/api/users', usersRouter);
