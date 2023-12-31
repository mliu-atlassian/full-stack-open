/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

import personService from './services/persons'

const Notification = ({ message, error }) => {
  if (message !== null) {
    return <div className={error ? 'error' : 'success'}>{message}</div>
  }
}

const Filter = ({ filter, handleFilterChange }) =>
  <div>filter shown with <input onChange={handleFilterChange} value={filter}></input></div>

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) =>
  <form>
    <div>name: <input onChange={handleNameChange} value={newName} /></div>
    <div>number: <input onChange={handleNumberChange} value={newNumber} /></div>
    <div><button type="submit" onClick={addPerson}>add</button></div>
  </form>

const Persons = ({ persons, filter, removePerson }) =>
  (filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons)
    .map(person => <Person key={person.id} person={person} remove={() => removePerson(person.id)} />)

const Person = ({ person, remove }) => {
  const confirmRemove = () => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      remove()
    }
  }

  return <div>
    {person.name} {person.number}
    <button onClick={confirmRemove}>delete</button>
  </div>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const oldPerson = persons.find((person) => person.name === newName)
    if (oldPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(oldPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== oldPerson.id ? person : returnedPerson))
            setMessage(`Added ${newName}`)
            setError(false)
            setTimeout(() => setMessage(null), 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            setMessage(`Information of ${newName} has already been removed from server`)
            setError(true)
            setTimeout(() => setMessage(null), 5000)
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${newName}`)
          setError(false)
          setTimeout(() => setMessage(null), 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setError(true)
          setMessage(error.response.data.error)
          setTimeout(() => setMessage(null), 5000)
        })
    }

  }

  const removePerson = (id) => {
    personService
      .remove(id)
      .then(() => setPersons(persons.filter(person => person.id !== id)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  )
}

export default App
