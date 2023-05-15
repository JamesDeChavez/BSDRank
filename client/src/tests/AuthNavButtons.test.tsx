import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import AuthNavButtons from '../components/Navbar/AuthNav'
import { UserLoggedInContext } from '../App'

const mockContext = {
    userLoggedIn: false, setUserLoggedIn: () => {},
    userId: '', setUserId: () => {}
}

describe('AuthNavButtons', () => {
    it('should render Admin and Logout buttons', () => {
        render(
            <UserLoggedInContext.Provider value={mockContext} >
                <AuthNavButtons />
            </UserLoggedInContext.Provider>
        )
        const logoutButton = screen.getByRole('button', { name: 'Logout' })
        expect(logoutButton).toBeInTheDocument()
    })
    it('should call setUserLoggedIn when logout button is clicked', () => {
        const mockSetUserLoggedIn = jest.fn()
        render(
            <UserLoggedInContext.Provider value={{...mockContext, setUserLoggedIn: mockSetUserLoggedIn}} >
                <AuthNavButtons />
            </UserLoggedInContext.Provider>
        )
        const logoutButton = screen.getByRole('button', { name: 'Logout' })
        logoutButton.click()
        expect(mockSetUserLoggedIn).toHaveBeenCalled()
    })
})

  

