import React from 'react';
import { shallow } from 'enzyme';
import { Form, Input } from 'semantic-ui-react';
import chai from 'chai';
import ResetPassword from '../../src/views/auth/ResetPassword';
import AuthForm from '../../src/components/auth/AuthForm';

const getMounted = (options = {}) => shallow(<ResetPassword {...options} />);
describe('Testing AuthForm Component', () => {
  describe('the components when inputs property are empty rendered in the DOM', () => {
    it('should match snapshot', () => {
      const mountedObj = getMounted();
      expect(mountedObj).toMatchSnapshot();
    });

    it('should render an AuthForm', () => {
      const mountedObj = getMounted();
      chai.expect(mountedObj.find(AuthForm).length)
        .to.equal(1);
      chai.expect(
        mountedObj.find(AuthForm)
          .prop('inputs')
          .length
      )
        .to.equal(3);
    });
  });

  describe('the methods in the component', () => {
    describe('handleChange', () => {
      it('should update state when called', () => {
        const stateSpy = jest.spyOn(ResetPassword.prototype, 'setState');
        const spy = jest.spyOn(ResetPassword.prototype, 'handleChange');
        const mountedObj = getMounted();

        mountedObj
          .instance()
          .handleChange(null, { name: 'username', value: 'Test Username' });
        expect(spy)
          .toHaveBeenCalledTimes(1);
        expect(stateSpy)
          .toHaveBeenCalledTimes(1);
      });
    });
  });
});
