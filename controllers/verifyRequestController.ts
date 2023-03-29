import db from '../models';
import { UpdateVerifyInputs, VerifyRequestInputs } from '../utils/interfaces';

export default {
    findAll: async () => {
        try {
            const request = await db.VerifyRequests.find({ status: 'PENDING' })
            return request
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req: UpdateVerifyInputs) => {
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
    create: async (req: VerifyRequestInputs) => {
        try {
            const request = await db.VerifyRequests.create(req)
            return request
        } catch (error) {
            console.log(error)
        }
    }
}

