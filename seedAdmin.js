import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import User from './models/user.js';
import { SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, SEED_ADMIN_USERNAME } from './utils/config.js';

const seedAdmin = async () => {

    try {
        await mongoose.connect("mongodb://localhost:20717/calendar-db", {
            useNewUrlParser: true,
            useUnifiedToplogy: true
        });

        console.log('Connected to MongoDB');

        const existingAdmin = await User.findOne({ type: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists. Seeding skipped.');
            mongoose.connection.close();
            return;
        }

        const adminPassword = SEED_ADMIN_PASSWORD;
        const passwordHash = await bcryptjs.hash(adminPassword, 10);

        const adminUser = new User({
            username: SEED_ADMIN_USERNAME,
            email: SEED_ADMIN_EMAIL,
            passwordHash,
            type: 'admin',
        });

        const savedAdmin = await adminUser.save();
        console.log('Admin user created:', savedAdmin);
    } catch (error) {
        console.error('Error seeding admin user:', error);
        mongoose.connection.close();
    }
}

seedAdmin();
