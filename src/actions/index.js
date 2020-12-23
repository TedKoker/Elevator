import {ELEVATOR_DESTENY} from './type'

export const setDestiny = (destiny) => {
    return {
        type: ELEVATOR_DESTENY,
        payload: destiny
    }
}