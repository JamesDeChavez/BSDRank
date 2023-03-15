import db from '../models';

export default {
    findAll: async () => {
        try {
            const request = await db.VerifyRequests.find({ status: 'PENDING' })
            return request
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req: any) => {
        try {
            const request = await db.VerifyRequests.findOneAndUpdate({
                _id: req.id
            }, {
                status: req.status
            }, {
                new: true
            })
            return request
        } catch (error) {
            console.log(error)
        }
    },
    create: async (req: any) => {
        try {
            const request = await db.VerifyRequests.create(req)
            return request
        } catch (error) {
            console.log(error)
        }
    }
}

