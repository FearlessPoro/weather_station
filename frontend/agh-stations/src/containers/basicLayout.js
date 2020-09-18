import React from "react";
import {Layout, Menu} from 'antd';
import {Link, withRouter} from "react-router-dom";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";
import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined";
import Moment from "moment";

const {Header, Content, Footer} = Layout;

const refreshSession = () => {
    localStorage.setItem("expirationDate", new Date(new Date().getTime() + 3600000));
    window.location.reload();
}

const BasicLayout = (props) => {

    return (
        <Layout className="layout">
            <Header style={{marginBottom: '50px'}}>
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']}>
                    <Menu.Item key="/"><Link to='/'><HomeOutlined style={{marginLeft: "10px"}}/></Link></Menu.Item>
                    <Menu.Item key="/stations/"><Link to='/stations/'>Stacje</Link></Menu.Item>
                    <Menu.Item key="/users/"><Link to='/users/'>Użytkownicy</Link></Menu.Item>
                    {
                        props.isAuthenticated ?
                            <Menu.Item key="logout" onClick={props.logout} style={{float: 'right'}}>
                                Wyloguj się
                            </Menu.Item>
                            :
                            <Menu.Item key="/login" style={{float: 'right'}}>
                                <Link to='/login/'>
                                    Logowanie
                                </Link>
                            </Menu.Item>
                    }
                </Menu>
                {
                    props.isAuthenticated ?
                        <p style={{float: 'right'}}>
                            Zalogowano jako: {localStorage.getItem("username")}.
                            Twoja sesja jest ważna do {Moment(localStorage.getItem("expirationDate"))
                            .format("hh:mm:ss")} <a style={{color: "blue"}} onClick={refreshSession}>Odśwież sesję</a>
                        </p>
                        :
                        null
                }
            </Header>
            <Content style={{padding: '0 50px'}}>
                <div className="site-layout-content">
                    {props.children}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Stacje pomiarowe AGH ©2020</Footer>
        </Layout>
    );
}


const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(BasicLayout))
