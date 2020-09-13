import React, {Component} from "react";
import Moment from "moment";
import {Table} from "react-bootstrap";
import MeasurementRemoveModal from "./Modals/MeasurementRemoveModal";

class MeasurementItem extends Component {

    state = {
        toggleDataDisplay: true
    }

    skipDefaultFields = (key, value) => {
        return key !== 'url'
            && key !== "time_of_measurement"
            && key !== 'station'
            && key !== 'id'
            && !key.match('^.*_unit$')
            && value != null;
    }

    //TODO: change names to polish via dictionary?
    getMeasurementTypes = measurement => {
        let result = ""
        for (let [key, value] of Object.entries(measurement)) {
            if (this.skipDefaultFields(key, value)) {
                result += key + ", ";
            }
        }
        return result;
    }

    toggleDataDisplay = () => {
        this.setState({toggleDataDisplay: !this.state.toggleDataDisplay})
    }

    // resetState = () => {
    //     this.getStations();
    // };


    displayData = (measurement) => {
        if (this.state.toggleDataDisplay) {
            return this.getMeasurementTypes(measurement);
        } else {
            return (
                <Table size="sm" responsive bordered="dark">
                    <tbody>
                    {!measurement || measurement.length <= 0 ? (
                        <tr>
                            <td colSpan="6" align="center">
                                <b>Ta lista jest pusta.</b>
                            </td>
                        </tr>
                    ) : (
                        Object.keys(measurement).filter((key) => {
                            return this.skipDefaultFields(key, measurement[key])
                        }).map((key) => (
                                <tr key={key}>
                                    <th>{key}</th>
                                    <td>{`${measurement[key]} ${measurement[key + '_unit']}`}</td>
                                </tr>
                            )
                        ))}

                    </tbody>
                </Table>
            )
        }
    }

    resetState = () => {
        this.props.resetState()
    }

    render() {
        return (
            <tr key={this.props.measurement.id} onClick={this.toggleDataDisplay}>
                <td width={'200px'}>
                    {Moment(this.props.measurement.time_of_measurement)
                        .format("YYYY-MM-DD hh:mm:ss")}
                </td>
                <td>{this.displayData(this.props.measurement)}</td>
                <td align="middle" width='300px'>
                    <MeasurementRemoveModal
                        measurement={this.props.measurement}
                        resetState={this.props.resetState}
                    />
                </td>
            </tr>
        )
    }
}

export default MeasurementItem