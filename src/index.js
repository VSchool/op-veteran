import ReactDOM from 'react-dom';
import AuthProvider from "./context/AuthProvider";
import App from './App';

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
