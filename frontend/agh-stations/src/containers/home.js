import React from "react";

import {Button, Form, Input, Spin} from 'antd';
import {LoadingOutlined, LockOutlined, UserOutlined} from '@ant-design/icons';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from '../store/actions/auth';


class Home extends React.Component {

    render() {
        return (
            <div >
                <h1>Stacje tu som</h1>
            </div>
        );
    }
}

export default Home;
