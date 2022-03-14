import * as React from "react";

const Alert = (props) => {
	
    const handleClick = () => {
        props.visibility = false;
    }
	return (
		<div className={props.visibility ? "visible" : "invisible"}>
            <p>{props.message}</p>
            <button onClick={handleClick}>
                Close
            </button>
            
		</div>
	);
}
export default Alert;

