import bcrypt from 'bcrypt'
import { GraphQLError } from 'graphql'
import jwt, { JwtPayload } from 'jsonwebtoken'
import controllers from "../controllers"
import { Context, LeaderboardInputs, LiftInputs, LoginInputs, PendingVerifiedInputs, RegisterInputs, UpdateUserForVerifyRequestInputs, UpdateVerifyInputs, VerifyRequestInputs, WeightInputs } from '../utils/interfaces'
import dotenv from 'dotenv'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET'

const resolvers = {
    Query: {
        returningUser: async (_: any, __: any, context: Context ) => {
            if (!context.authScope) return
            const token = context.authScope.split(' ')[1]
            const decoded: JwtPayload | null | string = token ? jwt.verify(token, JWT_SECRET) : null
            const userId = (decoded && typeof decoded !== 'string') ? decoded.userId : null
            try {
                const user = await controllers.User.findById({id: userId})
                return user
            } catch (error) {
                console.log(error)
            }            
        },
        login: async (_: any, args: LoginInputs) => {
            try {
                const user = await controllers.User.findByUsername({username: args.username})
                const passwordMatch = user && await bcrypt.compare(args.password, user.password)
                if (!user || !passwordMatch) throw new GraphQLError('Log in credentials are incorrect')
                else {
                    const token = jwt.sign(
                        { userId: user._id },
                        JWT_SECRET,
                        { algorithm: 'HS256', expiresIn: '1d' }
                    )
                    const userWithToken = { 
                        _id: user._id, 
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        sex: user.sex,
                        weight: user.weight,
                        bestLifts: user.bestLifts,
                        lifts: user.lifts,
                        verified: user.verified,
                        pendingVerified: user.pendingVerified,
                        role: user.role,
                        token: token 
                     }
                     return userWithToken
                }

            } catch (error) {
                console.log(error)
            }
        },
        user: async (_: any, args: {id: string}) => {
            try {
                const user = await controllers.User.findById(args)
                return user
            } catch (error) {
                console.log(error)
            }
        },
        verifyRequests: async () => {
            try {
                const requests = await controllers.VerifyRequest.findAll()
                return requests
            } catch (error) {
                console.log(error)
            }
        },
        leaderboard: async () => {
            try {
                const request = await controllers.Leaderboard.findAll()
                return request
            } catch (error) {
                console.log(error)
            }
        }
    },
    Mutation: {
        createUser: async (_: any, args: RegisterInputs) => {
            try {
                const usernameCheck = await controllers.User.findByUsername({ username: args.username})
                const emailCheck = await controllers.User.findByEmail({ email: args.email })

                if (usernameCheck) throw new GraphQLError('Username already exists')
                else if (emailCheck) throw new GraphQLError('Account already exists with this email')
                else {
                    const encryptedPW = await bcrypt.hash(args.password, 10)
                    const newUserData = { ...args, password: encryptedPW }
                    const user = await controllers.User.create(newUserData)
                    if (user) {
                        const token = await jwt.sign(
                            { userId: user._id },
                            JWT_SECRET,
                            { algorithm: "HS256", expiresIn: "1d" }
                        )
                        const userWithToken = { 
                           _id: user._id, 
                           username: user.username,
                           email: user.email,
                           password: user.password,
                           sex: user.sex,
                           weight: user.weight,
                           bestLifts: user.bestLifts,
                           lifts: user.lifts,
                           verified: user.verified,
                           pendingVerified: user.pendingVerified,
                           role: user.role,
                           token: token 
                        }
                        return userWithToken
                    }
                }
            } catch (error) {
                console.log(error)
                return error
            }
        },
        createLift: async (_: any, args: LiftInputs) => {
            try {
                const updatedUser = await controllers.User.addLift(args)
                return updatedUser
            } catch (error) {
                console.log(error)
                return error
            }
        },
        updateWeight: async (_: any, args: WeightInputs) => {
            try {
                const updatedUser = await controllers.User.updateWeight(args)
                return updatedUser
            } catch (error) {
                console.log(error)
                return error
            }
        },
        updatePendingVerified: async (_: any, args: PendingVerifiedInputs) => {
            try {
                const updatedUser = await controllers.User.updatePendingVerified(args)
                return updatedUser
            } catch (error) {
                console.log(error)
                return error
            }
        },
        createVerifyRequest: async (_: any, args: VerifyRequestInputs) => {
            try {
                const verifyRequest = await controllers.VerifyRequest.create(args)
                return verifyRequest
            } catch (error) {
                console.log(error)
                return error
            }
        },
        updateVerifyRequest: async (_: any, args: UpdateVerifyInputs) => {
            try {
                const updatedRequest = await controllers.VerifyRequest.update(args)
                return updatedRequest
            } catch (error) {
                console.log(error)
                return error
            }
        },
        updateUserForVerifyRequest: async (_: any, args: UpdateUserForVerifyRequestInputs) => {
            try {
                const updatedUser = await controllers.User.updateForVerifyRequest(args)
                return updatedUser
            } catch (error) {
                console.log(error)
                return error
            }
        },
        updateLeaderboard: async (_: any, args: LeaderboardInputs) => {
            try {
                const updatedLeaderboard = await controllers.Leaderboard.update(args)
                return updatedLeaderboard
            } catch (error) {
                console.log(error)
                return error
            }
        },
        deleteLift: async (_: any, args: LiftInputs) => {
            try {
                const updatedUser = await controllers.User.deleteLift(args)
                return updatedUser
            } catch (error) {
                console.log(error)
                return error
            }
        },
        deleteUser: async(_: any, args: {userId: string}) => {
            try {
                const deletedUser = await controllers.User.delete(args)
                return deletedUser
            } catch (error) {
                console.log(error)
                return error
            }
        }
    }
}

export default resolvers