import React, { Component } from 'react';
import './App.css';

/*
import React, { Component } from 'react';
import './App.css';
*/	
class App extends Component {
	render() {
	const helloWorld = {
	  text: '리액트에 오신 여러분을 환영합니다'
	};
	helloWorld.text = '안녕 리액트';
	
	function formatName(user) {
	  return user.firstName + ' ' + user.lastName;
	}
	const user = {
	  firstName: 'Harper2',
	  lastName: 'Perez'
	};
	const element = (
	  <h1>
		Hello, {formatName(user)}!
	  </h1>
	);
    return (
      <div className="App">
        <h2>{helloWorld.text}</h2>
		{element}
      </div>
    );
  }
}

export default App;

