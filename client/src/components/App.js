import React, { Component } from 'react';
// import logo from './logo.svg';
import '../stylesheets/App.css';
import Navbar from './navbar'
import Watch from './watch'
import OrderList from './orderList'

const SymbolList = [
	"Alpine Meadows",
	"Boreal",
	"Diamond Peak",
	"Donner Ski Ranch", 
	"Heavenly", 
	"Homewood",
	"Kirkwood",
	"Mt. Rose", 
	"Northstar",
	"Squaw Valley",
	"Sugar Bowl"
]

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div>
          <Navbar />
        </div>
        <div className='maincontent'>
        <Watch options={SymbolList}/>
        {(this.props.location.pathname === "/orders") ? 
          <OrderList /> : null
        }
        </div>
      </div>
    );
  }
}

export default App;
