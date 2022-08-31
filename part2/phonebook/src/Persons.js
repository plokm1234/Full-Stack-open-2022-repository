import { useState, useEffect } from 'react'

const Persons = ({persons, search}) => {
    const [filterName, setFilterName] = useState(persons)  

    useEffect(() => {
        const temp = persons.filter(
          (person) => {
            return person.name.toLowerCase().includes(search.toLowerCase())
          }
        )
        setFilterName(temp)
      }, [persons, search])
    
    return (
        <>
            {
                filterName.map(
                (filterName) => {
                    return(
                    <div key={filterName.name}>
                        {filterName.name} {filterName.number}
                    </div>
                    )
                }
                )
            }
        </>
    )
}

export default Persons