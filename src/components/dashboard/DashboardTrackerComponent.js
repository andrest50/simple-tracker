import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
} from "reactstrap";
import IncrementModal from "../modals/IncrementModalComponent";
import {handleIncrement} from '../Utils'
import { Link } from "react-router-dom";

class DashboardTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      isDeleteMode: false,
      incrementText: "Add Increment",
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleDeleteMode = this.toggleDeleteMode.bind(this);
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
    var text;

    if(this.state.incrementText === 'Add Increment' ? text = 'Delete Tracker' : text = 'Add Increment');

    this.setState((prevState) => ({
      isDeleteMode: !prevState.isDeleteMode,
      incrementText: text,
    }));
  }

  handleAddIncrement(values) {
    this.toggleModal();
    var id;
    if(this.props.tracker.numIncrements > 0)
      id = parseInt(this.props.tracker.increments[this.props.tracker.increments.length-1].id) + 1;
    else
      id = 0;
    var new_increment = {
      value: parseInt(values.value),
      id: id
    }
    this.props.tracker.increments.push(new_increment);
    this.props.tracker.numIncrements += 1;
    this.props.updateTracker(this.props.tracker);
  }

  handleDeleteIncrement(id) {
    this.props.tracker.increments = this.props.tracker.increments.filter((increment) => increment.id !== id);
    this.props.tracker.numIncrements -= 1;
    this.props.updateTracker(this.props.tracker);
  }

  handleDeleteTracker(id) {
    this.props.deleteTracker(id);
  }

  handleIncrementOptions(increment) {
    if (this.state.isDeleteMode === true) {
      this.handleDeleteIncrement(increment.id);
    } else {
      if(this.props.tracker.value + increment.value < 1000000){
        handleIncrement(
          this.props.tracker,
          parseInt(increment.value),
          this.props.updateTracker
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

    this.props.tracker.increments.sort(compare);

    const increments = this.props.tracker.increments.map((increment) => {
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
        <h3 className="dashboard-tracker-value">{this.props.tracker.value}</h3>
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

export default DashboardTracker;
