import React from 'react';
import classes from './Header.module.css';
import Logo from './Logo.jsx';
import {Container, Row, Col, Navbar} from 'react-bootstrap';

function Header() {
  return (
    <>
    {/* <div className={classes['header-wrapper']}> */}
      <Container>
        <Navbar className={classes["navbar-bg"]}>
          <Col>
            <Logo/>
          </Col>
        </Navbar>
      </Container>

    {/* </div> */}
    </>
  )
}

export default Header
