import { ADD_TRACKER, ADD_TRACKERS, ADD_INCREMENT, ADD_INCREMENTS, INCREMENT_TRACKER } from './trackersTypes'

const TrackersReducer = (
    state = {
        trackers: [],
        increments: []
    },
    action
) => {
    switch(action.type){
        case ADD_TRACKERS:
            return {...state, trackers: action.payload}
        case ADD_TRACKER:
            return {...state, trackers: state.trackers.concat(action.payload)}
        case ADD_INCREMENTS:
            return {...state, increments: action.payload}
        case ADD_INCREMENT:
            return {...state, increments: state.increments.concat(action.payload)}
        case INCREMENT_TRACKER:
            return Object.assign({}, state, {
                trackers: state.trackers.map((tracker, trackerId) => {
                    if(trackerId === action.trackerId){
                        return Object.assign({}, tracker, {
                            value: tracker.value + action.amount
                        })
                    }
                    return tracker
                })
            })
            //return {...state, value: state.value + action.payload}
        default: return state
    }
}

export default TrackersReducer