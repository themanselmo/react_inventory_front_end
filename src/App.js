import logo from './logo.svg';
import './App.css';
import { useState, useEffect }  from 'react';

function App() {

  const [inventories, setInventories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    fetch('http://127.0.0.1:5000/inventories')
    .then(res => res.json())
    .then(data =>setInventories(data))
    .catch(error => {
      console.log(error)
    })
  }, [])

  const createInventory = () => {
    const newInventory = {name: name, item_count: 0}
    const reqBody = { 
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    
      //make sure to serialize your JSON body
      body: JSON.stringify(newInventory)
    }

    fetch('http://127.0.0.1:5000/inventories', reqBody)
    .then(res => res.json())
    .then(res => setInventories([...inventories, res]))
  }

  const renderInventories = () => inventories.map((inventory) => (
    <li key={inventory.id}>{inventory.name}, {inventory.item_count}</li>
  ))

  const toggleForm = () => setShowForm(!showForm)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Add, Edit or View your Inventories!
        </p>
        <ul>
          {inventories.length === 0 ? 'No Inventories to display.': renderInventories()}
        </ul>
        <button onClick={toggleForm}>
          New Inventory  
        </button>   
        { showForm && <>
          <input value={name} onChange={(e) => setName(e.target.value)}/>
          <button onClick={createInventory}>Submit</button>
        </>}  
      </header>
    </div>
  );
}

export default App;
