import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import AuthProvider from "./context/AuthProvider";
import App from './App';
import './index.css'

function Index() {

  return (
    <Router>
		<AuthProvider>
			<App />
		</AuthProvider>
	</Router>
  )
}

ReactDOM.render(
    <Index/>, document.getElementById('root')
);
