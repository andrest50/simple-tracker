import React, { useState } from "react";
import {
  Button,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const TrackerNotes = (props) => {

  const handleAddNote = (values) => {
      console.log(values.notes);
      var id;
      if(props.tracker.notes.length > 0)
        id = parseInt(props.tracker.notes[props.tracker.notes.length-1].id) + 1;
      else
        id = 0;
      var new_note = {
        text: values.note,
        id: id
      }
      props.tracker.notes.push(new_note);
      props.updateTracker(props.tracker);
  };

  const handleRemoveNote = (id) => {
    console.log(props.tracker.notes = props.tracker.notes.filter((note) => note.id !== id));
    props.tracker.notes = props.tracker.notes.filter((note) => note.id !== id);
    props.updateTracker(props.tracker);
  }

  return (
    <div className="tracker-notes" style={{backgroundColor: props.tracker.settings.historyColor}}>
      <div>
        <h3 className="notes-title">Notes</h3>
        <LocalForm onSubmit={(values) => handleAddNote(values)}>
          <Row className="form-group">
          <Label className="notes-form-label" htmlFor="note" md={2}>
              {null}
            </Label>
            <Col md={8}>
              <Control.text
                model=".note"
                id="note"
                name="note"
                className="form-control"
              />
            </Col>
            <Button className="notes-form-submit-btn" type="submit" value="submit" color="primary">
                <i className="fa fa-plus-square note-add-btn"></i>
            </Button>
          </Row>
        </LocalForm>
      </div>
      <div className="notes-list">
          {props.tracker.notes.map((note) => {
              return (
                  <div className="note">
                    <p className="note-text">{note.text}</p>
                    <i className="fa fa-minus-circle note-remove-btn" onClick={() => handleRemoveNote(note.id)}></i>
                  </div>
              )
          })}
      </div>
    </div>
  );
};

export default TrackerNotes;
