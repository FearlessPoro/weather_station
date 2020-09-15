import {Button, Modal, ModalFooter, ModalHeader} from "reactstrap";
import React from "react";
import axios from "axios";

class StationUserRemoveModal extends React.Component {

    state = {
        modal: false,
    }

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    deleteUserStation = () => {
        const config = {
            headers: {'Authorization': `Token ${localStorage.getItem("token")}`}
        };
        let stationUser = this.props.stationUsers.find((stationUser) =>
            stationUser.station === this.props.station.url
        )
        if (stationUser == null) {
            alert("Ten użytkownik nie jest adminem tej stacji")
            this.toggle()
        } else {
            axios.delete(stationUser.url, config).then(() => {
                this.toggle();
                window.location.reload(false);
            });
        }

    }

    render() {

        return (
            <>
                <Button style={{marginLeft: "20px"}} color="danger" onClick={() => this.toggle()}>
                    Usuń
                </Button>
                {
                    !(Object.keys(this.props.station).length === 0) ? (
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader toggle={this.toggle}>
                                    Czy na pewno chcesz odebrać użytkownikowi: "{this.props.username}" uprawnienia admina
                                    stacji: "{this.props.station.name}"?
                                </ModalHeader>
                                <ModalFooter>
                                    <Button type="button" onClick={() => this.toggle()}>
                                        Anuluj
                                    </Button>
                                    <Button
                                        type="button"
                                        color="danger"
                                        onClick={this.deleteUserStation}
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

export default StationUserRemoveModal;