import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import { UserLoggedInContext } from '../App'
import UserLiftItem from '../components/UserLiftItem'
import { DELETE_USER } from '../graphql/mutations'

const mockData = [{
    request: {
        query: DELETE_USER,
        variables: {
            userId: 'testId'
        }
    },
    result: {
        data: {
            deleteUser: {
                _id: 'testId'
            }
        }
    }
}]

const mockContext = {
    userLoggedIn: false, setUserLoggedIn: jest.fn(),
    userId: '', setUserId: jest.fn()
}

const mockProps = {
    date: '1/1/2021',
    lift: 'Bench',
    weight: 100,
    reps: 5
}

describe('UserLiftItem', () => {
    it('should render date', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <UserLiftItem {...mockProps} />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const dateText = screen.getByText('1/1/2021')
        expect(dateText).toBeInTheDocument()
    })    
    it('should render SVG icon', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <UserLiftItem {...mockProps} />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const svgIcon = screen.getByTestId('svgTestId')
        expect(svgIcon).toBeInTheDocument()
    })    
    it('should render weight and reps text', () => {
        render(
            <MockedProvider mocks={mockData} >
                <UserLoggedInContext.Provider value={mockContext} >
                    <UserLiftItem {...mockProps} />
                </UserLoggedInContext.Provider>
            </MockedProvider>
        )
        const weightRepsText = screen.getByText('100 x 5')
        expect(weightRepsText).toBeInTheDocument()
    })
})