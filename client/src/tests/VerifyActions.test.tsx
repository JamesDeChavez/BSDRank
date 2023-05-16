import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { UserLoggedInContext } from '../App'
import VerifyActions from '../components/VerifyActions'
import userEvent from '@testing-library/user-event'

const mockContext = {
    userLoggedIn: false, setUserLoggedIn: jest.fn(),
    userId: '', setUserId: jest.fn()
}

const mockProps = {
    setFormVisible: jest.fn(),
    setActionSelected: jest.fn()
}

describe('VerifyActions', () => {
    it('should render header', () => {
        render(
            <UserLoggedInContext.Provider value={mockContext}>
                <VerifyActions {...mockProps} />
            </UserLoggedInContext.Provider>
        )
        const headerElement = screen.getByRole('heading', { name: 'Verify Options' })
        expect(headerElement).toBeInTheDocument()
    })
    it('should render 4 svg icons', () => {
        render(
            <UserLoggedInContext.Provider value={mockContext}>
                <VerifyActions {...mockProps} />
            </UserLoggedInContext.Provider>
        )
        const svgIcons = screen.getAllByTestId('verifySvg')
        expect(svgIcons.length).toBe(4)
    })
    it('should render 4 verify buttons', () => {
        render(
            <UserLoggedInContext.Provider value={mockContext}>
                <VerifyActions {...mockProps} />
            </UserLoggedInContext.Provider>
        )
        const verifyButtons = screen.getAllByRole('button')
        expect(verifyButtons.length).toBe(4)
    })
    
    it('should call setFormVisible and setActionSelected when verify button is clicked', () => {
        render(
            <UserLoggedInContext.Provider value={mockContext}>
                <VerifyActions {...mockProps} />
            </UserLoggedInContext.Provider>
        )
        const verifyButtons = screen.getAllByRole('button')
        verifyButtons.forEach(button => userEvent.click(button))
        expect(mockProps.setFormVisible).toHaveBeenCalledTimes(4)
        expect(mockProps.setActionSelected).toHaveBeenCalledTimes(4)
    })
    
})