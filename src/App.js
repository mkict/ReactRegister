import React from 'react';
require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');
class App extends React.Component {
    render() {
        return (
            <div>
        			<div>
        				<Header/>
        			</div>
        			<div>
        				<UsName/>
        			</div>
        		</div>
        );
    }
}

class Header extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
					<h1>Register Page</h1>
				</div>
        );
    }
}


class UsName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange({ target: { value } }) {
        this.setState({ username: value });
    }

    handlePasswordChange({ target: { value } }) {
        this.setState({ password: value });
    }

    handleSubmit(e) {
        e.preventDefault()
        fetch('/api/users/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(function(response) {
            return response.json();
        }).then((data) => {
            console.log(data);
        })
    }

    handleClick(e) {
        e.preventDefault()
        fetch('/api/users', {
            method: 'GET',
        }).then(function(response) {
            return response.json();
        }).then((get) => {
        	console.log(get);
    		document.write(JSON.stringify(get));
        })
    }

    render() {
        return (
            <div>
					Username: {" "} <input type="text" value={this.state.username} onChange={this.handleUsernameChange} /><br/>
					Password: {" "} <input type="password" value={this.state.password} onChange={this.handlePasswordChange} /><br/>	
					<button onClick={this.handleSubmit}>Submit</button>
					<button onClick={this.handleClick}>Show</button>
					
				</div>
        );
    }
}

export default App;
