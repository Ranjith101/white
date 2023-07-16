import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './components/Login';
import StudentListPage from './components/StudentListPage';
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/students" component={StudentListPage} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default App;
