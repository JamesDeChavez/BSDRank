import React, { useState, useEffect } from 'react'
import HeroBranch from "../../branches/Hero"
import CallToAction from "../../components/CallToAction"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import RecentLifts from "../../components/CommunityTable"
import './styles.css'

export const LandingPageContext = React.createContext<{
    resultsVisible: boolean, setResultsVisible: React.Dispatch<React.SetStateAction<boolean>>,
    loginVisible: boolean, setLoginVisible: React.Dispatch<React.SetStateAction<boolean>>,
    registerVisible: boolean, setRegisterVisible: React.Dispatch<React.SetStateAction<boolean>>
}>({
    resultsVisible: false, setResultsVisible: () => {},
    loginVisible: false, setLoginVisible: () => {},
    registerVisible: false, setRegisterVisible: () => {}
});


const LandingPage = () => {
    const [resultsVisible, setResultsVisible] = useState(false)
    const [loginVisible, setLoginVisible] = useState(false)
    const [registerVisible, setRegisterVisible] = useState(false)

    const className = 'LandingPage'
    return (
        <LandingPageContext.Provider value={{ resultsVisible, setResultsVisible, registerVisible, setRegisterVisible, loginVisible, setLoginVisible }}>
            <div className={className}>
                <Navbar/>
                <div className={`${className}_main`}>
                    <HeroBranch/>
                    <CallToAction/>
                    <RecentLifts/>
                </div>
                <Footer/>
            </div>
        </LandingPageContext.Provider>
    )
}

export default LandingPage