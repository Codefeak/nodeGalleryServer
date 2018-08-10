import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';

class AddNew extends Component {
    state = {
        firstName: "",
        lastName: "",
        title: "",
        nationality: "",
        skills: "",
        whySofterDeveloper: "",
        longTermVision: "",
        motivatesMe: "",
        favoriteQuote: "",
        joinedOn: "",
        src:"",
        isTouched:{
            firstName: false,
            lastName: false,
            title: false,
            nationality: false,
            skills: false,
            whySofterDeveloper: false,
            longTermVision: false,
            motivatesMe: false,
            favoriteQuote: false,
            joinedOn: false,
            src:false,
        }
    }

    handleChange = (e) => {
        e.preventDefault();

        if(e.target.name === 'src'){
            this.setState({src:this.state.firstName});
        }
        this.setState({[e.target.name]:e.target.value});
    };
    handleFocus = (e) =>{
        const field = e.target.name;
        this.setState(prevState =>({
            isTouched:{
                ...prevState.isTouched,
                [field]:true
            }
        }));
    };

    handleFileUpload=(e)=>{
        e.preventDefault();
        this.setState({src:`${this.state.firstName}.jpg`});
        const data = new FormData();
        data.append('file', e.target.files[0], `${this.state.firstName}.jpg`);
        axios.post('/login/addNew/upload', data)
        .then(res => {
    });
    };

    handleSubmit=(e)=>{
        e.preventDefault();
        const tmpSkills = Array.from(this.state.skills);
        this.setState({skills:tmpSkills});
        const tmp = [this.state];
        axios({
            method:'post',
            url:'/login/addNew',
            data:tmp
        }).then(res=>{
            if(!res.data.error){
            }
            this.props.history.push('/login/profile', {some:res.data});
        });
    }

    validate=(firstName, lastName, title, nationality, skills, whySofterDeveloper, longTermVision, motivatesMe, favoriteQuote, joinedOn)=>{
        const errors = {
            firstName: validator.isEmpty(firstName)
            ?   'FirstName cannot be left empty !!!'
            :   validator.isAlpha(firstName)
                ? ''
                : 'FirstName can only have alphabetic characters!!!',
            lastName: validator.isEmpty(lastName)
            ?   'LastName cannot be left empty !!!'
            :   validator.isAlpha(lastName)
                ? ''
                : 'LastName can only have alphabetic characters!!!',
            title: validator.isEmpty(title)
            ?   'Title Fleld cannot be left empty !!!'
            :   validator.isAlpha(title)
                ? ''
                : 'title can only have alphabetic characters!!!',
            nationality: validator.isEmpty(nationality)
            ?   'Please fill up this field'
            :   validator.isAlpha(nationality)
                ? ''
                : 'nationality can only have alphabetic characters!!!',
            whySofterDeveloper: validator.isEmpty(whySofterDeveloper)
                ? 'Please fill up this section!!'
                : '',
            favoriteQuote: validator.isEmpty(favoriteQuote)
                ? 'It cannot be empty!!!'
                : '',
            longTermVision: validator.isAlpha(longTermVision)
            ? ''
            : 'longTermVision can only have alphabetic characters!!!',
            motivatesMe: validator.isAlpha(motivatesMe)
                ? ''
                : 'motivatesMe can only have alphabetic characters!!!',
        }
        return errors;
    };

    isSubmitDisabled = errors =>{
        return Object.values(errors).some(errMsg=>{
            return errMsg;
        })
    }

