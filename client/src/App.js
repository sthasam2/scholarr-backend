import "./App.css";
import React from "react";
import connectSocket from "./socket/socketClient";

function App() {
	connectSocket();
	return (
		<h1>
			<p>Hello There!</p>
		</h1>
	);
}

export default App;
