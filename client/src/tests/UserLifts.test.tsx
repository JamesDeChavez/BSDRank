import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { UserLoggedInContext } from '../App'
import UserLifts from '../components/UserLifts'

const mockContext = {
    userLoggedIn: false, setUserLoggedIn: () => {},
    userId: '', setUserId: () => {}
}

describe('UserLifts', () => {
    it('should render header', () => {
        render(
            <UserLoggedInContext.Provider value={mockContext}>
                <UserLifts />
            </UserLoggedInContext.Provider>
        )
        const headerElement = screen.getByRole('heading', { name: 'Your Recent Lifts'})
        expect(headerElement).toBeInTheDocument()
    })
    it('should render filters', () => {        
        render(
            <UserLoggedInContext.Provider value={mockContext}>
                <UserLifts />
            </UserLoggedInContext.Provider>
        )
        const filterText = screen.getByText('Filter:')
        const benchFilter = screen.getByRole('button', { name: 'Bench'})
        const squatFilter = screen.getByRole('button', {name: 'Squat'})
        const deadliftFilter = screen.getByRole('button', {name: 'Deadlift'})
        expect(filterText).toBeInTheDocument()
        expect(benchFilter).toBeInTheDocument()
        expect(squatFilter).toBeInTheDocument()
        expect(deadliftFilter).toBeInTheDocument()    
    })
    it('should render no workouts text', () => {
        render(
            <UserLoggedInContext.Provider value={mockContext}>
                <UserLifts />
            </UserLoggedInContext.Provider>
        )
        const noWorkoutsTextElement = screen.getByText('Your workouts will apear here')
        expect(noWorkoutsTextElement).toBeInTheDocument()
    })
})