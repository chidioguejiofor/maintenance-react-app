import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from 'semantic-ui-react';

import chai from 'chai';
import ModalWithRequest from
  '../../src/components/requests/ModalWithRequest';


const sampleProps = {
  date: '2018-10-06T00:00:00.000Z',
  title: 'I am the one that just updated',
  description: 'descriptoin 2',
  location: 'locatrion',
  image: 'sampleImage.png',
  status: 'pending',
  message: ''

};
const getShallowObj = (props = sampleProps) => shallow(
  <ModalWithRequest {...props} />
);
describe('Testing the RequestModalWithForm Component', () => {
  describe('the content it renders', () => {
    it('should render a Modal', () => {
      const shallowObj = getShallowObj();
      chai.expect(shallowObj.find(Modal).length)
        .to.equal(1);
    });
    it('should match snapshot', () => {
      const shallowObj = getShallowObj();
      expect(shallowObj).toMatchSnapshot();
    });
  });
});
