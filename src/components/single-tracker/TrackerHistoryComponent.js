import React, { useState } from "react";
import { sortHistory, handleIncrement } from '../Utils';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const TrackerHistory = (props) => {
  const [isHistoryDropdown, setIsHistoryDropdown] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  const toggleHistoryDropdown = () => {
    setIsHistoryDropdown(!isHistoryDropdown);
  };

  const handleSortHistory = () => {
    setIsSorted(!isSorted);
  };

  const handleDeleteClick = (tracker, click) => {
    var new_clicks = tracker.clicks.filter(
      (curr_click) => curr_click.id !== click.id
    );
    props.deleteClick(tracker, new_clicks);
  };

  const handleDeleteAllClicks = (tracker) => {
    var new_clicks = [];
    props.deleteClick(tracker, new_clicks);
  };

  sortHistory(isSorted, props.tracker);

  const sorted_clicks = props.tracker.clicks.map((click) => {
    return (
      <div className="history-row">
        <span
          className="history-click"
          onClick={() =>
            handleIncrement(
              props.tracker,
              click.value - props.tracker.value,
              props.updateTracker
            )
          }
        >
          {click.value} : {click.date}
        </span>
        <span
          className="delete-click"
          onClick={() => handleDeleteClick(props.tracker, click)}
        >
          x
        </span>
      </div>
    );
  });

  return (
    <div style={{backgroundColor: props.tracker.settings.historyColor}} className="history center">
      <div className="history-header">
        <h4 className="history-title">History</h4>
        <Dropdown isOpen={isHistoryDropdown} toggle={toggleHistoryDropdown} className="history-options">
          <DropdownToggle style={{backgroundColor: "#4196ad", color: "black", border: "none"}}>
            <i
              className="fa fa-ellipsis-v history-options-btn noselect"
            ></i>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => handleDeleteAllClicks(props.tracker)}>Clear</DropdownItem>
            <DropdownItem onClick={() => handleSortHistory}>Sort</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {sorted_clicks}
      {props.tracker.clicks.length == 0 && <h5>No clicks yet.</h5>}
    </div>
  );
};

export default TrackerHistory;
