import React, {Component} from "react";
import {Table} from "reactstrap";
import NewStationModal from "./Modals/NewStationModal";
import StationRemovalModal from "./Modals/StationRemovalModal";
import {Link} from "react-router-dom";


class StationList extends Component {

    render() {
        const stations = this.props.stations;


        return (

            <Table bordered hover responsive>
                <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Adres</th>
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
                            <td>{station.address}</td>
                            <td align="middle" width='300px'>
                                {
                                    localStorage.getItem("is_admin") ?
                                        <NewStationModal margin-right="10px"
                                                         create={false}
                                                         station={station}
                                                         resetState={this.props.resetState}
                                        />
                                        : null
                                }
                                {
                                    localStorage.getItem("is_admin") ?
                                        <StationRemovalModal
                                            name={station.name}
                                            resetState={this.props.resetState}
                                        />
                                        : null
                                }
                                <Link key={station.id}
                                      to={`/${station.id}`}
                                      className="btn btn-primary">
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