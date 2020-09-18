import React from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

import axios from "axios";

import {STATIONS_API} from "../../constants";

class NewStationForm extends React.Component {
    state = {
        name: "",
        description: "",
        newName: "",
    };

    componentDidMount() {
        if (this.props.station) {
            this.setState({name: this.props.station.name, description: this.props.station.description});
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
        axios.get(STATIONS_API + "?name=" + this.state.name.split(" ").join("+"))
            .then((res) => {
                const station = res.data[0]
                console.log(`${station.name},  new: ${this.state.newName}, ${this.state.newName === station.name}`)
                const payload = {
                    name: this.state.newName === station.name ? this.state.newName: station.name,
                    description: this.state.description
                };
                return axios.put(res.data[0]['url'], payload, config);
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
                    <Label for="description">Opis stacji:</Label>
                    <Input
                        type="text"
                        name="description"
                        onChange={this.onChange}
                        value={this.state.description}
                    />
                </FormGroup>
                <Button type="submit">Send</Button>
            </Form>
        );
    }
}

export default NewStationForm;