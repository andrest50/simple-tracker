import {
  ADD_TRACKER,
  ADD_TRACKERS,
  //ADD_INCREMENT,
  //ADD_INCREMENTS,
  //INCREMENT_TRACKER,
  UPDATE_SETTING,
  UPDATE_TRACKER,
  //UPDATE_NUM_INCREMENTS,
  //DELETE_INCREMENT,
  DELETE_TRACKER,
  DELETE_CLICK
} from "./trackersTypes";

const TrackersReducer = (
  state = {
    trackers: [],
    //increments: [],
  },
  action
) => {
  switch (action.type) {
    case ADD_TRACKER:
      return { ...state, trackers: state.trackers.concat(action.payload) };
    case ADD_TRACKERS:
    return { ...state, trackers: action.payload };
    /* case ADD_INCREMENT:
      return { ...state, increments: state.increments.concat(action.payload) };
    case ADD_INCREMENTS:
        return { ...state, increments: action.payload }; */
    /* case INCREMENT_TRACKER:
      return Object.assign({}, state, {
        trackers: state.trackers.map((tracker) => {
          if (tracker.id === action.trackerId) {
            return Object.assign({}, tracker, {
              value: parseInt(tracker.value + action.amount),
              numClicks: tracker.numClicks + 1
            });
          }
          return tracker;
        }),
      }); */
    case UPDATE_SETTING:
        return Object.assign({}, state, {
            trackers: state.trackers.map((tracker) => {
                if (tracker.id === action.tracker.id) {
                return Object.assign({}, tracker, {
                    settings: action.tracker.settings
                });
                }
                return tracker;
            }),
        });
    /* case UPDATE_NUM_INCREMENTS:
      return Object.assign({}, state, {
        trackers: state.trackers.map((tracker) => {
          if (tracker.id === action.trackerId) {
            return Object.assign({}, tracker, {
              numIncrements: tracker.numIncrements + action.amount,
            });
          }
          return tracker;
        }),
      }); */
      case UPDATE_TRACKER:
        return Object.assign({}, state, {
          trackers: state.trackers.map((tracker) => {
            if (tracker.id === action.tracker.id) {
              return Object.assign({}, tracker, {
                tracker: action.tracker
              });
            }
            return tracker;
          }),
        });
    /* case DELETE_INCREMENT:
      return {
        ...state,
        increments: state.increments.filter(
          (increment) => increment.id !== action.payload
        ),
      }; */
    case DELETE_TRACKER:
      return {
        ...state,
        trackers: state.trackers.filter(
          (tracker) => tracker.id !== action.payload
        ),
        /* increments: state.increments.filter(
            (increment) => increment.trackerId !== action.payload
          ) */
      };
    case DELETE_CLICK:
        return Object.assign({}, state, {
            trackers: state.trackers.map((tracker) => {
              if (tracker.id === action.trackerId) {
                return Object.assign({}, tracker, {
                  clicks: action.clicks,
                });
              }
              return tracker;
            }),
          });
    default:
      return state;
  }
};

export default TrackersReducer;
