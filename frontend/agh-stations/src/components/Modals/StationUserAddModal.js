import {Button, Modal, ModalFooter, ModalHeader} from "reactstrap";
import React from "react";
import axios from "axios";
import {STATION_USER_API} from "../../constants";

class StationUserAddModal extends React.Component {

    state = {
        modal: false,
    }

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    addUserStation = () => {
        const payload = {
            station: this.props.station.url,
            user: this.props.user.url,
            isAdmin: false
        };
        const config = {
            headers: {'Authorization': `Token ${localStorage.getItem("token")}`}
        };
        let stationUser = this.props.stationUsers.some((stationUser) => {
            if (stationUser.station === this.props.station.url) {
                return stationUser;
            }
        })
        if (stationUser) {
            alert("Ten użytkownik jest już adminem tej stacji");
            this.toggle();
        } else {
            axios.post(STATION_USER_API, payload, config).then(() => {
                this.toggle();
                window.location.reload(false);
            });
        }

    }

    resetState() {
        this.props.resetState();
    }

    render() {
        return (
            <>
                <Button style={{marginLeft: "20px"}} color="success" onClick={() => this.toggle()}>
                    Dodaj
                </Button>
                {
                    !(Object.keys(this.props.station).length === 0) ? (
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader toggle={this.toggle}>
                                    Czy na pewno chcesz dodać użytkownikowi: "{this.props.username}" uprawnienia admina
                                    stacji: "{this.props.station.name}"?
                                </ModalHeader>
                                <ModalFooter>
                                    <Button type="button" onClick={() => this.toggle()}>
                                        Anuluj
                                    </Button>
                                    <Button
                                        type="button"
                                        color="success"
                                        onClick={this.addUserStation}
                                    >
                                        Tak
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        )
                        :
                        (
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader toggle={this.toggle}>
                                    Akcja dostępna dopiero po wybraniu stacji!
                                </ModalHeader>
                                <ModalFooter>
                                    <Button type="button" onClick={() => this.toggle()}>
                                        Ok
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        )
                }

            </>
        )
    }

}

export default StationUserAddModal;