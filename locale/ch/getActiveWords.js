module.exports = function (time) {
  const wordIndexes = [];
  const display = this.displayTime(time);
  
  wordIndexes.push(this.wordMap.es);
  wordIndexes.push(this.wordMap.isch);

  if (display.minutes_to_display === 5) {
    wordIndexes.push(this.wordMap.füf);
    wordIndexes.push(this.wordMap.ab);
  } else if (display.minutes_to_display === 10) {
    wordIndexes.push(this.wordMap.zää);
    wordIndexes.push(this.wordMap.ab);
  } else if (display.minutes_to_display === 15) {
    wordIndexes.push(this.wordMap.viertu);
    wordIndexes.push(this.wordMap.ab);
  } else if (display.minutes_to_display === 20) {
    wordIndexes.push(this.wordMap.zwänzg);
    wordIndexes.push(this.wordMap.ab);
  } else if (display.minutes_to_display === 25) {
    wordIndexes.push(this.wordMap.füf);
    wordIndexes.push(this.wordMap.vor);
    wordIndexes.push(this.wordMap.haubi);
  } else if (display.minutes_to_display === 30) {
    wordIndexes.push(this.wordMap.haubi);
  } else if (display.minutes_to_display === -25) {
    wordIndexes.push(this.wordMap.füf);
    wordIndexes.push(this.wordMap.ab);
    wordIndexes.push(this.wordMap.haubi);
  } else if (display.minutes_to_display === -20) {
    wordIndexes.push(this.wordMap.zwänzg);
    wordIndexes.push(this.wordMap.vor);
  } else if (display.minutes_to_display === -15) {
    wordIndexes.push(this.wordMap.viertu);
    wordIndexes.push(this.wordMap.vor);
  } else if (display.minutes_to_display === -10) {
    wordIndexes.push(this.wordMap.zää);
    wordIndexes.push(this.wordMap.vor);
  } else if (display.minutes_to_display === -5) {
    wordIndexes.push(this.wordMap.füf);
    wordIndexes.push(this.wordMap.vor);
  }

  wordIndexes.push(
    this.wordMap[
      display.minutes_to_display <= 25
        ? display.hours_to_display
        : display.hours_to_display + 1
    ]
  );

  return wordIndexes;
};
