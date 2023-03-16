import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema ({
    leaderboard: {type: Array, default: [] },
}, {
    collection: "Leaderboard"
});

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;