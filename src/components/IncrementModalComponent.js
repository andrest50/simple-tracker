import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const IncrementModal = (props) => {
    return (
        <Modal isOpen={props.isModalOpen} toggle={props.toggleModal}>
          <ModalHeader toggle={props.toggleModal}>Create Increment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => props.handleAddIncrement(values)}>
              <Row className="form-group">
                <Label htmlFor="value" md={2}>
                  Value
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".value"
                    id="value"
                    name="value"
                    placeholder="Increment Value"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      );
}

export default IncrementModal;
