import React, { Component } from 'react';
import axios from 'axios';
import './signup.css';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class SignUp extends Component{
    state={
        username : "",
        password : "",
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
                console.log(res);
            }
            this.props.history.push('/')
        });
    }

    render(){
        return(
            <div className="signup-container">
                <form id="signup-form" onSubmit={this.handleSubmit}>
                    <h1>SignUp Form: </h1>
                    <label htmlFor="userName">UserName</label>
                    <input type="text" id="userName" name="username" onChange={this.handleChange}/><br/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id ="password" name="password" onChange={this.handleChange}/><br/>
                    <input id="signup-btn" type="submit" value="Submit"/>
                    <Link to ='/'>
                        <input id="back-btn" type="submit" value="Back"/>
                    </Link>
                </form>

            </div>
        )
    }
}

export default withRouter(SignUp);