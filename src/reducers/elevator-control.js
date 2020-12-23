import {ELEVATOR_DESTENY} from '../actions/type'

export default function (state = {}, action) {
    switch(action.type) {
        case ELEVATOR_DESTENY:
            return {...state, elevatorDesteny: action.payload}
        default:
            return state
    }
}