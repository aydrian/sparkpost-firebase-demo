import React from 'react'

const LinksItem = ({link, key}) => {
  return (
    <li className="list-group-item" key={key}>{link.text} - {link.link} Clicks: {link.clicks}</li>
  );
};

LinksItem.propTypes = {
  link: React.PropTypes.object.isRequired
}

const LinksList = ({links}) => {
  return (
    <ul className="list-group">
      {links.map((link, index) => (
        <LinksItem link={link} key={index} />
      ))}
    </ul>
  )
}

LinksList.propTypes = {
  links: React.PropTypes.array.isRequired
}

export default LinksList
