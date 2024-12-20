import { SECRET } from '../utils/config.js';
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import User from '../models/users.js';
export const loginRouter = express.Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many login attempts. Please try again later.'
});

loginRouter.use('/', loginLimiter);

//admin login
loginRouter.post(
    '/admin',
    [
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const { password } = request.body;

        try {
            const user = await User.findOne({ type: 'admin' });
            const isPasswordCorrect = user === null ? false : await bcryptjs.compare(password, user.passwordHash);

            if (!user || !isPasswordCorrect) {
                return response.status(401).json({ error: 'Invalid password' });
            }

            const userForToken = { username: user.username, id: user._id };
            const token = jwt.sign(userForToken, SECRET, { expiresIn: '1h' });

            response.status(200).send({ token, username: user.username, id: user.id });
        } catch (error) {
            response.status(500).json({ error: 'Something went wrong' });
        }
    });

//user login
loginRouter.post(
    '/',
    [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const { email, password } = request.body;

        try {
            const user = await User.findOne({ email });
            const isPasswordCorrect = user && await bcryptjs.compare(password, user.passwordHash);

            if (!user || !isPasswordCorrect) {
                return response.status(401).json({ error: 'Invalid email or password' });
            }

            const userForToken = { username: user.username, id: user._id };
            const token = jwt.sign(userForToken, SECRET, { expiresIn: '1h' });

            response.status(200).send({ token, username: user.username, id: user.id });
        } catch (error) {
            response.status(500).json({ error: 'Something went wrong' });
        }
    });
