import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Condensed from './Condensed';
import Editor from './Editor';
import { useHistoryContext } from './HistoryContextProvider';
import Loader from './Loader';
import NeoGraph from './NeoGraph';
import NodeInfo from './NodeInfo';


function Visual() {

const QUERY_TRANSLATION_ENDPOINT = process.env.REACT_APP_QUERY_TRANSLATION_ENDPOINT

// store the input passed by user

// List of complete info
const {history,
  setHistory,
  save,
  setSave,
  cypherText,
  setCypherText,
  queryText,
  setQueryText,
loading,setLoading,
clicked,setClicked} = useHistoryContext()



// Counter will save the sequence of the query, it has been searched
const [counter, setCounter] = useState(() => 0)

// State to monitor the lastes cypher being added in the query box
const [cypher,setCypher] = useState(null) 


// This is the function which will take user's input and check if cypher is there or not
function convertRequest(data_info) {
  
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    let url = `${QUERY_TRANSLATION_ENDPOINT}query`;
    req.open("POST", url, true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("Access-Control-Allow-Origin", "*");

    req.onload = () => {
      if (req.readyState === 4 && req.status === 200) {
        let generated_cypher = JSON.parse(req.responseText);
        setLoading(false)


        resolve(generated_cypher.result.cypher);

      } else {
        reject("Request failed");
      }

    };

    req.onerror = () => {
      reject("Request error");
    };

    req.send(JSON.stringify(data_info)); // send final request
  });
}

const Query2cypher = async (event) => {
  event.preventDefault(); // Prevent form submission
 
  if (!queryText) {
    setCypherText("")
    setQueryText("")
    alert("Please enter the textual query.");
    return;
  }

  if (cypherText) {
    // If cypherText is already present, update cypherText based on user input
    let info_obj = {
      query: queryText,
      cypher: cypherText,
      id: counter,
    };

    // Updating the counter
    setCounter((prevCounter) => prevCounter + 1);

    // Update the cypher state
    setCypher(info_obj);

  } else {

     // load the spinner
    setLoading(true)
    
    try {
      // Fetch cypher from the backend
      const generated_cypher = await convertRequest({
        query: queryText,
        cypher: cypherText,
        id: counter,
      });

      // Update cypherText with the fetched cypher

      setCypherText(generated_cypher);

      // Create the info_obj
      let info_obj = {
        query: queryText,
        cypher: generated_cypher,
        id: counter,
      };

      // Updating the counter
      setCounter((prevCounter) => prevCounter + 1);

      // Update the cypher state
      setCypher(info_obj);
    } catch (error) {
      console.error(error);
    }
  }
};


  // This function will be triggered when we will save the result
  const updateinfo = () =>{

    // put a check, if cypher query text both are null then alert
    if (cypherText && queryText){

      // Do a check, if cypher with same id already exist then don't add
      let filtered_query = history.filter((element) =>{
      return element.id !== cypher.id})

      // Take the current cypher and update the history object
      setHistory([...filtered_query,cypher])

      // if save button is clicked, put save button as true
      setSave(true)

      // make both the input area blank
      setQueryText("")
      setCypherText("")

  }else{
    alert("Please provide the natural language and cypher query")
  }
    };

  return (

    <Container fluid> 
{/** Node and Edge Info panel to show*/}

    {/** Input area and display area of the network */}
    <Row>

      
        {/** This column will hold the display area input area, Welll there is no need of this column */}
        <Col>

                  <Container fluid className='component border mt-3'>

                    
                      <Row className='tee'>
                              <Col md={3} className='border'>
                                {/* Information display area */}
                                <NodeInfo></NodeInfo>
                              </Col>

                              {/* Visual Display Area */}
                              <Col md={5} className="display_main border">
                                {loading ? <Loader/>:(cypher && <NeoGraph cypher={cypher} />)}
                              </Col>

                              {/* User Input Area */}
                              <Col md= {4} onClick={()=>{setClicked(true)}}  id="input_area" className=" user_input border">
                                  {/* Add your user input content here */}

                              
                                    <div  className= "input_box">
                                    <h4><b>Textual Query</b></h4>
                                            <textarea style={{"width":"100%"}}
                                                    as="textarea" 
                                                    rows={5} 
                                                    placeholder="Enter your query" 
                                                    name="query"
                                                    value={queryText}
                                                    onChange={(e)=>{setQueryText(e.target.value)}}>
                                                    </textarea> 
                                                    
                                            <br />
                                            
                                            <h4><b> Cypher Query</b></h4>

                                            <Editor changeFunction={(value) =>{ if(value){setCypherText(value)}}} value={cypherText}></Editor> {/** Editor component takes code as their input */}

                                            {/*<Editor changeFunction={(value) =>{ if(value){setCypherText(value)}}} value={cypherText ? cypherText: ""}></Editor> {/** Editor component takes code as their input */}
                                            <Button  onClick={Query2cypher} id='query_submit' variant="primary" size='sm' type="submit">Submit </Button>
                                    
                                    </div>


                                    <Button onClick={updateinfo} variant="primary" size='sm' type="submit">
                                                      save
                                    </Button>         
                            
                              </Col>

                      </Row>

                  </Container>        


        </Col>

      
    </Row>


    {/** Static area where generated network as per user's query will be shown */}
    <Row>
          {/** In this column dynamically Condensed component of react will add*/}
          <Col>
              { [...history].reverse().map( item => <Condensed key={item.id} item={item}/>)}
          </Col>
          
    </Row>
                

   

    </Container>

    
   
  )
}

export default Visual