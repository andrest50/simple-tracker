import {
  ADD_TRACKER,
  ADD_TRACKERS,
  INCREMENT_TRACKER,
  ADD_INCREMENT,
  ADD_INCREMENTS,
  DELETE_INCREMENT,
  DELETE_TRACKER
} from "./trackersTypes";

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

export const createTracker = (name, value) => (dispatch) => {
  const newTracker = {
    name: name,
    value: parseInt(value),
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

export const destroyTracker = (id) => {
  return {
    type: DELETE_TRACKER,
    payload: id,
  };
};

export const deleteTracker = (id) => (dispatch) => {

  return fetch(`http://localhost:3000/trackers/${id}`, {
    method: "DELETE",
  })
  .then((response) => response.json())
  .then((response) => dispatch(destroyTracker(id)))     
};

export const incrementTracker = (trackerId, amount) => {
  return {
    type: INCREMENT_TRACKER,
    trackerId: trackerId,
    amount: amount,
  };
};

export const postIncrementTracker = (trackerId, name, value, amount) => (dispatch) => {
  const changeTrackerVal = {
    id: trackerId,
    name: String(name),
    value: parseInt(value) + parseInt(amount),
  };

  return fetch(`http://localhost:3000/trackers/${trackerId}`, {
    method: "PUT",
    body: JSON.stringify(changeTrackerVal),
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
    .then((tracker) => dispatch(incrementTracker(trackerId, amount)))
    .catch((error) => {
      console.log("Create increment", error.message);
      alert("Your increment could not be created\nError: " + error.message);
    });
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
    value: parseInt(value)
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

export const destroyIncrement = (id) => {
  return {
    type: DELETE_INCREMENT,
    payload: id,
  };
};

export const deleteIncrement = (id) => (dispatch) => {

  return fetch(`http://localhost:3000/increments/${id}`, {
    method: "DELETE",
  })
  .then((response) => response.json())
  .then((response) => dispatch(destroyIncrement(id)))     
};
