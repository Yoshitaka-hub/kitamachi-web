import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./Header";
import MainTop from "./MainTop";
import MenuMid from "./MenuMid";
import MenuTop from "./MenuTop";
import LoginPageTop from "./LoginPageTop";
import MyPageTop from "./MyPageTop";
import ReservationCheckTop from "./ReservationCheckTop";

const App: React.FC = () => {
    return (
        <Router>
            <div>
                {/* <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/price">Price</Link>
                        </li>
                        <li>
                            <Link to="/mypage">My Page</Link>
                        </li>
                    </ul>
                </nav> */}
                <Switch>
                    <Route path="/menu">
                        <Header />
                        <MenuTop />
                        <MenuMid />
                    </Route>
                    <Route path="/login">
                        <Header />
                        <LoginPageTop />
                    </Route>
                    <Route path="/myPage">
                        <Header />
                        <ReservationCheckTop />
                        <MyPageTop />
                    </Route>
                    <Route path="/">
                        <Header />
                        <MainTop />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;