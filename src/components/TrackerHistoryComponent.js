import React, { useState } from "react";
import { sortHistory, handleIncrement } from './Utils';

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
      (curr_click) => curr_click.date !== click.date
    );
    props.deleteClick(tracker, new_clicks);
  };

  const handleDeleteAllClicks = (tracker) => {
    console.log("handleDeleteAllClicks");
    var new_clicks = [];
    props.deleteClick(tracker, new_clicks);
  };

  console.log(isSorted);

  sortHistory(isSorted, props.tracker);

  const sorted_clicks = props.tracker.clicks.map((click) => {
    return (
      <div>
        <span
          className="history-click"
          onClick={() =>
            handleIncrement(
              props.tracker,
              click.value - props.tracker.value,
              props.incrementTracker
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
    <div className="history center">
      <div className="history-header">
        <h4 className="history-title">History</h4>
        <div className="history-options">
          <i
            className="fa fa-ellipsis-v history-options-btn noselect"
            onClick={toggleHistoryDropdown}
          ></i>
          {isHistoryDropdown ? (
            <div className="history-options-dropdown">
              <p onClick={() => handleDeleteAllClicks(props.tracker)}>Clear</p>
              <p onClick={handleSortHistory}>Sort</p>
            </div>
          ) : null}
        </div>
      </div>
      {sorted_clicks}
    </div>
  );
};

export default TrackerHistory;
