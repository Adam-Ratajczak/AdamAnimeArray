import React from 'react'
import { Menubar } from '../../widgets'
import './style.scss';

function NotFound() {
  return (
    <div id="main404">
      <Menubar />

      <div id="content404">
        <h1>404</h1>
        <h2>Page Not Found!</h2>
      </div>
    </div>
  )
}

export default NotFound