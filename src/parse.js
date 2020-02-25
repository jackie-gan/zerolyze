function parse(tokens) {
  let currentIndex = 0;

  const body = [];

  const astEntry = {
    type: 'Entry',
    body
  };

  while (currentIndex < tokens.length) {
    const token = tokens[currentIndex];
    switch (token.type) {
      case 'whitespace':
        body.push({
          type: 'Whitespace',
          value: token.value
        });
        ++currentIndex;
        continue;
      case 'number':
        body.push({
          type: 'NumberLiteral',
          value: token.value
        });
        ++currentIndex;
        continue;
      case 'word':
        body.push({
          type: 'StringLiteral',
          value: token.value
        });
        ++currentIndex;
        continue;
      case 'symbol':
        body.push({
          type: 'Symbol',
          value: token.value
        });
        ++currentIndex;
        continue;
      case 'brace':

        continue;
      default:
        throw new TypeError(`Invalid type ${token.type}: ${token.value}`);
    }
  }
}

export default parse;