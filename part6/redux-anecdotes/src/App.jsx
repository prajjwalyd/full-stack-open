import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdoteService'
import { setAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteFilter from './components/AnecdoteFilter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      .getAll()
      .then(anecdotes =>
        dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <Notification />
      <h1>Anecdotes</h1>
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )

}

export default App