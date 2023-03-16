import db from '../models';

export default {
    findAll: async () => {
        try {
            const request = await db.Leaderboard.find()
            return {
                _id: request[0]!._id,
                leaderboard: request[0]!.leaderboard[0].leaderboard
            }
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req: any) => {
        try {
            const request = await db.Leaderboard.findOneAndUpdate({
                _id: req.id
            }, {
                leaderboard: req.leaderboard
            }, {
                new: true
            })
            return {
                _id: request!._id,
                leaderboard: request!.leaderboard[0].leaderboard
            }
        } catch (error) {
            console.log(error)
        }
    }   
}

