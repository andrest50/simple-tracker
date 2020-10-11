import React, { Component } from "react";
import { Button } from "reactstrap";
import DashboardHeader from "./DashboardHeaderComponent";
import DashboardTracker from "./DashboardTrackerComponent";
import TrackerModal from "../modals/TrackerModalComponent";
import {sortTrackers} from '../Utils';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      isDashboardDropdown: false,
      sort: 1
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddTracker = this.handleAddTracker.bind(this);
    this.toggleDashboardDropdown = this.toggleDashboardDropdown.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  toggleDashboardDropdown() {
    this.setState({
        isDashboardDropdown: !this.state.isDashboardDropdown,
      });
  }

  handleAddTracker(values) {
    this.toggleModal();
    this.props.createTracker(values.name, values.value);
  }

  handleSort() {
    console.log(this.state.sort);
    if(this.state.sort !== 3){
        this.setState({
            sort: this.state.sort + 1
        })
    }
    else {
        this.setState({
            sort: 1
        })
    }
  }

  render() {
    /* const compare = (a, b) => {
      if (a.value < b.value) {
        return 1;
      }
      if (a.value > b.value) {
        return -1;
      }
      return 0;
    };

    this.props.trackers.trackers.sort(compare);
    console.log(this.props.trackers.trackers); */

    sortTrackers(this.props.trackers.trackers, this.state.sort);

    const trackers = this.props.trackers.trackers.map((tracker) => {
      return (
        <div key={tracker.id}>
          <DashboardTracker
            tracker={tracker}
            //increments={this.props.trackers.trackers.increments.filter(
            //  (increment) => increment.trackerId === tracker.id
            //)}
            //createIncrement={this.props.createIncrement}
            //deleteIncrement={this.props.deleteIncrement}
            deleteTracker={this.props.deleteTracker}
            //incrementTracker={this.props.incrementTracker}
            //updateNumIncrements={this.props.updateNumIncrements}
            updateTracker={this.props.updateTracker}
          />
        </div>
      );
    });

    return (
      <div>
        <DashboardHeader />
        <div className="container" id="dashboard-trackers-group">
          <Button id="dashboard-add-tracker-btn" onClick={this.toggleModal}>
            Add Tracker
          </Button>
          <TrackerModal
            isModalOpen={this.state.isModalOpen}
            toggleModal={this.toggleModal}
            handleAddTracker={this.handleAddTracker}
          />
          <div id="dashboard-trackers">
            <div id="dashboard-trackers-header">
              <h2 id="dashboard-trackers-title">Your Trackers: </h2>
              <p>You have {this.props.trackers.trackers.length} trackers</p>
              <div className="dashboard-options">
                <i className="fa fa-ellipsis-v dashboard-options-btn noselect" onClick={this.toggleDashboardDropdown}></i>
                {this.state.isDashboardDropdown ? (
                  <div className="dashboard-options-dropdown">
                    <p onClick={this.handleSort}>Sort</p>
                  </div>
                ) : null}
              </div>
            </div>
            <hr />
            {trackers}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
