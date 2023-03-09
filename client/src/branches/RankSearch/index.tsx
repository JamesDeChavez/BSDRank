import React, { useState } from 'react'
import RankSearch from '../../components/RankSearch'
import UserRank from '../../components/UserRank';
import { searchResults } from '../../utils/interfaces';

export const RankSearchContext = React.createContext<{
    setResultsVisible: React.Dispatch<React.SetStateAction<boolean>>,
    searchResults: searchResults | undefined,
    setSearchResults: React.Dispatch<React.SetStateAction<searchResults | undefined>>
}>({
    setResultsVisible: () => {},
    searchResults: undefined,
    setSearchResults: () => {} 
});

const RankSearchBranch = () => {
    const [resultsVisible, setResultsVisible] = useState(false)
    const [searchResults, setSearchResults] = useState<searchResults>()
    return (    
        <RankSearchContext.Provider value={{setResultsVisible, searchResults, setSearchResults}}>
        {resultsVisible ? 
            <UserRank />
        :
            <RankSearch />
        }
        </RankSearchContext.Provider>
    )
}

export default RankSearchBranch