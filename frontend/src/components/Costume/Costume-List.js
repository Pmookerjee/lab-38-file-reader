import React from 'react';

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import CostumeItem from './Costume-Item';

class CostumeList extends React.Component {

componentWillReceiveProps() {
  this.setState(this.props.costumes);
}
  render() {

    const costumes = this.props.costumes;
    console.log('costumes is ', costumes)
    return [
      <li id="logoutButton"><Link id='logoutLink' to='/'>Logout</Link></li> ,     
      <div id="kanban">
        {
            costumes.map(costume =>
            <CostumeItem handleDelete={this.props.handleDelete}
              handleUpdate={this.props.handleUpdate}
              key={costume.id} costume={costume} 
            />)
        }
      </div>
    ]
  }
}

export default CostumeList;