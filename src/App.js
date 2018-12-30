import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    email: "",
    password: "",
    success: false,
    response: ""
  }

  handleEmail = (event) => {
    this.setState({ email: event.target.value})
  }

  handlePassword = (event) => {
    this.setState({ password: event.target.value})
  }    

  login = () => {

    this.setState({
      success: true
    })

    axios.post('http://localhost:8080/users/login', {
      "email": this.state.email,
      "password": this.state.password
    })
    .then(function (response) {

    localStorage.setItem('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJib2IyQHRlc3QuY29tIiwiZXhwIjoxNTQ2OTk0MDQ2fQ.yP_ZcEXCHGlhSEdt8PClWP8OAZQPVUOYJj7eZ1hQWUgya0FKuD7VDL9CFSiEW847BwYrB0RklUG1xHaDa1WDOg');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getUser = () => {

    const auth = localStorage.getItem('Authorization')
    console.log(auth)

    var config = {
      headers: {'Authorization': auth}
    };

    axios.get(`http://localhost:8080/users`, config)
    .then(res => {
      this.setState({
        response: res.data
      })
    })
    .catch(error => {
      console.log("ERROR" + error)
    })
  }

  render() {
    return (
      <div>
        { !this.state.success ? 
          <div>
          email <input onChange={this.handleEmail}></input><br/>
          password <input onChange={this.handlePassword}></input>
        <div><button onClick={this.login}>Login</button></div>
        </div>
        : 
        <div>
        <button onClick={this.getUser}>Get an authenticated response</button>
        <div>{this.state.response}</div>
        </div>
        }
      </div>
    );
  }
}

export default App;

