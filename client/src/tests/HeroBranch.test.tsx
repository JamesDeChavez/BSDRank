import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import HeroBranch from '../branches/Hero'

describe('HeroBranch', () => {
    it('should render squat image', () => {
        render(<HeroBranch />)
        const image = screen.getByRole('img')
        expect(image).toBeInTheDocument()
    })
})