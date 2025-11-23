import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Discord from './pages/Discord';
import Showcase from './pages/Showcase';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/showcase" component={Showcase} />
        <Route path="/discord" component={Discord} />
      </Switch>
    </Router>
  );
};

export default App;

