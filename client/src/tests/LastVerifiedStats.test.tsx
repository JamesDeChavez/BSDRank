import { screen, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { UserLoggedInContext } from '../App'
import LastVerifiedStats from '../components/LastVerifiedStats'

const mockContext = {
    userLoggedIn: false, setUserLoggedIn: jest.fn(),
    userId: '', setUserId: jest.fn()
}

describe('LastVerifiedStats', () => {
    it('should render header', () => {
        render(
            <UserLoggedInContext.Provider value={mockContext} >
                <LastVerifiedStats />
            </UserLoggedInContext.Provider>
        )
        const headerElement = screen.getByRole('heading', { name: 'Your Current Verified Stats'})
        expect(headerElement).toBeInTheDocument()
    })
    it('should render weight, bench, squat and deadlift text', () => {
        render(
            <UserLoggedInContext.Provider value={mockContext} >
                <LastVerifiedStats />
            </UserLoggedInContext.Provider>
        )
        const weightElement = screen.getByText('Weight')
        const benchElement = screen.getByText('Bench')
        const squatElement = screen.getByText('Squat')
        const deadliftElement = screen.getByText('Deadlift')
        expect(weightElement).toBeInTheDocument()    
        expect(benchElement).toBeInTheDocument()
        expect(squatElement).toBeInTheDocument()
        expect(deadliftElement).toBeInTheDocument()
    })
    it('should render weight, bench, squat and deadlift numbers', () => {
        render(
            <UserLoggedInContext.Provider value={mockContext} >
                <LastVerifiedStats />
            </UserLoggedInContext.Provider>
        )
        const weightNumber = screen.getByText('0')
        const liftNumbers = screen.getAllByText('0 x 0')
        expect(weightNumber).toBeInTheDocument()    
        expect(liftNumbers).toHaveLength(3)
    })
})