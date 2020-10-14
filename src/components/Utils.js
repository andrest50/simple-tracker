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
    id: tracker.numClicks,
  };
  tracker.clicks.push(new_click);
  tracker.value += parseInt(amount);
  tracker.numClicks += 1;
  tracker.milestones.map((milestone) => {
    if (tracker.value >= milestone.value && milestone.completed === false){
      milestone.completed = true;
      milestone.completedDate = dateTime;
    }
    if (tracker.value < milestone.value){
      milestone.completed = false;
    }
  });
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

export const sortTrackers = (trackers, state) => {
  if (state === 1) {
    const compare = (a, b) => {
      if (a.value < b.value) {
        return 1;
      }
      if (a.value > b.value) {
        return -1;
      }
      return 0;
    };

    trackers.sort(compare);
  } else if (state === 2) {
    const compare = (a, b) => {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
    };

    trackers.sort(compare);
  } else {
    const compare = (a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    };

    trackers.sort(compare);
  }
};

export const sortMilestones = (tracker, state) => {
  if (state === 1) {
    const compare = (a, b) => {
      if (a.value < b.value) {
        return 1;
      }
      if (a.value > b.value) {
        return -1;
      }
      return 0;
    };
    tracker.milestones.sort(compare);
  } else if (state === 2) {
    const compare = (a, b) => {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    };
    tracker.milestones.sort(compare);
  }
};
