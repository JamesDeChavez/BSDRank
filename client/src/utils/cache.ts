const cache = {
    user: {
        _id: '123abc',
        username: 'jdechavez23',
        email: 'jdechavez23@gmail.com',
        password: 'fakepassword',
        sex: 'MALE',
        weight: 145,
        bestLifts: {
            bench: {
                weight: 165,
                reps: 5
            },
            squat: {
                weight: 225,
                reps: 5
            },
            deadlift: {
                weight: 265,
                reps: 5
            }
        },
        lifts: [
            { date: new Date(), lift: 'Bench', weight: 155, reps: 5 },
            { date: new Date(), lift: 'Deadlift', weight: 245, reps: 5 }

        ],
        verified: {
            weight: {
                amount: 145,
                videoURL: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en",
            },
            bench: {
                amount: 145,
                reps: 5,
                videoURL: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            },
            squat: {
                amount: 205,
                reps: 5,
                videoUrl: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            },
            deadlift: {
                amount: 225,
                reps: 5,
                videoUrl: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            }
        },
        pendingVerified: {
            weight: {
                amount: 150,
                videoURL: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en",
            },
            bench: {
                amount: 225,
                reps: 5,
                videoURL: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            },
            squat: {
                amount: 315,
                reps: 5,
                videoUrl: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            },
            deadlift: {
                amount: 365,
                reps: 5,
                videoUrl: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            }
        }
    },
    leaderboard: [{
        _id: '321cba',
        username: 'jdechavez23_2',
        email: 'jdechavez23_2@gmail.com',
        password: 'fakepassword_2',
        sex: 'FEMALE',
        weight: 245,
        bestLifts: {
            bench: {
                weight: 265,
                reps: 5
            },
            squat: {
                weight: 325,
                reps: 5
            },
            deadlift: {
                weight: 365,
                reps: 5
            }
        },
        lifts: [
            { date: new Date(), lift: 'Bench', weight: 265, reps: 5 },
            { date: new Date(), lift: 'Deadlift', weight: 365, reps: 5 }

        ],
        verified: {
            weight: {
                amount: 245,
                videoURL: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en",
            },
            bench: {
                amount: 265,
                reps: 5,
                videoURL: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            },
            squat: {
                amount: 325,
                reps: 5,
                videoUrl: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            },
            deadlift: {
                amount: 365,
                reps: 5,
                videoUrl: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            }
        },
        pendingVerified: {
            weight: {
                amount: 250,
                videoURL: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en",
            },
            bench: {
                amount: 270,
                reps: 5,
                videoURL: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            },
            squat: {
                amount: 330,
                reps: 5,
                videoUrl: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            },
            deadlift: {
                amount: 370,
                reps: 5,
                videoUrl: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            }
        }
    },
    {
        _id: '123abc',
        username: 'jdechavez23',
        email: 'jdechavez23@gmail.com',
        password: 'fakepassword',
        sex: 'MALE',
        weight: 145,
        bestLifts: {
            bench: {
                weight: 165,
                reps: 5
            },
            squat: {
                weight: 225,
                reps: 5
            },
            deadlift: {
                weight: 265,
                reps: 5
            }
        },
        lifts: [
            { date: new Date(), lift: 'Bench', weight: 155, reps: 5 },
            { date: new Date(), lift: 'Deadlift', weight: 245, reps: 5 }

        ],
        verified: {
            weight: {
                amount: 145,
                videoURL: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en",
            },
            bench: {
                amount: 165,
                reps: 5,
                videoURL: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            },
            squat: {
                amount: 225,
                reps: 5,
                videoUrl: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            },
            deadlift: {
                amount: 265,
                reps: 5,
                videoUrl: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            }
        },
        pendingVerified: {
            weight: {
                amount: 150,
                videoURL: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en",
            },
            bench: {
                amount: 225,
                reps: 5,
                videoURL: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            },
            squat: {
                amount: 315,
                reps: 5,
                videoUrl: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            },
            deadlift: {
                amount: 365,
                reps: 5,
                videoUrl: "https://www.instagram.com/p/CCYkwUJp7tO/?hl=en"
            }
        }
    }]
}

export default cache