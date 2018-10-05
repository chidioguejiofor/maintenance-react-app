import { shallow } from 'enzyme';

import chai from 'chai';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ProtectedRoute from '../../src/routes/ProtectedRoute';

const localStorageMock = {};
global.localStorage = localStorageMock;

const SampleComponent = () => <div>Empty</div>;

const sampleProps = {
  component: SampleComponent,
};

const getShallowObj = (props =
sampleProps) => shallow(<ProtectedRoute {...props} />);
describe('ProtectedRoute.test.js', () => {
  describe('the components rendered', () => {
    it('should render a Route', () => {
      const shallowObj = getShallowObj();
      chai.expect(shallowObj.find(Route).length)
        .to.equal(1);
    });
    it('should render the component passed to it as props when localStorage has a token', () => {
      localStorage.token = 'sampleThbbhbihbhubhbokenfasfdnfdsafndsnfudsnfofunsfguasbfbgoubasuigbasgfoidsbgosbsigisfbgisbgbe';
      const shallowObj = getShallowObj();

      const rederFn = shallowObj.find(Route).prop('render');
      const renderedValue = rederFn();

      chai.expect(renderedValue.type)
        .to.equal(SampleComponent);
    });
    it('should render a Redirect component when token is missing', () => {
      localStorage.token = '';
      const shallowObj = getShallowObj();

      const renderFn = shallowObj.find(Route).prop('render');
      const renderedValue = renderFn();

      chai.expect(renderedValue.type)
        .to.equal(Redirect);
      chai.expect(renderedValue.props.to)
        .to.equal('/login');
    });
  });
});
