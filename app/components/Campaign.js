import React from 'react'
import Rebase from 're-base'

//const base = Rebase.createClass(process.env.FIREBASE_URL)
const base = Rebase.createClass('https://sparkpost-demo.firebaseio.com/')

class Campaign extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      recipients: []
    }
  }
  componentDidMount(){
    this.init(this.props.params.name)
  }
  componentWillReceiveProps(nextProps){
    base.removeBinding(this.ref);
    this.init(nextProps.params.name)
  }
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }
  init(campaignName){
    this.ref = base.bindToState(campaignName, {
      context: this,
      asArray: true,
      state: 'recipients'
    });
    this.email = `${campaignName}@hey.aydrian.me`
  }
  render() {
    return (
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
          <h2>Email TODO</h2>
        </div>
      </div>
    )
  }
}

export default Campaign
