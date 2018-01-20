import React from 'react';

import {connect} from 'react-redux';

import CostumeCreate from './Costume-Create';
import CostumeList from './Costume-List';
import store from '../../appState/store';

import * as actions from './actions';

class Costumes extends React.Component {

  constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.handleInitialize();
	}

	componentWillReceiveProps(nextProps) {
		console.log('next ', nextProps);
		this.setState(this.props.costumes);
  }
	
  render() {
		return (
			<div id="costumeWrapper">
				<CostumeCreate handler={this.props.handleAddCostume} />
				<CostumeList 
				 costumes={this.props.costumes}
				 handleDelete={this.props.handleDeleteCostume}
				 handleUpdate={this.props.handleUpdateCostume}
				 />
			</div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
		costumes: state.costumes
	}
};

const mapDispatchToProps = (dispatch, getState) => ({
	handleInitialize: costume => dispatch(actions.costumeInitialize(costume)),
	handleAddCostume: costume => dispatch(actions.createCostume(costume)),
	handleUpdateCostume: costume => dispatch(actions.updateCostume(costume)),
	handleDeleteCostume: costume => dispatch(actions.deleteCostume(costume))
});

export default connect(mapStateToProps,mapDispatchToProps)(Costumes, CostumeList);
