import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Nav (){

    return (

        <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="./logo.png"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            <b>Explorer</b>
          </Navbar.Brand>
        </Container>
      </Navbar>




    )



}

export default Nav