import React, { Component } from "react";
import "./App.css";

import AppContent from "./components/app_content/AppContent.js";
import Footer from "./components/footer/Footer.js";
import Header from "./components/header/Header.js";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<AppContent />
				<Footer text="My first React app by Piotr Henczel" />
			</div>
		);
	}
}

export default App;