import { gql } from "@apollo/client";

export const GET_RETURNING_USER = gql`
  query GetReturningUser {
    returningUser {
      _id
      username
      email
      sex
      weight
      role
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
      token
    }
  }
`

export const LOGIN_USER = gql`
  query LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
      username
      email
      sex
      weight
      role
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

export const GET_USER = gql`
    query GetUser($userId: ID) {
      user(id: $userId) {
        _id
        username
        email
        sex
        weight
        role
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

export const GET_VERIFY_REQUESTS = gql`
  query VerifyRequests {
    verifyRequests {
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

export const GET_LEADERBOARD = gql`
  query Leaderboard {
    leaderboard {
      _id
      leaderboard {
        userId
        wilksScore
      }
    }
  }
`