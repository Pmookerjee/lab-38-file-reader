import React from 'react';
import {renderIf} from '../../../lib/utils';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import history from '../../../lib/history';

import AuthForm from './Auth-form';
import Costumes from '../Costume/Costumes';
import * as authActions from './actions';


class Landing extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      loggedIn: this.props.loggedIn,
      authError: false,
      path: this.props.location.pathname,
      message: 'Authentication credentials failed!',
      auth: this.props.auth
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this); 
    this.handleLogout = this.handleLogout.bind(this); 
    
  }

  componentWillReceiveProps(nextProps) {
    let loggedIn = nextProps.loggedIn;
    let path = nextProps.location.pathname;
    this.setState({loggedIn, path}); 
  }

  handleLogin(user) {
    this.props.login(user)
      .then(() => {
        console.log('in the login then')
        let loggedIn = true;
        this.props.updateAuth(loggedIn, '/costumes');
        this.props.history.push('/costumes')        
      })
      .catch(() => {
        console.log('in the login catch') 
        let authError = true;
        let loggedIn = false;
        this.setState({authError});
        this.props.updateAuth(loggedIn);        
        console.error('Authentication Error: Login Failed')
        this.props.history.push('/')                
      });
  }

  handleSignup(user) {
    this.props.signup(user)
    .then(user => { 
      if(user) {
        let loggedIn = true;    
        this.props.updateAuth(loggedIn);
        this.props.history.push('/costumes')
      }
    })
    .catch(e => {
      console.log('in the catch ')
      
      let authError = true;
      let loggedIn = false;
      let message = 'Error: That user already exists!';      
      this.setState({authError, message});
      this.props.updateAuth(loggedIn);      
    });
  }

  handleLogout() {
    this.props.logout(this.state.auth);
    let loggedIn = false;
    this.props.updateAuth(loggedIn);
    this.props.history.push('/');      
  }

  render() {
     let path =  location.pathname;

     return (

      <div className="landing">
       {renderIf(path === '/login',
        <div>
          <AuthForm action='login'
           key='login'
           authError={this.state.authError} 
           message={this.state.message}
           handler={this.handleLogin}/>
        </div>
       )}
        {renderIf(path === '/signup',
        <div>
          <AuthForm action='signup'
           key='signup'
           authError={this.state.authError}
           message={this.state.message}           
           handler={this.handleSignup}/>
        </div>
       )}
       {renderIf(path === '/logout',
        <div>
          <AuthForm action='logout'
           authError='You are logged out'
           handler={this.handleLogout}/>
        </div>
       )}
      </div>
    )     
  }  
}

const mapStateToProps = (state) => ({
  auth:state.auth
});
  
const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(authActions.signup(user)),
  login: (user) => dispatch(authActions.login(user)),
  logout: () => dispatch(authActions.logout())
});
  
export default connect(mapStateToProps,mapDispatchToProps)(Landing);