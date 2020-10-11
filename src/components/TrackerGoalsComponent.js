import React, { useState } from "react";
import {
  Button,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const TrackerGoals = (props) => {

  const handleAddGoal = (values) => {
      console.log(values.goal);
      var id;
      if(props.tracker.goals.length > 0)
        id = parseInt(props.tracker.goals[props.tracker.goals.length-1].id) + 1;
      else
        id = 0;
      var new_goal = {
        text: values.goal,
        id: id
      }
      props.tracker.goals.push(new_goal);
      props.updateTracker(props.tracker);
  };

  const handleRemoveGoal = (id) => {
    console.log(props.tracker.goals = props.tracker.goals.filter((goal) => goal.id !== id));
    props.tracker.goals = props.tracker.goals.filter((goal) => goal.id !== id);
    props.updateTracker(props.tracker);
  }

  return (
    <div className="tracker-goals">
      <div>
        <h3 className="goals-title">Goals</h3>
        <LocalForm onSubmit={(values) => handleAddGoal(values)}>
          <Row className="form-group">
          <Label className="goals-form-label" htmlFor="goal" md={2}>
              {null}
            </Label>
            <Col md={8}>
              <Control.text
                model=".goal"
                id="goal"
                name="goal"
                className="form-control"
              />
            </Col>
            <Button className="goals-form-submit-btn" type="submit" value="submit" color="primary">
                <i className="fa fa-plus-square goal-add-btn"></i>
            </Button>
          </Row>
        </LocalForm>
      </div>
      <div className="goals-list">
          {props.tracker.goals.map((goal) => {
              return (
                  <div className="goal">
                    <p className="goal-text">{goal.text}</p>
                    <i className="fa fa-minus-circle goal-remove-btn" onClick={() => handleRemoveGoal(goal.id)}></i>
                  </div>
              )
          })}
      </div>
    </div>
  );
};

export default TrackerGoals;
