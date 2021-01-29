module.exports = function (time) {
  const wordIndexes = [];
  const display = this.displayTime(time);

  const hours = time.getHours();
  const minutes = time.getMinutes();

  if (display.hours_to_display === 1) {
    wordIndexes.push(this.wordMap.esla);
  } else {
    wordIndexes.push(this.wordMap.sonlas);
  }

  if (Math.abs(display.minutes_to_display) === 5) {
    wordIndexes.push(this.wordMap.cinco);
  } else if (Math.abs(display.minutes_to_display) === 10) {
    wordIndexes.push(this.wordMap.diez);
  } else if (Math.abs(display.minutes_to_display) === 15) {
    wordIndexes.push(this.wordMap.quarto);
  } else if (Math.abs(display.minutes_to_display) === 20) {
    wordIndexes.push(this.wordMap.veinte);
  } else if (Math.abs(display.minutes_to_display) === 25) {
    wordIndexes.push(this.wordMap.veinticinco);
  } else if (display.minutes_to_display === 30) {
    wordIndexes.push(this.wordMap.media);
  }

  if (display.minutes_to_display > 0) {
    wordIndexes.push(this.wordMap.y);
  } else if (display.minutes_to_display < 0) {
    wordIndexes.push(this.wordMap.menos);
  }

  wordIndexes.push(this.wordMap[display.hours_to_display]);

  return wordIndexes;
};
