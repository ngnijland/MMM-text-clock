# Contributing

Feel free to contribute in any way you want. Bug reports, feature requests and pull requests are all welcome. I'll do my best to respond and act on them as quick as possible.

## Submitting changes

- Fork the repository.
- Push your changes to a feature branch in your repository.
- Submit a pull request.

Please make sure you run `npm run lint` before you submit the pull request as pipelines will fail otherwise.

## Add a new language

When you want to add a new language to this module, execute the following steps:

### `MMM-text-clock.js`

Add your language abbreviation to the `supportedLanguages` array.

Look for the abbreviation of your language in [this](https://github.com/MichMich/MagicMirror/blob/master/translations/translations.js) file.

### locale

1. Duplicate a folder in the `locale` folder and rename the folder to match the abbreviation you just added in the `supportedLanguages` array.

2. Import and export your folder inside the `locale/index.js` file, e.g.:

```javascript
const ar = require('./ar');
const en = require('./en');
const es = require('./es');
const fr = require('./fr');
const it = require('./it');
const jp = require('./jp');
const nl = require('./nl');

module.exports = {
  ar,
  en,
  es,
  fr,
  it,
  jp,
  nl,
};
```

**NOTE:** Make sure to keep the order of both imports and exports alphabetically.

3. To configure the number of columns for the width of the text grid, change the number in the `gridColumns.js` file.

4. To configure the letters of the text clock, change the array in the `letters.js` file.

The text clock will show the letters ordered left to right starting from the top row for as many letters as configured in the `gridColumns.js` file and then go on to the next line, etc.

5. To let the module know which letters in the letter array form words you should change the object in the `wordMap.js` file.

You can choose to use any words you want and in any order you want. In the next step you'll be able to use theses words to activate when you want.

6. Because every language has different rules when reading the clock out loud you have to supply these rules in the `getActiveWords.js` file.

The file should export a function which accepts the time as a `Date` object and returns a two dimensional array of which the second dimension of arrays are the word arrays you just created in the previous step.
