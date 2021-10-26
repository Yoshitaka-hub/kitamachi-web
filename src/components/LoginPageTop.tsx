import React, { Fragment, useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const style: React.CSSProperties = {
    padding: '50px',
    background: '#FFF'
}

const LoginPageTop: React.FC = (props: any) => {

    const firebaseAuth = auth;
    const history = useHistory();

    // ここではuseStateというHooksの機能を利用している
    // フォームに入力された値を保持する変数を宣言する形
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // useEffectもHooksの機能。ここではページがロードされたタイミングで
    // ログイン状態かどうかを判定するイベントを発動する
    useEffect(() => {
        // if logged in, redirect to home
        firebaseAuth.onAuthStateChanged(user => {
            user && history.push("/myPage");
        });
    }, []);

    return (
        <div style={style}>
            <Fragment>
                <Container>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setEmail(event.target.value);
                            }} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPassword(event.target.value);
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" onClick={async () => {
                            try {
                                await signInWithEmailAndPassword(auth, email, password);
                                history.push("/myPage");
                            } catch (error: any) {
                                alert(error.message);
                            }
                        }}>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </Fragment>
        </div>
    );
}

export default LoginPageTop;