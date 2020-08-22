import React from "react";
import Image from "../Image";

const Card = ({ imageURL, isFlipped, onClick }) => {

	return (
		<div className="card-container" onClick={onClick}>
			<div className={"card" + (isFlipped? "flipped": "")}>
				<Image className="side front" src={imageURL} />
				<div className="side back" />
			</div>
		</div>
	)
};

export default Card;