import React, { Fragment, useEffect, useState } from "react";

import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


const style: React.CSSProperties = {
    padding: '50px',
    background: '#FFF'
}
const styleA: React.CSSProperties = {
    height: '100px'
}
const styleB: React.CSSProperties = {
    padding: '10px',
    height: '80px',
    width: '100%'
}

function ReservationCheckTop(props: any) {
    const [reservations, setReservations] = useState([{ id: "", name: "" }]);
    useEffect(() => {
        const q = query(collection(db, "reservation"), where("number", "==", 1));
        fetchData();
        async function fetchData() {
            const querySnapshot = await getDocs(q);
            setReservations(
                querySnapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name }))
            );
        };
    }, []);

    const [date, setDate] = useState<string>("本日");

    return (
        <div style={style}>
            <Container>
                {reservations.map((reservation) => (<h3> {reservation.name}</h3>))}
            </Container>
            <Container>
                <DropdownButton id="dropdown-basic-button" title={date}>
                    <Dropdown.Item onClick={()=> {setDate( "本日" );}}>本日</Dropdown.Item>
                    <Dropdown.Item onClick={()=> {setDate( "明日" );}}>明日</Dropdown.Item>
                    <Dropdown.Item onClick={()=> {setDate( "明後日" );}}>明後日</Dropdown.Item>
                </DropdownButton>
            </Container>
            <Container>
                {/* Stack the columns on mobile by making one full-width and the other half-width */}
                <Row>
                    <Col xs={{ span: 2, offset: 2 }} md={{ span: 2, offset: 2 }}>
                    <Button variant="outline-primary">空席</Button>{' '}
                    </Col>
                    <Col xs={2} md={2}>
                        <Button variant="outline-primary">空席</Button>{' '}
                    </Col>
                    <Col xs={2} md={2}>
                        <Button variant="outline-primary">空席</Button>{' '}
                    </Col>
                    <Col xs={4} md={4}>
                    </Col>
                </Row>

                {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
                <Row >
                    <Col xs={2} md={2}>
                    <Button variant="outline-primary">空席</Button>{' '}
                    </Col>
                    <Col xs={10} md={10}>
                        <Image style={styleB} src={`${process.env.PUBLIC_URL}/img/wood.jpg`} fluid />
                    </Col>
                </Row>

                {/* Columns are always 50% wide, on mobile and desktop */}
                <Row>
                    <Col xs={{ span: 2, offset: 2 }} md={{ span: 2, offset: 2 }}>
                        <Button variant="outline-primary">空席</Button>{' '}
                    </Col>
                    <Col xs={2} md={2}>
                        <Button variant="warning">予約あり</Button>{' '}
                    </Col>
                    <Col xs={2} md={2}>
                    <Button variant="outline-primary">空席</Button>{' '}
                    </Col>
                    <Col xs={2} md={2}>
                        <Button variant="danger">着席</Button>
                    </Col>
                    <Col xs={2} md={2}>
                    <Button variant="outline-primary">空席</Button>{' '}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ReservationCheckTop;