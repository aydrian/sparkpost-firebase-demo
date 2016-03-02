import React from 'react'
import Rebase from 're-base'
import RecipientsList from './Campaigns/RecipientsList'
import LinksList from './Campaigns/LinksList'
import AddLink from './Campaigns/AddLink'
import TemplatePreview from './Campaigns/TemplatePreview'

//const base = Rebase.createClass(process.env.FIREBASE_URL)
const base = Rebase.createClass('https://sparkpost-demo.firebaseio.com/')

class Campaign extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      campaign: {},
      recipients: []
    }
  }
  componentDidMount(){
    this.init(this.props.params.name)
  }
  componentWillReceiveProps(nextProps){
    base.removeBinding(this.campaignRef);
    base.removeBinding(this.recipientsRef);
    this.init(nextProps.params.name)
  }
  componentWillUnmount(){
    base.removeBinding(this.campaignRef);
    base.removeBinding(this.recipientsRef);
  }
  init(campaignName){
    this.campaignRef = base.syncState(`campaigns/${campaignName}`, {
      context: this,
      state: 'campaign'
    });
    this.recipientsRef = base.bindToState(`recipients/${campaignName}`, {
      context: this,
      asArray: true,
      state: 'recipients'
    })
    this.email = `${campaignName}@hey.aydrian.me`
    this.getPreview()
  }
  getPreview(){
    fetch(`/campaigns/${this.props.params.name}/preview`)
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        preview: json.html
      })
    });
  }

  handleAddLink(newLink) {
    event.preventDefault()
    let links = this.state.campaign.links || []
    newLink.clicks = 0
    links.push(newLink)
    this.setState({
      campaign: {
        links: links
      }
    })
    this.getPreview()
  };

  handleIsActive = (event) => {
    event.preventDefault()
    this.setState({
      campaign: {
        isActive: !this.state.campaign.isActive
      }
    })
  };

  handleQuestion = (event) => {
    event.preventDefault()
    this.setState({
      campaign: {
        question: this.refs.question.value
      }
    })
    this.getPreview()
  };

  render() {
    let links = this.state.campaign.links || []
    return (
      <div className="row">
        <div className="row"><a href="/">Back to Campaign List</a></div>
        <div className="row">
          <div className="col-md-9">
            <h1>{this.state.campaign.name}</h1>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-primary" onClick={this.handleIsActive}>{this.state.campaign.isActive? "Stop Campaign" : "Start Campaign"}</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <h2>Recipients</h2>
            <p>Email <a href={`mailto:${ this.email}`}>{this.email}</a> to subscribe</p>
            <RecipientsList recipients={this.state.recipients} />
          </div>
          <div className="col-md-8">
            <h2>Email</h2>
            <TemplatePreview>{ this.state.preview }</TemplatePreview>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Question" defaultValue={this.state.campaign.question} ref="question"/>
              <span className='input-group-btn'>
                <button className="btn btn-default" type="button" onClick={this.handleQuestion}>Set</button>
              </span>
            </div>
            <p>Add Links</p>
            <AddLink addLink={(newLink) => this.handleAddLink(newLink)} />
            <LinksList links={links} />
          </div>
        </div>
      </div>
    )
  }
}

export default Campaign
