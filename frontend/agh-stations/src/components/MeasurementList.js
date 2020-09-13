import React, {Component} from "react";
import {Table} from "reactstrap";
import Moment from 'moment';
import MeasurementItem from "./MeasurementItem";


class MeasurementList extends Component {

    render() {
        const measurements = this.props.measurements;
        Moment.locale('pl');

        return (
            <Table bordered hover responsive>
                <thead>
                <tr>
                    <th>Czas pomiaru</th>
                    <th>Typy pomiarów</th>
                </tr>
                </thead>
                <tbody>
                {!measurements || measurements.length <= 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            <b>Stacja nie ma żadnych pomiarów</b>
                        </td>
                    </tr>
                ) : (
                    measurements.map(measurement => (
                        <MeasurementItem
                            measurement={measurement}
                            resetState={this.props.resetState}/>
                    ))
                )}
                </tbody>
            </Table>
        );
    }
}

export default MeasurementList;