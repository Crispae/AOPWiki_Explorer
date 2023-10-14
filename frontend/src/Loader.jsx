import React from 'react'
import { Dna } from  'react-loader-spinner'

function Loader() {
  return (

    <Dna 
    visible={true}
  height="130px"
  width="130px"
  ariaLabel="dna-loading"
  wrapperClass="loading-spinner"
    ></Dna>



  )
}

export default Loader