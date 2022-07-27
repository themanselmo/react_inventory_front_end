import logo from './logo.svg';
import './App.css';
import { useState, useEffect }  from 'react';

function App() {

  const [inventories, setInventories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [showItemForm, setShowItemForm] = useState(false)
  const [name, setName] = useState('')
  const [itemName, setItemName] = useState('')
  const [itemDesc, setItemDesc] = useState('')
  const [itemCat, setItemCat] = useState('')
  const [itemQuant, setItemQuant] = useState(null)
  const [selectedInventoryId, setSelectedInventoryId] = useState(null)

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
    
      body: JSON.stringify(newInventory)
    }

    fetch('http://127.0.0.1:5000/inventories', reqBody)
    .then(res => res.json())
    .then(res => setInventories([...inventories, res]))
  }

  const createItem = () => {
    const newItem = {
      name: itemName, 
      description: itemDesc, 
      quantity: itemQuant,
      category: itemCat,
      inventory_id: selectedInventoryId
    }
    const reqBody = { 
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    
      body: JSON.stringify(newItem)
    }
    debugger
    fetch('http://127.0.0.1:5000/items', reqBody)
    .then(res => res.json())
    .then(res => console.log(res))
  }

  const updateInventory = () => {

  }

  const deleteInventory = () => {
    
  }

  const renderInventories = () => inventories.map((inventory) => (
    <li key={inventory.id} onClick={() => toggleItemForm(inventory.id)}>{inventory.name}, {inventory.item_count}</li>
  ))

  const toggleForm = () => setShowForm(!showForm)
  const toggleItemForm = (inventoryId) => {
    setShowItemForm(!showItemForm)
    setSelectedInventoryId(inventoryId)
  }

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
        { 
          showForm && <>
            <input value={name} onChange={(e) => setName(e.target.value)}/>
            <button onClick={createInventory}>Submit</button>
          </>
        }
        {
          showItemForm && <>
            <input placeholder="name" value={itemName} onChange={(e) => setItemName(e.target.value)}/>
            <input placeholder="desc" value={itemDesc} onChange={(e) => setItemDesc(e.target.value)}/>
            <input placeholder="quantity" value={itemQuant} onChange={(e) => setItemQuant(e.target.value)}/>
            <input placeholder="category" value={itemCat} onChange={(e) => setItemCat(e.target.value)}/>
            <button onClick={createItem}>Create Item</button>
          </>
        }
      </header>
    </div>
  );
}

export default App;
