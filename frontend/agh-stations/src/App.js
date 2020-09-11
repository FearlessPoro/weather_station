import React from 'react';
import 'antd/dist/antd.css';
import BasicLayout from "./containers/basicLayout";
import BaseRouter from "./routes";
import {BrowserRouter as Router} from "react-router-dom";

import * as actions from './store/actions/auth'
import {connect} from "react-redux";

class App extends React.Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <div>
                <Router>
                    <BasicLayout {...this.props}>
                        <BaseRouter {...this.props} isAuthenticated={this.props.isAuthenticated}/>
                    </BasicLayout>
                </Router>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
