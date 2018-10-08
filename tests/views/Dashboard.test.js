import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import { requests as mockRequests } from '../config/mockData';
import { Dashboard, mapDispatchToProps, mapStateToProps }
  from '../../src/views/dashboard/Dashboard';

const basicProps = {
  sendLoadUserRequest: () => {},
  match: { path: '/dashboard' }
};
const getShallowObj = (props = {}) => shallow(
  <Dashboard {...basicProps} {...props} />
);

describe('Testing Dashboard', () => {
  describe('Testing components rendered', () => {
    it('should match the existing snapshot of the app ', () => {
      const wrapper = getShallowObj();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Testing mapStateToProps', () => {
    it('should correctly map state  ', () => {
      const mockState = {
        image: 'tempUrl',
        loadedRequest: 'loadedRequest',
        currentRequest: 'currentRequest',
      };

      const newState = mapStateToProps(mockState);

      chai.expect(newState.image)
        .to.equal(mockState.image);

      chai.expect(newState.loadedRequest)
        .to.equal(mockState.loadedRequest);
      chai.expect(newState.currentRequest)
        .to.equal(mockState.currentRequest);
    });
  });

  describe('Testing mapDispatchToProps', () => {
    it('should correctly map state  ', () => {
      const mockDispatch = jest.fn();


      const newProps = mapDispatchToProps(mockDispatch);
      chai.expect(newProps.sendUploadImageRequest)
        .to.be.a('function');
      chai.expect(newProps.sendCreateRequest)
        .to.be.a('function');
      chai.expect(newProps.sendLoadUserRequest)
        .to.be.a('function');
      chai.expect(newProps.sendUpdateRequest)
        .to.be.a('function');
      chai.expect(newProps.resetCurrentRequest)
        .to.be.a('function');
      chai.expect(newProps.sendLoadAllRequests)
        .to.be.a('function');
      chai.expect(newProps.sendEngineerUpdate)
        .to.be.a('function');

      newProps.sendEngineerUpdate('', '');
      newProps.sendLoadAllRequests();
      newProps.sendCreateRequest();
      newProps.sendLoadUserRequest();
      newProps.sendUpdateRequest({ id: 1 });
      newProps.resetCurrentRequest();
      expect(mockDispatch)
        .toHaveBeenCalledTimes(6);
    });
  });
  describe('component methods', () => {
    describe('componentDidMount', () => {
      it('should call componentDidMount on load and sendLoadUserRequest when the route is /dashboard', () => {
        const loadSpy = jest.fn();
        const spy = jest.spyOn(Dashboard.prototype, 'componentDidMount');
        getShallowObj({ sendLoadUserRequest: loadSpy });
        expect(loadSpy)
          .toHaveBeenCalled();
        expect(spy)
          .toHaveBeenCalled();
      });
      it('should call componentDidMount on load  and sendLoadUserRequest when the route is /dashboard/admin', () => {
        const loadSpy = jest.fn();
        const spy = jest.spyOn(Dashboard.prototype, 'componentDidMount');
        getShallowObj({ sendLoadAllRequests: loadSpy, match: { path: '/dashboard/admin' } });
        expect(loadSpy)
          .toHaveBeenCalled();
        expect(spy)
          .toHaveBeenCalled();
      });
    });

    describe('onUpdateClick', () => {
      it('should reset state', () => {
        const setStateSpy = jest.spyOn(Dashboard.prototype, 'setState');
        const shallowObj = getShallowObj();
        const mockRequest = mockRequests[0];

        shallowObj.instance().onUpdateClick(mockRequest);
        expect(setStateSpy)
          .toHaveBeenCalledTimes(1);
        chai.expect(shallowObj.state().title)
          .to.equal(mockRequest.title);
        chai.expect(shallowObj.state().description)
          .to.equal(mockRequest.description);
        chai.expect(shallowObj.state().image)
          .to.equal(mockRequest.image);
        chai.expect(shallowObj.state().location)
          .to.equal(mockRequest.location);
        chai.expect(shallowObj.state().id)
          .to.equal(mockRequest.id);
      });
    });


    describe('persistRequest', () => {
      it('should call sendCreateRequest method with the request when its argument does not equal "update"', () => {
        const spy = jest.fn();
        const shallowObj = getShallowObj({
          sendCreateRequest: spy
        });
        const mockRequest = mockRequests[0];

        shallowObj.setState(...mockRequest);
        shallowObj.instance().persistRequest('create');
        expect(spy).toHaveBeenCalled();
      });
      it('should call sendCreateRequest method with the request when its argument does not equal "update"', () => {
        const spy = jest.fn();
        const shallowObj = getShallowObj({
          sendUpdateRequest: spy
        });
        const mockRequest = mockRequests[0];

        shallowObj.setState(...mockRequest);
        shallowObj.instance().persistRequest('update');
        expect(spy).toHaveBeenCalled();
      });
      it('should call sendEngineerUpdate method with the request when its argument is unknown and user is admin', () => {
        const spy = jest.fn();
        const shallowObj = getShallowObj({
          sendEngineerUpdate: spy,
          match: { path: '/dashboard/admin' }
        });
        const mockRequest = mockRequests[0];

        shallowObj.setState(...mockRequest);
        shallowObj.instance().persistRequest();
        expect(spy).toHaveBeenCalled();
      });
    });


    describe('handleRequestChange', () => {
      it('should setState with value passed when name is not equal to "image" ', () => {
        const setStateSpy = jest.spyOn(Dashboard.prototype, 'setState');
        const shallowObj = getShallowObj();
        const mockEvent = null;
        const mockValues = {
          name: 'great-name',
          value: 'new value'
        };

        shallowObj.instance()
          .handleRequestChange(mockEvent, mockValues);
        expect(setStateSpy)
          .toHaveBeenCalled();
        chai.expect(shallowObj.state(mockValues.name))
          .to.equal(mockValues.value);
      });

      it('should call fileReader when name equals "image"', () => {
        const setStateSpy = jest.spyOn(Dashboard.prototype, 'setState');
        const shallowObj = getShallowObj();
        const mockEvent = {
          target: { files: [new Blob()] }
        };
        const readerSpy = jest.spyOn(shallowObj.instance().fileReader, 'readAsDataURL');

        shallowObj.instance()
          .handleRequestChange(mockEvent, { name: 'image' });
        expect(readerSpy)
          .toHaveBeenCalled();
      });
    });
    describe('onCreateClick', () => {
      it('should reset state', () => {
        const setStateSpy = jest.spyOn(Dashboard.prototype, 'setState');
        const shallowObj = getShallowObj();
        shallowObj.setState({
          title: 'this is a temp title',
          description: 'final description',
          location: 'I like here',
          image: 'I am in this image'
        });


        shallowObj.instance().onCreateClick();
        expect(setStateSpy)
          .toHaveBeenCalled();
        chai.expect(shallowObj.state().title)
          .to.equal('');
        chai.expect(shallowObj.state().description)
          .to.equal('');
        chai.expect(shallowObj.state().image)
          .to.equal('');
        chai.expect(shallowObj.state().location)
          .to.equal('');
      });
    });
    describe('componentWillReceiveProps', () => {
      it('should be called when props is set', () => {
        const loadSpy = jest.fn();
        const componentWillReceivePropsSpy = jest.spyOn(Dashboard.prototype, 'componentWillReceiveProps');
        const shallowObj = getShallowObj({ sendLoadUserRequest: loadSpy });
        shallowObj.setProps({ unknown: 'unknown' });
        expect(componentWillReceivePropsSpy)
          .toHaveBeenCalled();
      });
      it('should call setState with new requests and allowModals= undefined when requests are retrieved', () => {
        const componentWillReceivePropsSpy = jest.spyOn(Dashboard.prototype, 'componentWillReceiveProps');
        const setStateSpy = jest.spyOn(Dashboard.prototype, 'setState');

        const sampleLoadedRequest = {
          loadedRequest: { requests: mockRequests },
        };
        const shallowObj = getShallowObj();
        shallowObj.setProps(sampleLoadedRequest);
        expect(componentWillReceivePropsSpy)
          .toHaveBeenCalled();
        expect(setStateSpy)
          .toHaveBeenCalled();

        chai.expect(shallowObj.state().allowModalToOpen)
          .to.equal(undefined);
        chai.expect(shallowObj.state().requests)
          .to.equal(mockRequests);
      });

      it('should call setState with new image when image is passed', () => {
        const componentWillReceivePropsSpy = jest.spyOn(Dashboard.prototype, 'componentWillReceiveProps');
        const setStateSpy = jest.spyOn(Dashboard.prototype, 'setState');

        const imageUrl = 'new Image';
        const sampleLoadedRequest = {
          image: { imageUrl }
        };
        const shallowObj = getShallowObj();
        shallowObj.setProps(sampleLoadedRequest);
        expect(componentWillReceivePropsSpy)
          .toHaveBeenCalled();
        expect(setStateSpy)
          .toHaveBeenCalled();

        chai.expect(shallowObj.state().image)
          .to.equal(imageUrl);
      });

      it('should set allowModalToOpen to false after some time when currentRequest contains success ', () => {
        const componentWillReceivePropsSpy = jest.spyOn(Dashboard.prototype, 'componentWillReceiveProps');
        const setStateSpy = jest.spyOn(Dashboard.prototype, 'setState');

        jest.useFakeTimers();
        const sampleLoadedRequest = {
          currentRequest: { success: true }
        };
        const shallowObj = getShallowObj();
        shallowObj.setProps(sampleLoadedRequest);

        expect(componentWillReceivePropsSpy)
          .toHaveBeenCalled();
        expect(setStateSpy)
          .toHaveBeenCalled();
        jest.runAllTimers();
        chai.expect(shallowObj.state().allowModalToOpen)
          .to.equal(false);
      });

      it('should set call sendLoadAllRequests when currentRequest equals success and  path is /dashboard/admin', () => {
        const componentWillReceivePropsSpy = jest.spyOn(Dashboard.prototype, 'componentWillReceiveProps');

        const spy = jest.fn();
        jest.useFakeTimers();
        const sampleLoadedRequest = {
          currentRequest: { success: true },

        };
        const shallowObj = getShallowObj({ sendLoadAllRequests: spy, match: { path: '/dashboard/admin' } });
        shallowObj.setProps(sampleLoadedRequest);

        expect(componentWillReceivePropsSpy)
          .toHaveBeenCalled();

        jest.runAllTimers();
        expect(spy)
          .toHaveBeenCalled();
        chai.expect(shallowObj.state().allowModalToOpen)
          .to.equal(false);
      });
    });
  });
});
