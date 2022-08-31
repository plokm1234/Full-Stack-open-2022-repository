import { useState } from 'react'
import PersonForm from "./PersonForm.js"
import Filter from "./Filter.js"
import Persons from "./Persons.js"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [search, setSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    let existence = 0
    
    persons.forEach(
      (person) => {
        if(person.name.toLowerCase() === e.target.name.value.toLowerCase()) {
          existence = 1
        }
      }
    )

    if(!existence){
      const newPersons = [
        ...persons,
        { name: e.target.name.value, 
          number: e.target.number.value
        }
      ]
      
      setPersons(newPersons)
    }else{
      alert(`${e.target.name.value} is already added to phonebook`)
    }

  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleChange}/>
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
      <Persons persons={persons} search={search}/>
    </div>
  )
}

export default App