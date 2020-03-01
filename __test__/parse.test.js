import { tokenize, parse } from '../src/index';

describe('test parser', () => {
  it('Invalid Brace ((', () => {
    const tokens = tokenize('This is ((');

    const ast = parse(tokens);

    expect(ast).toEqual({
      type: 'Entry',
      body: [
        { type: 'StringLiteral', value: 'This' },
        { type: 'Whitespace', value: ' ' },
        { type: 'StringLiteral', value: 'is' },
        { type: 'Whitespace', value: ' ' },
        { type: 'StringLiteral', value: '(' },
        { type: 'StringLiteral', value: '(' }
      ]
    });
  });

  it('Invalid Brace (()', () => {
    const tokens = tokenize('This is (()');

    const ast = parse(tokens);

    expect(ast).toEqual({
      type: 'Entry',
      body: [
        { type: 'StringLiteral', value: 'This' },
        { type: 'Whitespace', value: ' ' },
        { type: 'StringLiteral', value: 'is' },
        { type: 'Whitespace', value: ' ' },
        { type: 'StringLiteral', value: '(()' }
      ]
    });
  });

  it('Invalid Brace (())', () => {
    const tokens = tokenize('This is (())');

    const ast = parse(tokens);

    expect(ast).toEqual({
      type: 'Entry',
      body: [
        { type: 'StringLiteral', value: 'This' },
        { type: 'Whitespace', value: ' ' },
        { type: 'StringLiteral', value: 'is' },
        { type: 'Whitespace', value: ' ' },
        { type: 'Expression', params: []},      
      ]
    });
  });

  it('Invalid Brace ((name))(', () => {
    const tokens = tokenize('This is ((name))(');

    const ast = parse(tokens);

    expect(ast).toEqual({
      type: 'Entry',
      body: [
        { type: 'StringLiteral', value: 'This' },
        { type: 'Whitespace', value: ' ' },
        { type: 'StringLiteral', value: 'is' },
        { type: 'Whitespace', value: ' ' },
        { type: 'Expression', params: [
          { type: 'StringLiteral', value: 'name' }
        ]},
        { type: 'StringLiteral', value: '(' }
      ]
    });
  });

  it('Legal', () => {
    const tokens = tokenize('This is ((name))');

    const ast = parse(tokens);

    expect(ast).toEqual({
      type: 'Entry',
      body: [
        { type: 'StringLiteral', value: 'This' },
        { type: 'Whitespace', value: ' ' },
        { type: 'StringLiteral', value: 'is' },
        { type: 'Whitespace', value: ' ' },
        { type: 'Expression', params: [
          { type: 'StringLiteral', value: 'name' }
        ]}
      ]
    });
  });
});