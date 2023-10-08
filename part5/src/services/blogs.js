import axios from 'axios'
const baseUrl = '/api/blogs'
// const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl} /${id}`, newObject)
  const response = await request
  return response.data
}

const blogService = {
  setToken,
  getAll,
  create,
  update
}

export default blogService