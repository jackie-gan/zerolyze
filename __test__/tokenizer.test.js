import tokenizer from '../src/tokenizer';

describe('test tokenizer', () => {
  it('Only words', () => {
    const result = tokenizer('Only words');

    expect(result).toEqual([{
      type: 'word',
      value: 'Only'
    }, {
      type: 'whitespace',
      value: ' '
    }, {
      type: 'word',
      value: 'words'
    }]);
  });

  it('Words and Numbers', () => {
    const result = tokenizer('Forever 21 is 22');

    expect(result).toEqual([{
      type: 'word',
      value: 'Forever'
    }, {
      type: 'whitespace',
      value: ' '
    }, {
      type: 'number',
      value: '21'
    }, {
      type: 'whitespace',
      value: ' '
    }, {
      type: 'word',
      value: 'is'
    }, {
      type: 'whitespace',
      value: ' '
    }, {
      type: 'number',
      value: '22'
    }]);
  });

  it('Word Numbers and Symbols', () => {
    const result = tokenizer('Are you 21? No!');

    expect(result).toEqual([{
      type: 'word',
      value: 'Are'
    }, {
      type: 'whitespace',
      value: ' '
    }, {
      type: 'word',
      value: 'you'
    }, {
      type: 'whitespace',
      value: ' '
    }, {
      type: 'number',
      value: '21'
    }, {
      type: 'symbol',
      value: '?'
    }, {
      type: 'whitespace',
      value: ' '
    }, {
      type: 'word',
      value: 'No'
    }, {
      type: 'symbol',
      value: '!'
    }]);
  })
});