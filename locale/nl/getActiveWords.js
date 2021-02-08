module.exports = function (time) {
  const wordIndexes = [];
  const display = this.displayTime(time);

  wordIndexes.push(this.wordMap.het);
  wordIndexes.push(this.wordMap.is);

  if (display.minutes_to_display === 5) {
    wordIndexes.push(this.wordMap.vijf);
    wordIndexes.push(this.wordMap.over);
  } else if (display.minutes_to_display === 10) {
    wordIndexes.push(this.wordMap.tien);
    wordIndexes.push(this.wordMap.over);
  } else if (display.minutes_to_display === 15) {
    wordIndexes.push(this.wordMap.kwart);
    wordIndexes.push(this.wordMap.over2);
  } else if (display.minutes_to_display === 20) {
    wordIndexes.push(this.wordMap.tien);
    wordIndexes.push(this.wordMap.voor);
    wordIndexes.push(this.wordMap.half);
  } else if (display.minutes_to_display === 25) {
    wordIndexes.push(this.wordMap.vijf);
    wordIndexes.push(this.wordMap.voor);
    wordIndexes.push(this.wordMap.half);
  } else if (display.minutes_to_display === 30) {
    wordIndexes.push(this.wordMap.half);
  } else if (display.minutes_to_display === -25) {
    wordIndexes.push(this.wordMap.vijf);
    wordIndexes.push(this.wordMap.over);
    wordIndexes.push(this.wordMap.half);
  } else if (display.minutes_to_display === -20) {
    wordIndexes.push(this.wordMap.tien);
    wordIndexes.push(this.wordMap.over);
    wordIndexes.push(this.wordMap.half);
  } else if (display.minutes_to_display === -15) {
    wordIndexes.push(this.wordMap.kwart);
    wordIndexes.push(this.wordMap.voor2);
  } else if (display.minutes_to_display === -10) {
    wordIndexes.push(this.wordMap.tien);
    wordIndexes.push(this.wordMap.voor);
  } else if (display.minutes_to_display === -5) {
    wordIndexes.push(this.wordMap.vijf);
    wordIndexes.push(this.wordMap.voor);
  }

  wordIndexes.push(
    this.wordMap[
      display.minutes_to_display <= 15
        ? display.hours_to_display
        : display.hours_to_display + 1
    ]
  );

  if (display.minutes_to_display === 0) {
    wordIndexes.push(this.wordMap.uur);
  }

  return wordIndexes;
};
