import React, {Component} from 'react'
import {
    Button,
    ButtonGroup,
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Col,
    Label,
} from 'reactstrap'
import { Control, LocalForm, Errors } from "react-redux-form";


class SingleTracker extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isModalOpen: false,
        value: this.props.tracker.value
      };
  
      this.toggleModal = this.toggleModal.bind(this);
      this.handleIncrement = this.handleIncrement.bind(this);
      this.handleAddIncrement = this.handleAddIncrement.bind(this);
    }
  
    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
      });
    }
  
    handleIncrement(trackerId, name, value, amount) {
        console.log(name + " : " + trackerId + " : " + value + " : " + amount);
        //this.props.incrementTracker(trackerId, amount);
        this.props.postIncrementTracker(trackerId, name, value, amount);
    }
  
    handleAddIncrement(values) {
      this.toggleModal();
      console.log(this.props.tracker.id + " : " + values.value);
      this.props.createIncrement(this.props.tracker.id, values.value);
    }
  
    render() {
    console.log(this.props);
      const increments = this.props.increments.map((increment) => {
        return (
          <Button color="primary" key={increment.id} onClick={() => this.handleIncrement(
            this.props.tracker.id, this.props.tracker.name, this.props.tracker.value, increment.value)}>
              {increment.value}
          </Button>
        );
      });
      return (
        <div className="tracker-group">
         <h2 className="text-info">{this.props.tracker.name}</h2>
          <h1>{this.props.tracker.value}</h1>
          <ButtonGroup role="group">
            <Button color="primary" onClick={this.toggleModal}>
              Add Increment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>
                Create Increment
              </ModalHeader>
              <ModalBody>
                <LocalForm
                  onSubmit={(values) => this.handleAddIncrement(values)}
                >
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
            {increments}
          </ButtonGroup>
        </div>
      );
    }
  }

export default SingleTracker;