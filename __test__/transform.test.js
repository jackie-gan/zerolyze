import { tokenize, parse, transform } from '../src/index';

describe('test transform', () => {
  it('Invalid Expression: This is ((person.name.))', () => {
    expect(() => {
      const tokens = tokenize('This is ((person.name.))');

      const ast = parse(tokens);
  
      const newAst = transform(ast);
    }).toThrow(TypeError);
  });

  it('Invalid Expression: This is ((.person.name))', () => {
    expect(() => {
      const tokens = tokenize('This is ((.person.name))');

      const ast = parse(tokens);
  
      const newAst = transform(ast);
    }).toThrow(TypeError);
  });

  it('Invalid Expression: This is ((name))', () => {
    const tokens = tokenize('This is ((name))');

    const ast = parse(tokens);

    const newAst = transform(ast);

    expect(newAst).toEqual({
      type: 'Entry',
      body: [
        { type: 'StringLiteral', value: 'This' },
        { type: 'Whitespace', value: ' ' },
        { type: 'StringLiteral', value: 'is' },
        { type: 'Whitespace', value: ' ' },
        { type: 'Expression', arguments: ['name'] }
      ]
    });
  });

  it('Invalid Expression: This is ((person.name))', () => {
    const tokens = tokenize('This is ((person.name))');

    const ast = parse(tokens);

    const newAst = transform(ast);

    expect(newAst).toEqual({
      type: 'Entry',
      body: [
        { type: 'StringLiteral', value: 'This' },
        { type: 'Whitespace', value: ' ' },
        { type: 'StringLiteral', value: 'is' },
        { type: 'Whitespace', value: ' ' },
        { type: 'Expression', arguments: ['person', 'name'] }
      ]
    });
  });
});