    render() {
        const {firstName, lastName, title, nationality, 
            skills, whySofterDeveloper, longTermVision, 
            motivatesMe, favoriteQuote, joinedOn,isTouched } = this.state;
        const errors = this.validate(firstName, lastName, title, nationality, skills, whySofterDeveloper, longTermVision, motivatesMe, favoriteQuote, joinedOn );    
            return (
            <div className="form-container ">
                <form action="/login/addNew" method="post" onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <p>Please Fill Up the Following informations:</p>
                    <label className={`${errors.firstName && isTouched.firstName ? 'invalid' :" "} form-rows`}>
                        <span> FirstName:</span>
                        <input onBlur ={this.handleFocus} onChange={this.handleChange} type="text" name="firstName" />
                        {isTouched.firstName && errors.firstName && (<span className="err-message">{errors.firstName}</span> )}
                    </label>
                    <label className={`${errors.firstName && isTouched.firstName ? 'invalid' :" "} form-rows`}>
                        <span> LastName:</span>
                        <input onBlur ={this.handleFocus} onChange={this.handleChange} type="text" name="lastName" />
                        {isTouched.lastName && errors.lastName && (<span className="err-message">{errors.lastName}</span> )}
                    </label>
                    <label className={`${errors.firstName && isTouched.firstName ? 'invalid' :" "} form-rows`}>
                        <span> Alt:</span>
                        <input onBlur ={this.handleFocus} onChange={this.handleChange} type="text" name="alt" />
                    </label>
                    <label className={`${errors.firstName && isTouched.firstName ? 'invalid' :" "} form-rows`}>
                        <span> Title: </span>
                        <input onBlur ={this.handleFocus} onChange={this.handleChange} type="text" name="title" />
                        {isTouched.title && errors.title && (<span className="err-message">{errors.title}</span> )}
                    </label>
                    <label className={`${errors.firstName && isTouched.firstName ? 'invalid' :" "} form-rows`}>
                        <span> Nationality: </span>
                        <input onBlur ={this.handleFocus} onChange={this.handleChange} type="text" name="nationality" />
                        {isTouched.nationality && errors.nationality && (<span className="err-message">{errors.nationality}</span> )}
                    </label>
                    <label className={`${errors.firstName && isTouched.firstName ? 'invalid' :" "} form-rows`}>
                        <span> Skills: </span>
                        <input onBlur ={this.handleFocus} onChange={this.handleChange} type="text" name="skills" placeholder="Seperate with commas" />
                        {isTouched.skills && errors.skills && (<span className="err-message">{errors.skills}</span> )}
                    </label>
                    <label className={`${errors.firstName && isTouched.firstName ? 'invalid' :" "} form-rows`}>
                        <span> Why: </span>
                        <input onBlur ={this.handleFocus} onChange={this.handleChange} type="text" name="whySofterDeveloper" />
                        {isTouched.whySofterDeveloper && errors.whySofterDeveloper && (<span className="err-message">{errors.whySofterDeveloper}</span> )}
                    </label>
                    <label className={`${errors.firstName && isTouched.firstName ? 'invalid' :" "} form-rows`}>
                        <span> Vision: </span>
                        <input onBlur ={this.handleFocus} onChange={this.handleChange} type="text" name="longTermVision" />
                        {isTouched.longTermVision && errors.longTermVision && (<span className="err-message">{errors.longTermVision}</span> )}
                    </label>
                    <label className={`${errors.firstName && isTouched.firstName ? 'invalid' :" "} form-rows`}>
                        <span> Motivation:</span>
                        <input onBlur ={this.handleFocus} onChange={this.handleChange} type="text" name="motivatesMe" />
                        {isTouched.motivatesMe && errors.motivatesMe && (<span className="err-message">{errors.motivatesMe}</span> )}
                    </label>
                    <label className={`${errors.firstName && isTouched.firstName ? 'invalid' :" "} form-rows`}>
                        <span> Favorite Quote:</span>
                        <input onBlur ={this.handleFocus} onChange={this.handleChange} type="text" name="favoriteQuote" />
                        {isTouched.favoriteQuote && errors.favoriteQuote && (<span className="err-message">{errors.favoriteQuote}</span> )}
                    </label>
                    <label className={`${errors.firstName && isTouched.firstName ? 'invalid' :" "} form-rows`}>
                        <span> Image: </span>
                        <input onBlur ={this.handleFocus} onChange={this.handleFileUpload} type="file" />
                    </label>
                    <label className={`${errors.firstName && isTouched.firstName ? 'invalid' :" "} form-rows`}>
                        <span> Joined Date: </span>
                        <input onBlur ={this.handleFocus} onChange={this.handleChange} type="date" name="joinedOn" />
                    </label>
                    <div>
                        <input id="submit-btn" type="Submit" value="Submit" readOnly disabled = {this.isSubmitDisabled(errors)} />
                        <button id="submit-btn" ><Link to="/login/profile">Back</Link> </button>
                    </div>
                </form>
            </div>
        );
    };
};

export default AddNew;
