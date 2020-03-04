function transform(ast) {
  const newAst = {
    type: 'Entry',
    body: []
  };

  ast._context = newAst.body;

  traverse(ast, {
    Expression(node, parent) {
      const newNode = {
        type: 'Expression',
        arguments: []
      };

      node._context = newNode.arguments;

      parent._context.push(newNode);
    },
    Whitespace(node, parent) {
      const newNode = {
        type: 'Whitespace',
        value: node.value
      };

      parent._context.push(newNode);
    },
    NumberLiteral(node, parent) {
      const newNode = {
        type: 'NumberLiteral',
        value: node.value
      };

      parent._context.push(newNode);
    },
    StringLiteral(node, parent, prev, next) {
      if (parent.type === 'Expression') {
        if ((next && next.type === 'Symbol') || (prev && prev.type === 'Symbol' )) {
        } else {
          parent._context.push(node.value);
        }
      } else {
        const newNode = {
          type: 'StringLiteral',
          value: node.value
        };

        parent._context.push(newNode);
      }
    },
    Symbol(node, parent, prev, next) {
      if (parent.type === 'Expression') {
        if (node.value === '.') {
          if (!prev) throw new TypeError(`Invalid Expression .${next ? next.value : ''}`);
          if (!next) throw new TypeError(`Invalid Expression ${prev ? prev.value : ''}.`);

          if (prev.type !== 'StringLiteral' && next.type !== 'StringLiteral') {
            throw new TypeError(`Invalid Expression ${prev.value}.${next.value}`);
          }

          parent._context.push(prev.value);

          let currentIndex = parent.params.findIndex(n => n === node);

          while (next && currentIndex < parent.params.length) {
            next = parent.params[++currentIndex];

            if (!next) break;

            if (currentIndex % 2 === 0) {
              parent._context.push(next.value);
            } else {
              if (next.type !== 'Symbol') throw new TypeError(`Invalid expression ${next.value}`);
            }
          }
        } else {
          throw new TypeError(`Invalid Expression ${node.value}`);
        }
      } else {
        const newNode = {
          type: 'Symbol',
          value: node.value
        };

        parent._context.push(newNode);
      }
    }
  });

  return newAst;
}

// 遍历ast树
function traverse(node, visitors) {
  visitNode(visitors, node, null);
}

function visitNode(visitors, node, parent, prev, next) {
  const visitor = visitors[node.type];

  visitor && visitor(node, parent, prev, next);

  switch (node.type) {
    case 'Entry':
      visitArrayNode(visitors, node.body, node);
      break;
    case 'Expression':
      visitArrayNode(visitors, node.params, node);
      break;
    case 'Whitespace':
    case 'NumberLiteral':
    case 'StringLiteral':
    case 'Symbol':
      break;
    default:
      throw new TypeError(node.type);
  }
}

function visitArrayNode(visitors, array, parent) {
  array.forEach((element, index) => {
    visitNode(visitors, element, parent, array[index - 1], array[index + 1]);
  });
}

export default transform;