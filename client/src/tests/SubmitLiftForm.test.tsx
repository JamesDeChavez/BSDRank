import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import { UserLoggedInContext } from '../App'
import { AuthRenderContext } from '../branches/Auth'
import SubmitLiftForm from '../components/SubmitLiftForm'
import { CREATE_LIFT } from '../graphql/mutations'
import userEvent from '@testing-library/user-event'

const mockData = [{
    request: {
        query: CREATE_LIFT,
        variables: {
            userId: 'testId',
            lifts: [{
                date: '1/1/2023',
                lift: 'Bench',
                weight: 100,
                reps: 5
            }],
            bestLifts: {
                bench: {
                    weight: 100,
                    reps: 5
                },
                squat: {
                    weight: 100,
                    reps: 5
                },
                deadlift: {
                    weight: 100,
                    reps: 5
                }
            }
        }
    },
    result: {
        data: {
            createLift: {
                _id: 'testId'
            }
        }
    }
}]

const mockContext = {
    userLoggedIn: true, setUserLoggedIn: jest.fn(),
    userId: 'testId', setUserId: jest.fn()
}

describe('SubmitLiftForm', () => {
    it('should render header', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <AuthRenderContext.Provider value={[[], () => {}, '']}>
                        <SubmitLiftForm />
                    </AuthRenderContext.Provider>
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const headerElement = screen.getByRole('heading', { name: 'Submit New Lift' })
        expect(headerElement).toBeInTheDocument()
    })
    it('should render select label', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <AuthRenderContext.Provider value={[[], () => {}, '']}>
                        <SubmitLiftForm />
                    </AuthRenderContext.Provider>
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const selectLabel = screen.getByText('Select Lift:')
        expect(selectLabel).toBeInTheDocument()
    })
    it('should render 3 lift buttons', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <AuthRenderContext.Provider value={[[], () => {}, '']}>
                        <SubmitLiftForm />
                    </AuthRenderContext.Provider>
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const benchButton = screen.getByRole('button', { name: 'Bench' })
        const squatButton = screen.getByRole('button', { name: 'Squat' })
        const deadliftButton = screen.getByRole('button', { name: 'Deadlift' })
        expect(benchButton).toBeInTheDocument()
        expect(squatButton).toBeInTheDocument()
        expect(deadliftButton).toBeInTheDocument()
    })
    it('should render 2 labels', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <AuthRenderContext.Provider value={[[], () => {}, '']}>
                        <SubmitLiftForm />
                    </AuthRenderContext.Provider>
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const weightLabel = screen.getByText('Weight:')
        const repsLabel = screen.getByText('Reps:')
        expect(weightLabel).toBeInTheDocument()
        expect(repsLabel).toBeInTheDocument()
    })
    it('should render 2 number inputs', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <AuthRenderContext.Provider value={[[], () => {}, '']}>
                        <SubmitLiftForm />
                    </AuthRenderContext.Provider>
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const numberInputs = screen.getAllByRole('textbox')
        expect(numberInputs.length).toBe(2)
    })
    it('should render 4 number buttons', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <AuthRenderContext.Provider value={[[], () => {}, '']}>
                        <SubmitLiftForm />
                    </AuthRenderContext.Provider>
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const leftNumberButtons = screen.getAllByRole('button', { name: '<' })
        const rightNumberButtons = screen.getAllByRole('button', { name: '>' })
        expect(leftNumberButtons.length).toBe(2)
        expect(rightNumberButtons.length).toBe(2)
    })
    it('should render submit button', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <AuthRenderContext.Provider value={[[], () => {}, '']}>
                        <SubmitLiftForm />
                    </AuthRenderContext.Provider>
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const submitButton = screen.getByRole('button', { name: 'Submit Lift' })
        expect(submitButton).toBeInTheDocument()
    })
    it('should render error if submit button is clicked with no lift selected', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <AuthRenderContext.Provider value={[[], () => {}, '']}>
                        <SubmitLiftForm />
                    </AuthRenderContext.Provider>
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const submitButton = screen.getByRole('button', { name: 'Submit Lift' })
        expect(submitButton).toBeInTheDocument()
        userEvent.click(submitButton)
        const errorElement = screen.getByText('Please select a lift')
        expect(errorElement).toBeInTheDocument()
    })
    it('should render error if submit button is clicked with weight=0', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext}>
                    <AuthRenderContext.Provider value={[[], () => {}, '']}>
                        <SubmitLiftForm />
                    </AuthRenderContext.Provider>
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )

        const benchButton = screen.getByRole('button', { name: 'Bench' })
        const weightInput = screen.getByLabelText('Weight:')
        const submitButton = screen.getByRole('button', { name: 'Submit Lift' })
        
        userEvent.click(benchButton)
        userEvent.type(weightInput, '0')
        userEvent.click(submitButton)

        const errorElement = screen.getByText('Please enter a weight')
        expect(errorElement).toBeInTheDocument()
    })
})
    
