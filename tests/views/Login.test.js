import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import { Login, mapStateToProps,
  mapDispatchToProps } from '../../src/views/auth/Login';
import AuthForm from '../../src/components/Form';

const getMounted = (options = {
  login: {
    errors: { errorMessages: [] },
  },
  history: { push: () => {} },
  sendLoginRequest: () => {}
}) => shallow(<Login {...options} />);
describe('Testing Login Component', () => {
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
        .to.equal(2);
    });
  });

  describe('mapStateToProps', () => {
    it('should map the state correctly', () => {
      const mockState = {
        login: 'mockStateLogin',
      };

      const mockedProp = mapStateToProps(mockState);

      chai.expect(mockedProp.login)
        .to.equal(mockState.login);
    });
  });

  describe('mapDispatchToPrps', () => {
    it('should map the state correctly', () => {
      const mockDispatch = jest.fn();

      const mockedProp = mapDispatchToProps(mockDispatch);

      chai.expect(mockedProp.sendLoginRequest)
        .to.be.a('function');
      mockedProp.sendLoginRequest();
      expect(mockDispatch)
        .toHaveBeenCalledTimes(1);
    });
  });
  describe('the methods in the component', () => {
    describe('componentWillReceiveProps', () => {
      it('should  be called when props are updated', () => {
        const spy = jest.spyOn(Login.prototype, 'componentWillReceiveProps');
        const mountedObj = getMounted();
        const newProps = { temp: 'temp Props' };
        mountedObj.setProps(newProps);
        expect(spy)
          .toHaveBeenCalledTimes(1);
      });
      it('should call history.push when success equals true', () => {
        const spy = jest.spyOn(Login.prototype, 'componentWillReceiveProps');
        const historySpy = jest.fn();
        jest.useFakeTimers();
        const newProps = {
          login: {
            errors: { errorMessages: [] },
            success: true
          },
          history: { push: historySpy },
        };
        const options = {
          login: {
            errors: { errorMessages: [] },
          },
          history: { push: historySpy },
        };
        const mountedObj = getMounted(options);

        mountedObj.setProps(newProps);
        expect(spy)
          .toHaveBeenCalledTimes(2);
        expect(setTimeout).toHaveBeenCalledTimes(1);
        jest.runAllTimers();
        expect(historySpy).toHaveBeenNthCalledWith(1, '/dashboard');
      });
    });
    describe('handleChange', () => {
      it('should update state when called', () => {
        const stateSpy = jest.spyOn(Login.prototype, 'setState');
        const spy = jest.spyOn(Login.prototype, 'handleChange');
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
    describe('handleSubmit', () => {
      it('should call send login request with the an object', () => {
        const sendLoginSpy = jest.fn();
        const spy = jest.spyOn(Login.prototype, 'handleChange');
        const mountedObj = getMounted({
          login: {
            errors: { errorMessages: [] },
          },
          sendLoginRequest: sendLoginSpy,
        });

        mountedObj.instance().handleSubmit();
        expect(sendLoginSpy)
          .toHaveBeenCalledTimes(1);
        expect(spy)
          .toHaveBeenCalledTimes(1);
      });
    });
  });
});
