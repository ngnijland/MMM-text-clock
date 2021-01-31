module.exports = function (time) {
  const wordIndexes = [];
  const display = this.displayTime(time);

  wordIndexes.push(this.wordMap.nowthetime);

  if (display.morning) {
    wordIndexes.push(this.wordMap.morning);
  } else {
    wordIndexes.push(this.wordMap.afternoon);
  }

  let hourToDisplay = display.hours_to_display;
  if (display.minutes_to_display === 30) {
    hourToDisplay = hourToDisplay + 0.5;
  }
  wordIndexes.push(this.wordMap[hourToDisplay]);

  if (display.minutes_to_display === 0 || display.minutes_to_display === 30) {
    wordIndexes.push(this.wordMap.is_on_the_hour);
  }

  if (display.minutes_to_display === 5) {
    wordIndexes.push(this.wordMap.five);
  } else if (display.minutes_to_display === -5) {
    wordIndexes.push(this.wordMap.fiveto);
  } else if (display.minutes_to_display === 10) {
    wordIndexes.push(this.wordMap.ten);
  } else if (display.minutes_to_display === -10) {
    wordIndexes.push(this.wordMap.tento);
  } else if (display.minutes_to_display === 15) {
    wordIndexes.push(this.wordMap.quarter);
  } else if (display.minutes_to_display === -15) {
    wordIndexes.push(this.wordMap.quarterto);
  } else if (display.minutes_to_display === 20) {
    wordIndexes.push(this.wordMap.twenty);
  } else if (display.minutes_to_display === -20) {
    wordIndexes.push(this.wordMap.twentyto);
  } else if (display.minutes_to_display === 25) {
    wordIndexes.push(this.wordMap.twentyfive);
  } else if (display.minutes_to_display === -25) {
    wordIndexes.push(this.wordMap.twentyfiveto);
  }

  if (display.minutes_to_display !== 0 && display.minutes_to_display !== 30) {
    wordIndexes.push(this.wordMap.is);
  }

  return wordIndexes;
};
