import db from '../models';
import { LiftInputs, PendingVerifiedInputs, RegisterInputs, UpdateUserForVerifyRequestInputs, WeightInputs } from '../utils/interfaces';

export default {
    findByUsername: async (req: {username: string}) => {
        try {
            const request = await db.User.find({username: req.username});
            return request[0];
        } catch (error) {
            console.log(error);
        }
    },
    findByEmail: async (req: {email: string}) => {
        try {
            const request = await db.User.find({email: req.email});
            return request[0];
        } catch (error) {
            console.log(error);
        }
    },
    findById: async (req: {id: string}) => {
        try {
            const request = await db.User.findById({ _id: req.id });
            return request;
        } catch (error) {
            console.log(error);
        }
    },
    create: async (req: RegisterInputs) => {
        try {
            const request = await db.User.create(req);
            return request;
        } catch (error) {
            console.log(error);
        }
    },
    updateForVerifyRequest: async (req: UpdateUserForVerifyRequestInputs) => {
        try {
            const request = await db.User.findOneAndUpdate({
                _id: req.id
            }, {
                pendingVerified: req.pendingVerified,
                verified: req.verified,
            }, {
                new: true
            });
            return request;
        } catch (error) {
            console.log(error);
        }
    },
    addLift: async (req: LiftInputs) => {
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
    deleteLift: async (req: LiftInputs) => {
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
    updateWeight: async (req: WeightInputs) => {
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
    updatePendingVerified: async (req: PendingVerifiedInputs) => {
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
    delete: async (req: {userId: string}) => {
        try {
            const request = await db.User.findOneAndDelete({ _id: req.userId });
            return request;
        } catch (error) {
            console.log(error);
        }
    }
}

