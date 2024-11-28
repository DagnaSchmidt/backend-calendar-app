import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const SECRET = process.env.SECRET;
export const SEED_ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;
export const SEED_ADMIN_USERNAME = process.env.SEED_ADMIN_USERNAME;
export const SEED_ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL;
