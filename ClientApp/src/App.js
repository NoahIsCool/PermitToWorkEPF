import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Admin } from './components/Admin';
import { ReactCalendar } from './components/ReactCalendar';
import { CheckIn } from './components/CheckIn';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route path='/Admin' component={Admin} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
	      <Route path='/Calendar' component={ReactCalendar}/>
	      <Route exact path='/' component={CheckIn}/>
      </Layout>
    );
  }
}
