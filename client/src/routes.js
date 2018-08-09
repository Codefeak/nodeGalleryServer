import React,{ Component } from 'react';
import App from './App';
import Profile from './components/profile';
import AddNew from './components/addNew';
import { Switch, Route } from 'react-router';

class Routes extends Component{
    state={
        students:[],
    }
    componentDidMount=()=>{
        fetch('https://react-gallery-server.herokuapp.com/api')
        .then(res=>res.json())
        .then(api=>{
            this.setState({students:api});
        })
    };

    render(){
        return(
            <Switch>
                <Route exact path="/" component= {App}/>
                <Route exact path="/login/profile" 
                    render= {()=>(<Profile students={this.state.students}/>)}
                />
                {this.state.students.map(person=>{
                            return <Route exact path={`/login/${person._id}`} 
                                render= {()=>(<Profile students={this.state.students} person={person}/>)}
                            />
                            
                        })}
                
                <Route exact path="/login/addNew" component = {AddNew} />
            </Switch>  
       )
    }
};
export default Routes;