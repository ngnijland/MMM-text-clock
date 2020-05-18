module.exports = function (time) {
  const wordIndexes = [];

  wordIndexes.push(this.wordMap.it);
  wordIndexes.push(this.wordMap.is);

  const hours = time.getHours();
  const minutes = time.getMinutes();

  if ((minutes >= 3 && minutes <= 7) || (minutes >= 53 && minutes <= 57)) {
    wordIndexes.push(this.wordMap.five);
  } else if (
    (minutes >= 8 && minutes <= 12) ||
    (minutes >= 48 && minutes <= 52)
  ) {
    wordIndexes.push(this.wordMap.ten);
  } else if (
    (minutes >= 13 && minutes <= 17) ||
    (minutes >= 43 && minutes <= 47)
  ) {
    wordIndexes.push(this.wordMap.a);
    wordIndexes.push(this.wordMap.quarter);
  } else if (
    (minutes >= 18) & (minutes <= 22) ||
    (minutes >= 38 && minutes <= 42)
  ) {
    wordIndexes.push(this.wordMap.twenty);
  } else if (
    (minutes >= 23 && minutes <= 27) ||
    (minutes >= 33 && minutes <= 37)
  ) {
    wordIndexes.push(this.wordMap.twentyfive);
  } else if (minutes >= 28 && minutes <= 32) {
    wordIndexes.push(this.wordMap.half);
  }

  if (minutes >= 3 && minutes <= 32) {
    wordIndexes.push(this.wordMap.past);
  } else if (minutes >= 33 && minutes <= 57) {
    wordIndexes.push(this.wordMap.to);
  }

  const textHour = minutes >= 0 && minutes <= 30 ? hours : hours + 1;

  wordIndexes.push(this.wordMap[textHour > 12 ? textHour - 12 : textHour]);

  if ((minutes >= 0 && minutes <= 2) || (minutes >= 58 && minutes <= 59)) {
    wordIndexes.push(this.wordMap.oclock);
  }

  return wordIndexes;
};
