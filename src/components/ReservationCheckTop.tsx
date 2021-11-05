import React, { Fragment, useEffect, useState } from "react";

import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Image from 'react-bootstrap/Image'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import { addDoc, Timestamp } from "firebase/firestore";
import { Repeat } from 'typescript-tuple'


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
    const dbName: String = "resB";
    const [reservations, setReservations] = useState([{ id: "", seat: "" }]);
    useEffect(() => {
        const q = query(collection(db, String(dbName)), where("memberNo", "==", "555555"));
        fetchData();
        async function fetchData() {
            const querySnapshot = await getDocs(q);
            setReservations(
                querySnapshot.docs.map((doc) => ({ id: doc.id, seat: doc.data().seat }))
            );
            querySnapshot.docs.map((doc) => {
                seatsData[Number(doc.data().seat) - 1] = '予約あり'
            })
        };
    }, []);

    const filterSeatLogic = (num: Number) => {
        reservations.filter(res => {
            return Number(res.seat) === num
        })
    }

    type SeatState = '空席' | '予約あり' | '着席'
    type SeatProps = {
        value: SeatState
        num: number
    }
    const SeatButton = (props: SeatProps) => (
        seats(props)
    )
    const seats = (state: SeatProps) => {
        switch (state.value) {
            case '予約あり':
                return (
                    <Button className='seatButton' variant="warning" onClick={() => setResSeat(state.num)}>
                        <Badge bg="light" text="dark">{state.num + 1}</Badge>
                        {state.value}
                    </Button>
                )
            case '着席':
                return (
                    <Button className='seatButton' variant="danger" onClick={() => setResSeat(state.num)}>
                        <Badge bg="light" text="dark">{state.num + 1}</Badge>
                        {state.value}
                    </Button>
                )
            default:
                return (
                    <Button className='seatButton' variant="outline-primary" onClick={() => setResSeat(state.num)}>
                        <Badge bg="light" text="dark">{state.num + 1}</Badge>
                        {state.value}
                    </Button>
                )
        }
    }
    type BoardState = Repeat<SeatState, 9>
    type BoardProps = {
        seatButtons: BoardState
    }
    const seatsData: BoardState = ['空席', '空席', '空席', '空席', '空席', '空席', '空席', '空席', '空席']
    const Board = (props: BoardProps) => {
        const renderSeat = (i: number) => (
            <SeatButton value={props.seatButtons[i]} num={i} />
        )

        return (
            <Container style={style}>
                {/* Stack the columns on mobile by making one full-width and the other half-width */}
                <Row>
                    <Col xs={{ span: 2, offset: 2 }} md={{ span: 2, offset: 2 }}>
                        {renderSeat(2)}
                    </Col>
                    <Col xs={2} md={2}>
                        {renderSeat(1)}
                    </Col>
                    <Col xs={2} md={2}>
                        {renderSeat(0)}
                    </Col>
                    <Col xs={4} md={4}>
                    </Col>
                </Row>

                {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
                <Row >
                    <Col xs={2} md={2}>
                        {renderSeat(3)}
                    </Col>
                    <Col xs={10} md={10}>
                        <Image style={styleB} src={`${process.env.PUBLIC_URL}/img/wood.jpg`} fluid />
                    </Col>
                </Row>

                {/* Columns are always 50% wide, on mobile and desktop */}
                <Row>
                    <Col xs={{ span: 2, offset: 2 }} md={{ span: 2, offset: 2 }}>
                        {renderSeat(4)}
                    </Col>
                    <Col xs={2} md={2}>
                        {renderSeat(5)}
                    </Col>
                    <Col xs={2} md={2}>
                        {renderSeat(6)}
                    </Col>
                    <Col xs={2} md={2}>
                        {renderSeat(7)}
                    </Col>
                    <Col xs={2} md={2}>
                        {renderSeat(8)}
                    </Col>
                </Row>
            </Container>
        )

    }


    const [date, setDate] = useState<string>("本日");
    const [resSeat, setResSeat] = useState<Number | null>(null);
    const [resHour, setResHour] = useState<Number>(0);
    const [resComment, setResComment] = useState<String>("");

    const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (ev) => {
        const number = Number(ev.target.value);
        setResHour(number);
    };

    return (
        <div style={style}>
            <Container style={style}>
                {reservations.map((reservation) => (<h3> {reservation.seat}</h3>))}
            </Container>
            <Container style={style}>
                <DropdownButton id="dropdown-basic-button" title={date}>
                    <Dropdown.Item onClick={() => { setDate("本日"); }}>本日</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setDate("明日"); }}>明日</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setDate("明後日"); }}>明後日</Dropdown.Item>
                </DropdownButton>
            </Container>
            <Board seatButtons={seatsData} />
            <Container style={style}>
                {/* Stack the columns on mobile by making one full-width and the other half-width */}
                <Row>
                    <Col xs={{ span: 2, offset: 2 }} md={{ span: 2, offset: 2 }}>
                        <Button variant="outline-primary" onClick={() => setResSeat(3)}>
                            <Badge bg="light" text="dark">3</Badge>{' '}
                            空席</Button>{' '}
                    </Col>
                    <Col xs={2} md={2}>
                        <Button variant="outline-primary" onClick={() => setResSeat(2)}>
                            <Badge bg="light" text="dark">2</Badge>{' '}
                            空席</Button>{' '}
                    </Col>
                    <Col xs={2} md={2}>
                        <Button variant="outline-primary" onClick={() => setResSeat(1)}>
                            <Badge bg="light" text="dark">1</Badge>{' '}
                            空席</Button>{' '}
                    </Col>
                    <Col xs={4} md={4}>
                    </Col>
                </Row>

                {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
                <Row >
                    <Col xs={2} md={2}>
                        <Button variant="outline-primary" onClick={() => setResSeat(4)}>
                            <Badge bg="light" text="dark">4</Badge>{' '}
                            空席
                        </Button>{' '}
                    </Col>
                    <Col xs={10} md={10}>
                        <Image style={styleB} src={`${process.env.PUBLIC_URL}/img/wood.jpg`} fluid />
                    </Col>
                </Row>

                {/* Columns are always 50% wide, on mobile and desktop */}
                <Row>
                    <Col xs={{ span: 2, offset: 2 }} md={{ span: 2, offset: 2 }}>
                        <Button variant="outline-primary" onClick={() => setResSeat(5)}>
                            <Badge bg="light" text="dark">5</Badge>{' '}
                            空席
                        </Button>{' '}
                    </Col>
                    <Col xs={2} md={2}>
                        <Button variant="warning" onClick={() => setResSeat(6)}>
                            <Badge bg="light" text="dark">6</Badge>{' '}
                            予約あり
                        </Button>{' '}
                    </Col>
                    <Col xs={2} md={2}>
                        <Button variant="outline-primary" onClick={() => setResSeat(7)}>
                            <Badge bg="light" text="dark">7</Badge>{' '}
                            空席
                        </Button>{' '}
                    </Col>
                    <Col xs={2} md={2}>
                        <Button variant="danger" onClick={() => setResSeat(8)}>
                            <Badge bg="light" text="dark">8</Badge>{' '}
                            着席
                        </Button>{' '}
                    </Col>
                    <Col xs={2} md={2}>
                        <Button variant="outline-primary" onClick={() => setResSeat(9)}>
                            <Badge bg="light" text="dark">9</Badge>{' '}
                            空席
                        </Button>{' '}
                    </Col>
                </Row>
            </Container>
            <Container style={style}>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                            <Form.Label htmlFor="disabledTextInput">日付</Form.Label>
                            <Form.Control placeholder={date} disabled />
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
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
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label htmlFor="disabledTextInput">座席番号</Form.Label>
                        <Form.Control value={String(resSeat) + "番席"} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>お店への伝言</Form.Label>
                        <Form.Control className="textFeedback"
                            as="textarea"
                            value={String(resComment)}
                            onChange={e => setResComment(e.target.value)}
                            placeholder="お店へのメッセージがあればご記入ください！" />
                    </Form.Group>
                    <Button variant="primary" onClick={async () => {
                        try {
                            const docRef = await addDoc(collection(db, String(dbName)), {
                                id: Math.random().toString(32).substring(2),
                                hour: resHour,
                                seat: resSeat,
                                orderForDate: Timestamp.fromDate(new Date("December 10, 2021")),
                                memberNo: "555555",
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