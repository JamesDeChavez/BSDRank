const typeDefs = `#graphql
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        sex: String!
        weight: Int!
        bestLifts: BestLifts!
        lifts: [Workout]!
        verified: Verified!
        pendingVerified: Verified!
        token: String
        role: String
    }

    type BestLifts {
        bench: Lift!
        squat: Lift!
        deadlift: Lift!
    }

    type Lift {
        weight: Int!
        reps: Int!
    }

    type Workout {
        date: String!
        lift: String!
        weight: Int!
        reps: Int!
    }

    type Verified {
        weight: WeightVerify!
        bench: LiftVerify!
        squat: LiftVerify!
        deadlift: LiftVerify!
    }

    type WeightVerify {
        amount: Int!
        videoURL: String!
    }

    type LiftVerify {
        weight: Int!
        reps: Int!
        videoURL: String!
    }

    type VerifyRequest {
        _id: ID!
        userId: ID!
        lift: String!
        videoURL: String!
        weight: Int!
        reps: Int!
        status: String!
    }

    type Leaderboard {
        _id: ID!
        leaderboard: [Leader]!
    }

    type Leader {
        userId: ID!
        wilksScore: Int!
    }

    input BestLiftsInput {
        bench: LiftInput!
        squat: LiftInput!
        deadlift: LiftInput!
    }

    input LiftInput {
        weight: Int!
        reps: Int!
    }

    input WorkoutInput {
        date: String!
        lift: String!
        weight: Int!
        reps: Int!
    }

    input VerifiedInput {
        weight: WeightVerifyInput!
        bench: LiftVerifyInput!
        squat: LiftVerifyInput!
        deadlift: LiftVerifyInput!
    }

    input WeightVerifyInput {
        videoURL: String!
        amount: Int!
    }

    input LiftVerifyInput {
        videoURL: String!
        weight: Int!
        reps: Int!
    }

    input LeaderboardInput {
        leaderboard: [LeaderInput]!
    }

    input LeaderInput {
        userId: ID!
        wilksScore: Int!
    }

    type Query {
        returningUser: User
        login(username: String!, password: String!): User
        user(id: ID): User
        verifyRequests: [VerifyRequest]
        leaderboard: Leaderboard
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!, sex: String!, weight: Int!, bestLifts: BestLiftsInput!): User
        updateUserForVerifyRequest(id: ID!, verified: VerifiedInput!, pendingVerified: VerifiedInput!): User
        createLift(userId: ID!, lifts: [WorkoutInput]!, bestLifts: BestLiftsInput!): User
        updateWeight(userId: ID!, weight: Int!): User
        updatePendingVerified(userId: ID!, pendingVerified: VerifiedInput!): User
        createVerifyRequest(userId: ID!, lift: String!, videoURL: String!, weight: Int!, reps: Int!): VerifyRequest
        updateVerifyRequest(id: ID!, status: String!): VerifyRequest
        updateLeaderboard(id: ID!, leaderboard: LeaderboardInput): Leaderboard
    }

`

export default typeDefs