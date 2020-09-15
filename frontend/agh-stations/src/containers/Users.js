import React, {Component} from "react";
import {Col, Container, Row} from "reactstrap";
import axios from "axios";
import {USERS_API} from "../constants";
import {Pagination} from "antd";
import UserList from "../components/Users/UserList";


class Users extends Component {
    state = {
        allUsers: [],
        offset: 0,
        currentUsers: [],
        pageSize: 5,
        pageCount: 1,
        page: 1,
        searchString: ""
    }

    constructor(props) {
        super(props);
        this.child = React.createRef();
    }

    handleSearch = async (e) => {
        this.setState({page: 1, offset: 0})
        const result = e.target.value.split(" ").join("+");
        await this.setState({searchString: result});
        this.getUsers();
    }

    handlePageClick = async (pageNo) => {
        const selectedPage = pageNo - 1;
        const offset = selectedPage * this.state.pageSize;
        await this.setState({page: selectedPage, offset: offset},
            () => {
                this.setElementsForCurrentPage();
            });
        this.child.current.resetStations();

    }

    componentDidMount() {
        this.resetState();
    }

    setElementsForCurrentPage = () => {
        let currentUsers = this.state.allUsers.slice(this.state.offset, this.state.offset + this.state.pageSize);
        this.setState({
            currentUsers: currentUsers
        });
    }

    getUsers = () => {
        axios.get(this.state.searchString
            ? `${USERS_API}?search=${this.state.searchString}`
            : `${USERS_API}`)
            .then(res => this.setState(
                {
                    allUsers: res.data,
                    pageCount: Math.ceil(res.data.length / this.state.pageSize)
                })).then(() => this.setElementsForCurrentPage())
            .then();
    };

    resetState = () => {
        this.getUsers();
    };

    render() {
        return (
            <Container style={{marginTop: "20px"}}>
                <h1>Lista wszystkich użytkowników:</h1>
                <Row>
                    <Col>
                        <UserList
                            users={this.state.currentUsers}
                            resetState={this.resetState}
                            handleSearch={this.handleSearch}
                            ref={this.child}
                        />
                    </Col>
                </Row>
                {

                    this.state.pageCount > 1 ?
                        <Row>
                            <Col>
                                <Pagination
                                    defaultCurrent={1}
                                    onChange={this.handlePageClick}
                                    size="small"
                                    total={this.state.allUsers.length}
                                    showTotal={(total, range) =>
                                        `${range[0]}-${range[1]} z ${total} użytkowników`}
                                    pageSize={this.state.pageSize}
                                />
                            </Col>
                        </Row>
                        : null
                }
            </Container>
        )

    }
}


export default Users;