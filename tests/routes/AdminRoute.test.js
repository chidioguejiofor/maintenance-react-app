import { shallow } from 'enzyme';

import chai from 'chai';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AdminRoute from '../../src/routes/AdminRoute';


const localStorageMock = {};
global.localStorage = localStorageMock;

const SampleComponent = () => <div>Empty</div>;
const sampleProps = {
  component: SampleComponent,
};

const getShallowObj = props => shallow(
  <AdminRoute
    {...sampleProps}
    {...props}
  />
);
describe('Testing AdminRoute', () => {
  describe('the components rendered', () => {
    it('should render a ProtectedRoute', () => {
      const shallowObj = getShallowObj();
      chai.expect(shallowObj.find(Route).length)
        .to.equal(1);
    });
    it('should render the component passed to it when admin is true in localStorage', () => {
      localStorage.admin = true;
      localStorage.token = 'componentcomponentcomponent';
      const shallowObj = getShallowObj();

      const renderFn = shallowObj.find(Route).prop('render');
      const renderedValue = renderFn();

      chai.expect(renderedValue.type)
        .to.equal(SampleComponent);
    });
    it('should render a Redirect component when admin is falsy', () => {
      localStorage.admin = false;
      localStorage.token = '';
      const shallowObj = getShallowObj();
      const renderFn = shallowObj
        .find(Route)
        .prop('render');
      const renderedValue = renderFn();
      chai.expect(renderedValue.type)
        .to.equal(Redirect);
      chai.expect(renderedValue.props.to)
        .to.equal('/');
    });
  });
});
