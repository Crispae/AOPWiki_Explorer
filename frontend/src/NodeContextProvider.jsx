import React, { createContext, useContext, useState } from 'react';

// This is context constructor
export const NodeContext = createContext();


// This function will be a wrapper around the root app, childeren will be all the other components comes under this
function NodeContextProvider({ children }) {
    
    const [nodeInfo, setNodeInfo] = useState({}); // Intializing the nodeInfo with null

    return (
        <NodeContext.Provider value={{ nodeInfo, setNodeInfo }}>
            {children}
        </NodeContext.Provider>
    );
}

export default NodeContextProvider;

// This will be used to directly extract the info
export const useNodeContext = () => useContext(NodeContext);
