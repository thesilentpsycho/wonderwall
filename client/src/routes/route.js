import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from '../components/App'
import Login from '../components/Login'
import { errorPage } from '../components/errorPage'
import React from 'react'

export const MyRoute = () => (
    <Router>
        <div>
            <Route exact path = "/" component = {App}/>
            <Route path="/login" exact component={Login} />
            <Route exact path = "/orders" component = {App}/>
            <Route exact path = "/positions" component = {App}/>
            {/* <Route path = "*" component = {errorPage}/> */}
        </div>
    </Router>
)