import React from 'react'
import Rebase from 're-base'
import AddCampaign from './Campaigns/AddCampaign'
import CampaignsList from './Campaigns/CampaignsList'

const base = Rebase.createClass('https://sparkpost-demo.firebaseio.com/')

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      campaigns: []
    }
  }
  componentDidMount(){
    this.ref = base.bindToState("campaigns", {
      context: this,
      asArray: true,
      state: 'campaigns'
    });
  }
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  handleAddCampaign(newCampaign){
    let router = this.context.router;
    base.post(`campaigns/${newCampaign}`, {
      data: {
        name: newCampaign,
          isActive: false
      },
      then(){
        router.push(`campaign/${newCampaign}`)
      }
    })
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Select a Campaign</h2>
        <AddCampaign addCampaign={(newCampaign) => this.handleAddCampaign(newCampaign)} />
        <CampaignsList campaigns={this.state.campaigns} />
      </div>
    )
  }
}

Home.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Home
