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

//Form validation checks
const required = (val) => val && val.length;
const maxValue = (val) => val < 1000;
const isNumber = (val) => !isNaN(Number(val));

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
                        maxValue: "Value must be less than 1000. "
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

export default IncrementModal;
