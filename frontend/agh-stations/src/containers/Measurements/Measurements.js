import React, {Component} from "react";
import {Col, Container, Row} from "reactstrap";
import MeasurementList from "../../components/Measurements/MeasurementList";


class Measurements extends Component {

    render() {
        return (
            <Container style={{marginTop: "20px"}}>
                <Row>
                    <Col>
                        <MeasurementList
                            measurements={this.props.measurements}
                            station={this.props.station}
                            isStationAdmin={this.props.isStationAdmin}
                        />
                    </Col>
                </Row>

            </Container>
        )
    }
}


export default Measurements;