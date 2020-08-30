import React from 'react';

import Header from './components/Header.jsx';
import Home from "./pages/Home";
import NavBar from "./components/NavBar/NavBar";

class App extends React.Component {
    render() {
        return (
            <div>
                <React.Fragment>
                    <NavBar/>
                </React.Fragment>
                <Home />
            </div>
        );
    }
}

export default App;
