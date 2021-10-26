import React from "react";
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';


const MainTop: React.FC = () => {
    return (
        <Card className="bg-light text-dark">
            <Card.Img src={`${process.env.PUBLIC_URL}/img/hutte.png`} alt="Card image" />
            <Card.ImgOverlay>
            <Row>
                <Col md={4}>
                    <Card.Title><h1>Kitamachi Hutte</h1></Card.Title>
                    <Card.Text><h5>住宅街の山小屋風日本酒酒場</h5></Card.Text>
                </Col>
                <Col md={{ span:4, offset: 4 }}>
                    <Card.Title><h4>営業時間</h4></Card.Title>
                    <Card.Text><h5>月・水・金・18時～23時</h5></Card.Text>
                </Col>
            </Row>
            </Card.ImgOverlay>
        </Card >
    );
}

export default MainTop;