import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './styles/form.css';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin.jsx';
import Register from './components/Auth/Register';

import './styles/menu.css';
import Login from './components/Auth/Login';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSidebarOpened: false
    }

    this.openSidebar = this.openSidebar.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
  }

  openSidebar() {
    this.setState({
      isSidebarOpened: true
    })
    console.log('open');
  }

  closeSidebar() {
    this.setState({
      isSidebarOpened: false
    })
  }

  render() {
    return (
      <Fragment>
        <aside id="mySidenav" class={this.state.isSidebarOpened ? "active sidenav" : "sidenav"}>
        <button onClick={this.closeSidebar} class="closebtn">&times;</button>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </aside>

<div id="main" class={this.state.isSidebarOpened ? "active" : ""}>
<header>
        <div class="icon">
                <div class="icon-item">
                <Link to="/stickers">
                <span> <i class="fas fa-certificate"></i></span>
                        <p class="text">Stickers</p>
            </Link>
                        
                    </div>
            
            <div class="icon-item">
            <Link to="/admin">
            <span> <i class="fas fa-tachometer-alt"></i></span>
                    <p class="text">Admin</p>
            </Link>
                    
                </div>

        </div>
        <div id="logo-area">

            <h2>Stickers Store</h2>
        </div>
        <div class="icon right-align">
                <div class="icon-item" onClick={this.openSidebar}>
                        <span> <i class="far fa-user"></i></span>
                        <p class="text">User</p>
                    </div>
                    <div class="icon-item">
                            <span><i class="fas fa-shopping-basket"></i></span>
                            <p class="text">User</p>
                        </div>
        </div>

    </header>
    
    <div class="container-fluid">
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </Switch>
    </div>
    

</div>
      </Fragment>
        
    );
  }
}

export default App;

/*
 
*/