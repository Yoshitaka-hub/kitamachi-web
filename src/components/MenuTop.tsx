import React from "react";
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';


const MenuTop: React.FC = () => {
    return (
        <Card className="bg-light text-light">
            <Card.Img src={`${process.env.PUBLIC_URL}/img/kanban.png`} alt="Kanban image" />
        </Card >
    );
}

export default MenuTop;