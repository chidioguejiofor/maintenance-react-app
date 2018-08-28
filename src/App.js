import React, { Component } from 'react';
import Main from './views/Main';
import '../public/styles/App.scss';
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
        <Main />
      </div>

    );
  }
}


export default App;
