import React from "react";
import axios from "axios";
import {STATION_USER_API, STATIONS_API} from "../../constants";
import StationLinks from "./StationLinks";
import StationsSelect from "./StationsSelect";

class User extends React.Component {

    state = {
        stationUsers: [],
        message: "",

    }

    getUserStations() {
        axios.get(`${STATION_USER_API}?user=${this.props.user.id}`)
            .then((res) => {
                    this.setState({
                        stationUsers: res.data
                    })
                }
            )
    }


    componentDidMount() {
        this.getUserStations()
    }

    resetState = () => {
        this.getUserStations()
    }


    render() {
        return (
            <tr key={this.props.user.id} onClick={this.toggleDataDisplay}>
                <td>{this.props.user.username}</td>
                <td>{
                    this.state.stationUsers.map((stationUser) => (
                        <StationLinks
                            stationUser={stationUser}
                            resetState={this.resetState}
                            key={stationUser.id}
                        />)
                    )
                }</td>
                {
                    localStorage.getItem("is_admin") ==='true' ?
                        <td style={{width: '500px'}}>
                            <StationsSelect
                                resetState={this.props.resetState}
                                stations={this.props.stations}
                                stationUsers={this.state.stationUsers}
                                username={this.props.user.username}
                                user={this.props.user}
                            />
                        </td>
                        : null
                }
            </tr>
        )
    }
}

export default User;