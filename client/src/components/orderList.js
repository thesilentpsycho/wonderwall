import React from 'react'
import Order from './order'
import Trade from './trade'
import '../stylesheets/orders.css'
import { Component } from 'react'

class OrderList extends Component{

    componentDidMount(){
        fetch('/orders')
        .then(results => { return results.json();})
        .then(Orders => {this.setState({Orders})});
    }

    constructor(props){
        super(props)
        this.state = {
            Orders: [
                // {
                //     symbol: 'JPASSOCIAT',
                //     qty: 10,
                //     side: 'BUY',
                //     ordertype: 'LIMIT',
                //     exchange: 'NSE',
                //     limitprice: 24.25,
                //     triggerprice: 26.45,
                //     orderstatus: 'PENDING'
                // }
            ]
        }
    }

render(){ return (
    <div className="OrderList">
        <div>
        <h1>Open Orders</h1>
        <table>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Instrument</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>LTP</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {this.state.Orders.map((order, i) =>
                    <Order key={i}
                            {...order}/>
                )}
            </tbody>
        </table>
        </div>
        <br/><br/><br/>
        <div>
            <h1>Trades</h1>
            <table>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Instrument</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>LTP</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <Trade />
            </tbody>
        </table>
        </div>
    </div>
)
}
}

export default OrderList;