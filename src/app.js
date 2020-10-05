/*eslint-disable*/
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from './routes';

function App() {
  return (
    <div className="main">
        <Router basename='/tk'>
            <Switch>
                {routes.map(route => (
                    <Route
                        key={route.path}
                        exact
                        path={route.path}
                        component={route.component}
                    />
                ))}
                <Route render={() => <div>No thing was found</div>} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
