import React, {Component} from "react";
import {Table} from "react-bootstrap";
import axios from 'axios';
import {MEASUREMENTS_DATA_API} from "../../constants";
import Moment from "moment";
import MeasurementRemoveModal from "../Modals/MeasurementRemoveModal";

class MeasurementItem extends Component {

    state = {
        toggleDataDisplay: true,
        measurementData: [],
        measurementLocation: [],
        measurements: "",
    }


    componentDidMount() {
        this.resetState();
    }

    getMeasurementData = () => {
        axios.get(`${MEASUREMENTS_DATA_API}?measurement=${this.props.measurement.id}`)
            .then((res) => this.setState({
                measurementData: res.data
            })).then((res) => {
            let result = ""
            this.state.measurementData.map((data) => {
                result = `${data.name}, ${result}`;
            })
            if (this.checkValidLatLon(this.props.measurement)) {
                result = `Dane lokalizacji, ${result}`
            }
            this.setState({
                measurements: result
            })
        })
    }


    toggleDataDisplay = () => {
        this.setState({toggleDataDisplay: !this.state.toggleDataDisplay})
    }

    resetState = () => {
        this.getMeasurementData();

    };

    checkValidLatLon = (measurement) => {
        console.log(measurement.longitude !== 0, measurement.latitude !== 0)
        return measurement.longitude !== 0 || measurement.latitude !== 0
    }

    displayData = () => {
        const measurementData = this.state.measurementData
        if (this.state.toggleDataDisplay) {
            return this.state.measurements;
        } else {
            return (
                <Table size="sm" responsive bordered="dark">
                    <tbody>
                    {!measurementData || measurementData.length <= 0 ? (
                        <tr>
                            <td colSpan="6" align="center">
                                <b>Brak pomiarów.</b>
                            </td>
                        </tr>
                    ) : (
                        measurementData.map((measurement) => (
                                <tr key={measurement.id}>
                                    <th>{measurement.name}</th>
                                    <td>{`${measurement.value} ${measurement.unit}`}</td>
                                </tr>
                            )
                        )
                    )}
                    {this.checkValidLatLon(this.props.measurement) ?
                        (
                            <tr key={this.props.measurement.id}>
                                <th>GPS</th>
                                <td>{`Szerokość: ${this.props.measurement.latitude}, Długość: ${this.props.measurement.longitude}`}</td>
                            </tr>

                        )
                        : null
                    }

                    </tbody>
                </Table>
            )
        }
    }


// {
//     this.checkValidLatLon(measurement) ? (
//         <th>{measurement.name}</th>
//         <td>{`${measurement.value} ${measurement.unit}`}</td>
//     )
//
// }

    render() {
        return (
            <tr key={this.props.measurement.id}>
                <td width={'200px'} onClick={this.toggleDataDisplay}>
                    {Moment(this.props.measurement.time_of_measurement)
                        .format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <td onClick={this.toggleDataDisplay}>{this.displayData(this.state.measurementData)}</td>
                {this.props.isStationAdmin ?
                    <td align="middle" width='300px'>
                        <MeasurementRemoveModal
                            measurement={this.props.measurement}
                        />
                    </td>
                    : null
                }
            </tr>
        )
    }
}

export default MeasurementItem;