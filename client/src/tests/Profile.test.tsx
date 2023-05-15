import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import { UserLoggedInContext } from '../App'
import Profile from '../components/Profile'
import { GET_LEADERBOARD } from '../graphql/query'
import userEvent from '@testing-library/user-event'

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
        }
    }
}]

const mockContext = {
    userLoggedIn: false, setUserLoggedIn: jest.fn(),
    userId: '', setUserId: jest.fn()
}

describe('Profile', () => {
    it('should render header', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <Profile />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const headerElement = screen.getByRole('heading', { name: 'Your Profile' })
        expect(headerElement).toBeInTheDocument()
    })
    it('should render plus svg', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <Profile />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const plusSvg = screen.getByTestId('plusSvg')
        expect(plusSvg).toBeInTheDocument()
    })
    it('should render minus svg when it clicks the plus svg', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <Profile />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const plusSvg = screen.getByTestId('plusSvg')
        userEvent.click(plusSvg)
        const minusSvg = screen.getByTestId('minusSvg')
        expect(minusSvg).toBeInTheDocument()
    })
    it('should render username and email text when it clicks the plus svg', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <Profile />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const plusSvg = screen.getByTestId('plusSvg')
        userEvent.click(plusSvg)
        const usernameText = screen.getByText('Username:')
        const emailText = screen.getByText('Email:')
        expect(usernameText).toBeInTheDocument()
        expect(emailText).toBeInTheDocument()
    })
    it('should render delete button when it clicks the plus svg', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <Profile />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const plusSvg = screen.getByTestId('plusSvg')
        userEvent.click(plusSvg)
        const deleteButton = screen.getByRole('button', {name: 'Delete Account'})
        expect(deleteButton).toBeInTheDocument()    
    })
    it('should render confirm and cancel buttons when user clicks delete button', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <Profile />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const plusSvg = screen.getByTestId('plusSvg')
        userEvent.click(plusSvg)
        const deleteButton = screen.getByRole('button', {name: 'Delete Account'})
        userEvent.click(deleteButton)
        const confirmButton = screen.getByRole('button', {name: 'Confirm Delete'})
        const cancelButton = screen.getByRole('button', {name: 'Cancel'})
        expect(confirmButton).toBeInTheDocument()
        expect(cancelButton).toBeInTheDocument()
    })
})
    
