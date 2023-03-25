import React, { useState } from 'react'
import RankSearch from '../../components/RankSearch'
import UserRank from '../../components/UserRank';
import squatRackImage from '../../assets/squatrack_MJ2.png'
import { SearchResults } from '../../utils/interfaces';
import './styles.css'

export const RankSearchContext = React.createContext<{
    setResultsVisible: React.Dispatch<React.SetStateAction<boolean>>,
    searchResults: SearchResults | undefined,
    setSearchResults: React.Dispatch<React.SetStateAction<SearchResults | undefined>>
}>({
    setResultsVisible: () => {},
    searchResults: undefined,
    setSearchResults: () => {} 
});

const RankSearchBranch = () => {
    const [resultsVisible, setResultsVisible] = useState(false)
    const [searchResults, setSearchResults] = useState<SearchResults>()

    const className = 'RankSearchBranch'
    return (    
        <RankSearchContext.Provider value={{setResultsVisible, searchResults, setSearchResults}}>
        {resultsVisible ? 
            <UserRank />
        :
            <div className={`${className}_heroContainer`}>
                <RankSearch />
                <div className={`${className}_imageContainer`}>
                    <img src={squatRackImage} alt="squatRack" className={`${className}_image`} />
                </div>
            </div>
        }
        </RankSearchContext.Provider>
    )
}

export default RankSearchBranch