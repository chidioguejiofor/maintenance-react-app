import React, { Component } from 'react';
import './App.css';
import Header from './components/commons/Header';
import Main from './views/Main';


/**
 * This class is the basic entry for the whole system
 */
class App extends Component {
  /**
   * this renders content to the DOM
   *@returns {JSX} returns content to be rendered in the DOM
   */
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>

    );
  }
}


export default App;
