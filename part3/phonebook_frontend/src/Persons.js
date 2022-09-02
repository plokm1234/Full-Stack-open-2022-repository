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
                        <div key={filterName.id}>
                            <form name={filterName.name} id={filterName.id} onSubmit={handleDelete}>
                                {filterName.name} {filterName.number} <button type='submit'>delete</button>
                            </form>
                        </div>
                    )
                }
                )
            }
        </>
    )
}

export default Persons