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
    return (
      <div id="kanban">
        {
            costumes.map((costume, i) =>
            <CostumeItem handleDelete={this.props.handleDelete}
              handleUpdate={this.props.handleUpdate}
              key={i} costume={costume} 
            />)
        }
      </div>
    )
  }
}

export default CostumeList;