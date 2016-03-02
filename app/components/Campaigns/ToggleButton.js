import React from 'react'

class ToggleButton extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="btn-group" data-toggle="buttons">
        <label className="btn btn-default active">
          <input type="radio" name="active" id="active" autoComplete="off" defaultChecked={this.props.isActive} />Active
        </label>
        <label className="btn btn-default">
          <input type="radio" name="disabled" id="disabled" autoComplete="off" defaultChecked={!this.props.isActive} /> Disabled
        </label>
      </div>
    )
  }
}

export default ToggleButton