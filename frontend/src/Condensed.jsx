import React, {useState} from 'react'
import { FaChevronDown, FaXmark,FaRepeat } from "react-icons/fa6";
import Collapse from 'react-bootstrap/Collapse';
import Collapsed from './Collapsed';
import {useHistoryContext} from './HistoryContextProvider'


// This component will represent the query done by the user in condensed format.

function Condensed({item,}) {

  // state to check weather drop down is clicked or not
  const [open,setOpen] = useState(false)

  // context of list of hsitory element
  const {history, setHistory,queryText,setQueryText,cypherText,setCypherText} = useHistoryContext()

  
  function deleteHistory(item) {

    // filtering the history list and updating it
    let filteredHistory = history.filter((element) =>{
        return element.id !== item.id
    })
    
    // update the history list 
    setHistory(filteredHistory)

  }



  return (

    <>

    {/** div with class info will show the condesed information or the query that's user have asked */}
    <div className='info'>
      
    {/** paragraph element showing the quey */}
    <p>{item.query}</p>


    {/** The drop down button which collapse and expand */}
    <div><button className="expand border" 
              onClick={() => setOpen(!open)} // It changes the open state
              aria-controls='coll' // Div which will be collapsed on click 
              aria-expanded={open}>
        <FaChevronDown color='purple'></FaChevronDown>
      </button>
      </div>


     {/** Button to repeate the previous saved content in the cypher area
    */}
    <div>

      <button className="close border" onClick={()=>{

        setQueryText(item.query)
        setCypherText(item.cypher)

      }} > 
        <FaRepeat color='blue' size={20}></FaRepeat>
      </button>

    </div>



    {/** Button to delete the history 
     * Passing the item to deleteHistory on the click
    */}
    <div>
      <button className="close border"
        onClick={()=>(deleteHistory(item))} > 
        <FaXmark color='red'></FaXmark>
      </button>

    </div>


    

    </div>

    {/** Collapsible component of bootsrap, which takes the open and closed state as it's requirement, it only appear if button will clicked*/}
    <Collapse in={open}>

      <div id="coll">
      {/** Collapsible component of bootsrap, which takes the open and closed state as it's requirement 
       * items props contain the query, cypher and it's main input for rendering
       * 
      */}
      <Collapsed item={item} openstate={open} ></Collapsed>
      </div>
      
    </Collapse>
    </>
  
  )


}


export default Condensed