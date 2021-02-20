import {
  ADD_TRACKER,
  ADD_TRACKERS,
  UPDATE_SETTING,
  UPDATE_TRACKER,
  DELETE_TRACKER,
  DELETE_CLICK
} from "./trackersTypes";

const TrackersReducer = (
  state = {
    trackers: [],
  },
  action
) => {
  switch (action.type) {
    case ADD_TRACKER:
      return { ...state, trackers: state.trackers.concat(action.payload) };
    case ADD_TRACKERS:
    return { ...state, trackers: action.payload };
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
    case DELETE_TRACKER:
      return {
        ...state,
        trackers: state.trackers.filter(
          (tracker) => tracker.id !== action.payload
        ),
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
