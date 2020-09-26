import React, { Component } from "react";
import Header from "./HeaderComponent";
import TrackersComponent from "./TrackersComponent";
import SingleTrackerComponent from './SingleTrackerComponent';
import { connect } from "react-redux";
import { Switch, Route, Redirect } from 'react-router-dom';
import { incrementTracker, postIncrementTracker, fetchTrackers, deleteTracker, 
  fetchIncrements, createTracker, createIncrement, deleteIncrement, updateNumIncrements, deleteClick } from "../redux";

const mapStateToProps = (state) => {
  return {
    trackers: state.trackers,
  }
}

const mapDispatchToProps = (dispatch) => ({
    fetchTrackers: () => dispatch(fetchTrackers()),
    fetchIncrements: () => dispatch(fetchIncrements()),
    incrementTracker: (index, amount) => dispatch(incrementTracker(index, amount)),
    postIncrementTracker: (tracker, amount) => dispatch(postIncrementTracker(tracker, amount)),
    createTracker: (name, value) => dispatch(createTracker(name, value)),
    deleteTracker: (id) => dispatch(deleteTracker(id)),
    createIncrement: (trackerId, value) => dispatch(createIncrement(trackerId, value)),
    deleteIncrement: (id) => dispatch(deleteIncrement(id)),
    updateNumIncrements: (id, amount) => dispatch(updateNumIncrements(id, amount)),
    deleteClick: (id, clicks) => dispatch(deleteClick(id, clicks)),
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
          deleteTracker={this.props.deleteTracker}  
          createIncrement={this.props.createIncrement}
          deleteIncrement={this.props.deleteIncrement} 
          incrementTracker={this.props.incrementTracker} 
          postIncrementTracker={this.props.postIncrementTracker}
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
          postIncrementTracker={this.props.postIncrementTracker}
          updateNumIncrements={this.props.updateNumIncrements}
          deleteClick={this.props.deleteClick}/>
      );
    }

    return (
      <div id="trackers-bg">
        <Header />
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
