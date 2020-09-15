import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

class StationLinks extends Component {

    state = {
        station: {}
    }

    componentDidMount() {
        this.getAllStations()
    }

    getAllStations() {
        axios.get(this.props.stationUser.station)
            .then((res) => {
                this.setState({
                    station: res.data
                })
            })

    }

    render() {
        const station = this.state.station;
        return ((!station  || station.length <= 0 ) ? null : (
            <Link to={`/stations/${station.id}`}>{`${station.name}, `}</Link>
        ))
    }
}

export default StationLinks;