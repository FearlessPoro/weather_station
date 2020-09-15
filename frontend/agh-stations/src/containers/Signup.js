import React from 'react';
import {Button, Form, Input,} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";


class Signup extends React.Component {

    onFinish = (values) => {
        if (!this.props.error) {
            this.props.onAuth(values.username, values.email, values.password, values.confirm)
            alert("Konto założone pomyślnie.")
            window.location.reload();
            this.props.history.push('/login');
        }
    };

    render() {
        return (
            <div style={{marginTop: '50px'}}>
                <Form
                    name="register"
                    onFinish={this.onFinish}
                    initialValues={{
                        prefix: '86',
                    }}
                    style={{width: '350px'}}
                    scrollToFirstError
                >
                    <Form.Item name="username" rules={[
                        {
                            required: true,
                            message: 'Pole wymagane',
                        },
                    ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                               placeholder="Nazwa użytkownika"/>
                    </Form.Item>
                    <Form.Item
                        name="email"

                        rules={[
                            {
                                type: 'email',
                                message: 'Proszę podać poprawny adres email.',
                            },
                            {
                                required: true,
                                message: 'To pole jest wymagane.',
                            },
                        ]}
                    >
                        <Input placeholder="email"/>
                    </Form.Item>

                    <Form.Item
                        name="password"

                           rules={[
                            {
                                required: true,
                                message: 'To pole jest wymagane.',
                            },
                            ({getFieldValue}) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('Podane hasła nie są identyczne.');
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder="Hasło"/>
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}

                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'To pole jest wymagane.',
                            },
                            ({getFieldValue}) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('Podane hasła nie są identyczne.');
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Powtórz hasło"/>
                    </Form.Item>
                    {/*<Form.Item*/}
                    {/*    name="residence"*/}
                    {/*    label="Habitual Residence"*/}
                    {/*    rules={[*/}
                    {/*        {*/}
                    {/*            type: 'array',*/}
                    {/*            required: true,*/}
                    {/*            message: 'Please select your habitual residence!',*/}
                    {/*        },*/}
                    {/*    ]}*/}
                    {/*>*/}
                    {/*    <Cascader options={residences}/>*/}
                    {/*</Form.Item>*/}

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Stwórz konto
                        </Button>
                    </Form.Item>
                </Form>
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
        onAuth: (username, email, password, confirm) => dispatch(actions.authSignup(username, email, password, confirm))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
