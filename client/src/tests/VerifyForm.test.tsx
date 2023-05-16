import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import { UserLoggedInContext } from '../App'
import VerifyForm from '../components/VerifyForm'
import { CREATE_VERIFY_REQUEST } from '../graphql/mutations'
import userEvent from '@testing-library/user-event'

const mockData = [{
    request: {
        query: CREATE_VERIFY_REQUEST,
        variables: {
            userId: 'testId',
            lift: 'Bench',
            videoUrl: 'test.com',
            weight: 100,
            reps: 5
        }
    },
    result: {
        data: {
            createVerifyRequest: {
                _id: 'testId'
            }
        }
    }
}]

const mockContext = {
    userLoggedIn: true, setUserLoggedIn: jest.fn(),
    userId: 'testId', setUserId: jest.fn()
}

const mockProps = {
    actionSelected: 'Bench',
    setFormVisible: jest.fn()

}

describe('VerifyForm', () => {
    it('should render header', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <VerifyForm {...mockProps} />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const headerElement = screen.getByRole('heading', { name: 'Bench Verification' })
        expect(headerElement).toBeInTheDocument()
    })
    it('should render best unverified text', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <VerifyForm {...mockProps} />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const bestUnverifiedText = screen.getByText(`Your Best Unverified Lift:`, { exact: false })
        expect(bestUnverifiedText).toBeInTheDocument()
    })
    it('should render video label and input', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <VerifyForm {...mockProps} />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const videoLabel = screen.getByText(`Video URL`)
        const videoInput = screen.getByLabelText(`Video URL`)
        expect(videoLabel).toBeInTheDocument()
        expect(videoInput).toBeInTheDocument()    
    })
    it('should render verify link after user types video url', async () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <VerifyForm {...mockProps} />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const videoInput = screen.getByLabelText(`Video URL`)
        userEvent.type(videoInput, 'test.com')
        const verifyLink = await screen.findByRole('link', { name: 'Verify Video Link' })
        expect(verifyLink).toBeInTheDocument() 
    })
    it('should render weight label and input', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <VerifyForm {...mockProps} />    
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const weightLabel = screen.getByText(`Confirm Weight`)
        const weightInput = screen.getByLabelText(`Confirm Weight`)
        expect(weightLabel).toBeInTheDocument()
        expect(weightInput).toBeInTheDocument()
    })
    it('should render reps label and input', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <VerifyForm {...mockProps} />    
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const repsLabel = screen.getByText(`Confirm Reps`)
        const repsInput = screen.getByLabelText(`Confirm Reps`)
        expect(repsLabel).toBeInTheDocument()
        expect(repsInput).toBeInTheDocument()
    })
    it('should render 4 number buttons', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <VerifyForm {...mockProps} />    
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const leftButtons = screen.getAllByRole('button', { name: '<' })
        const rightButtons = screen.getAllByRole('button', { name: '>'})
        expect(leftButtons.length).toBe(2)
        expect(rightButtons.length).toBe(2) 
    })
    it('should render submit and cancel buttons', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <VerifyForm {...mockProps} />    
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const submitButton = screen.getByRole('button', { name: 'Submit' })
        const cancelButton = screen.getByRole('button', { name: 'Cancel' })
        expect(submitButton).toBeInTheDocument()
        expect(cancelButton).toBeInTheDocument()
    })
    it('should call setFormVisible prop when cancel button is clicked', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <VerifyForm {...mockProps} />    
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const cancelButton = screen.getByRole('button', { name: 'Cancel' })
        userEvent.click(cancelButton)
        expect(mockProps.setFormVisible).toHaveBeenCalled()
    })
})
