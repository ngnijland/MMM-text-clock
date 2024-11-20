module.exports = function (time) {
  const wordIndexes = [];
  const display = this.displayTime(time);
  wordIndexes.push(this.wordMap.time);
  wordIndexes.push(this.wordMap.is);

  if (Math.abs(display.minutes_to_display) === 5) {
    wordIndexes.push(this.wordMap.five);
  } else if (Math.abs(display.minutes_to_display) === 10) {
    wordIndexes.push(this.wordMap.ten);
  } else if (Math.abs(display.minutes_to_display) === 15) {
    wordIndexes.push(this.wordMap.quarter);
  } else if (Math.abs(display.minutes_to_display) === 20) {
    wordIndexes.push(this.wordMap.twenty);
  } else if (Math.abs(display.minutes_to_display) === 25) {
    wordIndexes.push(this.wordMap.twentyfive);
  } else if (display.minutes_to_display === 30) {
    wordIndexes.push(this.wordMap.half);
    display.hours_to_display = (display.hours_to_display + 1) % 12;
  }

  if (display.minutes_to_display !== 30) {
    if (display.minutes_to_display > 0) {
      wordIndexes.push(this.wordMap.past);
    } else if (display.minutes_to_display < 0) {
      wordIndexes.push(this.wordMap.to);
    }
  }

  wordIndexes.push(this.wordMap[display.hours_to_display]);

  if (display.minutes_to_display === 0) {
    wordIndexes.push(this.wordMap.zero);
  }
  return wordIndexes;
};
