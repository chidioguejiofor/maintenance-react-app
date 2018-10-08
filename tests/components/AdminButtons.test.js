import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import { Button } from 'semantic-ui-react';
import AdminButtons from '../../src/components/requests/AdminButtons';

const sampleProps = {
  status: 'pending',
  onClick: () => {},
  requestId: 0
};
const getShallowObj = props => shallow(<AdminButtons {...sampleProps} {...props} />);
describe('Testing AdminButtons', () => {
  describe('components rendered', () => {
    it('should match the existing snapshot of the app ', () => {
      const wrapper = getShallowObj();
      expect(wrapper).toMatchSnapshot();
    });

    describe('when status is pending', () => {
      it('should render an approve and diaspprove buttons when status is "pending"', () => {
        const wrapper = getShallowObj({ status: 'pending' });
        chai.expect(wrapper.find(Button).length)
          .to.equal(2);
      });
      it('should call approve when the first button is clicked', () => {
        const mockClick = jest.fn();
        const wrapper = getShallowObj({ status: 'pending', onClick: mockClick });
        wrapper.find(Button).first().simulate('click');
        wrapper.find(Button).last().simulate('click');
        expect(mockClick)
          .toHaveBeenCalledTimes(2);
      });
    });

    describe('when status is "disapproved"', () => {
      it('should render an approve and disapproved buttons when status is "disapproved"', () => {
        const wrapper = getShallowObj({ status: 'disapproved' });
        chai.expect(wrapper.find(Button).length)
          .to.equal(1);
      });
      it('should call approve when the first button is clicked', () => {
        const mockClick = jest.fn();
        const wrapper = getShallowObj({ status: 'disapproved', onClick: mockClick });
        wrapper.find(Button).first().simulate('click');
        expect(mockClick)
          .toHaveBeenCalledTimes(1);
        expect(mockClick)
          .toHaveBeenCalledWith('approve', 0);
      });
    });
    describe('when status is "approved"', () => {
      it('should render an approve and disapproved buttons when status is "approved"', () => {
        const wrapper = getShallowObj({ status: 'approved' });
        chai.expect(wrapper.find(Button).length)
          .to.equal(2);
      });
      it('should call approve when the first button is clicked', () => {
        const mockClick = jest.fn();
        const wrapper = getShallowObj({ status: 'approved', onClick: mockClick });
        wrapper.find(Button).first().simulate('click');
        wrapper.find(Button).last().simulate('click');
        expect(mockClick)
          .toHaveBeenCalledTimes(2);
        expect(mockClick)
          .toHaveBeenCalledWith('resolve', 0);
        expect(mockClick)
          .toHaveBeenCalledWith('disapprove', 0);
      });
    });

    describe('when status is unknown', () => {
      it('should render no buttons when  "approved"', () => {
        const wrapper = getShallowObj({ status: 'unknown' });
        chai.expect(wrapper.find(Button).length)
          .to.equal(0);
      });
    });
  });
});
