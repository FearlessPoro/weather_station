import React from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

import axios from "axios";

import {API_URL, STATIONS_API} from "../constants";

class NewStationForm extends React.Component {
    state = {
        name: "",
        address: "",
    };

    componentDidMount() {
        if (this.props.station) {
            const {name, address} = this.props.station;
            this.setState({name, address});
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    createStation = e => {
        e.preventDefault();
        axios.post(API_URL + STATIONS_API, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    editStation = e => {
        e.preventDefault();
        axios.get(API_URL + STATIONS_API + "?search=" + this.state.name.split(" ").join("+"))
            .then(res => this.setState({url: res.data[0]['url']}))
            .then(() => {
                return axios.put(this.state.url, this.state)
            }).then(() => {
                this.props.resetState();
                this.props.toggle()
            });
    };

    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

    render() {
        return (
            <Form onSubmit={this.props.station ? this.editStation : this.createStation}>
                <FormGroup>
                    <Label for="name">Nazwa:</Label>
                    <Input
                        type="text"
                        name="name"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.name)}
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
                <Button>Send</Button>
            </Form>
        );
    }
}

export default NewStationForm;