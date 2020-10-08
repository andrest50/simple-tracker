import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SingleTrackerHeader from "./SingleTrackerHeaderComponent";
import SingleTrackerDetails from "./SingleTrackerDetailsComponent";
import TrackerHistory from "./TrackerHistoryComponent";

class SingleTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      tracker: null,
      bgColor: "#939cbe"
    };

    this.handleAddIncrement = this.handleAddIncrement.bind(this);
    this.handleDeleteIncrement = this.handleDeleteIncrement.bind(this);
    this.handleDeleteTracker = this.handleDeleteTracker.bind(this);
    this.handleBgColor = this.handleBgColor.bind(this);
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

  handleBgColor(color){
      this.setState({
          bgColor: color.hex
      });
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
      <div style={{backgroundColor: this.state.bgColor}}>
        <SingleTrackerHeader 
            tracker={this.props.tracker} 
            incrementTracker={this.props.incrementTracker}
            bgColor={this.state.bgColor}
            handleBgColor={this.handleBgColor} />
        <div className="single-tracker-page">
          {this.props.tracker ? (
            <div className="single-tracker-div">
              <SingleTrackerDetails
                tracker={this.props.tracker}
                increments={this.props.increments}
                handleAddIncrement={this.handleAddIncrement}
                handleDeleteIncrement={this.handleDeleteIncrement}
                incrementTracker={this.props.incrementTracker}
                handleDeleteTracker={this.handleDeleteTracker}
              />
              <TrackerHistory
                tracker={this.props.tracker}
                incrementTracker={this.props.incrementTracker}
                deleteClick={this.props.deleteClick}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default SingleTracker;
