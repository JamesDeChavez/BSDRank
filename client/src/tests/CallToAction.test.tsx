import userEvent from '@testing-library/user-event'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { LandingPageContext } from '../pages/Landing'
import CallToAction from '../components/CallToAction'

const mockContext = {
    resultsVisible: false, setResultsVisible: jest.fn(),
    loginVisible: false, setLoginVisible: jest.fn(),
    registerVisible: false, setRegisterVisible: jest.fn()
}

describe('CallToAction', () => {
    it('should render header', () => {
        render(
            <LandingPageContext.Provider value={mockContext} >
                <CallToAction />
            </LandingPageContext.Provider>
        )
        const header = screen.getByRole('heading', { name: 'What is a BSD Rank?' })
        expect(header).toBeInTheDocument()
    })
    it('should render 5 paragraphs', () => {
        render(
            <LandingPageContext.Provider value={mockContext} >
                <CallToAction />
            </LandingPageContext.Provider>
        )
        const p1 = screen.getByText('Your BSD Rank', {exact: false})
        const p2 = screen.getByText('Your total Wilks Score is calculated', {exact: false})
        const p3 = screen.getByText('If lifts provided are', {exact: false})
        const p4 = screen.getByText('BSD Rank can help', {exact: false})
        const p5 = screen.getByText('Create an account now to track', {exact: false})
        expect(p1).toBeInTheDocument()
        expect(p2).toBeInTheDocument()
        expect(p3).toBeInTheDocument()
        expect(p4).toBeInTheDocument()
        expect(p5).toBeInTheDocument()
    })
    it('should render 3 links', () => {
        render(
            <LandingPageContext.Provider value={mockContext} >
                <CallToAction />
            </LandingPageContext.Provider>
        )
        const links = screen.getAllByRole('link')
        expect(links.length).toBe(3)
    })
    it('should render a button', () => {
        render(
            <LandingPageContext.Provider value={mockContext} >
                <CallToAction />
            </LandingPageContext.Provider>
        )
        const button = screen.getByRole('button', { name: 'Create an Account' })
        expect(button).toBeInTheDocument()
    })
    it('should call setResultsVisible, setLoginVisible, and setRegisterVisible when button is clicked', () => {
        render(
            <LandingPageContext.Provider value={mockContext} >
                <CallToAction />
            </LandingPageContext.Provider>
        )
        const button = screen.getByRole('button', { name: 'Create an Account' })
        userEvent.click(button)
        expect(mockContext.setResultsVisible).toHaveBeenCalled()
        expect(mockContext.setLoginVisible).toHaveBeenCalled()
        expect(mockContext.setRegisterVisible).toHaveBeenCalled()    
    })
})