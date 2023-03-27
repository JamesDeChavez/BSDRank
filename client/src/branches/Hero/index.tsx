import React, { useState, useRef, useLayoutEffect, useContext } from 'react'
import RankSearch from '../../components/RankSearch'
import UserRank from '../../components/UserRank';
import squatRackImage from '../../assets/squatrack_MJ2.png'
import { SearchResults } from '../../utils/interfaces';
import gsap from 'gsap';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import './styles.css'
import { LandingPageContext } from '../../pages/Landing';
import { UserLoggedInContext } from '../../App';

export const HeroBranchContext = React.createContext<{
    searchResults: SearchResults | undefined,
    setSearchResults: React.Dispatch<React.SetStateAction<SearchResults | undefined>>
}>({
    searchResults: undefined,
    setSearchResults: () => {}
});

const HeroBranch = () => {
    const { resultsVisible, loginVisible, registerVisible } = useContext(LandingPageContext)
    const { userLoggedIn } = useContext(UserLoggedInContext)
    const [searchResults, setSearchResults] = useState<SearchResults>()
    const root = useRef(null)

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_rankSearchContainer`, {x: -1000}, { duration: 1, x: 0 })
            gsap.fromTo(`.${className}_userRankContainer`, {x: -1000}, { duration: 1, x: 0 })
            gsap.fromTo(`.${className}_loginContainer`, {x: -1000}, { duration: 1, x: 0 })
            gsap.fromTo(`.${className}_registerContainer`, {x: -1000}, { duration: 1, x: 0 })
            
            return () => gsapContext.revert()
        }, root)
    }, [resultsVisible, loginVisible, registerVisible, userLoggedIn])

    const className = 'HeroBranch'
    return (    
        <HeroBranchContext.Provider value={{ searchResults, setSearchResults }}>
            <div className={`${className}_heroContainer`} ref={root} >            
            {resultsVisible ?
                <div className={`${className}_userRankContainer`}>
                    <UserRank />
                </div> 
            : loginVisible ?
                <div className={`${className}_loginContainer`}>
                    <LoginForm />
                </div>
            : registerVisible ?
                <div className={`${className}_registerContainer`}>
                    <RegisterForm />
                </div>
            :
                <div className={`${className}_rankSearchContainer`}>
                    <RankSearch />
                </div>
            }
                <div className={`${className}_imageContainer`}>
                    <img src={squatRackImage} alt="squatRack" className={`${className}_image`} />
                </div>
            </div>        
        </HeroBranchContext.Provider>
    )
}

export default HeroBranch