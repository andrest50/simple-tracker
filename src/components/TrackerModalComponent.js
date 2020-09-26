import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const maxValue = (val) => val < 1000000;

const TrackerModal = (props) => {
    return (
        <Modal isOpen={props.isModalOpen} toggle={props.toggleModal}>
          <ModalHeader toggle={props.toggleModal}>Create Tracker</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => props.handleAddTracker(values)}>
              <Row className="form-group">
                <Label htmlFor="name" md={2}>
                  Name
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Tracker Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(2),
                      maxLength: maxLength(30)
                    }}
                  />
                  <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                        required: "Required. ",
                        minLength: "Must be greater than 2 characters. ",
                        maxLength: "Must be 30 characters or less. ",
                      }}
                    />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="value" md={2}>
                  Value
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".value"
                    id="value"
                    name="value"
                    placeholder="Starting Value"
                    className="form-control"
                    validators={{
                      required,
                      isNumber,
                      maxValue
                    }}
                  />
                  <Errors
                      className="text-danger"
                      model=".value"
                      show="touched"
                      messages={{
                        required: "Required. ",
                        isNumber: "Value must be a number. ",
                        maxValue: "Value must be less than 1000000. "
                      }}
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

export default TrackerModal;