import React, {Component, Fragment} from "react";
import {Button, Modal, ModalFooter, ModalHeader} from "reactstrap";

import axios from "axios";
import {MEASUREMENTS_API} from "../../constants";

class MeasurementRemoveModal extends Component {
    state = {
        modal: false,
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    deleteMeasurement = () => {
        const config = {
            headers: {'Authorization': `Token ${localStorage.getItem("token")}`}
        };
        axios.delete(`${MEASUREMENTS_API}${this.props.measurement.id}/`, config)
            .then(() => {
            this.toggle();
            // this.props.resetState();
            window.location.reload();
            });
    };

    render() {
        return (
            <Fragment>
                <Button color="danger" onClick={() => this.toggle()}>
                    Usuń
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Czy na pewno chcesz usunąć ten pomiar?
                    </ModalHeader>

                    <ModalFooter>
                        <Button type="button" onClick={() => this.toggle()}>
                            Anuluj
                        </Button>
                        <Button
                            type="button"
                            color="primary"
                            onClick={this.deleteMeasurement}
                        >
                            Tak
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}

export default MeasurementRemoveModal;