global.crypto = require('crypto');

export const getStringOfRandomNumbers = (length) => {
  const places = 10 ** length;
  // crypto.randomInt([min, ]max) returns min(default; 0) <= n < max
  let num = crypto.randomInt(places).toString();

  // put leading zeros
  while (num.length < length) {
    num = `0${num}`;
  }

  return num;
};

export { getStringOfRandomNumbers as default };
