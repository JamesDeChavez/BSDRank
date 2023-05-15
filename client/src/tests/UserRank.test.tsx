import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserRank from '../components/UserRank'
import { MockedProvider } from '@apollo/client/testing'
import { UPDATE_WEIGHT } from '../graphql/mutations'
import HeroBranch, { HeroBranchContext } from '../branches/Hero'

const mockData = [{
    request: {
        query: UPDATE_WEIGHT,
        variables: {
            weight: 100,
            userId: '1'
        },
    },
    result: {
        data: {
            updateWeight: {
                weight: 100,
                userId: '1'
            }
        }
    }
}]
describe('UserRank', () => {
    it('should render header', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserRank />
            </MockedProvider>
        )
        const header = screen.getByRole('heading', { name: 'Your BSD Rank' })
        expect(header).toBeInTheDocument()
    })
    it('should render verify text', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserRank />
            </MockedProvider>
        )
        const verifyText = screen.getByText('Unverified')
        expect(verifyText).toBeInTheDocument()    
    })
    it('should render call to action text', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserRank />
            </MockedProvider>
        )
        const callToActionText = screen.getByText('Create an account', { exact: false })
        expect(callToActionText).toBeInTheDocument()
    })
    it('should render rank text elements', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserRank />
            </MockedProvider>
        )
        const rankTextElement = screen.getByText('% to next rank', { exact: false })
        expect(rankTextElement).toBeInTheDocument()
    })
    it('should render rank sex text', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserRank />
            </MockedProvider>
        )
        const sexLabel = screen.getByText('Sex:')
        const sexText = screen.getByText('MALE')
        expect(sexLabel).toBeInTheDocument()
        expect(sexText).toBeInTheDocument()
    })
    it('should render three lift text elements', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserRank />
            </MockedProvider>
        )
        const liftElements = screen.getAllByText('0 x 0')
        expect(liftElements).toHaveLength(3)
    })
    it('should render three lift text elements', () => {
        const mockContext = {
            searchResults: {
                userRank: {
                    rank: 'b1',
                    score: 1
                },
                nextRank: {
                    rank: 'b1',
                    percentageToNext: 1
                },
                userLiftingStats: {
                    weight: 1,
                    benchWeight: 1,
                    benchReps: 1,
                    squatWeight: 1,
                    squatReps: 1,
                    deadliftWeight: 1,
                    deadliftReps: 1,
                    sex: 'MALE'
                }
            }, 
            setSearchResults: () => {}
        }
        render(
            <MockedProvider mocks={mockData} >
                <HeroBranchContext.Provider value={mockContext}>
                    <UserRank />
                </HeroBranchContext.Provider>
            </MockedProvider>
        )
        const returnButton = screen.getByRole('button', { name: 'Return to Rank Search' })
        expect(returnButton).toBeInTheDocument()
    })
})