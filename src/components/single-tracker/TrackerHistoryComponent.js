import React, { useState } from "react";
import { sortHistory, handleIncrement } from '../Utils';

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
    console.log(tracker.clicks);
    var new_clicks = tracker.clicks.filter(
      (curr_click) => curr_click.id !== click.id
    );
    props.deleteClick(tracker, new_clicks);
  };

  const handleDeleteAllClicks = (tracker) => {
    var new_clicks = [];
    props.deleteClick(tracker, new_clicks);
  };

  console.log(isSorted);

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
        <div className="history-options">
          <i
            className="fa fa-ellipsis-v history-options-btn noselect"
            onClick={toggleHistoryDropdown}
          ></i>
          {isHistoryDropdown ? (
            <div className="history-options-dropdown">
              <div onClick={() => handleDeleteAllClicks(props.tracker)}>Clear</div>
              <div onClick={() => handleSortHistory}>Sort</div>
            </div>
          ) : null}
        </div>
      </div>
      {sorted_clicks}
    </div>
  );
};

export default TrackerHistory;
