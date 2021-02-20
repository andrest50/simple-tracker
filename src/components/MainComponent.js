import React, { Component } from "react";
import Dashboard from "./dashboard/DashboardComponent";
import SingleTrackerComponent from './single-tracker/SingleTrackerComponent';
import { connect } from "react-redux";
import { Switch, Route, Redirect } from 'react-router-dom';
import { fetchTrackers, deleteTracker, 
  createTracker, updateTracker, updateSetting, deleteClick } from "../redux";

const mapStateToProps = (state) => {
  return {
    trackers: state.trackers,
  }
}

const mapDispatchToProps = (dispatch) => ({
    fetchTrackers: () => dispatch(fetchTrackers()),
    createTracker: (name, value) => dispatch(createTracker(name, value)),
    deleteTracker: (id) => dispatch(deleteTracker(id)),
    deleteClick: (id, clicks) => dispatch(deleteClick(id, clicks)),
    updateSetting: (tracker) => dispatch(updateSetting(tracker)),
    updateTracker: (tracker) => dispatch(updateTracker(tracker)),
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchTrackers();
  }

  render() {
    const TrackersPage = () => {
      return (
        <Dashboard trackers={this.props.trackers} 
          createTracker={this.props.createTracker}
          deleteTracker={this.props.deleteTracker}  
          updateTracker={this.props.updateTracker}/>
      );
    }

    const SingleTrackerPage = ({match}) => {
      return (
        <SingleTrackerComponent tracker={this.props.trackers.trackers.filter((tracker) => tracker.id === parseInt(match.params.trackerId))[0]} 
          deleteTracker={this.props.deleteTracker}  
          updateTracker={this.props.updateTracker} 
          updateSetting={this.props.updateSetting}
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
