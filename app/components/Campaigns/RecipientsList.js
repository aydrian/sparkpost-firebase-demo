import React from 'react'

const RecipientsList = ({recipients}) => {
  return (
    <ul className="list-group">
      {recipients.map((recipient, index) => (
        <li className="list-group-item" key={index}>
          {recipient.email} - {recipient.subject} {recipient.isSent ? <i className="fa fa-paper-plane-o"></i> : ''} {recipient.isOpen ? <i className="fa fa-envelope-o"></i> : ''}</li>
      ))}
    </ul>
  )
}

RecipientsList.propTypes = {
  recipients: React.PropTypes.array.isRequired
}

export default RecipientsList