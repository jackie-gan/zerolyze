function generate(node, replacement) {
  switch (node.type) {
    case 'Entry':
      return node.body.map(element => generate(element, replacement)).join('');
    case 'Expression':
      return replaceValue(node.arguments, replacement);
    case 'Whitespace':
    case 'NumberLiteral':
    case 'Symbol':
    case 'StringLiteral':
      return node.value;
    default:
      throw new TypeError(`Invalid Type ${node.type}`);
  }
}

function replaceValue(args, replacement) {
  let value = replacement || {};
  for (let index = 0; index < args.length; index++) {
    const element = args[index];
    value = value[element];
    if (value === undefined) {
      return '';
    } else if (!value) {
      return value;
    }
  }
  return value;
}

export default generate;