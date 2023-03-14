import db from '../models';

export default {
    findByUsername: async (req: any) => {
        try {
            const request = await db.User.find({username: req.username});
            return request[0];
        } catch (error) {
            console.log(error);
        }
    },
    findByEmail: async (req: any) => {
        try {
            const request = await db.User.find({email: req.email});
            return request[0];
        } catch (error) {
            console.log(error);
        }
    },
    findById: async (req: any) => {
        try {
            const request = await db.User.findById({ _id: req.id });
            return request;
        } catch (error) {
            console.log(error);
        }
    },
    create: async (req: any) => {
        try {
            const request = await db.User.create(req);
            return request;
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req: any) => {
        try {
            const request = await db.User.findOneAndUpdate({
                _id: req.id
            }, {
                username: req.username,
                email: req.email
            }, {
                new: true
            });
            return request;
        } catch (error) {
            console.log(error);
        }
    },
    addLift: async (req: any) => {
        try {
            const request = await db.User.findOneAndUpdate({
                _id: req.userId
            }, {
                lifts: req.lifts,
                bestLifts: req.bestLifts
            }, {
                new: true
            });
            return request;
        } catch (error) {
            console.log(error);
        }
    },
    updateWeight: async (req: any) => {
        try {
            const request = await db.User.findOneAndUpdate({
                _id: req.userId
            }, {
                weight: req.weight
            }, {
                new: true
            });
            return request;
        } catch (error) {
            console.log(error);
        }
    },
    updatePendingVerified: async (req: any) => {
        try {
            const request = await db.User.findOneAndUpdate({
                _id: req.userId
            }, {
                pendingVerified: req.pendingVerified
            }, {
                new: true
            });
            return request;
        } catch (error) {
            console.log(error);
        }
    },
    delete: async (req: any) => {
        try {
            const request = await db.User.findOneAndDelete({ _id: req.id });
            return request;
        } catch (error) {
            console.log(error);
        }
    }
}

