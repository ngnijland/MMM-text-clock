module.exports = function (time) {
  const wordIndexes = [];
  const display = this.displayTime(time);

  wordIndexes.push(this.wordMap.il);
  wordIndexes.push(this.wordMap.est);

  wordIndexes.push(this.wordMap[display.hours_to_display]);

  if (display.hours_to_display % 12 === 0) {
    // noop midnight/noon
  } else if (display.hours_to_display === 1) {
    wordIndexes.push(this.wordMap.heure);
  } else {
    wordIndexes.push(this.wordMap.heures);
  }

  if (display.minutes_to_display < 0) {
    wordIndexes.push(this.wordMap.moins);
  }

  if (Math.abs(display.minutes_to_display) === 5) {
    wordIndexes.push(this.wordMap.cinq);
  } else if (Math.abs(display.minutes_to_display) === 10) {
    wordIndexes.push(this.wordMap.dix);
  } else if (display.minutes_to_display === 15) {
    wordIndexes.push(this.wordMap.et);
    wordIndexes.push(this.wordMap.quart);
  } else if (display.minutes_to_display === -15) {
    wordIndexes.push(this.wordMap.le);
    wordIndexes.push(this.wordMap.quart);
  } else if (Math.abs(display.minutes_to_display) === 20) {
    wordIndexes.push(this.wordMap.vingt);
  } else if (Math.abs(display.minutes_to_display) === 25) {
    wordIndexes.push(this.wordMap.vingtcinq);
  } else if (display.minutes_to_display === 30) {
    wordIndexes.push(this.wordMap.et2);
    wordIndexes.push(this.wordMap.demie);
  }

  return wordIndexes;
};
