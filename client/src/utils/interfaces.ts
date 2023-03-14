export interface LiftingStats {
    weight: number,
    benchWeight: number,
    benchReps: number,
    squatWeight: number,
    squatReps: number,
    deadliftWeight: number,
    deadliftReps: number,
    sex: string
}

export interface SearchResults {
    userRank: {
        rank: string,
        score: number
    },
    nextRank: {
        rank: string,
        percentageToNext: number
    },
    userLiftingStats: LiftingStats
}

export interface LiftSubmission {
    date: string, lift: string, weight: number, reps: number
}

export interface UserData {
    _id: string,
    username: string,
    email: string,
    password: string,
    sex: string,
    weight: number,
    bestLifts: {
        bench: {
            weight: number,
            reps: number
        },
        squat: {
            weight: number,
            reps: number
        },
        deadlift: {
            weight: number,
            reps: number
        }
    },
    lifts: LiftSubmission[],
    verified: {
        weight: {
            amount: number,
            videoURL: string,
        },
        bench: {
            amount: number,
            reps: number,
            videoURL: string
        },
        squat: {
            amount: number,
            reps: number,
            videoURL: string
        },
        deadlift: {
            amount: number,
            reps: number,
            videoURL: string
        }
    },
    pendingVerified: {
        weight: {
            amount: number,
            videoURL: string,
        },
        bench: {
            amount: number,
            reps: number,
            videoURL: string
        },
        squat: {
            amount: number,
            reps: number,
            videoURL: string
        },
        deadlift: {
            amount: number,
            reps: number,
            videoURL: string
        }
    }
}