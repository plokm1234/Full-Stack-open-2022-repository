import { useEffect, useState } from 'react'
import PersonForm from "./PersonForm.js"
import Filter from "./Filter.js"
import Persons from "./Persons.js"
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [search, setSearch] = useState('')

  useEffect(() => {
      const promise = axios.get('http://localhost:3001/persons')
      promise.then(response => {
        setPersons(response.data)
      })      
    },[])

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