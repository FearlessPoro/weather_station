import React from "react";

import {Button, Form, Input, Spin} from 'antd';
import {LoadingOutlined, LockOutlined, UserOutlined} from '@ant-design/icons';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from '../store/actions/auth';
import axios from "axios";

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

class NormalLoginForm extends React.Component {


    onFinish = (values) => {

        if (!this.props.error) {
            this.props.onAuth(values.username, values.password);
            this.props.history.push('/');
        } else this.props.history.push('/login');

    };


    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p style={{color: 'red'}}>{this.props.error.message}</p>
            )
        }
        return (
            <div style={{marginTop: '50px'}}>
                {errorMessage}
                {
                    this.props.loading ?
                        <Spin indicator={antIcon}/>
                        :
                        <Form
                            style={{width: '350px'}}
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={(values) => this.onFinish(values)}
                        >
                            <Form.Item name="username" rules={[
                                {
                                    required: true,
                                    message: 'Pole wymagane',
                                },
                            ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Nazwa użytkownika"/>
                            </Form.Item>
                            <Form.Item name="password" rules={[
                                {
                                    required: true,
                                    message: 'Pole wymagane',
                                },
                            ]}
                            >
                                <Input prefix={<LockOutlined className="site-form-item-icon"/>}
                                       type="password"
                                       placeholder="Hasło"
                                />
                            </Form.Item>

                            {/*  <a className="login-form-forgot" href="">*/}
                            {/*    Forgot password*/}
                            {/*  </a>*/}
                            {/*</Form.Item>*/}

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Zaloguj się
                                </Button>
                                <br/>Nie masz konta?
                                <NavLink style={{marginLeft: '10px'}} to='/signup'>
                                    Zarejestruj się
                                </NavLink>
                            </Form.Item>
                        </Form>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm)
