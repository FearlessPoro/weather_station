import React, {Component} from "react";
import {Table} from "reactstrap";
import NewStationModal from "../Modals/NewStationModal";
import StationRemovalModal from "../Modals/StationRemovalModal";
import {Link} from "react-router-dom";
import {Input} from 'antd';

const {Search} = Input;

class StationList extends Component {

    state = {
        value: ""
    }


    handleSearch = (e) => {
        this.props.handleSearch(e);
    }

    render() {
        const stations = this.props.stations;


        return (

            <Table bordered hover responsive>
                <thead>
                <tr>
                    <th style={{width: '20%'}}>Nazwa</th>
                    <th style={{width: '40%'}}>Opis stacji</th>
                    <th style={{width: '20%'}}><Search placeholder="Wyszukaj stację"
                                onChange={(e) => this.handleSearch(e)}
                    /></th>
                </tr>
                </thead>
                <tbody>
                {!stations || stations.length <= 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            <b>Ta lista jest pusta lub wystąpił błąd w pobieraniu danych.</b>
                        </td>
                    </tr>
                ) : (
                    stations.map(station => (

                        <tr key={station.id}>
                            <td>{station.name}</td>
                            <td>{station.description}</td>
                            <td align="middle">
                                {
                                    localStorage.getItem("is_admin") ==='true' ?
                                        <NewStationModal margin-right="10px"
                                                         create={false}
                                                         station={station}
                                                         resetState={this.props.resetState}
                                        />
                                        : null
                                }
                                {
                                    localStorage.getItem("is_admin") ==='true' ?
                                        <StationRemovalModal
                                            url={station.url}
                                            resetState={this.props.resetState}
                                        />
                                        : null
                                }
                                <Link key={station.id}
                                      to={`/stations/${station.id}`}
                                      className="btn btn-info">
                                    Otwórz
                                </Link>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </Table>
        );
    }
}

export default StationList;