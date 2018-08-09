import React, { Component } from 'react';
import LeftPannel from './LeftPannel';
import MidPannel from './MidPannel';
import RightPannel from './RightPannel';
import { BrowserRouter as Router } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';

class Profile extends Component{
    
    state={
        students:[],
        individualData:"",
        classShow:"show",
    }

    filter=(data, x)=>{
        return data.filter(item=>{
            return ((item._id === x)&& item)
        })
    }

    componentDidMount=()=>{
        fetch('/api')
        .then(res=>res.json())
        .then(api=>{
            this.setState({students:api});
        })
    };

    componentDidUpdate=()=>{
        fetch('/api')
        .then(res=>res.json())
        .then(api=>{
            this.setState({students:api});
        })
    }

    handleClick=(e)=>{
        if(e.target.id==="back" ){
            this.setState({individualData:this.state.students, classShow:'show'});
            e.target.className=this.state.classShow;
            // this.props.history.push('/login/profile');
        }else if (e.target.className === 'left-container'){
            
        }else if(e.target.id ==='delete-btn'){
            axios({
                method:'delete',
                url:'/login/delete',
                data: this.state.individualData
            }).then(res=>{
                console.log(res.data);
                this.setState({individualData:res.data, classShow:'show'});
                // this.props.history.push('/login/profile', {some:res.data});
            });
        }else{
            const tmp = this.filter(this.state.students, e.target.id);
            this.setState({individualData:tmp, classShow:'hide'});
            // this.props.history.push(`/login/${e.target.id}`)
        }        
    }

    render(){
        return(
            <div>
                <div className="main-container">
                    <div className="left-container">
                    <Router>
                        <LeftPannel 
                        data={this.state.individualData} students= {this.state.students} classShow = {this.state.classShow} click={this.handleClick}/>
                    </Router>   
                    </div>
                    <div className="right-container">
                        <RightPannel data={this.state.individualData} classShow = {this.state.classShow} click={this.handleClick}/>
                    </div>
                    <div className="mid-container">
                        <MidPannel data={this.state.students} click={this.handleClick} />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Profile);

