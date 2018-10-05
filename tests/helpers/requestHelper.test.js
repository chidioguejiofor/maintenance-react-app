import chai from 'chai';
import { getColor, getIconType,
  capitalizeWord } from '../../src/helpers/requestHelper';

describe('Testing helper functions', () => {
  describe('getColor', () => {
    it('should return an empty string when an unknown status is passed to it', () => {
      const value = getColor('unknown');
      const expected = '';
      chai.expect(value)
        .to.equal(expected);
    });
    it('should return "orange" when an unknown status  equals "pending"', () => {
      const value = getColor('pending');
      const expected = 'orange';
      chai.expect(value)
        .to.equal(expected);
    });
    it('should return "green" when an unknown status  equals "approved"', () => {
      const value = getColor('approved');
      const expected = 'green';
      chai.expect(value)
        .to.equal(expected);
    });
    it('should return "green" when an unknown status  equals "resolved"', () => {
      const value = getColor('resolved');
      const expected = 'green';
      chai.expect(value)
        .to.equal(expected);
    });
    it('should return "red" when an unknown status  equals "disapproved"', () => {
      const value = getColor('disapproved');
      const expected = 'red';
      chai.expect(value)
        .to.equal(expected);
    });
  });
  describe('getIconType', () => {
    it('should return an empty string when an unknown status is passed to it', () => {
      const value = getIconType('unknown');
      const expected = '';
      chai.expect(value)
        .to.equal(expected);
    });
    it('should return "hourglass half" when an unknown status  equals "pending"', () => {
      const value = getIconType('pending');
      const expected = 'hourglass half';
      chai.expect(value)
        .to.equal(expected);
    });
    it('should return "check circle outline" when an unknown status  equals "approved"', () => {
      const value = getIconType('approved');
      const expected = 'check circle outline';
      chai.expect(value)
        .to.equal(expected);
    });
    it('should return "check" when an unknown status  equals "resolved"', () => {
      const value = getIconType('resolved');
      const expected = 'check';
      chai.expect(value)
        .to.equal(expected);
    });
    it('should return "cancel" when an unknown status  equals "disapproved"', () => {
      const value = getIconType('disapproved');
      const expected = 'cancel';
      chai.expect(value)
        .to.equal(expected);
    });
  });

  describe('capitalizeWord', () => {
    it('should return "Foo" when "Foo" is passed', () => {
      const value = capitalizeWord('Foo');
      const expected = 'Foo';
      chai.expect(value)
        .to.equal(expected);
    });
    it('should return "Atom" when "atom" is passed', () => {
      const value = capitalizeWord('atom');
      const expected = 'Atom';
      chai.expect(value)
        .to.equal(expected);
    });
    it('should return "Made a lot of Money" when "made a lot of money" is passed', () => {
      const value = capitalizeWord('made a lot of Money');
      const expected = 'Made a lot of money';
      chai.expect(value)
        .to.equal(expected);
    });
  });
});
