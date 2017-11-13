const noflo = require('noflo');
const defaultSpellingData = require('./spellingdata.json');

const defaultWords = {
  eh: 11,
  'eh!': 11,
};

const canadianness = (contentData, options, callback) => {
  const spellingData = options.spelling || defaultSpellingData;
  const wordsData = options.words || defaultWords;
  const componentName = 'canadianness/Canadianness';
  const inputs = {
    words: wordsData,
    spelling: spellingData,
    content: contentData,
  };

  const wrapperFunction = noflo.asCallback(componentName, {
    baseDir: __dirname,
  });
  return wrapperFunction(inputs, callback);
};

// Expose function as public API
module.exports = canadianness;

// ## Command-line program
function main() {
  const content = process.argv[2];

  const options = {
    spelling: null,
    words: null,
  };

  canadianness(content, options, (err, results) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(results.score, results.emotion);
  });
}

// Only run main if we are not imported as a module
if (!module.parent) {
  main();
}