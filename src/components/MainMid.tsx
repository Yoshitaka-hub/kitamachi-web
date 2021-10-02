import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image'

const style: React.CSSProperties = {
    padding: '50px',
    background: '#FFF'
}

const MainMid: React.FC = () => {
    return (
        <Container fluid style={style}>
            <Row>
                <Col md={3}>
                    <Image src={`${process.env.PUBLIC_URL}/bento_001.png`} fluid thumbnail />
                </Col>
                <Col md={3}>
                    <Image src={`${process.env.PUBLIC_URL}/bento_002.png`} fluid thumbnail />
                </Col>
                <Col md={3}>
                    <Image src={`${process.env.PUBLIC_URL}/bento_003.png`} fluid thumbnail />
                </Col>
                <Col md={3}>
                    <Image src={`${process.env.PUBLIC_URL}/bento_004.png`} fluid thumbnail />
                </Col>
            </Row>
        </Container>
    );
}

export default MainMid;