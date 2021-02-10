module.exports = function (time) {
  const wordIndexes = [];
  const display = this.displayTime(time);

  wordIndexes.push(this.wordMap.thetime);
  wordIndexes.push(this.wordMap.rightnow);

  let displayHour = display.hours_to_display;
  if (display.minutes_to_display === -25) {
    displayHour =
      display.hours_to_display === 0 ? 11 : display.hours_to_display - 1;
  }

  wordIndexes.push(this.wordMap[displayHour]);

  if (display.minutes_to_display === 5) {
    wordIndexes.push(this.wordMap.fivepast);
  } else if (display.minutes_to_display === 10) {
    wordIndexes.push(this.wordMap.tenpast);
  } else if (display.minutes_to_display === 15) {
    wordIndexes.push(this.wordMap.quarterpast);
  } else if (display.minutes_to_display === 20) {
    wordIndexes.push(this.wordMap.twentypast);
  } else if (display.minutes_to_display === 25) {
    wordIndexes.push(this.wordMap.halfpast);
    wordIndexes.push(this.wordMap.fiveto);
  } else if (display.minutes_to_display === 30) {
    wordIndexes.push(this.wordMap.halfpast);
  } else if (display.minutes_to_display === -25) {
    wordIndexes.push(this.wordMap.halfpast);
    wordIndexes.push(this.wordMap.fivepast);
  } else if (display.minutes_to_display === -20) {
    wordIndexes.push(this.wordMap.twentyto);
  } else if (display.minutes_to_display === -15) {
    wordIndexes.push(this.wordMap.quarterto);
  } else if (display.minutes_to_display === -10) {
    wordIndexes.push(this.wordMap.tento);
  } else if (display.minutes_to_display === -5) {
    wordIndexes.push(this.wordMap.fiveto);
  }

  if (![0, 15, 20, 30].includes(Math.abs(display.minutes_to_display))) {
    wordIndexes.push(this.wordMap.minutes);
  }

  if (display.morning) {
    wordIndexes.push(this.wordMap.morning);
  } else {
    if (display.hours_to_display >= 6 || display.hours_to_display === 0) {
      wordIndexes.push(this.wordMap.evening);
    } else {
      wordIndexes.push(this.wordMap.afternoon);
    }
  }

  return wordIndexes;
};
