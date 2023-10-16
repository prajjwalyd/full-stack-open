import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(({ notification }) => {
    return notification
  })

  const style = {
    border: 'dashed',
    padding: 10,
    borderWidth: 3,
  }

  return (
    notification.content &&
    <div style={style}>
      <div>
        <b> {notification.message} </b>
        <i> {notification.content} </i>
      </div>
    </div >

  )

}

export default Notification