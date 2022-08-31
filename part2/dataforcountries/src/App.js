import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  const [countries, serCountries] = useState([])
  const [filterName, setFilterName] = useState(countries)
  const [showDetails, setShowDetails] = useState(false)
  const [weather, setWeather] = useState([])
  const [capital, setCapital] = useState('')


  const [search, setSearch] = useState('')

  useEffect(() => {
      const promise = axios.get('https://restcountries.com/v3.1/all')
      promise.then(response => {
        serCountries(response.data)
      })      
    },[])

  useEffect(() => {
      if(filterName.length === 1){
        const promise = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
        promise.then(response => {
          setWeather(response.data)
        })   
      }   
    },[filterName])

  useEffect(() => {
    const temp = countries.filter(
      (country) => {
        return country.name.common.toLowerCase().includes(search.toLowerCase())
      }
    )
    if(temp.length === 1){
      setCapital(temp[0].capital[0])
      setFilterName(temp)
    }else if(temp.length < 10 ){
      setFilterName(temp)
    }else{
      setFilterName([])
    }
  }, [countries, search])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div>
      <h2>find countries <input onChange={handleChange}/></h2>
      {   
        filterName.length > 1 ?
        filterName.map(
          (filterName) => {
            return(
              <div key={filterName.name.common}>
                {showDetails ? <h1>{filterName.name.common}</h1> : filterName.name.common} <button onClick={() => setShowDetails(!showDetails)}>show</button>
                {showDetails ? 
                  <div>
                    <p>capital {filterName.capital[0]}</p>
                    <p>area {filterName.area}</p>

                    <h3>languages: </h3>
                    <ul>
                      {
                        Object.keys(filterName.languages).map((key, index) => {
                          return <li>{filterName.languages[key]}</li>
                        })
                      }
                    </ul>
                    <img src={filterName.flags.png} width="150px" height="150px" alt={filterName.name.common}/>
                  </div>
                  :
                  <></>
                }
              </div>
            )
          }
        )
        :
        filterName.length === 1 ?
        <div>
          <h1>{filterName[0].name.common}</h1>

          <p>capital {filterName[0].capital[0]}</p>
          <p>area {filterName[0].area}</p>

          <h3>languages: </h3>
          <ul>
            {
              Object.keys(filterName[0].languages).map((key, index) => {
                return <li key={key}>{filterName[0].languages[key]}</li>
              })
            }
          </ul>
          <img src={filterName[0].flags.png} width="150px" height="150px" alt={filterName[0].name.common}/>
          
          <h1>Weather in {filterName[0].capital[0]}</h1>
          {
            weather ? 
            <div>
              <p>temperature {weather.main.temp} Celcius</p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main}/>
              <p>wind {weather.wind.speed} m/s</p>
            </div>
            :
            <></>
          }
        </div>
        :
        <div>Too many matches, specify another filter</div>
      }
    </div>
  )
}

export default App