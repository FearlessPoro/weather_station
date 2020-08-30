import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import StationsList from "../components/StationList";
import NewStationsModal from "../components/Modals/NewStationModal";

import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {
  state = {
    stations: []
  };

  componentDidMount() {
    this.resetState();
  }

  getStations = () => {
    axios.get(API_URL).then(res => this.setState({ stations: res.data }));
  };

  resetState = () => {
    this.getStations();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <StationsList
              stations={this.state.stations}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewStationsModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;