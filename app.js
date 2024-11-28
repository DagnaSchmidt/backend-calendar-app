import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { usersRouter } from './controllers/users.js';
import { loginRouter } from './controllers/login.js';
import { registerRouter } from './controllers/register.js';
import eventsRouter from './controllers/events/events.js';

export const app = express();

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/calendar-db")
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter)
app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);
