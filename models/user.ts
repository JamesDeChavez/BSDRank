import { Schema, model } from 'mongoose';

const Verified = {
    weight: {
        amount: Number,
        videoURL: String
    },
    bench: {
        weight: Number,
        reps: Number,
        videoURL: String
    },
    squat: {
        weight: Number,
        reps: Number,
        videoURL: String
    },
    deadlift: {
        weight: Number,
        reps: Number,
        videoURL: String
    }
}

const defaultVerified = {
    weight: {
        amount: 0,
        videoURL: ''
    },
    bench: {
        weight: 0,
        reps: 0,
        videoURL: ''
    },
    squat: {
        weight: 0,
        reps: 0,
        videoURL: ''
    },
    deadlift: {
        weight: 0,
        reps: 0,
        videoURL: ''
    }
}

const userSchema = new Schema ({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    sex: {type: String, required: true},
    weight: {type: Number, required: true},
    bestLifts: {
        bench: {
            weight: {type: Number, required: true},
            reps: {type: Number, required: true}
        },
        squat: {
            weight: {type: Number, required: true},
            reps: {type: Number, required: true}
        },
        deadlift: {
            weight: {type: Number, required: true},
            reps: {type: Number, required: true}
        }
    },
    lifts: {type: Array, default: [] },
    verified: { type: Verified, default: defaultVerified },
    pendingVerified: { type: Verified, default: defaultVerified },
    role: { type: String, default: 'normal'}
}, {
    collection: "User"
});

const User = model('User', userSchema);

export default User;