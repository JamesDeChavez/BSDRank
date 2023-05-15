import { screen, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import { UserLoggedInContext } from '../App'
import userEvent from '@testing-library/user-event'
import { CREATE_USER } from '../graphql/mutations'
import RegisterForm from '../components/RegisterForm'

const mockData = [{
    request: {
        query: CREATE_USER,
        variables: {
            username: 'XXXX',
            password: 'XXXXX',
            email: 'XXXXX',
            sex: 'MALE',
            weight: 100,
            bestLifts: {
                bench: {
                    weight: 100,
                    reps: 10
                },
                squat: {
                    weight: 100,
                    reps: 10
                },
                deadlift: {
                    weight: 100,
                    reps: 10
                }
            }
        }
    },
    result: {
        data: {
            createUser: {
                _id: 'XXXXX',
                username: 'XXXX',
                email: 'XXXXX',
                sex: 'MALE',
                weight: 100
            }
        }
    }    
}]

const mockContext = {
    userLoggedIn: false, setUserLoggedIn: jest.fn(),
    userId: '', setUserId: jest.fn()
}

describe('RegisterForm', () => {
    it('should render header', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <RegisterForm />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const headerElement = screen.getByRole('heading', { name: 'Register' })
        expect(headerElement).toBeInTheDocument()
    })
    it('should render username, email, and password inputs', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <RegisterForm />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const usernameInput = screen.getByRole('textbox', { name: 'Username' })
        const emailInput = screen.getByRole('textbox', { name: 'Email' })
        const passwordInput = screen.getByLabelText('Password')
        const repeatPWInput = screen.getByLabelText('Repeat Password')
        expect(usernameInput).toBeInTheDocument()
        expect(emailInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(repeatPWInput).toBeInTheDocument()
    })
    it('should render 14 total number buttons', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <RegisterForm />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const leftNumberButtons = screen.getAllByRole('button', { name: '<' })
        const rightNumberButtons = screen.getAllByRole('button', { name: '>' })
        expect(leftNumberButtons.length + rightNumberButtons.length).toEqual(14)
    })
    it('should render 3 rep inputs', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <RegisterForm />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const repInputs = screen.getAllByDisplayValue('5')
        expect(repInputs.length).toEqual(3)    
    }) 
    it('should render body weight label and input', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <RegisterForm />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const weightLabel = screen.getByText('Body Weight')
        const weightInput = screen.getByRole('textbox', { name: 'Body Weight' })
        expect(weightLabel).toBeInTheDocument()
        expect(weightInput).toBeInTheDocument()
    })    
    it('should render bench weight label and input', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <RegisterForm />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const benchLabel = screen.getByText('Bench PR')
        const benchWeightInput = screen.getByRole('textbox', { name: 'Bench PR' })
        expect(benchLabel).toBeInTheDocument()
        expect(benchWeightInput).toBeInTheDocument()
    })   
    it('should render squat weight label and input', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <RegisterForm />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const squatLabel = screen.getByText('Squat PR')
        const squatWeightInput = screen.getByRole('textbox', { name: 'Squat PR' })
        expect(squatLabel).toBeInTheDocument()
        expect(squatWeightInput).toBeInTheDocument()
    })   
    it('should render deadlift weight label and input', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <RegisterForm />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const deadliftLabel = screen.getByText('Deadlift PR')
        const deadliftWeightInput = screen.getByRole('textbox', { name: 'Deadlift PR' })
        expect(deadliftLabel).toBeInTheDocument()
        expect(deadliftWeightInput).toBeInTheDocument()
    })
    it('should render sex label and sex buttons', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <RegisterForm />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const sexLabel = screen.getByText('Sex')
        const maleButton = screen.getByRole('button', { name: 'Male' })
        const femaleButton = screen.getByRole('button', { name: 'Female' })
        expect(sexLabel).toBeInTheDocument()
        expect(maleButton).toBeInTheDocument()
        expect(femaleButton).toBeInTheDocument()
    })
    it('should render submit button', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <RegisterForm />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const submitButton = screen.getByRole('button', { name: 'Create Account' })
        expect(submitButton).toBeInTheDocument()
    })
    it('should handleChange when user fills out form', async () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <RegisterForm />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const usernameInput = screen.getByRole('textbox', { name: 'Username' })
        const emailInput = screen.getByRole('textbox', { name: 'Email' })
        const passwordInput = screen.getByLabelText('Password')
        const repeatPWInput = screen.getByLabelText('Repeat Password')
        userEvent.type(usernameInput, 'testUsername')
        userEvent.type(emailInput, 'test@gmail.com')
        userEvent.type(passwordInput, 'fakePassword123')
        userEvent.type(repeatPWInput, 'fakePassword123')
        expect(usernameInput).toHaveValue('testUsername')
        expect(emailInput).toHaveValue('test@gmail.com')
        expect(passwordInput).toHaveValue('fakePassword123')
        expect(repeatPWInput).toHaveValue('fakePassword123')    
    })
    it('should call setUserLoggedIn and setUserId when submit button is clicked', async () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <RegisterForm />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const usernameInput = screen.getByRole('textbox', { name: 'Username' })
        const emailInput = screen.getByRole('textbox', { name: 'Email' })
        const passwordInput = screen.getByLabelText('Password')
        const repeatPWInput = screen.getByLabelText('Repeat Password')
        const maleButton = screen.getByRole('button', { name: 'Male' })
        userEvent.type(usernameInput, 'testUsername')
        userEvent.type(emailInput, 'test@gmail.com')
        userEvent.type(passwordInput, 'fakePassword123')
        userEvent.type(repeatPWInput, 'fakePassword123')
        userEvent.click(maleButton)
        const submitButton = screen.getByRole('button', { name: 'Create Account' })
        userEvent.click(submitButton)
        waitFor(() => {
            expect(mockContext.setUserLoggedIn).toHaveBeenCalled()
            expect(mockContext.setUserId).toHaveBeenCalled()
        })
    })  
})