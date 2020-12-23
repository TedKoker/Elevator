import Elevator from './components/elevator/Elevator'
import Control from './components/Control'

function App() {
  return (
    <div style={{display:"flex"}}>
      <Control/>
      <Elevator floors={40}/>
    </div>
  );
}

export default App;
