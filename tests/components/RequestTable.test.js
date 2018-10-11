import React from 'react';
import { shallow } from 'enzyme';
import { Table } from 'semantic-ui-react';
import chai from 'chai';
import { requests as sampleRequests } from '../config/mockData';
import RequestTable from
  '../../src/components/requests/RequestTable';
import ModalWithRequest from
  '../../src/components/requests/ModalWithRequest';

import RequestModalWithForm from
  '../../src/components/requests/RequestModalWithForm';

const sampleProps = {
  editedRequest: {
    success: false,
    isLoading: false,
    message: '',
    errors: {},
  },
  requests: []
};
const getShallowObj = (props = sampleProps) => shallow(
  <RequestTable {...props} />
);
describe('Testing the RequestTable Component', () => {
  describe('the content it renders', () => {
    it('should render a Table', () => {
      const shallowObj = getShallowObj();
      chai.expect(shallowObj.find(Table).length)
        .to.equal(1);
    });
    it('should match snapshot', () => {
      const shallowObj = getShallowObj();
      expect(shallowObj).toMatchSnapshot();
    });
  });

  describe('when the requests array is contains values', () => {
    it('should render a Table.Rows based on the number of requests', () => {
      const shallowObj = getShallowObj({ ...sampleProps, requests: sampleRequests });

      chai.expect(shallowObj
        .find(Table.Row).length)
        .to.be.gte(sampleRequests.length);
      chai.expect(shallowObj
        .find(ModalWithRequest).length)
        .to.equal(sampleRequests.length);
    });
    it('should render the RequestModalWithForm with a submit handler for each request', () => {
      const submitSpy = jest.fn();
      const clickSpy = jest.fn();
      const shallowObj = getShallowObj({
        ...sampleProps,
        requests: sampleRequests,
        onSubmit: submitSpy,
        onClick: clickSpy
      });
      const lastRequestModalProps = shallowObj
        .find(RequestModalWithForm)
        .last().props();
      const firstRequestModalProps = shallowObj
        .find(RequestModalWithForm)
        .last().props();
      lastRequestModalProps.onSubmit();

      expect(submitSpy)
        .toHaveBeenNthCalledWith(1, 'update');
      firstRequestModalProps.onSubmit();
      expect(submitSpy)
        .toHaveBeenCalledTimes(2);
    });

    it('should render the RequestModalWithForm with a click handler for each request', () => {
      const clickSpy = jest.fn();
      const shallowObj = getShallowObj({
        ...sampleProps,
        requests: sampleRequests,
        onUpdateClick: clickSpy
      });
      shallowObj
        .find(RequestModalWithForm)
        .last().simulate('click');
      expect(clickSpy)
        .toHaveBeenCalledTimes(1);
    });
  });
});
