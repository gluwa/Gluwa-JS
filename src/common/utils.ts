global.crypto = require('crypto');

export const getStringOfRandomNumbers = (length) => {
  const places = 10 ** length;
  // crypto.randomInt([min, ]max) returns min(default; 0) <= n < max
  let num = crypto.randomInt(places).toString();

  // put leading zeros
  while (num.length < length) {
    num = `0${num}`;
  }

  if (num.charAt(0) === '0') {
    const tmp = (crypto.randomInt(9) + 1).toString();
    num.replace('0', tmp);
  }

  return num;
};

export { getStringOfRandomNumbers as default };
