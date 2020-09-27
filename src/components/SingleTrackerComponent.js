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
      isHistoryDropdown: false,
      isAlert: false,
      redirect: false,
      incrementText: "Add Increment",
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleDeleteMode = this.toggleDeleteMode.bind(this);
    this.toggleHistoryDropdown = this.toggleHistoryDropdown.bind(this);
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
    var text;

    if (
      this.state.incrementText === "Add Increment"
        ? (text = "Delete Tracker")
        : (text = "Add Increment")
    );

    this.setState((prevState) => ({
      isDeleteMode: !prevState.isDeleteMode,
      incrementText: text,
    }));
  }

  toggleHistoryDropdown() {
    this.setState((prevState) => ({
        isHistoryDropdown: !prevState.isHistoryDropdown,
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

  handleDeleteClick(tracker, click) {
    var new_clicks = tracker.clicks.filter(
      (curr_click) => curr_click.date !== click.date
    );
    this.props.deleteClick(tracker, new_clicks);
  }

  handleDeleteAllClicks(tracker) {
    var new_clicks = []
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

  componentDidMount() {
    //window.scrollTo(0, 0);
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
          className={
            this.state.isDeleteMode
              ? "single-tracker-inc-btn-standard tracker-delete-btn-color-default"
              : "single-tracker-inc-btn-standard tracker-btn-color-default"
          }
          onClick={() => this.handleIncrementOptions(increment)}
        >
          {increment.value}
        </Button>
      );
    });

    console.log(this.props.tracker);

    return (
      <div className="dashboard-tracker-group">
        {this.props.tracker ? (
          <div className="single-tracker-div">
            <h2 className="tracker-name single-tracker-name">
              {this.props.tracker.name}
            </h2>
            <h1 className="single-tracker-value">{this.props.tracker.value}</h1>
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
                  className={
                    this.state.isDeleteMode
                      ? "single-tracker-btn-standard tracker-delete-btn-color-default"
                      : "single-tracker-btn-standard tracker-btn-color-default"
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
                  className="delete-mode-btn"
                  onClick={this.toggleDeleteMode}
                >
                  X
                </Button>
              </ButtonGroup>
              <div className="history center">
                <div className="history-header">
                    <h4 className="history-title">
                        History
                    </h4>
                    <div className="history-options">
                        <i className="fa fa-ellipsis-v history-options-btn noselect" onClick={this.toggleHistoryDropdown}></i>
                        { this.state.isHistoryDropdown ? 
                            <div className="history-options-dropdown">
                                {/* onClick={this.handleDeleteAllClicks(this.props.tracker)} */}
                                <p onClick={() => this.handleDeleteAllClicks(this.props.tracker)}>Clear</p>
                            </div> 
                        : null }
                    </div>
                </div>
                {this.props.tracker.clicks
                  ? this.props.tracker.clicks.reverse().map((click) => (
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
                        <span
                          className="delete-click"
                          onClick={() =>
                            this.handleDeleteClick(this.props.tracker, click)
                          }
                        >
                          x
                        </span>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default SingleTracker;
