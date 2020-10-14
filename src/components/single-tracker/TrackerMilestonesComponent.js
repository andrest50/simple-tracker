import React, { useState } from "react";
import {
  Button,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import {sortMilestones} from '../Utils'

const isNumber = (val) => !isNaN(Number(val));

const TrackerMilestones = (props) => {

  const handleAddMilestone = (values) => {
      console.log(values.milestone);
      var id = 0, completed = false, completedDate = "";
      sortMilestones(props.tracker, 2);
      //console.log(Math.max(...props.tracker.milestones));
      if(props.tracker.milestones.length > 0)
        id = parseInt(props.tracker.milestones[props.tracker.milestones.length-1].id) + 1;
      if(props.tracker.value > values.milestone){
        completed = true;
        for(var i = props.tracker.clicks.length-1; i >= 0; i--){
          if(props.tracker.clicks[i].value > values.milestone){
            completedDate = props.tracker.clicks[i].date;
            break;
          }
        }
      }
      var new_milestone = {
        value: parseInt(values.milestone),
        completed: completed,
        completedDate: completedDate,
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

  sortMilestones(props.tracker, 1);

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
                validators={{
                  isNumber,
                }}
              />
              <Errors
                  className="text-danger"
                  model=".value"
                  show="touched"
                  messages={{
                    isNumber: "Value must be a number. ",
                  }}
                />
            </Col>
            <Button className="milestones-form-submit-btn" type="submit" value="submit" color="primary">
                <i className="fa fa-plus-square milestone-add-btn"></i>
            </Button>
          </Row>
        </LocalForm>
      </div>
      <div className="milestones-list">
          {props.tracker.milestones.map((milestone) => {
              return (
                  <div className="milestone">
                    <p className={milestone.completed ? "milestone-complete" : "milestone-incomplete"}>{milestone.value}</p>
                    <p className="milestone-completedDate">{milestone.completedDate}</p>
                    <i className="fa fa-minus-circle milestone-remove-btn" onClick={() => handleRemoveMilestone(milestone.id)}></i>
                  </div>
              )
          })}
      </div>
    </div>
  );
};

export default TrackerMilestones;