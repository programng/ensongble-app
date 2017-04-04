import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Landing';
import About from './About';
import Header from './Header';
import '../dist/style.css';

function Main() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Route exact path="/" component={Landing} />
        <Route path="/about" component={About} />
      </div>
    </BrowserRouter>
  );
}

render(<Main />, document.getElementById('app'));
