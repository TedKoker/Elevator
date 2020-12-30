import React, {useRef, useEffect, useState} from 'react'
import { connect } from 'react-redux'

import {fixRatio} from '../../shared-logic/canvase/canvas-helpers'
// import {Building} from '../../shared-logic/objects/Building'
import {Building2} from '../../shared-logic/objects/Building2'

function Elevator({floors, ...props}) {

    const canvas = useRef()
    const [floorDimensions, setFloorDimensions] = useState({height: 10, width: 30})
    const [elevatorLocation, setElevatorLocation] = useState(0)
    const [building, setBuilding] = useState()

    useEffect(() => {
        if(!canvas.current) {
            return
        }
        let cnv = canvas.current
        fixRatio(cnv, cnv.getContext("2d"), 1000, 500)
        const building = new Building2(cnv, {x: 150, y:500}, floorDimensions, floors ? floors : 0)
        building.build()
        setBuilding(building)
        // building.animateMove(30)
    }, [canvas])

    useEffect(() => {
        if(building) {
            building.answerCall(props.elevatorCall)

        }
    }, [props.elevatorCall])

    return (
        <div className="elevator">
            <canvas ref={canvas} id="elevators" width="1000" height="500">
                
            </canvas>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        elevatorCall: state.elevatorControl.elevatorDesteny
    }
}

export default connect(mapStateToProps)(Elevator)