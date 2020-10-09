import React from "react";
import { Button, ButtonGroup } from "reactstrap";

const IncrementsDisplay = (props) => {

    const compare = (a, b) => {
        if (a.value < b.value) {
          return -1;
        }
        if (a.value > b.value) {
          return 1;
        }
        return 0;
      };
    
      props.increments.sort(compare);
    
      const increments = props.increments.map((increment) => {
        console.log(increment);
        return (
          <Button
            key={increment.id}
            style={{backgroundColor: props.tracker.settings.incColor}}
            className={
              props.isDeleteMode
                ? "single-tracker-inc-btn-standard tracker-delete-btn-color-default"
                : "single-tracker-inc-btn-standard tracker-btn-color-default"
            }
            onClick={() => props.handleIncrementOptions(increment)}
          >
            {increment.value}
          </Button>
        );
      });
    
    return (
        <div className="increments">
            {increments}
        </div>
        /* <ButtonGroup role="group" className="increment-btns">
          <Button
            className={
              props.isDeleteMode
                ? "single-tracker-btn-standard tracker-delete-btn-color-default"
                : "single-tracker-btn-standard tracker-btn-color-default"
            }
            onClick={props.handleTrackerOptions}
          >
            {props.incrementText}
          </Button>
          {increments}
          <Button
            color="danger"
            className="delete-mode-btn"
            onClick={props.toggleDeleteMode}
          >
            X
          </Button>
        </ButtonGroup> */
    );
}

export default IncrementsDisplay;