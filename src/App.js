import React, {useEffect} from 'react'
import Elevator from './components/elevator/Elevator'
import Control from './components/Control'
import {OrderedLinkedList} from './shared-logic/objects/OrderedLinkedList'

function App() {

  useEffect(() => {
    let linked = new OrderedLinkedList("minFirst")

    const arr = [10,2,0,4, 2 ,6, 2, 2, 2,7,-5]
    arr.forEach(val => {
      linked.appenedNode(val)
    })

    // linked.print()
    // linked.removeNext()
    // linked.print()
    // linked.removeNext()
    // linked.print()
    // linked.appenedNode(-2)
    // linked.print()
    // // debugger
    // linked.appenedNode(-1)
    // linked.print()
    // linked.removeNext()
    // linked.print()
  },[])

  return (
    <div style={{display:"flex"}}>
      <Control/>
      <Elevator floors={40}/>
    </div>
  );
}

export default App;
