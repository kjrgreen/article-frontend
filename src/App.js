import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";

function App() {
  return (
    <Router>
      <p>Headers go here</p>
      <Switch>
        <Route path="/:articleId"> {/* Maybe it's better to use something other than an ID for this path, but for the purposes of keeping this project simple, we can leave this be */}
          <p>An article component should be placed here</p>
        </Route>
        <Route path="/">
          <p>A component displaying the list of all articles should be placed here</p>
        </Route>
      </Switch>
  </Router>
  );
}

export default App;
