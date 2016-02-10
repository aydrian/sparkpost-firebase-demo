import React from 'react'
import Main from '../components/Main'
import Home from '../components/Home'
import Campaign from '../components/Campaign'
import { Route, IndexRoute } from 'react-router'

export default (
  <Route path="/" component={Main}>
    <Route path="campaign/:name" component={Campaign} />
    <IndexRoute component={Home} />
  </Route>
)
