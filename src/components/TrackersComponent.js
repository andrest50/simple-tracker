import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
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
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleAddIncrement = this.handleAddIncrement.bind(this);
    this.toggleDeleteMode = this.toggleDeleteMode.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleIncrement(trackerId, name, value, amount) {
    console.log(name + " : " + trackerId + " : " + value + " : " + amount);
    this.props.postIncrementTracker(trackerId, name, value, amount);
  }

  handleAddIncrement(values) {
    this.toggleModal();
    console.log(this.props.tracker.id + " : " + values.value);
    this.props.createIncrement(this.props.tracker.id, values.value);
  }

  handleDeleteIncrement(id) {
    this.props.deleteIncrement(id);
  }

  handleDeleteTracker(id) {
    this.props.deleteTracker(id);
  }

  toggleDeleteMode() {
    var color, text;
    if (this.state.isDeleteMode === true) color = "primary";
    else color = "danger";

    if (this.state.incrementText === "Add Increment") text = "Delete Tracker";
    else text = "Add Increment";

    this.setState((prevState) => ({
      isDeleteMode: !prevState.isDeleteMode,
      incrementBtnColor: color,
      incrementText: text,
    }));
  }

  handleIncrementOptions(increment) {
    if (this.state.isDeleteMode === true) {
      this.handleDeleteIncrement(increment.id);
    } else {
      this.handleIncrement(
        this.props.tracker.id,
        this.props.tracker.name,
        this.props.tracker.value,
        increment.value
      );
    }
  }

  handleTrackerOptions(tracker) {
    if (this.state.isDeleteMode === true) {
      this.handleDeleteTracker(tracker.id);
    } else {
      this.toggleModal();
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
          <h3 className="text-info">{this.props.tracker.name}</h3>
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
          />
        </div>
      );
    });

    return (
      <div className="container trackers-group">
        <Button className="btn-add-tracker" onClick={this.toggleModal}>
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
