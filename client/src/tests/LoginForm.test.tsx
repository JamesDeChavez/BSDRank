import { screen, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import { UserLoggedInContext } from '../App'
import LoginForm from '../components/LoginForm'
import { LOGIN_USER } from '../graphql/query'
import userEvent from '@testing-library/user-event'

const mockData = [{
    request: {
        query: LOGIN_USER,
        variables: {
            username: 'XXXX',
            password: 'XXXX'
        }
    },
    result: {
        data: {
            loginUser: {
                _id: 'XXXX',
                username: 'XXXX',
            }
        }
    }
}]

const mockContext = {
    userLoggedIn: false, setUserLoggedIn: jest.fn(),
    userId: '', setUserId: jest.fn()
}

describe('LoginForm', () => {
    it('should render header', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <LoginForm />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const headerElement = screen.getByRole('heading', { name: 'Login' })
        expect(headerElement).toBeInTheDocument()
    })
    it('should render username and password inputs and labels', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <LoginForm />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        
        const usernameLabel = screen.getByText('Username')
        const passwordLabel = screen.getByText('Password')
        const usernameInput = screen.getByRole('textbox', { name: 'Username' })
        const passwordInput = screen.getByLabelText('Password')
        expect(usernameLabel).toBeInTheDocument()
        expect(passwordLabel).toBeInTheDocument()
        expect(usernameInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
    })
    it('should render submit button', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <LoginForm />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const submitButton = screen.getByRole('button', { name: 'Submit' })
        expect(submitButton).toBeInTheDocument()
    })
    it('should display text when user types in username and password', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <LoginForm />    
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const usernameInput = screen.getByRole('textbox', { name: 'Username' })
        const passwordInput = screen.getByLabelText('Password')
        userEvent.type(usernameInput, 'testUser')
        userEvent.type(passwordInput, 'testPassword')
        expect(usernameInput).toHaveValue('testUser')
        expect(passwordInput).toHaveValue('testPassword')
    })
    it('should call setUserLoggedIn and setUserId when submit button is clicked', async () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <LoginForm />    
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const submitButton = screen.getByRole('button', { name: 'Submit' })
        userEvent.type(screen.getByRole('textbox', { name: 'Username' }), 'testUser')
        userEvent.type(screen.getByLabelText('Password'), 'testPassword')
        userEvent.click(submitButton)
        waitFor(() => expect(mockContext.setUserLoggedIn).toHaveBeenCalled())
        waitFor(() => expect(mockContext.setUserId).toHaveBeenCalled())
    })
})