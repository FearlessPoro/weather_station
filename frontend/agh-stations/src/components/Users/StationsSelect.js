import React from "react";

import {Select} from 'antd';
import StationUserRemoveModal from "../Modals/StationUserRemoveModal";
import StationUserAddModal from "../Modals/StationUserAddModal";

const {Option} = Select;


class StationsSelect extends React.Component {

    state = {
        station: {}
    }


    handleChange = (value) => {
        this.setState({station: JSON.parse(value)});
    }

    resetState = () => {
        this.props.resetState()
    }

    render() {
        const stations = this.props.stations;
        return (
            <>
                <Select defaultValue="Wybierz stacje" style={{width: 300}} onChange={this.handleChange}>
                    {(!stations || stations.length <= 0) ? null : (
                        stations.map((station) => (
                            <Option key={station.id} value={JSON.stringify(station)}>{station.name}</Option>
                        ))
                    )
                    }
                </Select>
                <StationUserAddModal resetState={this.props.resetState} stationUsers={this.props.stationUsers} station={this.state.station} username={this.props.username} user={this.props.user}/>
                <StationUserRemoveModal resetState={this.props.resetState} stationUsers={this.props.stationUsers} station={this.state.station} username={this.props.username} />
            </>
        )
    }

}

export default StationsSelect;


