import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
} from "reactstrap";
import IncrementModal from "./IncrementModalComponent";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

class RenderTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      isDeleteMode: false,
      incrementBtnColor: "primary",
      value: this.props.tracker.value,
      incrementText: "Add Increment",
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleDeleteMode = this.toggleDeleteMode.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleAddIncrement = this.handleAddIncrement.bind(this);
    this.handleDeleteIncrement = this.handleDeleteIncrement.bind(this);
    this.handleDeleteTracker = this.handleDeleteTracker.bind(this);
    this.handleIncrementOptions = this.handleIncrementOptions.bind(this);
    this.handleTrackerOptions = this.handleTrackerOptions.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  toggleDeleteMode() {
    var color, text;

    if(this.state.isDeleteMode === true ? color = 'primary' : color = 'danger');

    if(this.state.incrementText === 'Add Increment' ? text = 'Delete Tracker' : text = 'Add Increment');

    this.setState((prevState) => ({
      isDeleteMode: !prevState.isDeleteMode,
      incrementBtnColor: color,
      incrementText: text,
    }));
  }

  handleIncrement(tracker, amount) {
    this.props.postIncrementTracker(tracker, amount);
  }

  handleAddIncrement(values) {
    this.toggleModal();
    console.log(this.props.tracker.id + " : " + values.value);
    this.props.createIncrement(this.props.tracker.id, values.value);
    this.props.updateNumIncrements(this.props.tracker, 1);
  }

  handleDeleteIncrement(id) {
    this.props.deleteIncrement(id);
    this.props.updateNumIncrements(this.props.tracker, -1);
  }

  handleDeleteTracker(id) {
    this.props.deleteTracker(id);
  }

  handleIncrementOptions(increment) {
    if (this.state.isDeleteMode === true) {
      this.handleDeleteIncrement(increment.id);
    } else {
      if(this.props.tracker.value + increment.value < 1000000){
        this.handleIncrement(
          this.props.tracker,
          increment.value
        );
      }
      else {
        alert("Value cannot exceed 999999");
      }
    }
  }

  handleTrackerOptions(tracker) {
    if (this.state.isDeleteMode === true) {
      this.handleDeleteTracker(tracker.id);
    } else {
      console.log(tracker.numIncrements)
      if(tracker.numIncrements < 5)
        this.toggleModal();
      else
        alert("You can't have more than 5 increments per tracker!");
    }
  }

  render() {

    const compare = (a, b) => {
      if (a.value < b.value) {
        return -1;
      }
      if (a.value > b.value) {
        return 1;
      }
      return 0;
    };

    this.props.increments.sort(compare);

    const increments = this.props.increments.map((increment) => {
      return (
        <Button
          color={this.state.incrementBtnColor}
          key={increment.id}
          onClick={() => this.handleIncrementOptions(increment)}
        >
          {increment.value}
        </Button>
      );
    });

    return (
      <div className="tracker-group">
        <Link to={`/tracker/${this.props.tracker.id}`}>
          <h3 className="tracker-name">{this.props.tracker.name}</h3>
        </Link>
        <h3>{this.props.tracker.value}</h3>
        <ButtonGroup role="group">
          <Button
            color={this.state.incrementBtnColor}
            onClick={() => this.handleTrackerOptions(this.props.tracker)}
          >
            {this.state.incrementText}
          </Button>
          <IncrementModal
            tracker={this.props.tracker}
            isModalOpen={this.state.isModalOpen}
            toggleModal={this.toggleModal}
            handleAddIncrement={this.handleAddIncrement}
          />
          {increments}
          <Button
            color="danger"
            id="delete-mode-btn"
            onClick={this.toggleDeleteMode}
          >
            X
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

//Form validation checks
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const maxValue = (val) => val < 1000000;

class TrackersComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddTracker = this.handleAddTracker.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleAddTracker(values) {
    this.toggleModal();
    this.props.createTracker(values.name, values.value);
  }

  render() {
    const trackers = this.props.trackers.trackers.map((tracker) => {
      return (
        <div key={tracker.id}>
          <RenderTracker
            tracker={tracker}
            increments={this.props.trackers.increments.filter(
              (increment) => increment.trackerId === tracker.id
            )}
            createIncrement={this.props.createIncrement}
            deleteIncrement={this.props.deleteIncrement}
            deleteTracker={this.props.deleteTracker}
            incrementTracker={this.props.incrementTracker}
            postIncrementTracker={this.props.postIncrementTracker}
            updateNumIncrements={this.props.updateNumIncrements}
          />
        </div>
      );
    });

    return (
      <div className="container trackers-group">
        <Button id="btn-add-tracker" onClick={this.toggleModal}>
          Add Tracker
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Create Tracker</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleAddTracker(values)}>
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
        <h2>Your Trackers: </h2>
        {trackers}
      </div>
    );
  }
}

export default TrackersComponent;
