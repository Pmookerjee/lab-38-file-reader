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
    if (nextProps.loggedIn !== this.state.loggedIn) { 
      this.setState({loggedIn: nextProps.loggedIn})
    }
  }


  render() {

    let {loggedIn} = this.state.loggedIn;
    console.log('loggedIn is ', loggedIn)
    return (
      <nav>
          {renderIf(loggedIn === false,
            <ul>                    
             <li><Link to="/">Dashboard</Link></li>  
            </ul>  
          )}
          {renderIf(loggedIn === true,
            <ul>
              <li><Link to="/costumes">Costumes</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          )}       
      </nav>
    )
  }
}

export default Navbar;