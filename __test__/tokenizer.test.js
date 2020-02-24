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
    const result = tokenizer('Forever 21');

    expect(result).toEqual([{
      type: 'word',
      value: 'Forever'
    }, {
      type: 'whitespace',
      value: ' '
    }, {
      type: 'number',
      value: '21'
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
  });

  it('Number stick to word', () => {
    const result = tokenizer("I'm 11th");

    expect(result).toEqual([{
      type: 'word',
      value: 'I'
    }, {
      type: 'symbol',
      value: "'"
    }, {
      type: 'word',
      value: 'm'
    }, {
      type: 'whitespace',
      value: ' '
    }, {
      type: 'number',
      value: '11'
    }, {
      type: 'word',
      value: 'th'
    }]);
  });

  it('Has brace', () => {
    const result = tokenizer('My name is ((name)).');

    expect(result).toEqual([{
      type: 'word',
      value: 'My'
    }, {
      type: 'whitespace',
      value: ' '
    }, {
      type: 'word',
      value: 'name'
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
      type: 'brace',
      value: '('
    }, {
      type: 'brace',
      value: '('
    }, {
      type: 'word',
      value: 'name'
    }, {
      type: 'brace',
      value: ')'
    }, {
      type: 'brace',
      value: ')'
    }, {
      type: 'symbol',
      value: '.'
    }]);
  });

  it('Invalid brace', () => {
    const result = tokenizer('This is ((fruit)).)');

    expect(result).toEqual([{
      type: 'word',
      value: 'This'
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
      type: 'brace',
      value: '('
    }, {
      type: 'brace',
      value: '('
    }, {
      type: 'word',
      value: 'fruit'
    }, {
      type: 'brace',
      value: ')'
    }, {
      type: 'brace',
      value: ')'
    }, {
      type: 'symbol',
      value: '.'
    }, {
      type: 'brace',
      value: ')'
    }]);
  })
});