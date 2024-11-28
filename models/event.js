import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['habits', 'hours', 'meetings', 'tasks', 'dates', 'notes'],
        required: true,
        default: 'dates'
    },
    description: {
        type: String
    },
    repeatable: {
        type: Boolean,
        default: false
    },
    repeat: {
        type: String,
        enum: ['day', 'week', 'month', 'year']
    },
    all_day: {
        type: Boolean,
        required: true,
        default: false
    },
    time: {
        start_date: {
            type: Date
        },
        end_date: {
            type: Date
        },
        duration: {
            type: Number,
            min: 5
        }
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    location: {
        city: {
            type: String,
            minLength: 3
        },
        street: {
            type: String,
            minLength: 3
        },
        country: {
            type: String,
            minLength: 3
        },
        online: {
            type: Boolean,
            default: false
        }
    },
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category',
    //     required: true
    // },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

eventSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
