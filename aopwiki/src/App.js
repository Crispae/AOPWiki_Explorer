import React from "react";
import Nav from "./Nav";
import Visual from "./Visual";
import Footer from "./Footer";
import './App.css'; // Import your external CSS file
import NodeContextProvider from './NodeContextProvider'; // Update the import path
import HistoryContextProvider from "./HistoryContextProvider";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    
<HistoryContextProvider>
<NodeContextProvider>

    <div className="app">
    <ToastContainer></ToastContainer>
    <Nav/>
    <Visual></Visual>
    <Footer></Footer>
    </div>

</NodeContextProvider>
</HistoryContextProvider>
  
    
    
  );
}

export default App