import parseDigits from './parseDigits';
describe('parseDigits', function () {
  it('should parse digits', function () {
    parseDigits('+٤٤٢٣٢٣٢٣٤').should.equal('442323234');
  });
});
//# sourceMappingURL=parseDigits.test.js.map