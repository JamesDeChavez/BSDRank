import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../components/Footer'

describe('Footer', () => {
    it('should render midjourney citation', () => {
        render(<Footer />)
        const midjourneyLink = screen.getByRole('link', { name: 'Midjourney'})
        expect(midjourneyLink).toBeInTheDocument()
    })
    it('should render Riot Games citation', () => {
        render(<Footer />)
        const riotLink = screen.getByRole('link', { name: 'Riot Games'})
        expect(riotLink).toBeInTheDocument()
    })
    it('should render portfolio link', () => {
        render(<Footer />)
        const portfolioLink = screen.getByRole('link', { name: 'James DeChavez'})
        expect(portfolioLink).toBeInTheDocument()
    })
})