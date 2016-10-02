import React from 'react'

const RecipientItem = ({recipient, key}) => {
  return (
    <li className="list-group-item" key={key}>
      {recipient.email} - {recipient.subject} {recipient.isSent ? <i className="fa fa-paper-plane-o"></i> : ''} {recipient.isOpen ? <i className="fa fa-envelope-o"></i> : ''}
    </li>
  )
}

RecipientItem.propTypes = {
  recipient: React.PropTypes.object.isRequired
}

const RecipientsList = ({recipients}) => {
  return (
    <ul className="list-group">
      {recipients.map((recipient, index) => (
        <RecipientItem recipient={recipient} key={index} />
      ))}
    </ul>
  )
}

RecipientsList.propTypes = {
  recipients: React.PropTypes.array.isRequired
}

export default RecipientsList
