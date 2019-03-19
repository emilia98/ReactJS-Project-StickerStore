import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import './styles/form.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Admin from './components/Admin/Admin';



ReactDOM.render(
    <React.Fragment>
        <NotificationContainer />
        <BrowserRouter>
        <Switch>
          <Route path='/admin' component={Admin} />
          <Route path="/" component={App} />
        </Switch>
    </BrowserRouter>
    </React.Fragment>
    
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
