import {
  ADD_TRACKER,
  ADD_TRACKERS,
  ADD_INCREMENT,
  ADD_INCREMENTS,
  INCREMENT_TRACKER,
  UPDATE_SETTING,
  UPDATE_NUM_INCREMENTS,
  DELETE_CLICK,
  DELETE_INCREMENT,
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

export const addIncrement = (increment) => {
  return {
    type: ADD_INCREMENT,
    payload: increment,
  };
};

export const addIncrements = (increments) => {
  return {
    type: ADD_INCREMENTS,
    payload: increments,
  };
};

export const handleIncrementTracker = (trackerId, amount) => {
  return {
    type: INCREMENT_TRACKER,
    trackerId: trackerId,
    amount: amount,
  };
};

export const handleSetting = (tracker) => {
  return {
    type: UPDATE_SETTING,
    tracker: tracker,
  };
};

export const handleUpdateNumIncrements = (trackerId, amount) => {
  return {
    type: UPDATE_NUM_INCREMENTS,
    trackerId: trackerId,
    amount: amount,
  };
};

export const handleDeleteClick = (trackerId, clicks) => {
  return {
    type: DELETE_CLICK,
    trackerId: trackerId,
    clicks: clicks,
  };
};

export const handleDeleteIncrement = (id) => {
  return {
    type: DELETE_INCREMENT,
    payload: id,
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
    clicks: [],
    settings: {
      bgColor: "#939cbe",
      incColor: "#5E54B9"
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

export const incrementTracker = (tracker, amount) => (dispatch) => {
  const updateTracker = {
    id: tracker.id,
    name: String(tracker.name),
    value: parseInt(tracker.value) + parseInt(amount),
    numIncrements: parseInt(tracker.numIncrements),
    numClicks: parseInt(tracker.numClicks) + 1,
    clicks: tracker.clicks,
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
    .then((tracker) => dispatch(handleIncrementTracker(tracker.id, amount)))
    .catch((error) => {
      console.log("Create increment", error.message);
      alert("Your tracker could not be incremented\nError: " + error.message);
    });
};

export const updateSetting = (tracker) => (dispatch) => {
  const updateTracker = {
    id: tracker.id,
    name: String(tracker.name),
    value: parseInt(tracker.value),
    numIncrements: parseInt(tracker.numIncrements),
    numClicks: parseInt(tracker.numClicks),
    clicks: tracker.clicks,
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

export const fetchIncrements = () => (dispatch) => {
  return fetch("http://localhost:3000/increments")
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
    .then((increments) => dispatch(addIncrements(increments)))
    .catch((error) => {
      console.log(error);
    });
};

export const createIncrement = (trackerId, value) => (dispatch) => {
  const newIncrement = {
    trackerId: trackerId,
    value: parseInt(value),
  };

  return fetch("http://localhost:3000/increments/", {
    method: "POST",
    body: JSON.stringify(newIncrement),
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
    .then((increment) => dispatch(addIncrement(increment)))
    .catch((error) => {
      console.log("Create increment ", error.message);
      alert("Your increment could not be created\nError: " + error.message);
    });
};

export const updateNumIncrements = (tracker, amount) => (dispatch) => {
  const updateTracker = {
    id: tracker.id,
    name: String(tracker.name),
    value: parseInt(tracker.value),
    numIncrements: parseInt(tracker.numIncrements) + parseInt(amount),
    numClicks: parseInt(tracker.numClicks),
    clicks: tracker.clicks,
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
    .then((response) => dispatch(handleUpdateNumIncrements(tracker.id, amount)))
    .catch((error) => {
      console.log("Create increment ", error.message);
      alert("Your numIncrements could not be updated\nError: " + error.message);
    });
};

export const deleteClick = (tracker, clicks) => (dispatch) => {
  const updateTracker = {
    id: tracker.id,
    name: String(tracker.name),
    value: parseInt(tracker.value),
    numIncrements: tracker.numIncrements,
    numClicks: tracker.numClicks,
    clicks: clicks,
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

export const deleteIncrement = (id) => (dispatch) => {
  return fetch(`http://localhost:3000/increments/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((response) => dispatch(handleDeleteIncrement(id)));
};
