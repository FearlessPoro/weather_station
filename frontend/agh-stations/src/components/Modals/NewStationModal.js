import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewStationForm from "./NewStationForm";

class NewStationModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    let title = "Edytuj stacje";
    let button = <Button onClick={this.toggle}>Edytuj</Button>;
    if (create) {
      title = "Dodaj nową stację";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Dodaj stację
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewStationForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              station={this.props.station}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewStationModal;