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
import Form from 'react-bootstrap/Form'
import { addDoc, Timestamp } from "firebase/firestore";


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
const styleC: React.CSSProperties = {
    padding: '100px',
}

function ReservationCheckTop(props: any) {
    const [reservations, setReservations] = useState([{ id: "", name: "" }]);
    useEffect(() => {
        const q = query(collection(db, "resA"), where("hour", "==", "1"));
        fetchData();
        async function fetchData() {
            const querySnapshot = await getDocs(q);
            setReservations(
                querySnapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().memberNo }))
            );
        };
    }, []);

    const [date, setDate] = useState<string>("本日");
    const [resSeat, setResSeat] = useState<Number>(0);
    const [resHour, setResHour] = useState<Number>(0);
    const [resComment, setResComment] = useState<String>("");

    const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (ev) => {
        const number = Number(ev.target.value);
        setResHour(number);
    };

    return (
        <div style={style}>
            <Container style={style}>
                {reservations.map((reservation) => (<h3> {reservation.name}</h3>))}
            </Container>
            <Container style={style}>
                <DropdownButton id="dropdown-basic-button" title={date}>
                    <Dropdown.Item onClick={() => { setDate("本日"); }}>本日</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setDate("明日"); }}>明日</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setDate("明後日"); }}>明後日</Dropdown.Item>
                </DropdownButton>
            </Container>
            <Container style={style}>
                {/* Stack the columns on mobile by making one full-width and the other half-width */}
                <Row>
                    <Col xs={{ span: 2, offset: 2 }} md={{ span: 2, offset: 2 }}>
                        <Button variant="outline-primary" onClick={() => setResSeat(3)}>空席</Button>{' '}
                    </Col>
                    <Col xs={2} md={2}>
                        <Button variant="outline-primary" onClick={() => setResSeat(2)}>空席</Button>{' '}
                    </Col>
                    <Col xs={2} md={2}>
                        <Button variant="outline-primary" onClick={() => setResSeat(1)}>空席</Button>{' '}
                    </Col>
                    <Col xs={4} md={4}>
                    </Col>
                </Row>

                {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
                <Row >
                    <Col xs={2} md={2}>
                        <Button variant="outline-primary" onClick={() => setResSeat(4)}>空席</Button>{' '}
                    </Col>
                    <Col xs={10} md={10}>
                        <Image style={styleB} src={`${process.env.PUBLIC_URL}/img/wood.jpg`} fluid />
                    </Col>
                </Row>

                {/* Columns are always 50% wide, on mobile and desktop */}
                <Row>
                    <Col xs={{ span: 2, offset: 2 }} md={{ span: 2, offset: 2 }}>
                        <Button variant="outline-primary" onClick={() => setResSeat(5)}>空席</Button>{' '}
                    </Col>
                    <Col xs={2} md={2}>
                        <Button variant="warning" onClick={() => setResSeat(6)}>予約あり</Button>{' '}
                    </Col>
                    <Col xs={2} md={2}>
                        <Button variant="outline-primary" onClick={() => setResSeat(7)}>空席</Button>{' '}
                    </Col>
                    <Col xs={2} md={2}>
                        <Button variant="danger" onClick={() => setResSeat(8)}>着席</Button>{' '}
                    </Col>
                    <Col xs={2} md={2}>
                        <Button variant="outline-primary" onClick={() => setResSeat(9)}>空席</Button>{' '}
                    </Col>
                </Row>
            </Container>
            <Container style={style}>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label htmlFor="disabledTextInput">日付</Form.Label>
                            <Form.Control id="disabledTextInput" placeholder={date} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>時間</Form.Label>
                            <Form.Select aria-label="Floating label select example" onChange={handleChange}>
                                <option value="0">予約時間を選択してください！</option>
                                <option value="10">18:00</option>
                                <option value="20">18:30</option>
                                <option value="30">19:00</option>
                                <option value="40">19:30</option>
                                <option value="50">20:00</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>時間</Form.Label>
                        <Form.Select aria-label="Floating label select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                        <Form.Label>お店への伝言</Form.Label>
                        <Form.Control className="textFeedback"
                            as="textarea"
                            value={String(resComment)} 
                            onChange={e => setResComment(e.target.value)} 
                            placeholder="お店へのメッセージがあればご記入ください！" />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button variant="primary" onClick={async () => {
                        try {
                            const docRef = await addDoc(collection(db, "resA"), {
                                id: "101010",
                                hour: resHour,
                                seat: resSeat,
                                orderForDate: Timestamp.fromDate(new Date("December 10, 2021")),
                                memberNo: "121212",
                                comment: resComment
                            });
                        } catch (error: any) {
                            alert(error.message);
                        }
                    }}>
                        予約
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default ReservationCheckTop;