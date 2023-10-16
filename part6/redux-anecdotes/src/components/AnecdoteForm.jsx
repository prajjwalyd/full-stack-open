import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const createNewAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
    notify(content)
    event.target.anecdote.value = ''
  }

  const notify = (content) => {
    const message = 'New anecdote created: '
    dispatch(createNotification({ message, content }))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, 5000)
  }


  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={createNewAnecdote}>
        <input name="anecdote" />
        <button type="submit">
          create
        </button>
      </form>

    </div>
  )
}

export default AnecdoteForm