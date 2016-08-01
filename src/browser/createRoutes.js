import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from './app/App.react'
import Home from './home/HomePage.react'
import Intl from './intl/IntlPage.react'
import NotFound from './notfound/NotFoundPage.react'

export default function createRoutes (getState) {
  return (
    <Route component={App} path='/'>
      <IndexRoute component={Home} />
      <Route component={Intl} path='intl' />
      <Route component={NotFound} path='*' />
    </Route>
  )
}
