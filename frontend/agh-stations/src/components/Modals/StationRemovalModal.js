import React, {Component, Fragment} from "react";
import {Button, Modal, ModalFooter, ModalHeader} from "reactstrap";

import axios from "axios";

class ConfirmRemovalModal extends Component {
    state = {
        modal: false,
        url: ""
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    deleteServer = () => {
        const config = {
            headers: {'Authorization': `Token ${localStorage.getItem("token")}`}
        };
        axios.delete(this.props.url, config).then(() => {
            this.props.resetState();
            this.toggle()
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
                        Czy na pewno chcesz usunąć tą stację?
                    </ModalHeader>

                    <ModalFooter>
                        <Button type="button" onClick={() => this.toggle()}>
                            Anuluj
                        </Button>
                        <Button
                            type="button"
                            color="primary"
                            onClick={() => this.deleteServer(this.props.name)}
                        >
                            Tak
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}

export default ConfirmRemovalModal;