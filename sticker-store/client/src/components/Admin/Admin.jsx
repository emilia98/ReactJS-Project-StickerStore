import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import './Admin.css';
import Navigation from './Navigation/navigation';
import Category from './Category/Category';
import Tag from './Tag/Tag';
import TopMenu from './Navigation/TopMenu';
import CreateCategory from './Category/Create';
import CreateTag from './Tag/Create';
import EditTag from './Tag/Edit';
import CreateSticker from './Sticker/Create';
import EditCategory from './Category/Edit';

import { NotificationManager } from 'react-notifications';
import User from './User/User';
import Sticker from './Sticker/Sticker';
/*
    <link href="vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet" media="all">

    <!-- Vendor CSS-->
    <link href="vendor/animsition/animsition.min.css" rel="stylesheet" media="all">
    <link href="vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet" media="all">
    <link href="vendor/wow/animate.css" rel="stylesheet" media="all">
    <link href="vendor/css-hamburgers/hamburgers.min.css" rel="stylesheet" media="all">
    <link href="vendor/slick/slick.css" rel="stylesheet" media="all">
    <link href="vendor/select2/select2.min.css" rel="stylesheet" media="all">
    <link href="vendor/perfect-scrollbar/perfect-scrollbar.css" rel="stylesheet" media="all">

    <!-- Main CSS-->
    <link href="css/theme.css" rel="stylesheet" media="all">
*/
class Admin extends Component {
    componentDidCatch(err) {
        console.log(err);

        NotificationManager.error('Error');
    }
    render() {
        return (
            
            <div className="page-wrapper">
            
                 <Router>
                 <React.Fragment>
               
               <Navigation />
               <TopMenu />
               <div class="page-container">
               <div class="main-content">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                      <Route path='/categories' component={Category}/>
                      <Route path='/category/create' component={CreateCategory}/>
                      <Route path='/tags' component={Tag}/>
                      <Route path='/users' component={User} />
                      <Route path='/stickers' component={Sticker} />
                      <Route path='/tag/create' component={CreateTag}/>
                      <Route path='/tag/edit/:id' component={EditTag}/>
                      <Route path='/category/edit/:id' component={EditCategory}/>
                      <Route path='/sticker/create' component={CreateSticker}/>
                      </div>
           </div>
           </div>
           </div>
               </React.Fragment>
                 </Router>
          
            

              
           
         </div>

           
           
                
                  
                  
        
            
        )
    }
}

export default Admin;