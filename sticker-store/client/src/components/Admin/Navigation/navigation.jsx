import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const MenuItem = (props) => {
    const iconClass = `fas fa-${props.icon}`;
    return (
    <li>
        <Link to={props.href} ><i className={iconClass}></i>{props.linkTitle}</Link>
       
    </li>
    )
};

const Navigation = () => (
    <div id="navigation">
        <header className="header-mobile d-block d-lg-none">
            <div className="header-mobile__bar">
                <div className="container-fluid">
                    <div className="header-mobile-inner">
                        <a className="logo" href="index.html">
                            <img src="images/icon/logo.png" alt="CoolAdmin" />
                        </a>
                        <button className="hamburger hamburger--slider" type="button">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <nav className="navbar-mobile">
                <div className="container-fluid">
                    <ul className="navbar-mobile__list list-unstyled">
                        <li className="has-sub">
                            <a className="js-arrow" href="/">
                                <i className="fas fa-tachometer-alt"></i>Dashboard</a>
                            <ul className="navbar-mobile-sub__list list-unstyled js-sub-list">
                                <li>
                                    <a href="index.html">Dashboard 1</a>
                                </li>
                                <li>
                                    <a href="index2.html">Dashboard 2</a>
                                </li>
                                <li>
                                    <a href="index3.html">Dashboard 3</a>
                                </li>
                                <li>
                                    <a href="index4.html">Dashboard 4</a>
                                </li>
                            </ul>
                        </li>
                        <MenuItem href='/stickers' icon='certificate' linkTitle='Stickers'/>
                        <MenuItem href='/tags' icon='hashtag' linkTitle='Tags'/>
                        <MenuItem href='/categories' icon='tags' linkTitle='Categories'/>
                        <MenuItem href='/users' icon='users' linkTitle='Users'/>
                        <MenuItem href='/orders' icon='shipping-fast' linkTitle='Orders'/>
                        <MenuItem href='/charts' icon='chart-bar' linkTitle='Charts'/>
                    </ul>
                </div>
            </nav>
        </header>
        <aside className="menu-sidebar d-none d-lg-block">
            <div className="logo">
                <a href="#">
                    <img src="images/icon/logo.png" alt="Cool Admin" />
                </a>
            </div>
            <div className="menu-sidebar__content js-scrollbar1">
                <nav className="navbar-sidebar">
                    <ul className="list-unstyled navbar__list">
                        <li className="active has-sub">
                            <a className="js-arrow" href="#">
                                <i className="fas fa-tachometer-alt"></i>Dashboard</a>
                            <ul className="list-unstyled navbar__sub-list js-sub-list">
                                <li>
                                    <a href="index.html">Dashboard 1</a>
                                </li>
                                <li>
                                    <a href="index2.html">Dashboard 2</a>
                                </li>
                                <li>
                                    <a href="index3.html">Dashboard 3</a>
                                </li>
                                <li>
                                    <a href="index4.html">Dashboard 4</a>
                                </li>
                            </ul>
                        </li>
                        <MenuItem href='/stickers' icon='certificate' linkTitle='Stickers'/>
                        <MenuItem href='/tags' icon='hashtag' linkTitle='Tags'/>
                        <MenuItem href='/categories' icon='tags' linkTitle='Categories'/>
                        <MenuItem href='/users' icon='users' linkTitle='Users'/>
                        <MenuItem href='/orders' icon='shipping-fast' linkTitle='Orders'/>
                        <MenuItem href='/charts' icon='chart-bar' linkTitle='Charts'/>
                        
                       
                    </ul>
                </nav>
            </div>
        </aside>
    </div>
)

export default Navigation;