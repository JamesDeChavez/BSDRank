import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AuthRenderContext } from '../branches/Auth'
import NavButtons from '../components/NavButtons'
import userEvent from '@testing-library/user-event'

describe('Navbuttons', () => {
    it('should render 4 svg icons', () => {
        render(
            <AuthRenderContext.Provider value={[[], () => {}, '']}>
                <NavButtons />
            </AuthRenderContext.Provider>
        )
        const svgIcons = screen.getAllByTestId('svgNavIcon')
        expect(svgIcons.length).toBe(4)
    })
    it('should render 4 buttons', () => {
        render(
            <AuthRenderContext.Provider value={[[], () => {}, '']}>
                <NavButtons />
            </AuthRenderContext.Provider>
        )
        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toBe(4)
    })
    
    it('should call setRender when user clicks buttons', () => {
        const mockSetRender = jest.fn()
        render(
            <AuthRenderContext.Provider value={[[], mockSetRender, '']}>
                <NavButtons />
            </AuthRenderContext.Provider>
        )
        const buttons = screen.getAllByRole('button')
        buttons.forEach(button => {
            userEvent.click(button)
        })
        expect(mockSetRender).toHaveBeenCalledTimes(4)
    })

})