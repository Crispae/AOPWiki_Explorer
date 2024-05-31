import { NEOVIS_ADVANCED_CONFIG, NeoVis } from 'neovis.js';
import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistoryContext } from './HistoryContextProvider';

function NeoGraph({ cypher, isCollapsed }) {

const GRAPHDB_ENDPOINT = process.env.REACT_APP_GRAPHDB_ENDPOINT
const GRAPHDB_USER = process.env.REACT_APP_GRAPHDB_USER
const GRAPHDB_PASSWORD = process.env.REACT_APP_GRAPHDB_PASSWORD
    
//const [showNodeInfo,setShowNodeInfo] = useState(false)
const {save,setSave,setNodeInfo} = useHistoryContext() // context hook to manage the network rendering stage

const visRef = useRef() // Just to store the neovis object 

// Ternary operator
let divId = isCollapsed ? `cviz${cypher.id}`:`viz${cypher.id}`

// Function to extract error from stack trace
function extractErrorMessage(stackTrace) {
  const pattern = /^([^\^]+)/m;
  const match = stackTrace.match(pattern);
  return match ? match[1].trim() : null;
}

// effect to clear the network area
useEffect(()=>{

  // Clean only the editable container 
  if (!divId.startsWith("cviz")){

    const container = document.getElementById(divId);
    if (container) {
      container.innerHTML = ''; // Remove all child elements
    }
  
    // Clean up references
    visRef.current && visRef.current.clearNetwork();

    // cleanup the nodeInfo area 
    setNodeInfo({}) // setting this to empty dictionary


    // Setting save state again back to false to get the network rendered
    setSave(false)



  }

},[save])


  // UseEffect will look for changes in 
  useEffect(() => {

      const config = {
        containerId: divId,
        neo4j: {
          serverUrl: GRAPHDB_ENDPOINT,
          serverUser: GRAPHDB_USER,
          serverPassword: GRAPHDB_PASSWORD,
        },

        visConfig:{
       
            nodes:{
                shape:"box",
            },

            physics:{
              enabled: true,
            }
            

        },
        labels: {

          AOP: {
            label: "id",
            [NEOVIS_ADVANCED_CONFIG]:{
                static:{
                    shape:"hexagon"
                }
            }},

          KEY_EVENT: {
            label: "name",
          },
          GENE:{
            label:"name",
          },
          DISEASE:{
            label:"name",
          }
          ,
          KEY_EVENT_RELATIONSHIP: {
            label: "name",
          },

          ASSESMENT:{
            label: "name"
          },

          BIO_ACTION:{
            label:"name"
          },
          BIO_OBJECT:{
            label:"name"
          },
          BIO_PROCESS:{
            label:"name"
          },
          CELL:{
            label:"name"
          },
          
          CHEMICAL:{
            label:"name"
          },
          ORGAN:{
            label:"name"
          },
          ORGANIZATION_LEVEL:{
            label:"name"
          },
          SEX:{
            label:"name"
          },
          STRESSOR:{
            label:"name"
          },
          TAXONOMY:{
            label:"name"
          },
          WOE:{
            label:"name"
          },
          LIFE_STAGE:{
            label:"name"
          }
        },

        
        relationships: {

          [NeoVis.NEOVIS_DEFAULT_CONFIG]: {

            [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                function: {
                  label: (rel) => rel.type // not take effect
                }
             }
          },

          HAS_KEY_EVENT: {},
          HAS_KER: {},
          HAS_ADVERSE_OUTCOME:{},
          HAS_BIOACTION:{},
          HAS_BIOOBJECT:{},
          HAS_BIOPROCESS:{},
          HAS_CHEMICAL:{},
          HAS_DOWNSTREAM_EVENT:{},
          HAS_MOLECULAR_INITIATING_EVENT:{},
          HAS_STRESSOR:{},
          HAS_UPSTREAM_EVENT:{},
          HAS_WEIGHT_OF_EVIDENCE:{},
          IS_APPLICABLE:{},
          OCCURS_AT:{},
          OCCURS_IN_CELL:{},
          OCCURS_IN_ORGAN:{}

        },
        initial_cypher: ``, // Set the initial Cypher query here
      };
      

      const vis = new NeoVis(config,); // intialize the instance and update the visRef
      vis.render(cypher.cypher)


      visRef.current = vis ? vis:null


      // Capture if error occured on Neo4j side
      vis.registerOnEvent("error", (e) => {

        const errorMessage = extractErrorMessage(e.error.stack) || "An error occurred";
        toast.error(errorMessage, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
      

      // capture the completion
      vis.registerOnEvent("completed",(e)=>  {

        if (e.recordCount === 0 ){
        toast.info("Cypher query not able to match any pattern, please revise your query. Automatated query generation might have issue, please change according to need", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });


      }})
    
      // Node click event
      vis.registerOnEvent('clickNode', (e) => {
        // e: { nodeId: number; node: Node }

        var node_props = e.node.raw.properties
        
        // This will limit to show the visualization of only the main rendering not history
        if (divId.startsWith("viz")){
          setNodeInfo(node_props)

        }
        

      });

      // Edge Click event
      vis.registerOnEvent('clickEdge', (e) => {
         
         var edge_props = e.edge.raw.properties

         // This will limit to show the visualization of only the main rendering not history
        if (divId.startsWith("viz")){
          setNodeInfo(edge_props)

        }
        
      });
    }


  , [cypher,divId]);


  return (
<>



{/** Height must be 100% otherwise, it will cause issue in graph rendering*/}
<div id={divId} style={{ height: "100%" }} />

</>

)}

export default NeoGraph;


