import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
} from "reactstrap";
import { Redirect } from 'react-router-dom';
import IncrementModal from './IncrementModalComponent';

class SingleTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      isDeleteMode: false,
      redirect: false,
      incrementBtnColor: 'primary',
      incrementText: 'Add Increment'
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleAddIncrement = this.handleAddIncrement.bind(this);
    this.toggleDeleteMode = this.toggleDeleteMode.bind(this); 
    this.handleDeleteTracker = this.handleDeleteTracker.bind(this);
}

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleIncrement(trackerId, name, value, amount) {
    console.log(name + " : " + trackerId + " : " + value + " : " + amount);
    this.props.postIncrementTracker(trackerId, name, value, amount);
  }

  handleAddIncrement(values) {
    this.toggleModal();
    console.log(this.props.tracker.id + " : " + values.value);
    this.props.createIncrement(this.props.tracker.id, values.value);
  }

  handleDeleteIncrement(id){
    this.props.deleteIncrement(id);
  }

  handleDeleteTracker(id) {
    this.setState ({
        redirect: true
    });
    this.props.deleteTracker(id);
  }

  toggleDeleteMode() {
    var color, text;
    if(this.state.isDeleteMode === true)
      color = 'primary';
    else
      color = 'danger';

    if(this.state.incrementText === 'Add Increment')
      text = 'Delete Tracker';
    else
      text = 'Add Increment';

    this.setState(prevState => ({
      isDeleteMode: !prevState.isDeleteMode,
      incrementBtnColor: color,
      incrementText: text
    }));
  }

  handleIncrementOptions(increment) {
    if(this.state.isDeleteMode === true){
      this.handleDeleteIncrement(increment.id);
    }
    else {
      this.handleIncrement(this.props.tracker.id, this.props.tracker.name, 
        this.props.tracker.value, increment.value)
    }
  }

  handleTrackerOptions(tracker) {
    if (this.state.isDeleteMode === true) {
      this.handleDeleteTracker(tracker.id);
    } else {
      this.toggleModal();
    }
  }

  render() {
    console.log(this.props);

    if(this.state.redirect === true){
        return (
            <Redirect to="/home"/>
        );
    }

    const compare = (a, b) => {
      if (a.value < b.value) {
        return -1;
      }
      if (a.value > b.value) {
        return 1;
      }
      return 0;
    };
    this.props.increments.sort(compare);

    const increments = this.props.increments.map((increment) => {
      return (
        <Button
          color={this.state.incrementBtnColor}
          key={increment.id}
          id="single-tracker-btn-inc"
          onClick={() => this.handleIncrementOptions(increment)}
        >
          {increment.value}
        </Button>
      );
    });
    return (
      <div className="tracker-group">
        {this.props.tracker ? (
          <div id="single-tracker-div">
            <h2 className="text-info" id="single-tracker-name">
              {this.props.tracker.name}
            </h2>
            <h1 id="single-tracker-value">{this.props.tracker.value}</h1>
          </div>
        ) : null}
        <ButtonGroup role="group">
          <Button
            color={this.state.incrementBtnColor}
            id="single-tracker-btn-add"
            onClick={() => this.handleTrackerOptions(this.props.tracker)}
          >
            {this.state.incrementText}
          </Button>
          <IncrementModal tracker={this.props.tracker} isModalOpen={this.state.isModalOpen} 
            toggleModal={this.toggleModal} handleAddIncrement={this.handleAddIncrement}/>
          {increments}
          <Button color="danger" id="delete-mode-btn" onClick={this.toggleDeleteMode}>
            X
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default SingleTracker;
