import React from 'react'

const LinksList = ({links}) => {
  return (
    <ul className="list-group">
      {links.map((link, index) => (
        <li className="list-group-item" key={index}>{link.text} - {link.link} Clicks: {link.clicks}</li>
      ))}
    </ul>
  )
}

LinksList.propTypes = {
  links: React.PropTypes.array.isRequired
}

export default LinksList