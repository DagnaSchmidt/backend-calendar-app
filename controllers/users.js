import express from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user.js';
export const usersRouter = express.Router();

// get user data if user is logged in
usersRouter.get('/', async (req, res) => {

});