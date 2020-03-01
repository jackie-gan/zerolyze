function parse(tokens) {
  let currentIndex = 0;

  const astEntry = {
    type: 'Entry',
    body: []
  };

  function handle() {
    let token = tokens[currentIndex];
    switch (token.type) {
      case 'whitespace':
        ++currentIndex;
        return {
          type: 'Whitespace',
          value: token.value
        };
      case 'number':
        ++currentIndex;
        return {
          type: 'NumberLiteral',
          value: token.value
        };
      case 'word':
        ++currentIndex;
        return {
          type: 'StringLiteral',
          value: token.value
        };
      case 'symbol':
        ++currentIndex;
        return {
          type: 'Symbol',
          value: token.value
        };
      case 'brace':
        switch (token.value) {
          case '(':
            let nextToken = tokens[currentIndex + 1];

            // 下一个token为undefined
            if (!nextToken) {
              ++currentIndex;
              return {
                type: 'StringLiteral',
                value: token.value
              };
            }

            // 下一个字符非brace或者是右brace
            if (nextToken.type !== 'brace' || nextToken.value === ')') {
              ++currentIndex;
              return {
                type: 'StringLiteral',
                value: token.value
              };
            }

            // 这里开始保证了读到((
            ++currentIndex;

            token = tokens[currentIndex];
            nextToken = tokens[currentIndex + 1];

            // 这里检测到((后面没有了字符
            if (!nextToken) {
              return {
                type: 'StringLiteral',
                value: tokens[currentIndex - 1].value
              };
            }

            // 这里检测到((后面存在字符
            ++currentIndex;
            token = tokens[currentIndex];

            const expNode = {
              type: 'Expression',
              params: []
            };

            while (token && (token.type !== 'brace' || token.value !== ')')) {
              const node = handle();
              expNode.params.push(node);
              token = tokens[currentIndex];
            }

            token = tokens[currentIndex];
            nextToken = tokens[currentIndex + 1];

            ++currentIndex;
            ++currentIndex;

            // 这里表示token为undefined，即((Expression后面没有字符
            if (!token) {
              return {
                type: 'StringLiteral',
                value: `((${expNode.params.map(n => n.value).join('')}`
              };
            }

            // 这里表示)后面为undefined，即((Expresssion)后面没有字符
            if (!nextToken) {
              return {
                type: 'StringLiteral',
                value: `((${expNode.params.map(n => n.value).join('')})`
              };
            }

            // 这里已经保证((Expression)后面有字符，但不是)
            if (nextToken.type !== 'brace' || nextToken.value !== ')') {
              return {
                type: 'StringLiteral',
                value: `((${expNode.params.map(n => n.value).join('')})${nextToken.value}`
              }
            }

            // 这里已经保证((Expression)后面有字符， 是)

            return expNode;
          case ')':
            ++currentIndex;
            return {
              type: 'StringLiteral',
              value: token.value
            };
        }
      default:
        throw new TypeError(`Invalid type ${token.type}: ${token.value}`);
    }
  }

  while (currentIndex < tokens.length) {
    astEntry.body.push(handle());
  }

  return astEntry;
}

export default parse;