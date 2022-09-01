import { useEffect, useState } from 'react'
import PersonForm from "./PersonForm.js"
import Filter from "./Filter.js"
import Persons from "./Persons.js"
import personService from './services/server.js'
import Notification from './Notification.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [successfulMessage, setSuccessfulMessage] = useState(null)

  useEffect(() => {
      const promise = personService.getAll()
      promise.then(response => {
        setPersons(response.data)
      })      
    },[])

  const handleSubmit = (e) => {
    e.preventDefault()

    let existence = 0
    let id
    const name = e.target.name.value
    
    persons.forEach(
      (person) => {
        if(person.name.toLowerCase() === e.target.name.value.toLowerCase()) {
          existence = 1
          id = person.id
        }
      }
    )

    if(!existence){
      const newPersons = { 
        name: e.target.name.value, 
        number: e.target.number.value
      }

      personService.create(newPersons).then(() => {
        personService.getAll().then(res => setPersons(res.data))
      })

      setSuccessfulMessage(`Added ${name}`)

    }else{
      const confirm = window.confirm(`${e.target.name.value} is already added to phonebook, replace the old number with a new one?`)
      if(confirm){
        personService.update(id, {
          name: e.target.name.value, 
          number: e.target.number.value
        }).then(() => personService.getAll().then(res => setPersons(res.data)))
        .catch(error => {
          console.log(error)
          setMessage(`Information of ${name} has already been removed from server`)
        })
      }
    }

    e.target.name.value = ''
    e.target.number.value = ''
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    const confirm = window.confirm(`Delete ${e.target.name}?`)
    if(confirm){
      personService.handleDelete(e.target.id).then(
        () => personService.getAll().then(res => setPersons(res.data))
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} successfulMessage={successfulMessage}/>
      <Filter handleChange={handleChange}/>
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} handleDelete={handleDelete}/>
    </div>
  )
}

export default App