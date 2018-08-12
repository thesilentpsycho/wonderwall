import React, { Component } from 'react';
import '../stylesheets/navbar.css';

class Navbar extends Component {
  render() {
    return (
        <nav className="navbar navbar-inverse navbar-static-top">
        <div className="container-fluid">
            <div className="navbar-header">
            <a className="navbar-brand" href="">PaperTrader</a>
            </div>
            <ul className="nav navbar-nav navbar-right">
            <li className="active"><a href="">Dashboard</a></li>
            <li><a href="orders">Orders</a></li>
            <li><a href="holdings">Holdings</a></li>
            <li><a href="positions">Positions</a></li>
                <li><a href="funds">Funds</a></li>
                <li><a href="">Notifications</a></li>
                <li><a href="">UserInfo</a></li>
            </ul>
        </div>
        </nav>
    );
  }
}

export default Navbar;
