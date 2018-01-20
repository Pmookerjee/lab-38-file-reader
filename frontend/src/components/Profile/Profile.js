import React from 'react';

import {connect} from 'react-redux';
import * as actions from './actions';
import {renderIf, filePreview} from '../../../lib/utils';

const initialState = {
  firstname: '',
  lastname: '',
  about: '',
	avatar: ''
}

class Profile extends React.Component {
    
    constructor(props) {
        
        super(props);
        
        this.state = Object.assign(initialState, this.props.profile);
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    componentWillReceiveProps(nextProps) {
			if (nextProps.profile) this.setState(nextProps.profile); 
			let preview = null;
			console.log('preview is ', preview)
			this.setState({preview});   
		}
    
    handleChange(e) {
			this.setState({[e.target.name]:(e.target.value)});
    }
    
    handleSubmit(e) {
				e.preventDefault();
				this.props.updateProfile(Object.assign({}, this.props.profile, this.state));
		}
		
		handleFile(e) {
			let avatar = e.target.files[0];
			this.setState({avatar});
			filePreview(avatar)
				.then(preview => { console.log('preview in Profile handleFile is ', preview) 
				this.setState({preview})})
				.catch(console.error);
		}

    render() {  

			return (
				<form className="profileForm" onSubmit={this.handleSubmit}>			
				<label>
					<span>First Name</span>
					<input 
						type="text"
						name="firstname"
						value={this.state.firstname}
						onChange={this.handleChange}/>
				</label>	
				<label>
					<span>Last Name</span>
					<input 
						type="text"
						name="lastname"
						value={this.state.lastname}
						onChange={this.handleChange}/>
				</label>	
				<label>
					<span>Describe Yourself</span>
					<textarea 
						name="about"
						value={this.state.about}
						onChange={this.handleChange}/>
				</label>
				<label>
					<figure>
						<img src={this.state.avatar} />
						<figcaption>Avatar</figcaption>
					</figure>
					{
						renderIf(this.state.preview, 
							<figure>
								<img src={this.state.preview}/>
								<figcaption>New Avatar</figcaption>
							</figure>)
					}
						<input 
						  id='fileInput'
							name="avatar"
							type="file"
							onChange={this.handleFile}
						/>        
				</label>
				<button id='profileSave' type="submit">Save</button> 
				</form>
			)
  } 
}

const mapStateToProps = state => ({
   profile:state.profile
});

const mapDispatchToProps = (dispatch, getState) => ({
    updateProfile: user => dispatch(actions.updateProfile(user)),
    deleteProfile: user => dispatch(actions.deleteProfile(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(Profile);