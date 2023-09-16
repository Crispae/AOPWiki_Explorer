import React,{createContext,useContext,useState} from 'react'
// This folder hold all the state, which need to be shared among the compoent
// create context for history
export const historyContext = createContext();

function HistoryContextProvider({children}) {

    const [history, setHistory] = useState(() => []); // Intializing the history context with empty array
    const [save,setSave] = useState(()=>false)
    {/** States used to only handle the input from the user */}
    const [queryText,setQueryText] = useState("")
    const [cypherText,setCypherText] = useState("");
    const [loading,setLoading] = useState(false) // This will help to show the spinner while fetching info from db and rendering it on canvas
    const [clicked,setClicked] = useState(false)
    const [nodeInfo, setNodeInfo] = useState({}); // Intializing the nodeInfo with null

    return (

        <historyContext.Provider value={{ history,
         setHistory,save,setSave,queryText,setQueryText,cypherText,setCypherText,loading,setLoading,clicked,setClicked,nodeInfo,setNodeInfo }}>
            {children}
        </historyContext.Provider>

  )
}

export default HistoryContextProvider

// This will be used to directly extract the info
export const useHistoryContext = () => useContext(historyContext);