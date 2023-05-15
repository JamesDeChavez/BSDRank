import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import LifterItem from '../components/LifterItem'
import { GET_USER } from '../graphql/query'

const mockData = [{
    request: {
        query: GET_USER,
        variables: {
            userId: 12345
        }
    },
    result: {
        data: {
            user: {
                _id: 12345,
                username: 'testUser',
                verified: {
                    bench: {
                        weight: 100,
                        reps: 10
                    },
                    squat: {
                        weight: 200,
                        reps: 11
                    },
                    deadlift: {
                        weight: 300,
                        reps: 12
                    }
                }
            }
        }
    }
}]

const mockProps = {
    leader: {
        userId: 12345,
        wilksScore: 100
    },
    index: 0
}

describe('LifterItem', () => {
    it('should render no users message if no data provided', () => {
        render(
            <MockedProvider mocks={[{...mockData[0], result: {data: null }}]} >
                <LifterItem {...mockProps} />
            </MockedProvider>
        )
        const noUserText = screen.getByText('No Fully Verified Users')
        expect(noUserText).toBeInTheDocument()
    })
    it('should render user data if data provided', async () => {
        render(
            <MockedProvider mocks={mockData} >
                <LifterItem {...mockProps} />
            </MockedProvider>
        )
        const indexText = await screen.findByText('1')
        const usernameText = await screen.findByText('testUser')
        const rankText = await screen.findByText('B3')
        const benchText = await screen.findByText('100 x 10')
        const squatText = await screen.findByText('200 x 11')
        const deadliftText = await screen.findByText('300 x 12')
        expect(indexText).toBeInTheDocument()
        expect(usernameText).toBeInTheDocument()        
        expect(rankText).toBeInTheDocument()
        expect(benchText).toBeInTheDocument()
        expect(squatText).toBeInTheDocument()
        expect(deadliftText).toBeInTheDocument()
    })
})