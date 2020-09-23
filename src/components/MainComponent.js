import React, { Component } from "react";
import Header from "./HeaderComponent";
import TrackersComponent from "./TrackersComponent";
import SingleTrackerComponent from './SingleTrackerComponent';
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { incrementTracker, postIncrementTracker, fetchTrackers, fetchIncrements, createTracker, createIncrement } from "../redux";

const mapStateToProps = (state) => {
  return {
    trackers: state.trackers,
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
    const TrackersPage = () => {
      return (
        <TrackersComponent trackers={this.props.trackers} 
          increments={this.props.increments} 
          createTracker={this.props.createTracker} 
          createIncrement={this.props.createIncrement} 
          incrementTracker={this.props.incrementTracker} 
          postIncrementTracker={this.props.postIncrementTracker}/>
      );
    }

    const SingleTrackerPage = ({match}) => {
      console.log("Single Tracker Page");
      console.log(match.params.trackerId);
      console.log(this.props.trackers.increments);
      console.log(this.props.trackers.trackers);
      console.log(this.props.trackers.trackers.filter((tracker) => tracker.id === match.params.trackerId));
      return (
        <SingleTrackerComponent tracker={this.props.trackers.trackers.filter((tracker) => tracker.id === match.params.trackerId)} 
          increments={this.props.trackers.increments.filter((increment) => increment.trackerId === match.params.trackerId)}
          createIncrement={this.props.createIncrement} 
          incrementTracker={this.props.incrementTracker} 
          postIncrementTracker={this.props.postIncrementTracker}/>
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={TrackersPage} />
          <Route path="/tracker/:trackerId" component={SingleTrackerPage} />
          <Redirect to="/home"/>
        </Switch>
        <div className="footer"></div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
