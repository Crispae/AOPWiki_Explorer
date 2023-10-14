import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import {useHistoryContext} from './HistoryContextProvider'
import { Container, Row, Col } from 'react-bootstrap';

function NodeInfo() {
  const { nodeInfo, } = useHistoryContext();
  const [expandedColumns, setExpandedColumns] = useState([]);

  // Restrict these keys to  show
  const restrictedKeys = ['embedding',
                          'source',
                           'creation_timestamp',
                           'last_modification_timestamp',
                        'oecd_project'];


  const handleColumnClick = (column) => {
    if (expandedColumns.includes(column)) {
      setExpandedColumns(expandedColumns.filter((col) => col !== column));
    } else {
      setExpandedColumns([...expandedColumns, column]);
    }
  };

  return (
    <Container className='node mt-3'>
      <h2> <b>Information</b></h2>

      {nodeInfo && Object.entries(nodeInfo).filter(([key, value]) => !restrictedKeys.includes(key)).map(([key, value]) => (

                <Row key={key} className='info-row border'>
            {/** Column to save the heading of information
             * Take each column as a button, which will expand on click
             */}

            
            
            {/** Column to show to show heading of title */}
            <Col
              xs={12}
              className='font-weight-bold info-col border'
              onClick={() => handleColumnClick(key)}
              aria-controls='info'
              aria-expanded={expandedColumns.includes(key)}
            >
              {key.toUpperCase()}
            </Col>

             {/** Column to show to show detailed informatio of title */}
            <Collapse in={expandedColumns.includes(key)}>
              <div id='info'>
                <Col xs={12} >
                  {key === 'url' ? (
                    <a href={value} target='_blank' rel='noopener noreferrer'>
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </Col>
              </div>
            </Collapse>


                </Row>
                
            



          
        ))}
    </Container>
  );
}

export default NodeInfo;
