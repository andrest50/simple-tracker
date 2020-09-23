import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
