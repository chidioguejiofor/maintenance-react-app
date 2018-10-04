import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import { SignUp, mapStateToProps, mapDispatchToProps } from '../../src/views/auth/Signup';
import AuthForm from '../../src/components/auth/AuthForm';

const resetPageSpy = jest.fn();
const getMounted = (options = {
  signup: {
    errors: { errorMessages: [] },
    data: {}
  },
  resetPage: resetPageSpy,
}) => shallow(<SignUp {...options} />);
describe('Testing SignUp Component', () => {
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


  describe('mapStateToProps', () => {
    it('should map the state correctly', () => {
      const mockState = {
        signup: 'mockStateSignup',
      };

      const mockedProp = mapStateToProps(mockState);

      chai.expect(mockedProp.signup)
        .to.equal(mockState.signup);
    });
  });

  describe('mapDispatchToPrps', () => {
    it('should map the state correctly', () => {
      const mockDispatch = jest.fn();

      const mockedProp = mapDispatchToProps(mockDispatch);

      chai.expect(mockedProp.sendSignUpRequest)
        .to.be.a('function');
      chai.expect(mockedProp.resetPage)
        .to.be.a('function');
      mockedProp.sendSignUpRequest();
      mockedProp.resetPage();

      expect(mockDispatch)
        .toHaveBeenCalledTimes(2);
    });
  });

  describe('the methods in the component', () => {
    describe('componentWillReceiveProps', () => {
      it('should  be called when props are updated', () => {
        const spy = jest.spyOn(SignUp.prototype, 'componentWillReceiveProps');
        const mountedObj = getMounted();
        const newProps = { temp: 'temp Props' };
        mountedObj.setProps(newProps);
        expect(spy)
          .toHaveBeenCalledTimes(1);
      });
      it('should call history.push when success equals true', () => {
        const spy = jest.spyOn(SignUp.prototype, 'componentWillReceiveProps');
        const historySpy = jest.fn();
        jest.useFakeTimers();

        const options = {
          signup: {
            errors: { errorMessages: [] },
            data: {}
          },
          history: { push: historySpy },

        };
        const mountedObj = getMounted(options);

        const newProps = {
          signup: {
            errors: { errorMessages: [] },
            success: true,
            data: {}
          },
          history: { push: historySpy },
        };
        mountedObj.setProps(newProps);
        expect(spy)
          .toHaveBeenCalledTimes(2);
        expect(setTimeout).toHaveBeenCalledTimes(1);
        jest.runAllTimers();
        expect(historySpy).toHaveBeenNthCalledWith(1, '/login');
      });


      it('should call errorMessages.push when status === 409', () => {
        const spy = jest.spyOn(SignUp.prototype, 'componentWillReceiveProps');
        const historySpy = jest.fn();
        jest.useFakeTimers();

        const options = {
          signup: {
            errors: { errorMessages: [] },
            data: {}
          },
          history: { push: historySpy },

        };
        const mountedObj = getMounted(options);

        const newProps = {
          signup: {
            errors: { errorMessages: [], statusCode: 409 },
            success: true,
            data: {}
          },
        };
        const spy2 = jest.spyOn(newProps.signup.errors.errorMessages, 'push');
        mountedObj.setProps(newProps);
        expect(spy)
          .toHaveBeenCalled();
        expect(spy2)
          .toHaveBeenNthCalledWith(1, 'Try Again');
      });
    });

    describe('componentWillUnmount', () => {
      it('should  be called when props are updated', () => {
        const spy = jest.spyOn(SignUp.prototype, 'componentWillUnmount');
        const mountedObj = getMounted();
        mountedObj.unmount();
        expect(spy)
          .toHaveBeenCalledTimes(1);
        expect(resetPageSpy)
          .toHaveBeenCalledTimes(1);
      });
    });
    describe('handleChange', () => {
      it('should update state when called', () => {
        const stateSpy = jest.spyOn(SignUp.prototype, 'setState');
        const spy = jest.spyOn(SignUp.prototype, 'handleChange');
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
        const sendSignUpSpy = jest.fn();
        const spy = jest.spyOn(SignUp.prototype, 'handleChange');
        const mountedObj = getMounted({
          signup: {
            errors: { errorMessages: [] },
            data: {}
          },
          sendSignUpRequest: sendSignUpSpy,

        });

        mountedObj.instance().handleSubmit();
        expect(sendSignUpSpy)
          .toHaveBeenCalledTimes(1);
        expect(spy)
          .toHaveBeenCalledTimes(1);
      });
    });
  });
});
