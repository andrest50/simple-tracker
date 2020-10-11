import React, {useState} from "react";
import { Button, Alert, ButtonGroup } from "reactstrap";
import IncrementModal from "../modals/IncrementModalComponent";
import IncrementsDisplay from "../IncrementsDisplayComponent";
import {handleIncrement} from '../Utils'

const SingleTrackerDetails = (props) => {

    const [isAlert, setIsAlert] = useState(false);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [incrementText, setIncrementText] = useState("Add Increment");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const removeAlert = () => {
        setIsAlert(!isAlert);
    }
    
    const toggleDeleteMode = () => {
        var text;
    
        if (
          incrementText === "Add Increment"
            ? (text = "Delete Tracker")
            : (text = "Add Increment")
        );
    
        setIsDeleteMode(!isDeleteMode);
        setIncrementText(text);
    }
    
    const toggleModal = () => {
        console.log(!isModalOpen);
        setIsModalOpen(!isModalOpen);
    }

    const handleTrackerOptions = () => {
        if (isDeleteMode === true) {
          props.handleDeleteTracker(props.tracker.id);
        } else {
          console.log(props.tracker.numIncrements);
          if (props.tracker.numIncrements < 5) toggleModal();
          else {
            setIsAlert(true);
          }
        }
    }

   const handleIncrementOptions = (increment) => {
        if (
          isDeleteMode === true
            ? props.handleDeleteIncrement(increment.id)
            : handleIncrement(props.tracker, parseInt(increment.value), props.updateTracker)
        );
    }

  return (
    <div>
      <h2 className="tracker-name single-tracker-name">
        {props.tracker.name}
      </h2>
      <h1 className="single-tracker-value">{props.tracker.value}</h1>
      <div>
        {isAlert ? (
          <Alert color="danger">
            You can't have more than 5 increments per tracker!
            <span className="alert-close-btn" onClick={removeAlert}>
              x
            </span>
          </Alert>
        ) : null}
        {/* <IncrementsDisplay increments={props.increments} handleIncrementOptions={handleIncrementOptions}
        isDeleteMode={isDeleteMode} handleTrackerOptions={handleTrackerOptions} incrementText={incrementText}
        toggleDeleteMode={toggleDeleteMode}/> */}
        <ButtonGroup role="group" className="increment-btns">
          <Button
            style={isDeleteMode ? {backgroundColor: "#C33E3E"} : {backgroundColor: props.tracker.settings.incColor}}
            className={
              isDeleteMode
                ? "single-tracker-btn-standard tracker-delete-btn-color-default"
                : "single-tracker-btn-standard tracker-btn-color-default"
            }
            onClick={handleTrackerOptions}
          >
            {incrementText}
          </Button>
          <IncrementsDisplay 
            tracker={props.tracker}
            increments={props.tracker.increments} 
            handleIncrementOptions={handleIncrementOptions}
            isDeleteMode={isDeleteMode} />
          <Button
            color="danger"
            className="delete-mode-btn"
            onClick={toggleDeleteMode}
          >
            X
          </Button>
        </ButtonGroup>
        <IncrementModal
            tracker={props.tracker}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            handleAddIncrement={props.handleAddIncrement}
          />
      </div>
    </div>
  );
};

export default SingleTrackerDetails;
