import React from "react";
import { Container, Nav } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';

// const styleOne: React.CSSProperties = {
//     color: 'red'
// }

const Header: React.FC = () => {
    return (
        <Navbar bg="light" variant="light">
            <Container>
            <Navbar.Brand href="#home">Kitamachi Hutte</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#pricing">Price</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;