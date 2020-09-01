import React from 'react';
import 'antd/dist/antd.css';
import BasicLayout from "./containers/basicLayout";
import Stations from "./containers/Stations";

class App extends React.Component {
    render() {
        return (
            <div>
                <BasicLayout>
                    <Stations/>
                </BasicLayout>
            </div>
        );
    }
}

export default App;
