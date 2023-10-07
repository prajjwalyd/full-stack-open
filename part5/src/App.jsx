import { useState, useEffect } from 'react'
import { Blog } from './components/Blog'
import { ErrorNotification, SuccessNotification } from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs)
      )
  }, [])

  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }

  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showSuccessMessage(`Welcome ${user.name}`)
    } catch (exception) {
      showErrorMessage('wrong credentials')
    }
  }

  const loginForm = () => (

    <form onSubmit={handleLogin}>

      <div>
        username: {' '}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        password: {' '}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <button type="submit">
        login
      </button>

    </form>

  )

  const blogForm = () => (
    <div>
      <h3> All blogs</h3>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>

  )

  return (
    <div>

      <h2>log in to application</h2>

      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />

      {user === null ?
        (<div>
          { loginForm() }
        </div>
        ) :
        (<div>
          <p> {user.name} logged in </p>
          { blogForm() }
        </div>
        )
      }

    </div>
  )
}

export default App