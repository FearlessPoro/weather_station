import React, {Component} from "react";
import {Table} from "reactstrap";
import {Input} from 'antd';
import User from './User'
import axios from "axios";
import {STATIONS_API} from "../../constants";

const {Search} = Input;

class UserList extends Component {

    state = {
        value: "",
        references: {},
        stations: []
    }

    references = {}

    getAllStations() {
        axios.get(`${STATIONS_API}`)
            .then((res) => {
                    this.setState({
                        stations: res.data
                    })
                }
            )
    }
    componentDidMount() {
        this.getAllStations();
    }

    getOrCreateRef(id) {
        if (!this.references.hasOwnProperty(id)) {
            this.references[id] = React.createRef();
        }
        return this.references[id];
    }

    handleSearch = (e) => {
        this.props.handleSearch(e);
    }

    resetState = () => {
        this.props.resetState()
    }

    resetStations() {
        if (!this.props.users || this.props.users.length <= 0) {
            this.child.current.getUserStations();
        }

    }

    render() {
        const users = this.props.users;


        return (
            <Table bordered hover responsive>
                <thead>
                <tr>
                    <th>Nazwa użytkownika</th>
                    <th>Stacje użytkownika</th>
                    <th><Search placeholder="Wyszukaj użytkownika"
                                onChange={(e) => this.handleSearch(e)}
                    /></th>
                </tr>
                </thead>
                <tbody>
                {!users || users.length <= 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            <b>Ta lista jest pusta lub wystąpił błąd w pobieraniu danych.</b>
                        </td>
                    </tr>
                ) : (
                    users.map(user => (
                        <User stations={this.state.stations} user={user} ref={this.getOrCreateRef(user.id)} key={user.id}/>
                    ))
                )}
                </tbody>
            </Table>
        );
    }
}

export default UserList;