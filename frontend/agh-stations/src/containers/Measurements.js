import React, {Component} from "react";
import {Col, Container, Row} from "reactstrap";
import MeasurementList from "../components/MeasurementList";


class Measurements extends Component {

    render() {
        return (
            <Container style={{marginTop: "20px"}}>
                <Row>
                    <Col>
                        <h1>Stacja: {this.props.station.name}</h1>
                        <h2>Pomiary dla tej stacji:</h2>
                        <MeasurementList
                            measurements={this.props.measurements}
                            resetState={this.props.resetState}
                        />
                    </Col>
                </Row>

            </Container>
        )
    }
}


export default Measurements;