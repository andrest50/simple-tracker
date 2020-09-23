import { combineReducers } from 'redux';
import TrackersReducer from './trackers/trackersReducer'

const rootReducer = (combineReducers({
    trackers: TrackersReducer
}))

export default rootReducer