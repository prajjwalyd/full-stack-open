import { changeFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    dispatch(changeFilter(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div>
      <div style={style}>
        <h2> filter {' '}
          <input onChange={handleFilterChange} />
        </h2>
      </div>

    </div>
  )
}

export default AnecdoteFilter