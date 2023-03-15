import { gql } from "@apollo/client";

export const UnverifiedLiftsFragment = gql`
    fragment UnverifiedLifts on User {
        sex
        weight
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
`

export const VerifiedLiftsFragment = gql`
    fragment VerifiedLifts on User {
        sex
        verified{
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
`

export const UserLiftsFragment = gql`
    fragment UserLifts on User {
        lifts
    }
`

export const UserRoleFragment = gql`
    fragment UserRole on User {
        role
    }
`

export const BestLiftsFragment = gql`
    fragment BestLifts on User {
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
`

export const PendingVerifiedFragment = gql`
    fragment PendingVerified on User {
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
`