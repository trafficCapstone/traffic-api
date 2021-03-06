import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Data from './Data';
import Error from './Error';
import Header from './Header';
import Home from './Home';
import Host from './Host';
import LiveStream from './LiveStream';

function App() {
  return (
    <Router>
      <Header />
      <div class="container-fluid">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/data">
            <Data />
          </Route>
          <Route path="/live-stream/host">
            <Host />
          </Route>
          <Route path="/live-stream/:id?">
            <LiveStream />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
