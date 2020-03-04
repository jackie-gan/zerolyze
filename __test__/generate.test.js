import { tokenize, parse, transform, generate } from '../src/index';

describe('test transform', () => {
  it('This is ((person.name)', () => {
    const tokens = tokenize('This is ((person.name))');

    const ast = parse(tokens);

    const newAst = transform(ast);

    const result = generate(newAst, { person: { name: 'jackie gan' } });

    expect(result).toBe('This is jackie gan');
  });
});