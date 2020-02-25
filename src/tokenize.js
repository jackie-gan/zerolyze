const whitepaceReg = /\s/;
const numberReg = /[0-9]/;
const wordReg = /[a-zA-Z_]/;

function tokenize(inputStr) {
  const tokens = [];
  let currentIndex = 0;

  while (currentIndex < inputStr.length) {
    let char = inputStr[currentIndex];

    switch (char) {
      case '(':
        tokens.push({
          type: 'brace',
          value: char
        });
        ++currentIndex;
        continue;
      case ')':
        tokens.push({
          type: 'brace',
          value: char
        });
        ++currentIndex;
        continue;
      default:
        if (whitepaceReg.test(char)) {
          tokens.push({
            type: 'whitespace',
            value: char
          });
          ++currentIndex;
          continue;
        }

        if (numberReg.test(char)) {
          let number = '';

          while (numberReg.test(char)) {
            number += char;
            char = inputStr[++currentIndex];
          }

          tokens.push({
            type: 'number',
            value: number
          });
          
          continue;
        }

        if (wordReg.test(char)) {
          let word = '';

          while (char !== undefined && wordReg.test(char)) {
            word += char;
            char = inputStr[++currentIndex];
          }

          tokens.push({
            type: 'word',
            value: word
          });

          continue;
        }

        tokens.push({
          type: 'symbol',
          value: char
        });

        ++currentIndex;
        break;
    }
  }

  return tokens;
}

export default tokenize;