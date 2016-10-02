import React from 'react';

class AddCampaign extends React.Component {
  handleSubmit(){
    var newCampaign = this.campaign.value;
    this.campaign.value = '';
    this.props.addCampaign(newCampaign)
  }
  setRef(ref){
    this.campaign = ref;
  }
  render(){
    return (
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Add New Campaign" ref={(ref) => this.setRef(ref)}/>
        <span className='input-group-btn'>
          <button className="btn btn-default" type="button" onClick={() => this.handleSubmit()}>Add</button>
        </span>
      </div>
    )
  }
}

AddCampaign.propTypes = {
  addCampaign: React.PropTypes.func.isRequired
};

export default AddCampaign
