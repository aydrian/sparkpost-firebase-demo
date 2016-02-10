import React from 'react'
import ReactDOM from 'react-dom'
import Rebase from 're-base'

//const base = Rebase.createClass(process.env.FIREBASE_URL)
const base = Rebase.createClass('https://sparkpost-demo.firebaseio.com/')

class Hello extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      recipients: []
    }
  }
  componentDidMount(){
    this.init('test-list')
  }
  componentWillReceiveProps(nextProps){
    base.removeBinding(this.ref);
    this.init('test-list')
  }
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }
  init(listname){
    this.ref = base.bindToState(listname, {
      context: this,
      asArray: true,
      state: 'recipients'
    });
  }
  render() {
    return (
      <div>
        <h1>SparkPost w/ React & Firebase</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2>Recipients</h2>
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
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Hello />, document.getElementById('root'))
