import React, {useEffect} from 'react'
import Elevator from './components/elevator/Elevator'
import Control from './components/Control'
import {OrderedLinkedList} from './shared-logic/objects/OrderedLinkedList'

function App() {

  useEffect(() => {
    let linked = new OrderedLinkedList("maxFirst")

    const arr = [1,2,0,24,6,7,-5]
    arr.forEach(val => {
      linked.appenedNode(val)
    })

    linked.print()
  },[])

  return (
    <div style={{display:"flex"}}>
      <Control/>
      <Elevator floors={40}/>
    </div>
  );
}

export default App;
