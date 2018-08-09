import React, { Component } from 'react';
import axios from 'axios';
import './signup.css';
import { withRouter } from 'react-router';

class SignUp extends Component{
    state={
        username = "",
        password = "",
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        axios({
            method:'post',
            url:'/signUp',
            data:this.state
        }).then(res=>{
            if(!res.data.error){
            }
            this.props.history.push('/login/profile')
        });
    }

    render(){
        return(
            <div className="signup-container">
            <h1>SignUp Form: </h1>
                <form id="signup-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="userName">UserName</label>
                    <input type="text" id="userName" name="username" onChange={this.handleChange}/><br/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id ="password" name="password" onChange={this.handleChange}/><br/>
                    <input id="signup-btn" type="submit" value="Submit"/>
                    <input id="back-btn" type="submit" value="Backup"/>
                </form>

            </div>
        )
    }
}

export default withRouter(SignUp);