import React, {Component} from "react";
import {Col, Container, Row} from "reactstrap";
import NewStationsModal from "../components/Modals/NewStationModal";
import axios from "axios";
import {STATIONS_API} from "../constants";
import StationList from "../components/StationList";


class Stations extends Component {
    state = {
        stations: []
    }

    componentDidMount() {
        this.resetState();
    }

    getStations = () => {
        axios.get(STATIONS_API).then(res => this.setState({stations: res.data}));
    };

    resetState = () => {
        this.getStations();
    };

    render() {
        return (
            <Container style={{marginTop: "20px"}}>
                <h1>Lista wszystkich stacji:</h1>
                {localStorage.getItem("is_admin") ?
                    <Row>
                        <Col>
                            <NewStationsModal create={true} resetState={this.resetState}/>
                        </Col>
                    </Row>
                    : null
                }
                <Row>
                    <Col>
                        <StationList
                            {...this.props}
                            stations={this.state.stations}
                            resetState={this.resetState}
                        />
                    </Col>
                </Row>

            </Container>
        )
    }
}


export default Stations;