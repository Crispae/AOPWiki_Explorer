// Function to hanlde xhr request

export  function convertRequest(data_info,setGenerated){

    // send using XHR
    const req = new XMLHttpRequest();
    let url = "http://127.0.0.1:333/query"
    req.open("POST",url)
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("Access-Control-Allow-Origin","*")
    
    req.onload = () => {
  
      if (req.readyState === 4 && req.status === 200) {



         let generated_cypher = JSON.parse(req.responseText)
         setGenerated(generated_cypher.result.cypher)
  
      }
  
      
    };
  
    req.send(JSON.stringify(data_info)) // send final request
  
  
  }