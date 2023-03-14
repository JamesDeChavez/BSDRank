import { Schema, model } from 'mongoose';

const verifyRequestsSchema = new Schema ({
    userId: {type: String, required: true},
    lift: {type: String, required: true},
    videoURL: {type: String, required: true},
    weight: {type: Number, required: true},
    reps: {type: Number, required: true},
    status: {type: String, default: 'PENDING'},
}, {
    collection: "VerifyRequests"
});

const VerifyRequests = model('VerifyRequests', verifyRequestsSchema);

export default VerifyRequests;