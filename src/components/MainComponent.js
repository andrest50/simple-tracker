import React, { Component } from "react";
import Dashboard from "./DashboardComponent";
import SingleTrackerComponent from './SingleTrackerComponent';
import { connect } from "react-redux";
import { Switch, Route, Redirect } from 'react-router-dom';
import { incrementTracker, fetchTrackers, deleteTracker, 
  fetchIncrements, createTracker, createIncrement, deleteIncrement, 
  updateNumIncrements, updateBgColor, deleteClick } from "../redux";

const mapStateToProps = (state) => {
  return {
    trackers: state.trackers,
  }
}

const mapDispatchToProps = (dispatch) => ({
    fetchTrackers: () => dispatch(fetchTrackers()),
    fetchIncrements: () => dispatch(fetchIncrements()),
    incrementTracker: (tracker, amount) => dispatch(incrementTracker(tracker, amount)),
    createTracker: (name, value) => dispatch(createTracker(name, value)),
    deleteTracker: (id) => dispatch(deleteTracker(id)),
    createIncrement: (trackerId, value) => dispatch(createIncrement(trackerId, value)),
    deleteIncrement: (id) => dispatch(deleteIncrement(id)),
    updateNumIncrements: (id, amount) => dispatch(updateNumIncrements(id, amount)),
    deleteClick: (id, clicks) => dispatch(deleteClick(id, clicks)),
    updateBgColor: (id, bgColor) => dispatch(updateBgColor(id, bgColor)),
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchTrackers();
    this.props.fetchIncrements();
  }

  render() {
    const TrackersPage = () => {
      return (
        <Dashboard trackers={this.props.trackers} 
          increments={this.props.increments} 
          createTracker={this.props.createTracker}
          deleteTracker={this.props.deleteTracker}  
          createIncrement={this.props.createIncrement}
          deleteIncrement={this.props.deleteIncrement} 
          incrementTracker={this.props.incrementTracker} 
          updateNumIncrements={this.props.updateNumIncrements}/>
      );
    }

    const SingleTrackerPage = ({match}) => {
      return (
        <SingleTrackerComponent tracker={this.props.trackers.trackers.filter((tracker) => tracker.id === parseInt(match.params.trackerId))[0]} 
          increments={this.props.trackers.increments.filter((increment) => increment.trackerId === parseInt(match.params.trackerId))}
          deleteTracker={this.props.deleteTracker}  
          createIncrement={this.props.createIncrement} 
          deleteIncrement={this.props.deleteIncrement}
          incrementTracker={this.props.incrementTracker} 
          updateNumIncrements={this.props.updateNumIncrements}
          updateBgColor={this.props.updateBgColor}
          deleteClick={this.props.deleteClick}/>
      );
    }

    return (
      <div>
        <Switch>
          <Route path="/home" component={TrackersPage} />
          <Route path="/tracker/:trackerId" component={SingleTrackerPage} />
          <Redirect to="/home" />
        </Switch>
        <div id="footer"></div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
