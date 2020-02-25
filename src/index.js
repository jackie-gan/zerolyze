import tokenize from './tokenize';

export default function compile(str, replacement) {
  const tokens = tokenize(str);
};

export {
  tokenize
}