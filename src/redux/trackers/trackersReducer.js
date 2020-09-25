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

const TrackersReducer = (
  state = {
    trackers: [],
    increments: [],
  },
  action
) => {
  switch (action.type) {
    case ADD_TRACKER:
      return { ...state, trackers: state.trackers.concat(action.payload) };
    case ADD_TRACKERS:
    return { ...state, trackers: action.payload };
    case ADD_INCREMENT:
      return { ...state, increments: state.increments.concat(action.payload) };
    case ADD_INCREMENTS:
        return { ...state, increments: action.payload };
    case INCREMENT_TRACKER:
      return Object.assign({}, state, {
        trackers: state.trackers.map((tracker, trackerId) => {
          if (trackerId === action.trackerId) {
            return Object.assign({}, tracker, {
              value: tracker.value + action.amount,
            });
          }
          return tracker;
        }),
      });
    case UPDATE_NUM_INCREMENTS:
      return Object.assign({}, state, {
        trackers: state.trackers.map((tracker, trackerId) => {
          if (trackerId === action.trackerId) {
            return Object.assign({}, tracker, {
              numIncrements: tracker.numIncrements + action.amount,
            });
          }
          return tracker;
        }),
      });
    case DELETE_INCREMENT:
      return {
        ...state,
        increments: state.increments.filter(
          (increment) => increment.id !== action.payload
        ),
      };
    case DELETE_TRACKER:
      return {
        ...state,
        trackers: state.trackers.filter(
          (tracker) => tracker.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default TrackersReducer;
