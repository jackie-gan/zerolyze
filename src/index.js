import tokenize from './tokenize';
import parse from './parse';
import transform from './transform';
import generate from './generate';

export default function compile(str, replacement) {
  const tokens = tokenize(str);
  const ast = parse(tokens);
  const newAst = transform(ast);
  return generate(newAst, replacement);
};

export {
  tokenize,
  parse,
  transform,
  generate
}