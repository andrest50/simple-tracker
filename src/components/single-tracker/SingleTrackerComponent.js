import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SingleTrackerHeader from "./SingleTrackerHeaderComponent";
import SingleTrackerDetails from "./SingleTrackerDetailsComponent";
import TrackerHistory from "./TrackerHistoryComponent";
import TrackerNotes from "./TrackerNotesComponent";
import TrackerMilestones from "./TrackerMilestonesComponent";

class SingleTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      tracker: null,
    };

    this.handleAddIncrement = this.handleAddIncrement.bind(this);
    this.handleDeleteIncrement = this.handleDeleteIncrement.bind(this);
    this.handleDeleteTracker = this.handleDeleteTracker.bind(this);
    this.handleBgColor = this.handleBgColor.bind(this);
    this.handleIncColor = this.handleIncColor.bind(this);
    this.handleHistoryColor = this.handleHistoryColor.bind(this);
  }

  handleAddIncrement(values) {
    var id;
    if(this.props.tracker.numIncrements > 0)
      id = parseInt(this.props.tracker.increments[this.props.tracker.increments.length-1].id) + 1;
    else
      id = 0;
    var new_increment = {
      value: parseInt(values.value),
      id: id
    }
    this.props.tracker.increments.push(new_increment);
    this.props.tracker.numIncrements += 1;
    this.props.updateTracker(this.props.tracker);
  }

  handleDeleteIncrement(id) {
    this.props.tracker.increments = this.props.tracker.increments.filter((increment) => increment.id !== id);
    this.props.tracker.numIncrements -= 1;
    this.props.updateTracker(this.props.tracker);
  }

  handleDeleteTracker(id) {
    this.setState({
      redirect: true,
    });
    this.props.deleteTracker(id);
  }

  handleBgColor(color){
      this.props.tracker.settings.bgColor = color.hex;
      this.setState({
        tracker: this.props.tracker,
      });
  }

  handleIncColor(color){
    this.props.tracker.settings.incColor = color.hex;
    this.setState({
      tracker: this.props.tracker,
    });
  }

  handleHistoryColor(color){
    this.props.tracker.settings.historyColor = color.hex;
    this.setState({
      tracker: this.props.tracker,
    });
  }

  componentDidMount() {
    //window.scrollTo(0, 0);
    this.setState({
      tracker: this.props.tracker,
    });
  }

  render() {

    if(this.state.tracker == null){
        return null;
    }

    if (this.state.redirect === true) {
      return <Redirect to="/home" />;
    }

    return (
      <div style={{backgroundColor: this.state.tracker.settings.bgColor}}>
        <SingleTrackerHeader 
            tracker={this.props.tracker} 
            updateTracker={this.props.updateTracker}
            updateSetting={this.props.updateSetting}
            handleBgColor={this.handleBgColor}
            handleIncColor={this.handleIncColor}
            handleHistoryColor={this.handleHistoryColor} />
        <div className="single-tracker-page">
          {this.props.tracker ? (
            <div className="single-tracker-div">
              <SingleTrackerDetails
                tracker={this.props.tracker}
                handleAddIncrement={this.handleAddIncrement}
                handleDeleteIncrement={this.handleDeleteIncrement}
                handleDeleteTracker={this.handleDeleteTracker}
                updateTracker={this.props.updateTracker}
              />
              <TrackerHistory
                tracker={this.props.tracker}
                deleteClick={this.props.deleteClick}
                updateTracker={this.props.updateTracker}
              />
              <br />
              <br />
              <TrackerNotes
                tracker={this.props.tracker}
                updateTracker={this.props.updateTracker}
              />
              <br />
              <br />
              <TrackerMilestones
                tracker={this.props.tracker}
                updateTracker={this.props.updateTracker}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default SingleTracker;
