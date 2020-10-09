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
      bgColor: null
    };

    this.handleAddIncrement = this.handleAddIncrement.bind(this);
    this.handleDeleteIncrement = this.handleDeleteIncrement.bind(this);
    this.handleDeleteTracker = this.handleDeleteTracker.bind(this);
    this.handleBgColor = this.handleBgColor.bind(this);
    this.handleIncColor = this.handleIncColor.bind(this);
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
      console.log(String(color.hex));
      /* this.setState({
          bgColor: color.hex
      }); */
      this.props.tracker.settings.bgColor = color.hex;
      this.setState({
        tracker: this.props.tracker,
      });
      //this.props.updateBgColor(this.props.tracker, String(color.hex));
  }

  handleIncColor(color){
    console.log(String(color.hex));
    /* this.setState({
        bgColor: color.hex
    }); */
    this.props.tracker.settings.incColor = color.hex;
    this.setState({
      tracker: this.props.tracker,
    });
    //this.props.updateBgColor(this.props.tracker, String(color.hex));
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

    console.log(this.props.tracker);

    return (
      <div style={{backgroundColor: this.state.tracker.settings.bgColor}}>
        <SingleTrackerHeader 
            tracker={this.props.tracker} 
            incrementTracker={this.props.incrementTracker}
            bgColor={this.state.tracker.settings.bgColor}
            handleBgColor={this.handleBgColor}
            updateSetting={this.props.updateSetting}
            incColor={this.state.tracker.settings.incColor}
            handleIncColor={this.handleIncColor} />
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
