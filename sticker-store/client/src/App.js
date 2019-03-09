import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin.jsx';
import Register from './components/Register/Register';

class App extends Component {
  render() {
    return (
      <Router>
       
      <div>
         <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/register" className="btn btn-primary">Register</Link>

        <Switch>
          
          <Route path="/" exact component={Home} />
          <Route path='/admin' component={Admin} />
          <Route path='/register' component={Register} />
        </Switch>
      </div>
        
      </Router>
    );
  }
}

export default App;

/*
 
*/