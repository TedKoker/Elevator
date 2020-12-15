import React, {useRef, useEffect, useState} from 'react'

import {fixRatio} from '../../shared-logic/canvase/canvas-helpers'
import {Building} from '../../shared-logic/objects/Building'

function Elevator({floors}) {

    const canvas = useRef()
    const [floorDimensions, setFloorDimensions] = useState({height: 10, width: 30})
    const [elevatorLocation, setElevatorLocation] = useState(0)

    useEffect(() => {
        if(!canvas.current) {
            return
        }
        let cnv = canvas.current
        fixRatio(cnv, cnv.getContext("2d"), 1000, 500)
        const building = new Building(cnv, {x: 150, y:500}, floorDimensions, floors)
        building.build()
        building.animateMove(30)
    }, [canvas])

    return (
        <div className="elevator">
            <canvas ref={canvas} id="elevators" width="1000" height="500">
                
            </canvas>
        </div>
    )
}

export default Elevator