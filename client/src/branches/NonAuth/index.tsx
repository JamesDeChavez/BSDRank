import React, { useState } from "react"
import LandingPage from "../../pages/Landing"
import LoginPage from "../../pages/Login"
import RegisterPage from "../../pages/Register"

export const NonAuthRenderContext = React.createContext<[string[], React.Dispatch<React.SetStateAction<string>>]>([[], () => {}])

const NonAuthBranch = () => {
    const RENDERS = ['LANDING', 'LOGIN', 'REGISTER']
    const [render, setRender] = useState('LANDING')

    return (
    <>
        <NonAuthRenderContext.Provider value={[RENDERS, setRender]}>
            {{
                [RENDERS[0]]: <LandingPage/>,
                [RENDERS[1]]: <LoginPage/>,
                [RENDERS[2]]: <RegisterPage/>
            }[render]}
        </NonAuthRenderContext.Provider>
    </>
    )
}

export default NonAuthBranch