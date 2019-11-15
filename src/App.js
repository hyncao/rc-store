import React from 'react';
import Home from './pages/Home';
import store from './Stores';
import { Provider } from './rc-store';
import './styles/App.css';

function App() {
  return (
    <Provider {...store}>
      <Home />
    </Provider>
  );
}

export default App;