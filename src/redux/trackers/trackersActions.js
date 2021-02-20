import {
  ADD_TRACKER,
  ADD_TRACKERS,
  UPDATE_SETTING,
  UPDATE_TRACKER,
  DELETE_CLICK,
  DELETE_TRACKER,
} from "./trackersTypes";

export const addTracker = (tracker) => {
  return {
    type: ADD_TRACKER,
    payload: tracker,
  };
};

export const addTrackers = (trackers) => {
  return {
    type: ADD_TRACKERS,
    payload: trackers,
  };
};

export const handleUpdateTracker = (tracker) => {
  return {
    type: UPDATE_TRACKER,
    tracker: tracker
  }
}

export const handleSetting = (tracker) => {
  return {
    type: UPDATE_SETTING,
    tracker: tracker,
  };
};

export const handleDeleteClick = (trackerId, clicks) => {
  return {
    type: DELETE_CLICK,
    trackerId: trackerId,
    clicks: clicks,
  };
};

export const handleDeleteTracker = (id) => {
  return {
    type: DELETE_TRACKER,
    payload: id,
  };
};

export const fetchTrackers = () => (dispatch) => {
  return fetch("http://localhost:3000/trackers")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.repsonse = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((trackers) => dispatch(addTrackers(trackers)))
    .catch((error) => {
      console.log(error);
    });
};

export const createTracker = (name, value) => (dispatch) => {
  const newTracker = {
    name: name,
    value: parseInt(value),
    numIncrements: 0,
    numClicks: 0,
    increments: [],
    clicks: [],
    notes: [],
    milestones: [],
    settings: {
      bgColor: "#939cbe",
      incColor: "#5E54B9",
      historyColor: "#4196ad",
    }
  };

  return fetch("http://localhost:3000/trackers", {
    method: "POST",
    body: JSON.stringify(newTracker),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.repsonse = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addTracker(response)))
    .catch((error) => {
      console.log("Create trackers ", error.message);
      alert("Your tracker could not be created\nError: " + error.message);
    });
};

export const updateTracker = (tracker) => (dispatch) => {
  const updatedTracker = {
    id: tracker.id,
    name: String(tracker.name),
    value: parseInt(tracker.value),
    numIncrements: parseInt(tracker.numIncrements),
    numClicks: parseInt(tracker.numClicks),
    increments: tracker.increments,
    clicks: tracker.clicks,
    notes: tracker.notes,
    milestones: tracker.milestones,
    settings: tracker.settings
  };

  return fetch(`http://localhost:3000/trackers/${tracker.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedTracker),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.repsonse = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((tracker) => dispatch(handleUpdateTracker(tracker)))
    .catch((error) => {
      console.log("Update tracker", error.message);
      alert("Your tracker could not be updated\nError: " + error.message);
    });
};

export const updateSetting = (tracker) => (dispatch) => {
  const updateTracker = {
    id: tracker.id,
    name: String(tracker.name),
    value: parseInt(tracker.value),
    numIncrements: parseInt(tracker.numIncrements),
    numClicks: parseInt(tracker.numClicks),
    increments: tracker.increments,
    clicks: tracker.clicks,
    notes: tracker.notes,
    milestones: tracker.milestones,
    settings: tracker.settings
  };

  return fetch(`http://localhost:3000/trackers/${tracker.id}`, {
    method: "PUT",
    body: JSON.stringify(updateTracker),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.repsonse = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((tracker) => dispatch(handleSetting(tracker)))
    .catch((error) => {
      console.log("Create increment", error.message);
      alert("Your tracker could not be incremented\nError: " + error.message);
    });
};

export const deleteClick = (tracker, clicks) => (dispatch) => {
  const updateTracker = {
    id: tracker.id,
    name: String(tracker.name),
    value: parseInt(tracker.value),
    numIncrements: tracker.numIncrements,
    numClicks: tracker.numClicks,
    increments: tracker.increments,
    clicks: clicks,
    notes: tracker.notes,
    milestones: tracker.milestones,
    settings: tracker.settings
  };

  return fetch(`http://localhost:3000/trackers/${tracker.id}`, {
    method: "PUT",
    body: JSON.stringify(updateTracker),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.repsonse = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((tracker) => dispatch(handleDeleteClick(tracker.id, clicks)))
    .catch((error) => {
      console.log("Create increment", error.message);
      alert("Your increment could not be created\nError: " + error.message);
    });
};

export const deleteTracker = (id) => (dispatch) => {
  return fetch(`http://localhost:3000/trackers/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((response) => dispatch(handleDeleteTracker(id)));
};

