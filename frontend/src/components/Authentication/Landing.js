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
      message: 'Authentication credentials failed!',
      isMounted: false
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this); 
    this.handleLogout = this.handleLogout.bind(this); 
    
  }
 

  componentDidMount() {
    this.setState({isMounted: true})
  }

  componentWillUnmount(){
    this.setState({isMounted: false})
  }
  

  handleLogin(user) {
    this.props.login(user)
      .then(user => {
        if(user) {
        let loggedIn = true;
        this.props.updateAuth(loggedIn, '/costumes');
        this.props.history.push('/costumes')        
        }
        else Promise.reject();
      })
      .catch(e => {
        let authError = true;
        let loggedIn = false;
        this.setState({authError});
        this.props.updateAuth(loggedIn);        
        console.error('Authentication Error: ', e.message)
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

  handleLogout(user) {
    this.props.logout(user)
    .then(() => {
      this.props.history.push('/Dashboard');
      this.props.updateAuth(loggedIn);
    })      
    .catch(console.error);
  }

  render() {
     console.log('this.props is ', this.props)
    return (

      <div className="landing">
       {renderIf(location.pathname === '/login',
        <div>
          <h3>Login</h3>
          <AuthForm action='login'
           key='login'
           authError={this.state.authError} 
           message={this.state.message}
           handler={this.handleLogin}/>
        </div>
       )}
        {renderIf(location.pathname === '/signup',
        <div>
          <h3>Signup</h3>
          <AuthForm action='signup'
           key='signup'
           authError={this.state.authError}
           message={this.state.message}           
           handler={this.handleSignup}/>
        </div>
       )}
       {renderIf(location.pathname === '/logout',
        <div>
          {this.handleLogout}
        </div>
       )}
       {renderIf(this.props.loggedIn === true,
        <div>
        <Costumes updateAuth={this.updateAuth}/>
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
  logout: (user) => dispatch(authActions.logout(user))
});
  
export default connect(mapStateToProps,mapDispatchToProps)(Landing);