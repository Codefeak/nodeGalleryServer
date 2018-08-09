import React from 'react';
import PropTypes from 'prop-types';


const LeftPannel=(props)=>{
	const Capitalize=(string)=>{
		if(string!==undefined){
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
	}
		return(
				<div>
					<div className = {`integrify ${props.classShow}`}>
						<img src="/login/images/integrify-logo-neg.svg" alt="Integrify Logo"/>
						<p>Welcome to Integrify Gallery</p>
					</div>
					<div className = {`indiv-image ${props.classShow==="show"?"hide":"show"}`}>
						<img src={props.data[0] &&`/login/images/${Capitalize(props.data[0].src)}`}
							alt={props.data[0] && props.data[0].alt} 
						/>
						<h1>{props.data[0] && `${props.data[0].firstName} ${props.data[0].lastName}`}</h1>
					</div>
					<p id = "delete-btn" className = {`${props.classShow==="show"?"hide":"show"}`} onClick={props.click}>Delete</p>
				</div>
	)
}

export default LeftPannel;

LeftPannel.propTypes={
	classShow: PropTypes.string,
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	click: PropTypes.func,
}