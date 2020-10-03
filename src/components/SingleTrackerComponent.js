import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SingleTrackerDetails from './SingleTrackerDetailsComponent';
import TrackerHistory from './TrackerHistoryComponent';

class SingleTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      tracker: null
    };

    this.handleAddIncrement = this.handleAddIncrement.bind(this);
    this.handleDeleteIncrement = this.handleDeleteIncrement.bind(this);
    this.handleDeleteTracker = this.handleDeleteTracker.bind(this);
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
                incrementTracker={this.props.incrementTracker} handleDeleteTracker={this.handleDeleteTracker} />
            <TrackerHistory tracker={this.props.tracker} incrementTracker={this.props.incrementTracker} deleteClick={this.props.deleteClick}/>
          </div>
        ) : null}
      </div>
    );
  }
}

export default SingleTracker;
