import React from 'react';
import { Switch } from 'react-router-dom';
import routes from '../routes';

const Main = () => (
  <main>
    <Switch>
      {
        routes.map((routeObj, index) => (
          <routeObj.type
            key={index}
            exact={routeObj.exact}
            path={routeObj.routePath}
            component={routeObj.component}
          />
        ))
      }
    </Switch>
  </main>
);

export default Main;
