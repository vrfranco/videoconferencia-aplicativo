import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Cadastro from './Cadastro';
import Conferencia from './Conferencia';
import Monitoramento from './Monitoramento';

class App extends Component
{
  constructor(props)
  {
    super(props);
  }
  render()
  {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/cadastro" component={Cadastro}/>
          <Route path="/conferencia" component={Conferencia}/>
          <Route path="/monitoramento" component={Monitoramento}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
