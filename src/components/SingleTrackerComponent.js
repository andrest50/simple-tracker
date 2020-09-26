import React, { Component } from "react";
import { Button, ButtonGroup, Alert } from "reactstrap";
import { Redirect } from "react-router-dom";
import IncrementModal from "./IncrementModalComponent";

class SingleTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      isDeleteMode: false,
      isAlert: false,
      redirect: false,
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
    this.removeAlert = this.removeAlert(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  toggleDeleteMode() {
    var color, text;

    if (
      this.state.isDeleteMode === true
        ? (color = "primary")
        : (color = "danger")
    );

    if (
      this.state.incrementText === "Add Increment"
        ? (text = "Delete Tracker")
        : (text = "Add Increment")
    );

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
    this.props.postIncrementTracker(tracker, amount);
  }

  handleDeleteClick(tracker, click){
    var new_clicks = tracker.clicks.filter((curr_click) => curr_click.date != click.date);
    this.props.deleteClick(tracker, new_clicks);
  }

  handleAddIncrement(values) {
    this.toggleModal();
    this.props.createIncrement(this.props.tracker.id, values.value);
    this.props.updateNumIncrements(this.props.tracker, 1);
  }

  handleDeleteIncrement(id) {
    this.props.deleteIncrement(id);
    this.props.updateNumIncrements(this.props.tracker, -1);
  }

  handleDeleteTracker(id) {
    this.setState({
      redirect: true,
    });
    this.props.deleteTracker(id);
  }

  handleIncrementOptions(increment) {
    if (
      this.state.isDeleteMode === true
        ? this.handleDeleteIncrement(increment.id)
        : this.handleIncrement(this.props.tracker, increment.value)
    );
  }

  handleTrackerOptions(tracker) {
    if (this.state.isDeleteMode === true) {
      this.handleDeleteTracker(tracker.id);
    } else {
      console.log(tracker.numIncrements);
      if (tracker.numIncrements < 5) this.toggleModal();
      else {
        //alert("You can't have more than 5 increments per tracker!");
        this.setState({
          isAlert: true,
        });
      }
    }
  }

  removeAlert() {
    this.setState({
      isAlert: false,
    });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/home" />;
    }

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
          id={
            this.state.isDeleteMode
              ? "single-tracker-btn-delete-inc"
              : "single-tracker-btn-inc"
          }
          onClick={() => this.handleIncrementOptions(increment)}
        >
          {increment.value}
        </Button>
      );
    });

    console.log(this.props.tracker);

    return (
      <div className="tracker-group">
        {this.props.tracker ? (
          <div id="single-tracker-div">
            <h2 className="tracker-name" id="single-tracker-name">
              {this.props.tracker.name}
            </h2>
            <h1 id="single-tracker-value">{this.props.tracker.value}</h1>
            <div>
              {this.state.isAlert ? (
                <Alert color="danger">
                  You can't have more than 5 increments per tracker!
                  <span className="alert-close-btn" onClick={this.removeAlert}>
                    x
                  </span>
                </Alert>
              ) : null}
              <ButtonGroup role="group" className="increment-btns">
                <Button
                  id={
                    this.state.isDeleteMode
                      ? "single-tracker-btn-delete"
                      : "single-tracker-btn-add"
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
                  id="delete-mode-btn"
                  onClick={this.toggleDeleteMode}
                >
                  X
                </Button>
              </ButtonGroup>
              <div id="history">
                {this.props.tracker.clicks.reverse().map((click) => (
                  <div>
                    <span
                      className="history-click"
                      onClick={() =>
                        this.handleIncrement(
                          this.props.tracker,
                          click.value - this.props.tracker.value
                        )
                      }
                    >
                      {click.value} : {click.date}
                    </span>
                    <span className="delete-click" onClick={() => this.handleDeleteClick(this.props.tracker, click)}>x</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default SingleTracker;
