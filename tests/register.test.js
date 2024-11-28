import supertest from 'supertest';
import { app } from '../app';
import mongoose from 'mongoose';
import User from '../models/user';

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
});

test('Register user with valid data', async () => {
    const newUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
    };

    const response = await api.post('/api/register').send(newUser).expect(201);
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.email).toBe(newUser.email);
});

test('Fail registration with duplicate email', async () => {
    const newUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
    };

    await api.post('/api/register').send(newUser).expect(201);
    const response = await api.post('/users').send(newUser).expect(400);
    expect(response.body.error).toBe('email already exists');
});

afterAll(async () => {
    await mongoose.connection.close();
});
