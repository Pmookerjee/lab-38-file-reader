import React from 'react';
import {Link} from 'react-router-dom';
import {renderIf} from '../../lib/utils';


class Navbar extends React.Component {

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
    
    let page = location.pathname;
    console.log('LoggedIn is ', loggedIn);
   
    return (
      <nav>
          {renderIf(page === '/',
            <ul>                    
             <li><Link to="/">Dashboard</Link></li>  
            </ul>  
          )}
          {renderIf(loggedIn === true,
            <ul>
              <li><Link to="/costumes">Costumes</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          )} 
          {renderIf(page === '/login',
            <ul>
              <li><Link to="/">Dashboard</Link></li>  
              <li><Link to="/login">Login</Link></li>
            </ul>
          )} 
          {renderIf(page === '/signup',
            <ul>
              <li><Link to="/">Dashboard</Link></li>  
              <li><Link to="/signup">Signup</Link></li>
            </ul>
          )}       
      </nav>
    )
  }
}

export default Navbar;