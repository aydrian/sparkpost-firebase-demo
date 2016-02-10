import React from 'react'

const Main = ({children, history}) => {
  return (
    <div className="main-container">
      <nav className="navbar navbar-default" role="navigation">
        <div className="col-sm-12">
          <h1>SparkPost w/ React & Firebase</h1>
        </div>
      </nav>
      <div className="container">
        {children}
      </div>
    </div>
  )
}
export default Main
