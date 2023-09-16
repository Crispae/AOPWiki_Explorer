import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import NeoGraph from './NeoGraph';
import Highlighter from './Highlighter';

function Collapsed({item,openstate}) {
    
  return (

    <Container fluid className='border collapsed-component'>

        <Row>


                    {/* This column handles the display area*/}
                    <Col md={8} className='border display_history'>

                            {/** Here the component of visualization should appear */}
                            {openstate && item && <NeoGraph cypher={item} isCollapsed={true} />}


                    </Col>

                    {/* This column show the user's input in card format */}
                    <Col md={4} className='info_card'>


                                    <Card   className="mb-2">
                                        
                                        <Card.Header> <b>Text Query</b></Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                {item.query}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>

                                    {/** Here the syntax highligting of Cypher has been done */}
                                    <Card  className="mb-2 bg-dark text-white">
                                        <Card.Header><b>Cypher Query</b></Card.Header>
                                                {<Highlighter>{item.cypher}</Highlighter>}
                                    </Card>
                                    
                                
                    
                    </Col>

        </Row>



    </Container>
















   
  )
}

export default Collapsed