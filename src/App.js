import React from "react";
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Books from './pages/Books'
import Library from './pages/Library'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Books} />
        <Route path='/books' exact component={Books} />
        <Route path='/library' component={Library} />
      </Switch>
    </Router>
  );

}

export default App;
