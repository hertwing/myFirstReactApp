import React from "react";
import "./Footer.css";

const Footer = props => {
	return (
		<footer className="App-footer">
			<span>{props.text}</span>
		</footer>
	);
}

export default Footer;