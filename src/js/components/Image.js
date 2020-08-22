import React from "react";

const Image = (
	{
		src,
		alt = "",
		style = {},
		className = "",
		...props
	}) => {

	return (
		<img
			src={src}
			alt={alt}
			style={style}
			className={className}
			{...props}
		/>
	)
};

export default Image;