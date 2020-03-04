import tokenize from './tokenize';
import parse from './parse';
import transform from './transform';

export default function compile(str, replacement) {
  const tokens = tokenize(str);
  const ast = parse(tokens);
  const newAst = transform(ast, replacement);
};

export {
  tokenize,
  parse,
  transform
}