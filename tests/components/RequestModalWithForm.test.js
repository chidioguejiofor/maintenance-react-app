import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from 'semantic-ui-react';

import chai from 'chai';
import Form from
  '../../src/components/Form';
import RequestModalWithForm from
  '../../src/components/requests/RequestModalWithForm';


const getShallowObj = (props = {}) => shallow(
  <RequestModalWithForm {...props} />
);
describe('Testing the RequestModalWithForm Component', () => {
  describe('the content it renders', () => {
    it('should render a Modal', () => {
      const shallowObj = getShallowObj();
      chai.expect(shallowObj.find(Modal).length)
        .to.equal(1);
    });
    it('should render a  Form', () => {
      const shallowObj = getShallowObj();
      chai.expect(shallowObj.find(Form).length)
        .to.equal(1);
    });
  });

  describe('the props of the Form rendered', () => {
    it('the form should have a formTitle equal to "Create Request" when the update prop is false', () => {
      const shallowObj = getShallowObj({ update: false });
      chai.expect(shallowObj.find(Form).prop('formTitle'))
        .to.equal('Create Request');
    });

    it('the form should have a formTitle equal to "Update Request" when the update prop is true', () => {
      const shallowObj = getShallowObj({ update: true });
      chai.expect(shallowObj.find(Form).prop('formTitle'))
        .to.equal('Update Request');
    });
  });

  describe('the props of the Modal trigger Button rendered', () => {
    it('the Modal trigger should be a green button when update is false', () => {
      const shallowObj = getShallowObj({ update: false });
      const renderedButtonObj = shallowObj.find(Modal)
        .prop('trigger');
      chai.expect(renderedButtonObj.props.color)
        .to.equal('green');
      chai.expect(renderedButtonObj.props.className)
        .to.equal('create-btn');
    });

    it('the Modal trigger should be an orange button when update is true', () => {
      const shallowObj = getShallowObj({ update: true });
      const renderedButtonObj = shallowObj.find(Modal)
        .prop('trigger');
      chai.expect(renderedButtonObj.props.color)
        .to.equal('orange');
      chai.expect(renderedButtonObj.props.className)
        .to.equal('update-btn');
    });
  });
});
