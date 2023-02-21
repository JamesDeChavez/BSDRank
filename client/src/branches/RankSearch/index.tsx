import React, { useState } from 'react'
import RankSearch from '../../components/RankSearch'
import SearchResults from '../../components/SearchResults'

export const ResultsVisibleContext = React.createContext<React.Dispatch<React.SetStateAction<boolean>>>(() => {});

const RankSearchBranch = () => {
    const [resultsVisible, setResultsVisible] = useState(false)
    return (    
        <ResultsVisibleContext.Provider value={setResultsVisible}>
        {resultsVisible ? 
            <SearchResults/>
        :
            <RankSearch/>
        }
        </ResultsVisibleContext.Provider>
    )
}

export default RankSearchBranch