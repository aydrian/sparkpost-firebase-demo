import React from 'react'
import Rebase from 're-base'

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
    this.setState({
      campaign: {
        name: this.props.params.name
      }
    })
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

  handleSubmit = (event) => {
    event.preventDefault()
    let links = this.state.campaign.links || []
    links.push({text: this.refs.optionText.value, link: this.refs.optionLink.value})
    this.setState({
      campaign: {
        links: links
      }
    })
    this.getPreview()
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
    console.log(this.state)
    console.log("preview html", this.preview)
    let links = this.state.campaign.links || []
    return (
      <div className="row">
        <div className="row">
          <h1>{this.state.campaign.name}</h1>
        </div>
        <div className="row">
          <div className="col-md-4">
            <h2>Recipients</h2>
            <p>Email <a href={`mailto:${ this.email}`}>{this.email}</a> to subscribe</p>
            <ul className="list-group">
              {this.state.recipients.map((recipient, index) => (
                <li className="list-group-item" key={index}>{recipient.email} - {recipient.subject}</li>
              ))}
            </ul>
          </div>
          <div className="col-md-8">
            <h2>Email</h2>
            <div dangerouslySetInnerHTML={ {__html: this.state.preview} }></div>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Question" ref="question"/>
              <span className='input-group-btn'>
                <button className="btn btn-default" type="button" onClick={this.handleQuestion}>Set</button>
              </span>
            </div>
            <h3>Add Options</h3>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Option Text" ref="optionText"/>
              <input type="text" className="form-control" placeholder="Option Link" ref="optionLink"/>
              <span className='input-group-btn'>
                <button className="btn btn-default" type="button" onClick={this.handleSubmit}>Add</button>
              </span>
            </div>
            <ul className="list-group">
              {links.map((link, index) => (
                <li className="list-group-item" key={index}>{link.text} - {link.link}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Campaign
