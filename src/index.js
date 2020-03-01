import tokenize from './tokenize';
import parse from './parse';

export default function compile(str, replacement) {
  const tokens = tokenize(str);
  const ast = parse(tokens);
};

export {
  tokenize,
  parse
}