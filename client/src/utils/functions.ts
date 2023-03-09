import { LiftingStats } from "./interfaces"

export const calculateWilksScore = (userLiftingStats: LiftingStats) => {
    /*
        Wilks Formula
        C = 600 / ( a + bx + cx^2 + dx^3 + ex^4 + fx^5 )
        
        x: bodyweight in kg
        
        Once 'C' is calculated, multiply to weight lifted to determine standard amount normalized across all body weights
    */

    const a = { male: 47.46178854, female: -125.4255398 }
    const b = { male: 8.472061379, female: 13.71219419 }
    const c = { male: 0.07369410346, female: -0.03307250631 }
    const d = { male: -0.001395833811, female: -0.001050400051}
    const e = { 
        male: 7.07665973070743 * Math.pow(10, -6), 
        female: 9.38773881462799 * Math.pow(10, -6) 
    }
    const f = {
        male: -1.20804336482315 * Math.pow(10, -8),
        female: -2.3334613884954 * Math.pow(10, -8)
    }
    const kgConversion = 0.453592
    const x = userLiftingStats.weight * kgConversion
    let wilksCoef: number  
    
    if (userLiftingStats.gender === 'MALE') {
        wilksCoef = 600 / ( a.male + b.male * x + c.male * Math.pow(x, 2) + d.male * Math.pow(x, 3) + e.male * Math.pow(x, 4) + f.male * Math.pow(x, 5)) 
    } else {
        wilksCoef = 600 / ( a.female + b.female * x + c.female * Math.pow(x, 2) + d.female * Math.pow(x, 3) + e.female * Math.pow(x, 4) + f.female * Math.pow(x, 5)) 
    }

    const benchWilks = calcOneRepMax(userLiftingStats.benchWeight * kgConversion, userLiftingStats.deadliftReps) * wilksCoef
    const squatWilks = calcOneRepMax(userLiftingStats.squatWeight * kgConversion, userLiftingStats.squatReps) * wilksCoef
    const deadliftWilks = calcOneRepMax(userLiftingStats.deadliftWeight * kgConversion, userLiftingStats.deadliftReps) * wilksCoef

    const totalWilks = benchWilks + squatWilks + deadliftWilks

    return totalWilks
}

const calcOneRepMax = (weight: number, sets: number) => {
    const NSCALoadChart = {
        1: 1,
        2: .95,
        3: .93,
        4: .9,
        5: .87,
        6: .85,
        7: .83,
        8: .8,
        9: .77,
        10: .75,
        11: .73,
        12: .7
    }

    let oneRepMaxAdjuster: number

    switch (sets) {
        case 1: oneRepMaxAdjuster = NSCALoadChart[1]; break
        case 2: oneRepMaxAdjuster = NSCALoadChart[2]; break
        case 3: oneRepMaxAdjuster = NSCALoadChart[3]; break
        case 4: oneRepMaxAdjuster = NSCALoadChart[4]; break
        case 5: oneRepMaxAdjuster = NSCALoadChart[5]; break
        case 6: oneRepMaxAdjuster = NSCALoadChart[6]; break
        case 7: oneRepMaxAdjuster = NSCALoadChart[7]; break
        case 8: oneRepMaxAdjuster = NSCALoadChart[8]; break
        case 9: oneRepMaxAdjuster = NSCALoadChart[9]; break
        case 10: oneRepMaxAdjuster = NSCALoadChart[10]; break
        case 11: oneRepMaxAdjuster = NSCALoadChart[11]; break
        case 12: oneRepMaxAdjuster = NSCALoadChart[12]; break
        default: oneRepMaxAdjuster = 1; break
    }

    const oneRepMax = weight / oneRepMaxAdjuster    

    return oneRepMax
}

