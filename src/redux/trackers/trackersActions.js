import {
  ADD_TRACKER,
  ADD_TRACKERS,
  ADD_INCREMENT,
  ADD_INCREMENTS,
  INCREMENT_TRACKER,
  UPDATE_NUM_INCREMENTS,
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

export const incrementTracker = (trackerId, amount) => {
  return {
    type: INCREMENT_TRACKER,
    trackerId: trackerId,
    amount: amount,
  };
};

export const handleUpdateNumIncrements = (trackerId, amount) => {
  return {
    type: UPDATE_NUM_INCREMENTS,
    trackerId: trackerId,
    amount: amount,
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
    clicks: []
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

export const postIncrementTracker = (tracker, amount) => (dispatch) => {
  const updateTracker = {
    id: tracker.id,
    name: String(tracker.name),
    value: parseInt(tracker.value) + parseInt(amount),
    numIncrements: tracker.numIncrements,
    clicks: tracker.clicks
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
    .then((tracker) => dispatch(incrementTracker(tracker.id, amount)))
    .catch((error) => {
      console.log("Create increment", error.message);
      alert("Your increment could not be created\nError: " + error.message);
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
    numIncrements: tracker.numIncrements + amount,
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
