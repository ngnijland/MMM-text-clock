module.exports = function (time) {
  const wordIndexes = [];
  const display = this.displayTime(time);

  if (display.hours_to_display === 1) {
    wordIndexes.push(this.wordMap.ee);
  } else {
    wordIndexes.push(this.wordMap.sono);
    wordIndexes.push(this.wordMap.le);
  }

  wordIndexes.push(this.wordMap[display.hours_to_display]);

  if (display.minutes_to_display > 0) {
    wordIndexes.push(this.wordMap.e);
  } else if (display.minutes_to_display < 0) {
    wordIndexes.push(this.wordMap.meno);
  }

  if (Math.abs(display.minutes_to_display) === 5) {
    wordIndexes.push(this.wordMap.cinque);
  } else if (Math.abs(display.minutes_to_display) === 10) {
    wordIndexes.push(this.wordMap.dieci);
  } else if (Math.abs(display.minutes_to_display) === 15) {
    wordIndexes.push(this.wordMap.un);
    wordIndexes.push(this.wordMap.quarto);
  } else if (Math.abs(display.minutes_to_display) === 20) {
    wordIndexes.push(this.wordMap.venti);
  } else if (Math.abs(display.minutes_to_display) === 25) {
    wordIndexes.push(this.wordMap.venticinque);
  } else if (display.minutes_to_display === 30) {
    wordIndexes.push(this.wordMap.mezza);
  }

  return wordIndexes;
};
