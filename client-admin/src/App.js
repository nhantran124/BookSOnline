import './App.css';
import React, { Component } from 'react';
import MyProvider from './contexts/MyProvider';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/LoginComponent';
import Main from './components/MainComponent';

class App extends Component {
  render() {
    return (
      <MyProvider>
        <Login />
        <BrowserRouter >
          <Main />
        </BrowserRouter>
      </MyProvider>
    );
  }
}
export default App;