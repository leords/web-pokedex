import React from 'react'
import ReactDOM from 'react-dom'
import { Navigation } from './routes/nagivation'
import "./styles/global.css";

ReactDOM.render(
  <React.StrictMode>
    <Navigation />
  </React.StrictMode>,
  document.getElementById('root')
)
