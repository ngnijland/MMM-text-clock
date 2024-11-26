module.exports = function (time) {
  const wordIndexes = [];
  const display = this.displayTime(time);
  var fullHour = false;

  wordIndexes.push(this.wordMap.es);
  wordIndexes.push(this.wordMap.ist);

  if (display.minutes_to_display === 0) {
    fullHour = true;
  } else if (display.minutes_to_display === 5) {
    wordIndexes.push(this.wordMap.fünf);
    wordIndexes.push(this.wordMap.nach);
  } else if (display.minutes_to_display === 10) {
    wordIndexes.push(this.wordMap.zehn);
    wordIndexes.push(this.wordMap.nach);
  } else if (display.minutes_to_display === 15) {
    wordIndexes.push(this.wordMap.viertel);
    wordIndexes.push(this.wordMap.nach);
  } else if (display.minutes_to_display === 20) {
    wordIndexes.push(this.wordMap.zwanzig);
    wordIndexes.push(this.wordMap.nach);
  } else if (display.minutes_to_display === 25) {
    wordIndexes.push(this.wordMap.fünf);
    wordIndexes.push(this.wordMap.vor);
    wordIndexes.push(this.wordMap.halb);
  } else if (display.minutes_to_display === 30) {
    wordIndexes.push(this.wordMap.halb);
  } else if (display.minutes_to_display === -25) {
    wordIndexes.push(this.wordMap.fünf);
    wordIndexes.push(this.wordMap.nach);
    wordIndexes.push(this.wordMap.halb);
  } else if (display.minutes_to_display === -20) {
    wordIndexes.push(this.wordMap.zwanzig);
    wordIndexes.push(this.wordMap.vor);
  } else if (display.minutes_to_display === -15) {
    wordIndexes.push(this.wordMap.viertel);
    wordIndexes.push(this.wordMap.vor);
  } else if (display.minutes_to_display === -10) {
    wordIndexes.push(this.wordMap.zehn);
    wordIndexes.push(this.wordMap.vor);
  } else if (display.minutes_to_display === -5) {
    wordIndexes.push(this.wordMap.fünf);
    wordIndexes.push(this.wordMap.vor);
  }

  var hour =
    display.minutes_to_display <= 20
      ? display.hours_to_display
      : display.hours_to_display + 1;

  if (hour === 1 && !fullHour) {
    wordIndexes.push(this.wordMap.eins);
  } else {
    wordIndexes.push(this.wordMap[hour]);
  }

  if (fullHour) {
    wordIndexes.push(this.wordMap.uhr);
  }

  return wordIndexes;
};
