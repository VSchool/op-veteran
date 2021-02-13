import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './context/Counter'
import App from './App';

function Index() {
  return (
    <Counter>
      <App />
    </Counter>
  )
}

ReactDOM.render(
    <Index />, document.getElementById('root')
);
