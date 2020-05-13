import React, { useState } from 'react';
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
	const [ position, loading, error ] = useObjectVal(db.ref('participants/position'));
	const [ helloPosition, setHelloPosition ] = useState(position);
	console.log('position from DB', position);

	if (loading) {
		return <div>Loading</div>;
	}
	if (error) {
		return <div>Ooops!</div>;
	}

	console.log('host', position);

	///we want to set up our drag events and connect those to the database
	function handleDrag(e, position) {
		e.preventDefault();

		setHelloPosition(position);
		console.log(e.target.position);
	}
	function handleDragStop(e) {
		e.preventDefault();
		console.log('STOP');
		setHelloPosition((prevState) => {
			const updatedValues = { position: { X: 1, Y: 1 } };
			return { ...prevState, ...updatedValues };
		});
		///set
		db.ref('participants').set({ helloPosition });

		// send to firebase
	}
	return (
		<div className="App">
			<header className="App-header">
				{/* <Draggable position={position} onDrag={(e) => onDrag(e)} onStop={(e) => onStop(e)}>
					<div className="helloworld">Hello World</div>
				</Draggable> */}
				<Draggable position={position} onDrag={(e) => handleDrag(e)} onStop={(e) => handleDragStop(e)}>
					<div className="helloWorld" name="hello" draggable="false">
						Hello world
					</div>
				</Draggable>
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
