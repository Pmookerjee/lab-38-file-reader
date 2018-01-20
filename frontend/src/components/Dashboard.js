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

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      let loggedIn = nextProps.loggedIn;
      this.setState({loggedIn}); 
    }
  }
    
  render() {    
    let loggedIn = this.props.loggedIn;
    console.log('from the dashboard: loggedIn is, ', loggedIn)

    return (
      <div>
        {renderIf(loggedIn !== true,
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