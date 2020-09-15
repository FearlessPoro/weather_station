import React, {Component} from "react";
import Measurements from "../Measurements/Measurements";
import axios from "axios";
import {MEASUREMENTS_API, STATIONS_API} from "../../constants";

class StationView extends Component {

    state = {
        station: {},
        measurements: []

    }
    componentDidMount() {
        this.resetState();
    }

    getStation = () => {
        axios.get(`${STATIONS_API}${this.props.match.params.stationID}/`)
            .then(res => this.setState({station: res.data}))
            .then(() => axios.get(
                `${MEASUREMENTS_API}?station=${this.state.station.name.split(" ").join("+")}`
            ))
            .then(res => this.setState({measurements: res.data}));

    };

    resetState = () => {
        this.getStation();
    };

    render() {
        return (
            <div>
                <Measurements
                    station={this.state.station}
                    measurements={this.state.measurements}
                    resetState={this.resetState}/>
            </div>

        )
    }
}

export default StationView;