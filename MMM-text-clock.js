/* Magic Mirror
 * Module: Text clock
 *
 * By Niek Nijland
 * MIT Licensed.
 */

Module.register('MMM-text-clock', {
  defaults: {
    text: 'Hello world',
  },

  letters: [
    'i',
    't',
    'l',
    'i',
    's',
    'a',
    's',
    'a',
    'm',
    'p',
    'm',
    'a',
    'c',
    'q',
    'u',
    'a',
    'r',
    't',
    'e',
    'r',
    'd',
    'c',
    't',
    'w',
    'e',
    'n',
    't',
    'y',
    'f',
    'i',
    'v',
    'e',
    'x',
    'h',
    'a',
    'l',
    'f',
    's',
    't',
    'e',
    'n',
    'f',
    't',
    'o',
    'p',
    'a',
    's',
    't',
    'e',
    'r',
    'u',
    'n',
    'i',
    'n',
    'e',
    'o',
    'n',
    'e',
    's',
    'i',
    'x',
    't',
    'h',
    'r',
    'e',
    'e',
    'f',
    'o',
    'u',
    'r',
    'f',
    'i',
    'v',
    'e',
    't',
    'w',
    'o',
    'e',
    'i',
    'g',
    'h',
    't',
    'e',
    'l',
    'e',
    'v',
    'e',
    'n',
    's',
    'e',
    'v',
    'e',
    'n',
    't',
    'w',
    'e',
    'l',
    'v',
    'e',
    't',
    'e',
    'n',
    's',
    'e',
    "o'",
    'c',
    'l',
    'o',
    'c',
    'k',
  ],

  wordMap: {
    it: [0, 1],
    is: [3, 4],
    a: [11],
    quarter: [13, 14, 15, 16, 17, 18, 19],
    twenty: [22, 23, 24, 25, 26, 27],
    five: [28, 29, 30, 31],
    half: [33, 34, 35, 36],
    ten: [38, 39, 40],
    past: [44, 45, 46, 47],
    to: [42, 43],
    1: [55, 56, 57],
    2: [74, 75, 76],
    3: [61, 62, 63, 64, 65],
    4: [66, 67, 68, 69],
    5: [70, 71, 72, 73],
    6: [58, 59, 60],
    7: [88, 89, 90, 91, 92],
    8: [77, 78, 79, 80, 81],
    9: [51, 52, 53, 54],
    10: [99, 100, 101],
    11: [82, 83, 84, 85, 86, 87],
    12: [93, 94, 95, 96, 97, 98],
    oclock: [104, 105, 106, 107, 108, 109],
  },

  start: function () {
    Log.info('Starting module: ' + this.name);

    const self = this;

    setInterval(() => {
      self.updateDom();
    }, 10000);

    self.updateDom();
  },

  createActiveLetterList: function (time) {
    const wordIndexes = [];

    wordIndexes.push(this.wordMap.it);
    wordIndexes.push(this.wordMap.is);

    const hours = time.getHours();
    const minutes = time.getMinutes();

    if ((minutes >= 0 && minutes <= 2) || (minutes >= 58 && minutes <= 59)) {
      wordIndexes.push(this.wordMap.oclock);
    } else if (
      (minutes >= 3 && minutes <= 7) ||
      (minutes >= 53 && minutes <= 57)
    ) {
      wordIndexes.push(this.wordMap.five);
    } else if (
      (minutes >= 8 && minutes <= 12) ||
      (minutes >= 48 && minutes <= 52)
    ) {
      wordIndexes.push(this.wordMap.ten);
    } else if (
      (minutes >= 13 && minutes <= 17) ||
      (minutes >= 43 && minutes <= 47)
    ) {
      wordIndexes.push(this.wordMap.a);
      wordIndexes.push(this.wordMap.quarter);
    } else if (
      (minutes >= 18) & (minutes <= 22) ||
      (minutes >= 38 && minutes <= 42)
    ) {
      wordIndexes.push(this.wordMap.twenty);
    } else if (
      (minutes >= 23 && minutes <= 27) ||
      (minutes >= 33 && minutes <= 37)
    ) {
      wordIndexes.push(this.wordMap.twenty);
      wordIndexes.push(this.wordMap.five);
    } else if (minutes >= 28 && minutes <= 32) {
      wordIndexes.push(this.wordMap.half);
    }

    if (minutes >= 3 && minutes <= 32) {
      wordIndexes.push(this.wordMap.past);
    } else if (minutes >= 33 && minutes <= 57) {
      wordIndexes.push(this.wordMap.to);
    }

    const textHour = minutes >= 0 && minutes <= 30 ? hours : hours + 1;

    wordIndexes.push(this.wordMap[textHour > 12 ? textHour - 12 : textHour]);

    return wordIndexes.reduce((acc, word) => [...acc, ...word], []);
  },

  getDom: function () {
    const grid = document.createElement('div');

    grid.className = 'grid';

    const letterIndexes = this.createActiveLetterList(new Date());

    this.letters.forEach((letter, index) => {
      const element = document.createElement('span');

      element.className = `letter medium ${
        letterIndexes.includes(index) ? 'bright' : 'dimmed'
      }`;
      element.innerHTML = letter;

      grid.appendChild(element);
    });

    return grid;
  },

  getStyles: function () {
    return [this.file('css/MMM-text-clock.css')];
  },
});
