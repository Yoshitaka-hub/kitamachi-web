import React from "react";
import { Link } from 'react-router-dom';
import { Container, Nav } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';

const Header: React.FC = () => {
    return (
        <Navbar bg="light" variant="light">
            <Container>
            <Navbar.Brand href="/">Kitamachi Hutte</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
                <Nav.Link as={Link} to="/login">Reservation</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;