import React, { Fragment, useEffect, useState } from "react";

import { auth, db } from "../firebase";
import { collection, query, where, getDocs, orderBy, limit, startAt, endAt } from "firebase/firestore";

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
import dayjs from 'dayjs';
import 'dayjs/locale/ja';


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
    const dbName: String = "resC";
    const [reservations, setReservations] = useState([{ id: "", seat: "" }]);
    const [seatData, setSeatData] = useState<SeatState[]>(['空席']);
    const [seatButtonState, setSeatButtonState] = useState<SeatButtonState[]>(['outline-primary']);

    const today = new Date(new Date().setHours(0, 0, 0, 0));;
    const [openDate, setOpenDate] = useState<Date[]>([today]);

    useEffect(() => {
        const q1 = query(collection(db, String(dbName)), orderBy('orderForDate', 'asc'), startAt(Timestamp.fromDate(selectDate)), endAt(Timestamp.fromDate(selectDate)));
        const q2 = query(collection(db, String("openDate")), orderBy('date', 'asc'), startAt(Timestamp.fromDate(today)), limit(3));
        fetchData();
        async function fetchData() {
            const querySnapshot1 = await getDocs(q1);
            const querySnapshot2 = await getDocs(q2);
            setReservations(
                querySnapshot1.docs.map((doc) => ({ id: doc.id, seat: doc.data().seat }))
            );
            setOpenDate(
                querySnapshot2.docs.map((doc) => (doc.data().date.toDate()))
            )
            querySnapshot1.docs.map((doc) => {
                seatsData[Number(doc.data().seat) - 1] = '予約あり'
                seatsButtonState[Number(doc.data().seat) - 1] = 'warning'
            });
            setSeatData(
                seatsData.map((seat) => (seat))
            );
            setSeatButtonState(
                seatsButtonState.map((buttonState) => (buttonState))
            );
        };
    }, []);

    const buttonCheck = (state: SeatButtonState) => {
        switch (state) {
            case 'outline-primary':
                return false
            default:
                return true
        }
    }
    const seatSelectionCheck = (state: Number | null) => {
        if (state == null) {
            return "席を選択してください！"
        } else {
            return String(state) + "番席"
        }
    }
    const reservationButtonState = () => {
        if (resSeat != null && resHour !== 0) {
            return false
        } else {
            return true
        }
    }

    type SeatState = '空席' | '予約あり' | '着席'
    type SeatButtonState = 'outline-primary' | 'warning' | 'danger'
    type SeatProps = {
        value: SeatState
        num: number
    }
    const SeatButton = (props: SeatProps) => (
        seats(props)
    )
    const seats = (state: SeatProps) => {
        return (
            <Button className='seatButton' variant={seatButtonState[state.num]} onClick={() => setResSeat(state.num + 1)} disabled={buttonCheck(seatButtonState[state.num])}>
                <Badge bg="light" text="dark">{state.num + 1}</Badge>
                {seatData[state.num]}
            </Button>
        )
    }

    type BoardState = Repeat<SeatState, 9>
    type BoardButtonState = Repeat<SeatButtonState, 9>
    type BoardProps = {
        seatButtons: BoardState
    }

    var seatsData: BoardState = ['空席', '空席', '空席', '空席', '空席', '空席', '空席', '空席', '空席']
    var seatsButtonState: BoardButtonState = ['outline-primary', 'outline-primary', 'outline-primary', 'outline-primary', 'outline-primary', 'outline-primary', 'outline-primary', 'outline-primary', 'outline-primary']
    const Board = (props: BoardProps) => {
        const renderSeat = (i: number) => (
            <SeatButton value={props.seatButtons[i]} num={i} />
        )

        return (
            <Container style={style}>
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
                <Row >
                    <Col xs={2} md={2}>
                        {renderSeat(3)}
                    </Col>
                    <Col xs={10} md={10}>
                        <Image style={styleB} src={`${process.env.PUBLIC_URL}/img/wood.jpg`} fluid />
                    </Col>
                </Row>
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

    const [selectDate, setSelectDate] = useState<Date>(today);
    const [resSeat, setResSeat] = useState<Number | null>(null);
    const [resHour, setResHour] = useState<number>(0);
    const [resComment, setResComment] = useState<String>("");

    const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (ev) => {
        const number = Number(ev.target.value);
        setResHour(number);
    };

    enum DateFormat {
        YY_MM_DD_dd = 'YYYY/MM/DD(dd)',
        MM_DD_dd = 'MM/DD(dd)'
    }

    function formatDate(date: Date, type: DateFormat): string {
        switch (type) {
            case DateFormat.YY_MM_DD_dd:
                return dayjs(date)
                    .locale('ja')
                    .format('YYYY/MM/DD(dd)');
            case DateFormat.MM_DD_dd:
                return dayjs(date)
                    .locale('ja')
                    .format('MM/DD(dd)');
            default:
                return '';
        }
    }
    function dateDropdownSelected(date: any) {
        setSelectDate(date);
        setResSeat(null);
        setResHour(0);
        const q1 = query(collection(db, String(dbName)), orderBy('orderForDate', 'asc'), startAt(Timestamp.fromDate(date)), endAt(Timestamp.fromDate(date)));
        fetchData();
        async function fetchData() {
            const querySnapshot1 = await getDocs(q1);
            setReservations(
                querySnapshot1.docs.map((doc) => ({ id: doc.id, seat: doc.data().seat }))
            );
            querySnapshot1.docs.map((doc) => {
                seatsData[Number(doc.data().seat) - 1] = '予約あり'
                seatsButtonState[Number(doc.data().seat) - 1] = 'warning'
            });
            setSeatData(
                seatsData.map((seat) => (seat))
            );
            setSeatButtonState(
                seatsButtonState.map((buttonState) => (buttonState))
            );
        };
    }

    return (
        <div style={style}>
            <Container style={style}>
                {reservations.map((reservation) => (<h3> {reservation.seat}</h3>))}
                {openDate.map((date) => (<h3> {date.toString}</h3>))}
            </Container>
            <Container style={style}>
                <DropdownButton id="dropdown-basic-button" title={dayjs(selectDate).format('YYYY/MM/DD')}>
                    {openDate.map((date) => (<Dropdown.Item onClick={() => {dateDropdownSelected(date)}}>{dayjs(date).format('YYYY/MM/DD')}</Dropdown.Item>))}
                </DropdownButton>
            </Container>
            <Board seatButtons={seatsData} />
            <Container style={style}>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                            <Form.Label htmlFor="disabledTextInput">日付</Form.Label>
                            <Form.Control placeholder={dayjs(selectDate).format('YYYY/MM/DD')} disabled />
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                            <Form.Label>時間</Form.Label>
                            <Form.Select aria-label="Floating label select example" value={resHour} onChange={handleChange}>
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
                        <Form.Control value={seatSelectionCheck(resSeat)} disabled />
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
                                orderForDate: Timestamp.fromDate(selectDate),
                                memberNo: "555555",
                                comment: resComment
                            });
                        } catch (error: any) {
                            alert(error.message);
                        }
                    }} disabled={reservationButtonState()}>
                        予約
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default ReservationCheckTop;