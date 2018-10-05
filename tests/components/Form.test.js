import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import chai from 'chai';
import AuthForm from '../../src/components/Form';

const getMounted = (options = {
  inputs: [],
  handleSubmit: () => {},
  handleChange: () => {}
}) => shallow(<AuthForm {...options} />);
describe('Testing AuthForm Component', () => {
  describe('the components when inputs property are empty rendered in the DOM', () => {
    it('should match snapshot', () => {
      const mountedObj = getMounted();
      expect(mountedObj).toMatchSnapshot();
    });

    it('should render a Form', () => {
      const mountedObj = getMounted();
      chai.expect(mountedObj.find(Form).length)
        .greaterThan(0);
    });
    it('should render an Links when links are specified ', () => {
      const options = {
        inputs: [],
        handleSubmit: () => {},
        handleChange: () => {},
        links: [
          { to: '/login', caption: 'Login' },
          { to: '/great', caption: 'Grate' },
          { to: '/love-board', caption: 'Love Board' }
        ]
      };
      const mountedObj = getMounted(options);
      chai.expect(mountedObj.find(Link).length)
        .to.equal(options.links.length);
    });
  });

  describe('the components when inputs property are empty rendered in the DOM', () => {
    it('should render a Form', () => {
      const mountedObj = getMounted();
      chai.expect(mountedObj.find(Form).length)
        .greaterThan(0);
    });

    it('should use the input props to render inputs', () => {
      const options = {
        handleChange: jest.fn(),
        error: true,
        inputs: [
          {
            placeholder: 'test',
            name: 'name',
            value: 'test 100'
          },
          {
            placeholder: 'enter test 2',
            name: 'good-name',
            value: 'final 100'
          }
        ]
      };


      const mountedObj = getMounted(options);
      chai.expect(mountedObj.find(Form.Input).length)
        .to.equal(options.inputs.length);
      mountedObj.find(Form.Input)
        .first()
        .simulate('change');
      expect(options.handleChange)
        .toHaveBeenCalled();
    });
  });
});
