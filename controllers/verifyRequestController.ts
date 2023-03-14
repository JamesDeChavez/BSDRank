import db from '../models';

export default {
    create: async (req: any) => {
        try {
            const request = await db.VerifyRequests.create(req);
            return request;
        } catch (error) {
            console.log(error);
        }
    }
}

