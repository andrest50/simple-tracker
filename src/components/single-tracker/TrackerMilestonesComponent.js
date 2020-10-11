import React, { useState } from "react";
import {
  Button,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import {sortMilestones} from '../Utils'

const TrackerMilestones = (props) => {

  const handleAddMilestone = (values) => {
      console.log(values.milestone);
      var id = 0, completed = false;
      //console.log(Math.max(...props.tracker.milestones));
      if(props.tracker.milestones.length > 0)
        id = parseInt(props.tracker.milestones[props.tracker.milestones.length-1].id) + 1;
      if(props.tracker.value > values.milestone)
        completed = true;
      var new_milestone = {
        value: parseInt(values.milestone),
        completed: completed,
        id: id
      }
      props.tracker.milestones.push(new_milestone);
      props.updateTracker(props.tracker);
  };

  const handleRemoveMilestone = (id) => {
    console.log(props.tracker.milestones = props.tracker.milestones.filter((milestone) => milestone.id !== id));
    props.tracker.milestones = props.tracker.milestones.filter((milestone) => milestone.id !== id);
    props.updateTracker(props.tracker);
  }

  var modified_tracker = props.tracker;
  sortMilestones(modified_tracker)

  return (
    <div className="tracker-milestones" style={{backgroundColor: props.tracker.settings.historyColor}}>
      <div>
        <h3 className="milestones-title">Milestones</h3>
        <LocalForm className="justify-content-center" onSubmit={(values) => handleAddMilestone(values)}>
          <Row className="form-group">
          <Label className="milestones-form-label" htmlFor="milestone" md={4}>
              {null}
            </Label>
            <Col md={3}>
              <Control.text
                model=".milestone"
                id="milestone"
                name="milestone"
                className="form-control"
              />
            </Col>
            <Button className="milestones-form-submit-btn" type="submit" value="submit" color="primary">
                <i className="fa fa-plus-square milestone-add-btn"></i>
            </Button>
          </Row>
        </LocalForm>
      </div>
      <div className="milestones-list">
          {modified_tracker.milestones.map((milestone) => {
              return (
                  <div className="milestone">
                    <p className={milestone.completed ? "milestone-complete" : "milestone-incomplete"}>{milestone.value}</p>
                    <i className="fa fa-minus-circle milestone-remove-btn" onClick={() => handleRemoveMilestone(milestone.id)}></i>
                  </div>
              )
          })}
      </div>
    </div>
  );
};

export default TrackerMilestones;