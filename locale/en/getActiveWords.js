module.exports = function (time) {
  const wordIndexes = [];
  const display = this.displayTime(time);

  wordIndexes.push(this.wordMap.it);
  wordIndexes.push(this.wordMap.is);

  if (Math.abs(display.minutes_to_display) === 5) {
    wordIndexes.push(this.wordMap.five);
  } else if (Math.abs(display.minutes_to_display) === 10) {
    wordIndexes.push(this.wordMap.ten);
  } else if (Math.abs(display.minutes_to_display) === 15) {
    wordIndexes.push(this.wordMap.a);
    wordIndexes.push(this.wordMap.quarter);
  } else if (Math.abs(display.minutes_to_display) === 20) {
    wordIndexes.push(this.wordMap.twenty);
  } else if (Math.abs(display.minutes_to_display) === 25) {
    wordIndexes.push(this.wordMap.twentyfive);
  } else if (display.minutes_to_display === 30) {
    wordIndexes.push(this.wordMap.half);
  }

  if (display.minutes_to_display > 0) {
    wordIndexes.push(this.wordMap.past);
  } else if (display.minutes_to_display < 0) {
    wordIndexes.push(this.wordMap.to);
  } else {
    wordIndexes.push(this.wordMap.oclock);
  }

  wordIndexes.push(this.wordMap[display.hours_to_display]);

  return wordIndexes;
};
