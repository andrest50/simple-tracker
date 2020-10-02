import React, {useState} from "react";

const TrackerHistory = (props) => {
    
    const [isHistoryDropdown, setIsHistoryDropdown] = useState(false);
    const [isSorted, setIsSorted] = useState(true);

    const toggleHistoryDropdown = () => {
        setIsHistoryDropdown(!isHistoryDropdown);
    }

    const handleSortHistory = () => {
        setIsSorted(!isSorted);
    }

console.log(isSorted);

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
              <p onClick={() => props.handleDeleteAllClicks(props.tracker)}>
                Clear
              </p>
              <p onClick={handleSortHistory}>Sort</p>
            </div>
          ) : null}
        </div>
      </div>
      {isSorted
        ? props.tracker.clicks.reverse().map((click) => (
            <div>
              <span
                className="history-click"
                onClick={() =>
                  props.handleIncrement(
                    props.tracker,
                    click.value - props.tracker.value
                  )
                }
              >
                {click.value} : {click.date}
              </span>
              <span
                className="delete-click"
                onClick={() =>
                  props.handleDeleteClick(props.tracker, click)
                }
              >
                x
              </span>
            </div>
          ))
        : props.tracker.clicks.map((click) => (
            <div>
              <span
                className="history-click"
                onClick={() =>
                  props.handleIncrement(
                    props.tracker,
                    click.value - props.tracker.value
                  )
                }
              >
                {click.value} : {click.date}
              </span>
              <span
                className="delete-click"
                onClick={() =>
                  props.handleDeleteClick(props.tracker, click)
                }
              >
                x
              </span>
            </div>
          ))}
    </div>
  );
};

export default TrackerHistory;