export const determineUserRank = (wilksScore: number) => {
    const BSDRanks = {
        'B3': 200, 'B2': 230, 'B1': 260,
        'S3': 290, 'S2': 330, 'S1': 370,
        'G3': 410, 'G2': 450, 'G1': 490,
        'P3': 530, 'P2': 570, 'P1': 600,
        'D3': 630, 'D2': 670, 'D1': 9999
    }

    let userRank: string
    let nextRank = { rank: '', scoreNeeded: 0}

    if (wilksScore < BSDRanks.B3) { userRank = 'B3'; nextRank.rank = 'B2'; nextRank.scoreNeeded = BSDRanks.B3 }
    else if (wilksScore < BSDRanks.B2) { userRank = 'B2'; nextRank.rank = 'B1'; nextRank.scoreNeeded = BSDRanks.B2 }
    else if (wilksScore < BSDRanks.B1) { userRank = 'B1'; nextRank.rank = 'S3'; nextRank.scoreNeeded = BSDRanks.B1 }
    else if (wilksScore < BSDRanks.S3) { userRank = 'S3'; nextRank.rank = 'S2'; nextRank.scoreNeeded = BSDRanks.S3 }
    else if (wilksScore < BSDRanks.S2) { userRank = 'S2'; nextRank.rank = 'S1'; nextRank.scoreNeeded = BSDRanks.S2 }
    else if (wilksScore < BSDRanks.S1) { userRank = 'S1'; nextRank.rank = 'G3'; nextRank.scoreNeeded = BSDRanks.S1 }
    else if (wilksScore < BSDRanks.G3) { userRank = 'G3'; nextRank.rank = 'G2'; nextRank.scoreNeeded = BSDRanks.G3 }
    else if (wilksScore < BSDRanks.G2) { userRank = 'G2'; nextRank.rank = 'G1'; nextRank.scoreNeeded = BSDRanks.G2 }
    else if (wilksScore < BSDRanks.G1) { userRank = 'G1'; nextRank.rank = 'P3'; nextRank.scoreNeeded = BSDRanks.G1 }
    else if (wilksScore < BSDRanks.P3) { userRank = 'P3'; nextRank.rank = 'P2'; nextRank.scoreNeeded = BSDRanks.P3 }
    else if (wilksScore < BSDRanks.P2) { userRank = 'P2'; nextRank.rank = 'P1'; nextRank.scoreNeeded = BSDRanks.P2 }
    else if (wilksScore < BSDRanks.P1) { userRank = 'P1'; nextRank.rank = 'D3'; nextRank.scoreNeeded = BSDRanks.P1 }
    else if (wilksScore < BSDRanks.D3) { userRank = 'D3'; nextRank.rank = 'D2'; nextRank.scoreNeeded = BSDRanks.D3 }
    else if (wilksScore < BSDRanks.D2) { userRank = 'D2'; nextRank.rank = 'D1'; nextRank.scoreNeeded = BSDRanks.D2 }
    else { userRank = 'D1'; nextRank.rank = 'N/A'; nextRank.scoreNeeded = BSDRanks.D2 }

    return { userRank, nextRank }
}

export const convertRankToString = (rank: string) => {
    let rankString = rank
    
    switch(rank) {
        case 'B3': rankString = 'Bronze III'; break 
        case 'B2': rankString = 'Bronze II'; break 
        case 'B1': rankString = 'Bronze I'; break
        case 'S3': rankString = 'Silver III'; break
        case 'S2': rankString = 'Silver II'; break
        case 'S1': rankString = 'Silver I'; break
        case 'G3': rankString = 'Gold III'; break
        case 'G2': rankString = 'Gold II'; break
        case 'G1': rankString = 'Gold I'; break
        case 'P3': rankString = 'Platinum III'; break
        case 'P2': rankString = 'Platinum II'; break
        case 'P1': rankString = 'Platinum I'; break
        case 'D3': rankString = 'Diamond III'; break
        case 'D2': rankString = 'Diamond II'; break
        case 'D1': rankString = 'Diamond I'; break
    }

    return rankString
}