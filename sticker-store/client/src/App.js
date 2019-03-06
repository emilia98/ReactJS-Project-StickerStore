import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin.jsx';

class App extends Component {
  render() {
    return (
      <Router>
       
      <div>
         <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>

        <Switch>
          
          <Route path="/" exact component={Home} />
          <Route path='/admin' component={Admin} />
        </Switch>
      </div>
        
      </Router>
    );
  }
}

export default App;

/*
 
*/