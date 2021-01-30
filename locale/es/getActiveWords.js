module.exports = function (time) {
  const wordIndexes = [];

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const displayHour = minutes >= 33 ? hours + 1 : hours;

  if (displayHour % 12 === 1) {
    wordIndexes.push(this.wordMap.esla);
  } else {
    wordIndexes.push(this.wordMap.sonlas);
  }

  if ((minutes >= 3 && minutes <= 7) || (minutes >= 53 && minutes <= 57)) {
    wordIndexes.push(this.wordMap.cinco);
  } else if (
    (minutes >= 8 && minutes <= 12) ||
    (minutes >= 48 && minutes <= 52)
  ) {
    wordIndexes.push(this.wordMap.diez);
  } else if (minutes >= 13 && minutes <= 17) {
    wordIndexes.push(this.wordMap.quarto);
  } else if (minutes >= 43 && minutes <= 47) {
    wordIndexes.push(this.wordMap.quarto);
  } else if (
    (minutes >= 18) & (minutes <= 22) ||
    (minutes >= 38 && minutes <= 42)
  ) {
    wordIndexes.push(this.wordMap.veinte);
  } else if (
    (minutes >= 23 && minutes <= 27) ||
    (minutes >= 33 && minutes <= 37)
  ) {
    wordIndexes.push(this.wordMap.veinticinco);
  } else if (minutes >= 28 && minutes <= 32) {
    wordIndexes.push(this.wordMap.media);
  }

  if (minutes >= 3 && minutes <= 32) {
    wordIndexes.push(this.wordMap.y);
  } else if (minutes >= 33 && minutes <= 57) {
    wordIndexes.push(this.wordMap.menos);
  }

  wordIndexes.push(
    this.wordMap[displayHour > 12 ? displayHour - 12 : displayHour]
  );

  return wordIndexes;
};
