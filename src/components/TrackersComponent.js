import React, { Component, useState } from "react";
import {
  Button,
  ButtonGroup,
} from "reactstrap";
import IncrementModal from "./IncrementModalComponent";
import TrackerModal from "./TrackerModalComponent";
import { Link } from "react-router-dom";

class RenderTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      isDeleteMode: false,
      incrementBtnColor: "primary",
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
    console.log(tracker);
    var curr_date = new Date();
    var date =
      curr_date.getFullYear() +
      "-" +
      (curr_date.getMonth() + 1) +
      "-" +
      curr_date.getDate();
    var time =
      curr_date.getHours() +
      ":" +
      curr_date.getMinutes() +
      ":" +
      curr_date.getSeconds();
    var dateTime = date + " " + time;
    var new_click = {
      value: tracker.value,
      date: dateTime,
    };
    tracker.clicks.push(new_click);
    this.props.incrementTracker(tracker, amount);
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
          key={increment.id}
          className={
            this.state.isDeleteMode
              ? "dashboard-tracker-delete-inc-btn tracker-delete-btn-color-default"
              : "dashboard-tracker-inc-btn tracker-btn-color-default"
          }
          onClick={() => this.handleIncrementOptions(increment)}
        >
          {increment.value}
        </Button>
      );
    });

    return (
      <div className="dashboard-tracker-group">
        <Link to={`/tracker/${this.props.tracker.id}`}>
          <h3 className="dashboard-tracker-name">{this.props.tracker.name}</h3>
        </Link>
        <h3>{this.props.tracker.value}</h3>
        <ButtonGroup role="group" className="dashboard-tracker-btns">
          <Button
            className={
              this.state.isDeleteMode
                ? "dashboard-tracker-delete-btn tracker-delete-btn-color-default"
                : "dashboard-tracker-add-btn tracker-btn-color-default"
            }
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
            id="dashboard-delete-mode-btn"
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
            updateNumIncrements={this.props.updateNumIncrements}
          />
        </div>
      );
    });

    return (
      <div className="container" id="dashboard-trackers-group">
        <Button id="dashboard-add-tracker-btn" onClick={this.toggleModal}>
          Add Tracker
        </Button>
        <TrackerModal
          tracker={this.props.tracker}
          isModalOpen={this.state.isModalOpen}
          toggleModal={this.toggleModal}
          handleAddTracker={this.handleAddTracker}
        />
        <div>
          <h2>Your Trackers: </h2>
          {trackers}
        </div>
      </div>
    );
  }
}

/* function TrackersComponent(props) {

  console.log("here");

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleAddTracker = (values) => {
    console.log("hey");
    setIsModalOpen(false);
    props.createTracker(values.name, values.value);
  }

    const trackers = props.trackers.trackers.map((tracker) => {
      return (
        <div key={tracker.id}>
          <RenderTracker
            tracker={tracker}
            increments={props.trackers.increments.filter(
              (increment) => increment.trackerId === tracker.id
            )}
            createIncrement={props.createIncrement}
            deleteIncrement={props.deleteIncrement}
            deleteTracker={props.deleteTracker}
            incrementTracker={props.incrementTracker}
            updateNumIncrements={props.updateNumIncrements}
          />
        </div>
      );
    });

    return (
      <div className="container dashboard-trackers-group">
        <Button id="dashboard-add-tracker-btn" onClick={() => setIsModalOpen(!isModalOpen)}>
          Add Tracker
        </Button>
        <TrackerModal
          isModalOpen={isModalOpen}
          toggleModal={() => setIsModalOpen}
          handleAddTracker={() => handleAddTracker}
        />
        <h2>Your Trackers: </h2>
        {trackers}
      </div>
    );
  } */

export default TrackersComponent;
