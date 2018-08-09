import React from 'react';

const MidPannel = (props) => {
	const Capitalize=(string)=>{
		if(string!==undefined){
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
	}

	const tmpList = props.data.map((item, i) =>
		<img src={
			
			item.src !== undefined
				? `/login/images/thumbnails/${Capitalize(item.src)}`
				: '/login/images/thumbnails/Rojak.jpg.webp'
		}
			alt={item.alt}
			id={item._id} key={`${item.firstName}${i}`}
			onClick={props.click} />
	);
	return (
		<div className="thumbnail-img">
			{tmpList}
		</div>
	);
}

export default MidPannel;