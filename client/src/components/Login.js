import React, { Component, Redirect } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {ToastContainer, ToastStore} from 'react-toasts';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            toDashboard: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.DoLogin = this.DoLogin.bind(this);
    }

    DoLogin(authdetails){
        var resp = fetch('http://localhost:5000/login', {
                                method: "POST",
                                // mode: "no-cors",
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(authdetails)
                              })
                              .then(function(response) {
                                if(response.status === 200){
                                this.setState(() => ({
                                    toDashboard: true
                                    }))
                                ToastStore.success('Login Successful!');
                                }
                                else if(response.status === 204){
                                  ToastStore.error(`UserName Passwords do not match`);
                                }
                              })
                              .catch((error) => {ToastStore.error(`Please try again`);})
    }

    handleClick(event){
        var authdetails={
        "email":this.state.username,
        "password":this.state.password
        }
        this.DoLogin(authdetails);
    }
 
render() {
    if (this.state.toDashboard === true) {
        return <Redirect to='/orders' />
    }
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;