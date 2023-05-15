import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import CommunityTable from '../components/CommunityTable'
import { GET_LEADERBOARD } from '../graphql/query'

const mockData = [{
    request: {
        query: GET_LEADERBOARD
    },
    result: {
        data: {
            leaderboard: {
                _id: 'testId',
                leaderboard: []
            }
        },
        loading: jest.fn().mockReturnValue(false)
    }
}]

describe('CommunityTables', () => {
    it('should render header', () => {
        render(
            <MockedProvider mocks={mockData}>
                <CommunityTable />
            </MockedProvider>
        )
        const headerElement = screen.getByRole('heading', { name: 'BSD Leaderboard' })
        expect(headerElement).toBeInTheDocument()
    })
    it('should render 6 table headers', () => {
        render(
            <MockedProvider mocks={mockData}>
                <CommunityTable />
            </MockedProvider>
        )
        const th1 = screen.getByText('#')
        const th2 = screen.getByText('User')
        const th3 = screen.getByText('Rank')
        const th4 = screen.getByText('B')
        const th5 = screen.getByText('S')
        const th6 = screen.getByText('D')
        expect(th1).toBeInTheDocument()
        expect(th2).toBeInTheDocument()
        expect(th3).toBeInTheDocument()
        expect(th4).toBeInTheDocument()
        expect(th5).toBeInTheDocument()
        expect(th6).toBeInTheDocument()
    })
    it('should render no users text', () => {
        render(
            <MockedProvider mocks={mockData}>
                <CommunityTable />
            </MockedProvider>
        )
        const noUsersElement = screen.getByText('No verified users')
        expect(noUsersElement).toBeInTheDocument()
    })
})