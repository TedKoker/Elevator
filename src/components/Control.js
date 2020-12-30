import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

function Control(props) {

    const addDestiny = (e) => {
        const floor = Number(e.currentTarget.getAttribute("floor"))
        if(e.target.getAttribute("direction")) {
            props.setDestination(floor, e.target.getAttribute("direction")==="up", true)
        }

    }

    const pushListItem = (text, floor) => {
        return (
            <li key={floor} floor={floor} onClick={addDestiny}>
                {text+"  |  "} 
                <a direction="up">Up | </a> 
                <a direction="down"> Down</a>
            </li>
        )
    }

    const [floors] = useState(() => {
        const tmp = []
        let text
        for(let i=0; i<40; i++) {
            if(i+1 > 3) {
                text = `${i+1}th floor`
            } else if(i+1 === 3) {
                text = `${i+1}rd floor`
            } else if(i+1 === 2) {
                text = `${i+1}nd floor`
            } else if(i+1 === 1) {
                text = `${i+1}st floor`
            }
            tmp.push(pushListItem(text, i+1))
        }

        return tmp
    })

    return (
        <div>
            <ul>
                {floors.map(floor => floor)}
            </ul>
        </div>
    )
}



export default connect(null, actions)(Control)