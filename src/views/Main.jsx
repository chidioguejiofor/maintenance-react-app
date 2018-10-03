import React from 'react';
import { Switch } from 'react-router-dom';
import routes from '../routes';

const Main = () => (
  <main>
    <Switch>
      {
        routes.map((route, index) => (<route.type
          key={index}
          exact={route.exact}
          path={route.routePath}
          component={route.component}
        />
        ))
      }
    </Switch>
  </main>
);

export default Main;
