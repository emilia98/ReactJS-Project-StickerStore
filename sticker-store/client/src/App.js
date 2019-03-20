import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './styles/form.css';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin.jsx';
import Register from './components/Auth/Register';
import PublicRoute from './routes/PublicRoute';

import './styles/menu.css';
import Login from './components/Auth/Login';
import Stickers from './components/Stickers/Stickers';

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
        <aside id="mySidenav" className={this.state.isSidebarOpened ? "active sidenav" : "sidenav"}>
        <button onClick={this.closeSidebar} className="closebtn">&times;</button>
        {sessionStorage.getItem('user') ? <p className="text-center">Welcome back, {JSON.parse(sessionStorage.getItem('user')).username}</p> : null}
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        
        <a href="#">Favourites</a>
        <a href="#">Profile</a>
        <a href="#">Orders</a>
        <a href="#">LogOut</a>
      </aside>

<div id="main" className={this.state.isSidebarOpened ? "active" : ""}>
<header>
        <div className="icon">
                <div className="icon-item">
                <Link to="/stickers">
                <span> <i className="fas fa-certificate"></i></span>
                        <p className="text">Stickers</p>
            </Link>
                        
                    </div>
            
            <div className="icon-item">
            <Link to="/admin">
            <span> <i className="fas fa-tachometer-alt"></i></span>
                    <p className="text">Admin</p>
            </Link>
                    
                </div>

        </div>
        <div id="logo-area">

            <h2>Stickers Store</h2>
        </div>
        <div className="icon right-align">
                <div className="icon-item" onClick={this.openSidebar}>
                        <span> <i className="far fa-user"></i></span>
                        <p className="text">User</p>
                    </div>
                    <div className="icon-item">
                            <span><i className="fas fa-shopping-basket"></i></span>
                            <p className="text">User</p>
                        </div>
        </div>

    </header>
    
    <div className="container-fluid">
    <Switch>

      <PublicRoute path="/register" component={Register} />
      <PublicRoute path="/login" component={Login} />
      <Route path='/stickers' component={Stickers} />
    </Switch>
    </div>
    

</div>
      </Fragment>
        
    );
  }
}
export default App;