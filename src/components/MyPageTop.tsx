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

const MyPageTop: React.FC = (props: any) => {

    const firebaseAuth = auth;
    const history = useHistory();

    const [currentUser, setCurrentUser] = useState<null | object>(null);

    useEffect(() => {
        // if not logged in, redirect to login page
        firebaseAuth.onAuthStateChanged(user => {
            user ? setCurrentUser(user) : history.push("/login");
        });
    }, []);

    return (
        <div style={style}>
            <Fragment>
                <Container>
                    <Button variant="primary" onClick={async event => {
                        try {
                            await auth.signOut();
                            history.push("/login");
                        } catch (error: any) {
                            alert(error.message);
                        }
                    }}>
                        Log Out
                    </Button>
                </Container>
            </Fragment>
        </div>
    );
}

export default MyPageTop;