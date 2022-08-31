import { useState, useEffect } from 'react'

const App = () => {
  const points = { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0 }

  const [vote, setVote] = useState(points)
  
  const [selected, setSelected] = useState(0)

  const [highest, setHighest] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const handleClick = () => {
    const copy = {...vote}
    copy[selected] += 1
    setVote(copy)
  }

  useEffect(() => {
    let temp = vote[0]
    for (const point in vote) {
      if(vote[point] > temp){
        temp = vote[point]
      }
    }
    const key = Object.keys(vote).find(key => vote[key] === temp)
    setHighest(key)
  }, [vote]);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <button onClick={handleClick}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * (7 - 0) + 0)) }>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[highest]}</p>
      <p>has {vote[highest]} votes</p>
    </div>
  )
}

export default App