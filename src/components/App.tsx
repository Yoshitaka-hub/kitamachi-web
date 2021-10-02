import React from "react";
import Header from "./Header";
import MainTop from "./MainTop";
import MainMid from "./MainMid";

const App: React.FC = () => {
    return (
        <div>
            <Header />
            <MainTop />
            <MainMid />
        </div>
    );
}

export default App;