import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!, $sex: String!, $weight: Int!, $bestLifts: BestLiftsInput!) {
        createUser(username: $username, email: $email, password: $password, sex: $sex, weight: $weight, bestLifts: $bestLifts) {
            _id
            username
            email
            sex
            weight
            token
            bestLifts {
                bench {
                    weight
                    reps
                }
                squat {
                    weight
                    reps
                }
                deadlift {
                    weight
                    reps
                }
            }
            lifts {
                date
                lift
                weight
                reps
            }
            verified {
                weight {
                    amount
                    videoURL
                }
                bench {
                    weight
                    reps
                    videoURL
                }
                squat {
                    weight
                    reps
                    videoURL
                }
                deadlift {
                    weight
                    reps
                    videoURL
                }
                
            }
            pendingVerified {
                weight {
                    amount
                    videoURL
                }
                bench {
                    weight
                    reps
                    videoURL
                }
                squat {
                    weight
                    reps
                    videoURL
                }
                deadlift {
                    weight
                    reps
                    videoURL
                }
            }
        }
    }
`

export const CREATE_LIFT = gql`
    mutation CreateLift($userId: ID!, $lifts: [WorkoutInput]! $bestLifts: BestLiftsInput!) {
        createLift(userId: $userId, lifts: $lifts, bestLifts: $bestLifts) {
            _id
            lifts {
                date
                lift
                weight
                reps
            }
            bestLifts {
                bench {
                    weight
                    reps
                }
                squat {
                    weight
                    reps
                }
                deadlift {
                    weight
                    reps
                }
            }
        }
    }
`

export const UPDATE_WEIGHT = gql`
    mutation UpdateWeight($userId: ID!, $weight: Int!) {
        updateWeight(userId: $userId, weight: $weight) {
            _id
            weight
        }
    }
`

export const UPDATE_PENDING_VERIFIED = gql`
    mutation UpdatePendingVerified($userId: ID!, $pendingVerified: VerifiedInput!) {
        updatePendingVerified(userId: $userId, pendingVerified: $pendingVerified) {
            _id
            pendingVerified {
                weight {
                    amount
                    videoURL
                }
                bench {
                    weight
                    reps
                    videoURL
                }
                squat {
                    weight
                    reps
                    videoURL
                }
                deadlift {
                    weight
                    reps
                    videoURL
                }
            }
        }
    }
`

export const CREATE_VERIFY_REQUEST = gql`
    mutation CreateVerifyRequest($userId: ID!, $lift: String!, $videoUrl: String!, $weight: Int!, $reps: Int!) {
        createVerifyRequest(userId: $userId, lift: $lift, videoURL: $videoUrl, weight: $weight, reps: $reps) {
            _id
            userId
            lift
            videoURL
            weight
            reps
            status
        }
    }
`