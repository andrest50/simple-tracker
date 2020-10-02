import React, { Component } from "react";
import { Button, ButtonGroup, Alert } from "reactstrap";
import { Redirect } from "react-router-dom";
import SingleTrackerDetails from './SingleTrackerDetailsComponent';
import TrackerHistory from './TrackerHistoryComponent';

class SingleTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHistoryDropdown: false,
      sortHistory: true,
      redirect: false,
      tracker: null
    };

    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleAddIncrement = this.handleAddIncrement.bind(this);
    this.handleDeleteIncrement = this.handleDeleteIncrement.bind(this);
    this.handleDeleteTracker = this.handleDeleteTracker.bind(this);
    this.handleDeleteAllClicks = this.handleDeleteAllClicks.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
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
    console.log("handleDeleteAllClicks");
    var new_clicks = [];
    this.props.deleteClick(tracker, new_clicks);
  }

  handleAddIncrement(values) {
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

  componentDidMount() {
    //window.scrollTo(0, 0);
    this.setState({
        tracker: this.props.tracker,
    });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/home" />;
    }

    console.log(this.state.tracker);

    return (
      <div className="dashboard-tracker-group">
        {this.props.tracker ? (
          <div className="single-tracker-div">
            <SingleTrackerDetails tracker={this.props.tracker} increments={this.props.increments}
                handleAddIncrement={this.handleAddIncrement} handleDeleteIncrement={this.handleDeleteIncrement}
                handleIncrement={this.handleIncrement} handleDeleteTracker={this.handleDeleteTracker} />
            <TrackerHistory tracker={this.props.tracker} handleDeleteAllClicks={this.handleDeleteAllClicks}
                handleIncrement={this.handleIncrement} handleDeleteClick={this.handleDeleteClick}/>
          </div>
        ) : null}
      </div>
    );
  }
}

export default SingleTracker;
