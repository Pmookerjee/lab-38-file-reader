import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import {renderIf} from '../../lib/utils';

class Dashboard extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      loggedIn: this.props.loggedIn
    }
  }

  // componentWillReceiveProps(nextProps){
  //   if(this.props.loggedIn !== nextProps.loggedIn) {
  //     let loggedIn = nextProps.loggedIn;
  //     this.setState({loggedIn});
  //   }
  // }
    
  render() {    
    let {loggedIn} = this.state.loggedIn;

    return (
      <div>
        {renderIf(loggedIn === false,
          <ul className='dashboard'>
            <li><Link className='login' to='/login'>Login</Link></li>
            <li><Link className='login' to='/signup'>Signup</Link></li>
          </ul>  
        )}
     </div>
    )     
  }  
}

export default Dashboard;