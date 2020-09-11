import React from "react";
import {Layout, Menu} from 'antd';
import {Link, withRouter} from "react-router-dom";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";
import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined";

const {Header, Content, Footer} = Layout;

const BasicLayout = (props) => {

    return (
        <Layout className="layout" >
            <Header style={{marginBottom: '50px'}}>
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']}>
                    <Menu.Item key="/"><Link to='/'><HomeOutlined style={{marginLeft: "10px"}}/></Link></Menu.Item>
                    <Menu.Item key="/stations/"><Link to='/stations/'>Stacje</Link></Menu.Item>
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
                    {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
                </Menu>
            </Header >
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
