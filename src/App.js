import Home from './components/Home';
import LoginCallback from './components/LoginCallback';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/login-callback">
          <LoginCallback />
        </Route>
        <Route path="/dashboard">
          <LoginCallback />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
