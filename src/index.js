import ReactDOM from 'react-dom';
import AuthProvider from "./context/AuthProvider";
import App from './App';
// import TestApp from "./testing/TestApp";

function Index() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

ReactDOM.render(
    <Index />, document.getElementById('root')
);
