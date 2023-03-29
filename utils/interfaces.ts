export interface Context {
    authScope: string
}

export interface LoginInputs {
    username: string,
    password: string
}

export interface RegisterInputs {
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
    }
}

export interface LiftInputs {
    userId: string,
    lifts: WorkoutInputs[],
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
    }

}

export interface WorkoutInputs {
    date: string,
    lift: string,
    weight: number,
    reps: number
}

export interface WeightInputs {
    userId: string,
    weight: number
}

export interface PendingVerifiedInputs {
    userId: string,
    pendingVerified: {
        weight: {
            videoURL: string,
            amount: number
        },
        bench: {
            videoURL: string,
            weight: number,
            reps: number
        },
        squat: {
            videoURL: string,
            weight: number,
            reps: number
        },
        deadlift: {
            videoURL: string,
            weight: number,
            reps: number
        }
    }
}

export interface VerifyRequestInputs {
    userId: string,
    lift: string,
    videoURL: string,
    weight: number,
    reps: number
}

export interface UpdateVerifyInputs {
    id: string,
    status: string
}

export interface LeaderboardInputs {
    id: string,
    leaderboard: LeaderInput[]
}

export interface LeaderInput {
    userId: string,
    wilksScore: number
}
