import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div>
      {message}
    </div>
  )
}

Notification.PropTypes = {
  message: PropTypes.object.isRequired
}

export default Notification