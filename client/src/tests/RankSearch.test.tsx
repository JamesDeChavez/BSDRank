import { screen, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { HeroBranchContext } from '../branches/Hero'
import { LandingPageContext } from '../pages/Landing'
import RankSearch from '../components/RankSearch'

const mockHeroContext = {
    searchResults: undefined,
    setSearchResults: jest.fn()
}

const mockLandingContext = {
    resultsVisible: false, setResultsVisible: jest.fn(),
    loginVisible: false, setLoginVisible: jest.fn(),
    registerVisible: false, setRegisterVisible: jest.fn()
}

describe('RankSearch', () => {
    it('should render header', () => {
        render(
            <HeroBranchContext.Provider value={mockHeroContext} >
                <LandingPageContext.Provider value={mockLandingContext} >
                    <RankSearch />
                </LandingPageContext.Provider>
            </HeroBranchContext.Provider>
        )
        const headerElement = screen.getByRole('heading', { name: 'BSD Rank Calculator' })
        expect(headerElement).toBeInTheDocument()    
    })
    it('should render 5 labels', () => {
        render(
            <HeroBranchContext.Provider value={mockHeroContext} >
                <LandingPageContext.Provider value={mockLandingContext} >
                    <RankSearch />
                </LandingPageContext.Provider>
            </HeroBranchContext.Provider>
        )
        const bodyWeightLabel = screen.getByText('Body Weight')
        const benchLabel = screen.getByText('Bench')
        const squatLabel = screen.getByText('Squat')
        const deadliftLabel = screen.getByText('Deadlift')
        const sexLabel = screen.getByText('Sex')
        expect(bodyWeightLabel).toBeInTheDocument()
        expect(benchLabel).toBeInTheDocument()    
        expect(squatLabel).toBeInTheDocument()
        expect(deadliftLabel).toBeInTheDocument()
        expect(sexLabel).toBeInTheDocument()    
    })
    it('should render 4 number inputs', () => {
        render(
            <HeroBranchContext.Provider value={mockHeroContext} >
                <LandingPageContext.Provider value={mockLandingContext} >
                    <RankSearch />
                </LandingPageContext.Provider>
            </HeroBranchContext.Provider>
        )
        const bodyWeightInput = screen.getByLabelText('Body Weight')
        const benchInput = screen.getByLabelText('Bench')
        const squatInput = screen.getByLabelText('Squat')
        const deadliftInput = screen.getByLabelText('Deadlift')
        expect(bodyWeightInput).toBeInTheDocument()
        expect(benchInput).toBeInTheDocument()
        expect(squatInput).toBeInTheDocument()
        expect(deadliftInput).toBeInTheDocument()
    })
    it('should render 3 rep inputs', () => {
        render(
            <HeroBranchContext.Provider value={mockHeroContext} >
                <LandingPageContext.Provider value={mockLandingContext} >
                    <RankSearch />
                </LandingPageContext.Provider>
            </HeroBranchContext.Provider>
        )
        const repsInputs = screen.getAllByDisplayValue('5')
        expect(repsInputs).toHaveLength(3)
    })
    it('should render 14 number buttons', () => {
        render(
            <HeroBranchContext.Provider value={mockHeroContext} >
                <LandingPageContext.Provider value={mockLandingContext} >
                    <RankSearch />
                </LandingPageContext.Provider>
            </HeroBranchContext.Provider>
        )
        const leftNumberButtons = screen.getAllByRole('button', { name: '<' })
        const rightNumberButtons = screen.getAllByRole('button', { name: '>' })
        expect(leftNumberButtons).toHaveLength(7)
        expect(rightNumberButtons).toHaveLength(7)
    })
    it('should render 2 sex buttons', () => {
        render(
            <HeroBranchContext.Provider value={mockHeroContext} >
                <LandingPageContext.Provider value={mockLandingContext} >
                    <RankSearch />
                </LandingPageContext.Provider>
            </HeroBranchContext.Provider>
        )
        const maleButton = screen.getByRole('button', { name: 'Male' })
        const femaleButton = screen.getByRole('button', { name: 'Female' })
        expect(maleButton).toBeInTheDocument()
        expect(femaleButton).toBeInTheDocument()    
    })
    it('should render 1 submit button', () => {
        render(
            <HeroBranchContext.Provider value={mockHeroContext} >
                <LandingPageContext.Provider value={mockLandingContext} >
                    <RankSearch />
                </LandingPageContext.Provider>
            </HeroBranchContext.Provider>
        )
        const submitButton = screen.getByRole('button', { name: 'Calculate BSD Rank' })
        expect(submitButton).toBeInTheDocument()
    
    })
    it('should display error message if no sex is selected', async () => {
        render(
            <HeroBranchContext.Provider value={mockHeroContext} >
                <LandingPageContext.Provider value={mockLandingContext} >
                    <RankSearch />
                </LandingPageContext.Provider>
            </HeroBranchContext.Provider>
        )
        const submitButton = screen.getByRole('button', { name: 'Calculate BSD Rank' })
        userEvent.click(submitButton)
        const errorMessage = await screen.findByText('Please select your sex to perform search')
        expect(errorMessage).toBeInTheDocument()
    })
    it('should call setResultsVisible if sex is chosen and submit button is clicked', async () => {
        render(
            <HeroBranchContext.Provider value={mockHeroContext} >
                <LandingPageContext.Provider value={mockLandingContext} >
                    <RankSearch />
                </LandingPageContext.Provider>
            </HeroBranchContext.Provider>
        )
        const maleButton = screen.getByRole('button', { name: 'Male' })
        userEvent.click(maleButton)
        const submitButton = screen.getByRole('button', { name: 'Calculate BSD Rank' })
        userEvent.click(submitButton)
        waitFor(() => expect(mockLandingContext.setResultsVisible).toHaveBeenCalled())
    })
})