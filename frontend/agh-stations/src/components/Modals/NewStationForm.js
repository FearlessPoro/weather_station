import React from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

import axios from "axios";

import {STATIONS_API} from "../../constants";

class NewStationForm extends React.Component {
    state = {
        name: "",
        address: "",
        newName: "",
        newAddress: ""
    };

    componentDidMount() {
        if (this.props.station) {
            const {name, address} = this.props.station;
            this.setState({name, address});
        }
    }

    onChange = (e) =>  {
        this.setState({[e.target.name]: e.target.value});
    };


    //TODO CHECK IF STATION EXISTS AND RETURN ERROR
    createStation = e => {
        e.preventDefault();
        const config = {
            headers: {'Authorization': `Token ${localStorage.getItem("token")}`}
        };
        axios.post(STATIONS_API, {name: this.state.newName, address: this.state.address}, config)
            .then(() => {
                this.props.resetState();
                this.props.toggle();
            });
    };

    editStation = e => {
        e.preventDefault();
        const config = {
            headers: {'Authorization': `Token ${localStorage.getItem("token")}`}
        };
        axios.get(STATIONS_API + "?search=" + this.state.name.split(" ").join("+"))
            .then(res => this.setState({url: res.data[0]['url']}))
            .then(() => {
                return axios.put(this.state.url, {name: this.state.newName, address: this.state.address}, config)
            }).then(() => {
            this.props.resetState();
            this.props.toggle()
        });
    };

    defaultIfEmpty = newName => {
        return newName === "" ? this.state.name : newName;
    };

    render() {
        return (
            <Form onSubmit={this.props.station ? this.editStation : this.createStation}>
                <FormGroup>
                    <Label for="newName">Nazwa:</Label>
                    <Input
                        type="text"
                        name="newName"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.newName)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="address">Adres:</Label>
                    <Input
                        type="text"
                        name="address"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.address)}
                    />
                </FormGroup>
                <Button type="submit">Send</Button>
            </Form>
        );
    }
}

export default NewStationForm;