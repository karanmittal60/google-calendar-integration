import React from 'react';
import './App.css';
import DemoApp from "./DemoApp";
import GetCalendarData from "./GetCalendarData";

function App() {
    return (
        <div className="App">
            <h1>Full calendar</h1>
            {/*<DemoApp/>*/}

            <div>
                <GetCalendarData/>
            </div>

        </div>
    );
}

export default App;
