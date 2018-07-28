import React from "react";
import logo from "../../logo.svg";
import "./Header.css";

const Header = () =>{
	return (
		<header className="App-header">
			<h3>My first React</h3>
			<img src={logo} className="App-logo" alt="logo" />
			<h3>app.</h3>
		</header>
	);
} 

export default Header;