import React from "react";
import { Button } from "reactstrap";

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
        return (
          <Button
            key={increment.id}
            style={props.isDeleteMode ? {backgroundColor: "#C33E3E"} : {backgroundColor: props.tracker.settings.incColor}}
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
    );
}

export default IncrementsDisplay;