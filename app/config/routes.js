import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Main from '../containers/Main'
import Home from '../containers/Home'
import Campaign from '../containers/Campaign'

export default (
  <Route path="/" component={Main}>
    <Route path="campaign/:name" component={Campaign} />
    <IndexRoute component={Home} />
  </Route>
)
