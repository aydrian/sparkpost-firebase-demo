import React from 'react'

const Main = ({children, history}) => {
  return (
    <div className="main-container">
      <nav className="navbar navbar-default" role="navigation">
        <div className="col-sm-12">
          <a className="navbar-brand" href="https://developers.sparkpost.com"><img src="/images/SparkPost_Logo.png" width="150" /></a>
          <h3>React & Firebase Demo</h3>
        </div>
      </nav>
      <div className="container">
        {children}
      </div>
    </div>
  )
}
export default Main
