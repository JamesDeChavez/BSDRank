export interface LiftingStats {
    weight: number,
    benchWeight: number,
    benchReps: number,
    squatWeight: number,
    squatReps: number,
    deadliftWeight: number,
    deadliftReps: number,
    gender: string
}

export interface searchResults {
    userRank: {
        rank: string,
        score: number
    },
    nextRank: {
        rank: string,
        scoreNeeded: number
    },
    userLiftingStats: LiftingStats
}