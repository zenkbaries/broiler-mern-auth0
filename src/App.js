// src/App.js

import React from "react";
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
// import './App.css';
import { Router, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import ExternalApi from "./views/ExternalApi";


function App() {

  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router history={history}>
        <header className="App-header">
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/external-api" component={ExternalApi} />
        </Switch>
      </Router>        
    </div>
  );
}

export default App;
