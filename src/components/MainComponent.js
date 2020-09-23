import React, { Component } from "react";
import Header from "./HeaderComponent";
import TrackersComponent from "./TrackersComponent";
import { connect } from "react-redux";
import { incrementTracker, postIncrementTracker, fetchTrackers, fetchIncrements, createTracker, createIncrement } from "../redux";

const mapStateToProps = (state) => {
  return {
    trackers: state.trackers
  }
}

const mapDispatchToProps = (dispatch) => ({
    fetchTrackers: () => dispatch(fetchTrackers()),
    fetchIncrements: () => dispatch(fetchIncrements()),
    incrementTracker: (index, amount) => dispatch(incrementTracker(index, amount)),
    postIncrementTracker: (index, name, value, amount) => dispatch(postIncrementTracker(index, name, value, amount)),
    createTracker: (name, value) => dispatch(createTracker(name, value)),
    createIncrement: (trackerId, value) => dispatch(createIncrement(trackerId, value)),
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchTrackers();
    this.props.fetchIncrements();
  }

  render() {
    return (
      <div>
        <h1>Simple Tracker</h1>
        <Header />
        <TrackersComponent trackers={this.props.trackers} increments={this.props.increments} createTracker={this.props.createTracker} 
          createIncrement={this.props.createIncrement} incrementTracker={this.props.incrementTracker} postIncrementTracker={this.props.postIncrementTracker}/>
        <div className="footer"></div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
