import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const CustomNavbar = ({ seeToday, seePastWeek, seePastMonth, seeBetaMessage }) => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <button onClick={seeBetaMessage} className='betabtn ml-4 mr-2'>Beta Version</button>
      <Container>  
        <Navbar.Brand>
        <img
            src="chart-35773_1280.png"
            style={{ width: '50px', height: 'auto' }}
          />
        </Navbar.Brand>
        <Nav className="me-auto"> 
          <Nav.Link><button onClick={seeToday}>Today</button></Nav.Link>
          <Nav.Link><button onClick={seePastWeek}>Past Week</button></Nav.Link>
          <Nav.Link><button onClick={seePastMonth}>Past Month</button></Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="https://www.linkedin.com/in/sebastien-dupont-15b53826a/" className='mr-4'>Contact me</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;