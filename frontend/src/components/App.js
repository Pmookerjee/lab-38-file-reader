import '../style/main.scss';

import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from './Header'
import Footer from './Footer'
import Dashboard from './Dashboard'
import Navbar from './Navbar'

import Costumes from './Costume/Costumes'
import CostumeList from './Costume/Costume-List'
import Landing from './Authentication/Landing'

let initialState = { loggedIn: false }

class App extends React.Component {

  constructor(props) {
   super(props);

   this.state = {
     loggedIn: initialState,
   }
   this.updateAuth = this.updateAuth.bind(this);
  }

  updateAuth(state) {
    let loggedIn = state;
    this.setState({loggedIn});
  }

  render() {
    console.log('location ', location )
    return (
      <div>
        <Header appTitle="Costume Inventory"/>
        <Navbar loggedIn={this.state}/>
        <Switch>
          <Route exact path='/' component={() => 
            <Dashboard loggedIn = {this.state}/>
           }/>
          <Route exact path='/logout' render={(props) => (
            <Landing {...props} loggedIn={this.state} updateAuth={this.updateAuth}/>
          )} />
          <Route exact path='/signup' render={(props) => (
            <Landing {...props} loggedIn={this.state} updateAuth={this.updateAuth}/>
          )} />
          <Route exact path='/login' render={(props) => (
            <Landing {...props} loggedIn={this.state} updateAuth={this.updateAuth}/>
          )} />/>
          <Route exact path='/costumes' component={Costumes} />
          <Route exact path='/costumes/list' component={CostumeList} />
        </Switch>
        <Footer><p>Mookerjee Productions 2007</p></Footer>
      </div>
    )
  }
}

export default App;