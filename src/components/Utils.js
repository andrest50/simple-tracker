export const handleIncrement = (tracker, amount, incrementTracker) => {
  var curr_date = new Date();
  var date =
    curr_date.getFullYear() +
    "-" +
    (curr_date.getMonth() + 1) +
    "-" +
    curr_date.getDate();
  var time =
    curr_date.getHours() +
    ":" +
    curr_date.getMinutes() +
    ":" +
    curr_date.getSeconds();
  var dateTime = date + " " + time;
  var new_click = {
    value: tracker.value,
    date: dateTime,
    id: tracker.numClicks
  };
  tracker.clicks.push(new_click);
  incrementTracker(tracker, amount);
};

export const sortHistory = (isSorted, tracker) => {
  if (isSorted) {
    const compare = (a, b) => {
      if (a.value < b.value) {
        return 1;
      }
      if (a.value > b.value) {
        return -1;
      }
      return 0;
    };

    tracker.clicks.sort(compare);
  } else {
    const compare = (a, b) => {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
    };

    tracker.clicks.sort(compare);
  }
};

/* export const handleAddIncrement = (values, tracker, createIncrement, updateNumIncrements) => {
    createIncrement(tracker.id, values.value);
    updateNumIncrements(tracker, 1);
  }

export const handleDeleteIncrement = (id, tracker, deleteIncrement, updateNumIncrements) => {
    deleteIncrement(id);
    updateNumIncrements(tracker, -1);
} */
