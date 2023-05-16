import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import VerifyRequestsTable from '../components/VerifyRequestsTable'
import { GET_VERIFY_REQUESTS } from '../graphql/query'

const mockData = [{
    request: {
        query: GET_VERIFY_REQUESTS
    },
    result: {
        data: {
            verifyRequests: [{
                _id: 'testId',
                userId: 'testUserId',
                lift: 'testLift',
                videoURL: 'test.com',
                weight: '100',
                reps: '5',
                status: 'PENDING'
            }]
        }
    }
}]

describe('VerifyRequestsTable', () => {
    it('should render verification header', () => {
        render(
            <MockedProvider mocks={mockData} >
                <VerifyRequestsTable />
            </MockedProvider>
        )
        const headerElement = screen.getByRole('heading', { name: 'Verification Requests' })
        expect(headerElement).toBeInTheDocument()
    })
    it('should render accept and reject buttons', () => {
        render(
            <MockedProvider mocks={mockData} >
                <VerifyRequestsTable />
            </MockedProvider>
        )
        const acceptButton = screen.getByRole('button', { name: 'Accept' })
        const rejectButton = screen.getByRole('button', { name: 'Reject' })
        expect(acceptButton).toBeInTheDocument()
        expect(rejectButton).toBeInTheDocument()
    })
    it('should render user header', () => {
        render(
            <MockedProvider mocks={mockData} >
                <VerifyRequestsTable />
            </MockedProvider>
        )
        const userHeaderElement = screen.getByRole('heading', { name: 'Selected User Data:' })
        expect(userHeaderElement).toBeInTheDocument()    
    })
    it('should render username text', () => {
        render(
            <MockedProvider mocks={mockData} >
                <VerifyRequestsTable />
            </MockedProvider>
        )
        const usernameText = screen.getByText('Username:', { exact: false })
        expect(usernameText).toBeInTheDocument()
    })
    it('should render verify request from query', async () => {
        render(
            <MockedProvider mocks={mockData} >
                <VerifyRequestsTable />
            </MockedProvider>
        )
        const userIdText = await screen.findByText(`UserID: testUserId`)
        const liftText = await screen.findByText('testLift')
        const weightRepsText = await screen.findByText('100 x 5')
        const link = await screen.findByRole('link')
        expect(userIdText).toBeInTheDocument()
        expect(liftText).toBeInTheDocument()
        expect(weightRepsText).toBeInTheDocument()
        expect(link).toBeInTheDocument()
    })
})