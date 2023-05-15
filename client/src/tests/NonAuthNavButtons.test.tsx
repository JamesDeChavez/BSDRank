import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { LandingPageContext } from '../pages/Landing'
import NonAuthNavButtons from '../components/Navbar/NonAuthNav'
import userEvent from '@testing-library/user-event'

const mockContext = {
    resultsVisible: false, setResultsVisible: () => {},
    loginVisible: false, setLoginVisible: () => {},
    registerVisible: false, setRegisterVisible: () => {}
}

describe('NonAuthNavbar', () => {
    it('should render Login and Register buttons', () => {
        render(
            <LandingPageContext.Provider value={mockContext}>
                <NonAuthNavButtons />
            </LandingPageContext.Provider>
        )
        const loginButton = screen.getByRole('button', { name: 'Login' })
        const registerButton = screen.getByRole('button', { name: 'Register' })
        expect(loginButton).toBeInTheDocument()
        expect(registerButton).toBeInTheDocument()
    })
    it('should call setLoginVisible when Login button is clicked', () => {
        const setLoginVisible = jest.fn()
        render(
            <LandingPageContext.Provider value={{ ...mockContext, setLoginVisible }}>
                <NonAuthNavButtons />
            </LandingPageContext.Provider>
        )
        const loginButton = screen.getByRole('button', { name: 'Login' })
        userEvent.click(loginButton)
        expect(setLoginVisible).toHaveBeenCalled()
    })
    it('should call setRegisterVisible when Register button is clicked', () => {
        const setRegisterVisible = jest.fn()
        render(
            <LandingPageContext.Provider value={{ ...mockContext, setRegisterVisible }}>
                <NonAuthNavButtons />
            </LandingPageContext.Provider>
        )
        const registerButton = screen.getByRole('button', { name: 'Register' })
        userEvent.click(registerButton)
        expect(setRegisterVisible).toHaveBeenCalled()
    })

})