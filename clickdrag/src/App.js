import React from 'react';
import logo from './logo.svg';
import './App.css';
import { db } from './firebase';
import Draggable from 'react-draggable';
import { useObjectVal, useListVals } from 'react-firebase-hooks/database';

function App() {
	// componentDidMount() {
	// 	try {
	// 		db.ref('John').on('value', (snapshot) => {
	// 			let vals = [];
	// 			snapshot.forEach((snap) => vals.push(snap));
	// 			console.log('vals', vals);
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }
	const [ position, loading, error ] = useObjectVal(db.ref('Postition'));
	if (loading) {
		return <div>Loading</div>;
	}
	if (error) {
		return <div>Ooops!</div>;
	}

	console.log('host', position);

	return (
		<div className="App">
			<header className="App-header">
				{/* <Draggable position={this.state.position}>
					<div className="helloworld">Hello World</div>
				</Draggable> */}
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
