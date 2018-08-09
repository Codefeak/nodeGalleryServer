import React,{ Component } from 'react';
import './login.css';
import axios from 'axios';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';



class Login extends Component{
    state={
        username:"",
        password:"",
    }
    
    handleSubmit=(e)=>{
        e.preventDefault();
        axios({
            method:'post',
            url:'/login',
            data: this.state
        }).then(res=>{
            if(!res.data.error){
            }
            this.props.history.push('/login/profile')
        });
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    render(){
        return(
            <div className="login-container">
                <form id="login-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="userName">UserName</label>
                    <input type="text" id="userName" name="username" onChange={this.handleChange}/><br/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id ="password" name="password" onChange={this.handleChange}/><br/>
                    <input id="login-btn" type="submit" value="Login"/>
                    <button id="signup-btn" value="Sign up"><Link to='/signUp'/></button>
                </form>

            </div>
        )
    }
}

export default withRouter(Login);