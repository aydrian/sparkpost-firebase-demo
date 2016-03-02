import React from 'react';

class AddLink extends React.Component {
  handleSubmit = (event) => {
    var newLink = {
      text: this.refs.text.value,
      link: this.refs.link.value
    }
    this.refs.text.value = '';
    this.refs.link.value = '';

    this.props.addLink(newLink)
  };

  render(){
    return (
      <form className="form-inline">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="text" ref="text"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="link" ref="link"/>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="button" onClick={this.handleSubmit}>Add</button>
        </div>
      </form>
    )
  }
}

AddLink.propTypes = {
  addLink: React.PropTypes.func.isRequired
};

export default AddLink
