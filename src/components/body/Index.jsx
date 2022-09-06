import React from 'react';
import Main from './Main';
import {Col, Container, Row} from 'react-bootstrap';

const Index = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Main/>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Index