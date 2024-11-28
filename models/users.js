import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    username: {
        type: String,
        required: true,
        minLength: 3,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    passwordHash: {
        type: String,
        required: true
    }
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

const User = mongoose.model('User', userSchema);
export default User;
