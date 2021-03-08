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

const TrackerRenameModal = (props) => {

    return (
        <Modal isOpen={props.isModalOpen} toggle={props.toggleModal}>
          <ModalHeader toggle={props.toggleModal}>Set Tracker Name</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => props.setTrackerName(values)}>
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
                        required
                    }}                   
                  />
                  <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                        required: "Required. ",
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

export default TrackerRenameModal;
