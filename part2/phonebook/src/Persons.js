import { useState, useEffect } from 'react'

const Persons = ({persons, search, handleDelete}) => {
    const [filterName, setFilterName] = useState(persons)  

    useEffect(() => {
        let temp = persons
        if(search){
            temp = persons.filter(
                (person) => {
                    return person.name.toLowerCase().includes(search.toLowerCase())
                }
            )
        }
        setFilterName(temp)
      }, [persons, search])
    
    return (
        <>
            {
                filterName.map(
                (filterName) => {
                    return(
                    <form name={filterName.name} id={filterName.id} key={filterName.name} onSubmit={handleDelete}>
                        <div>{filterName.name} {filterName.number} <button type='submit'>delete</button></div>
                    </form>
                    )
                }
                )
            }
        </>
    )
}

export default Persons