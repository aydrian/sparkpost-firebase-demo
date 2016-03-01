import React from 'react'

const CampaignsList = ({campaigns}) => {
  return (
    <ul className="list-group">
      {campaigns.map((campaign, index) => (
        <li className="list-group-item" key={index}>
          <a href={`/#/campaign/${campaign.name}`}>
            <i className={ campaign.isActive ? 'fa fa-cog fa-spin' : 'fa fa-cog'}></i> {campaign.name}</a></li>
      ))}
    </ul>
  )
}

CampaignsList.propTypes = {
  campaigns: React.PropTypes.array.isRequired
}

export default CampaignsList
