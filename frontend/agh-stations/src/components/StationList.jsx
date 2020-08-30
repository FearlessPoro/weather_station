import React, { Component } from "react";
import { Table } from "reactstrap";
import NewStationModal from "./Modals/NewStationModal";

import RemovalModal from "./Modals/RemovalModal";

class StudentList extends Component {
  render() {
    const stations = this.props.stations;
    return (
      <Table dark>
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
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            stations.map(station => (
              <tr key={station.name}>
                <td>{station.name}</td>
                <td>{station.address}</td>
                <td align="center">
                  <NewStationModal
                    create={false}
                    station={station}
                    resetState={this.props.resetState}
                  />
                  <RemovalModal
                    name={station.name}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default StudentList;