import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'


const Anecdotes = () => {
  const dispatch = useDispatch()

  const anecdotesList = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote =>
      (anecdote.content.toLowerCase().includes(filter.toLowerCase())))
  })

  const vote = (id, content) => {
    dispatch(addVote(id))
    notify(content)
  }

  const notify = (content) => {
    const message = 'You voted for: '
    dispatch(createNotification({ message, content }))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, 5000)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div>

      {anecdotesList.map(anecdote =>
        <div key={anecdote.id} style={style}>

          <div>
            <i> {anecdote.content} </i>
          </div>

          <div>
            has {anecdote.votes} votes {' '}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>

        </div>
      )}

    </div >
  )
}

export default Anecdotes