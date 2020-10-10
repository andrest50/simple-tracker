export const handleIncrement = (tracker, amount, updateTracker) => {
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
    value: parseInt(tracker.value + amount),
    date: dateTime,
    id: tracker.numClicks
  };
  tracker.clicks.push(new_click);
  tracker.value += parseInt(amount);
  tracker.numClicks += 1;
  updateTracker(tracker);
  //incrementTracker(tracker, amount);
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