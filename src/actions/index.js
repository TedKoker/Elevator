import {ELEVATOR_DESTENY} from './type'

export const setDestination = (destination, goingUp, calledPoint) => {

    return {
        type: ELEVATOR_DESTENY,
        payload: {destination, goingUp, calledPoint}
    }
}