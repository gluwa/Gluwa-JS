global.crypto = require('crypto');

export const getStringOfRandomNumbers = (length) => {
  let num = '';

  for (let i = 0; i < length; i += 1) {
    // crypto.randomInt([min, ]max) returns min(default; 0) <= n < max
    num += crypto.randomInt(10).toString();
  }

  if (num.charAt(0) === '0') {
    const tmp = crypto.randomInt(1, 10).toString();
    num.replace('0', tmp);
  }

  return num;
};

export { getStringOfRandomNumbers as default };
