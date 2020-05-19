module.exports = function (time) {
  const wordIndexes = [];

  wordIndexes.push(this.wordMap.het);
  wordIndexes.push(this.wordMap.is);

  const hours = time.getHours();
  const minutes = time.getMinutes();

  if (minutes >= 3 && minutes <= 7) {
    wordIndexes.push(this.wordMap.vijf);
    wordIndexes.push(this.wordMap.over);
  } else if (minutes >= 8 && minutes <= 12) {
    wordIndexes.push(this.wordMap.tien);
    wordIndexes.push(this.wordMap.over);
  } else if (minutes >= 13 && minutes <= 17) {
    wordIndexes.push(this.wordMap.kwart);
    wordIndexes.push(this.wordMap.over2);
  } else if (minutes >= 18 && minutes <= 22) {
    wordIndexes.push(this.wordMap.tien);
    wordIndexes.push(this.wordMap.voor);
    wordIndexes.push(this.wordMap.half);
  } else if (minutes >= 23 && minutes <= 27) {
    wordIndexes.push(this.wordMap.vijf);
    wordIndexes.push(this.wordMap.voor);
    wordIndexes.push(this.wordMap.half);
  } else if (minutes >= 28 && minutes <= 32) {
    wordIndexes.push(this.wordMap.half);
  } else if (minutes >= 33 && minutes <= 37) {
    wordIndexes.push(this.wordMap.vijf);
    wordIndexes.push(this.wordMap.over);
    wordIndexes.push(this.wordMap.half);
  } else if (minutes >= 38 && minutes <= 42) {
    wordIndexes.push(this.wordMap.tien);
    wordIndexes.push(this.wordMap.over);
    wordIndexes.push(this.wordMap.half);
  } else if (minutes >= 43 && minutes <= 47) {
    wordIndexes.push(this.wordMap.kwart);
    wordIndexes.push(this.wordMap.voor2);
  } else if (minutes >= 48 && minutes <= 52) {
    wordIndexes.push(this.wordMap.tien);
    wordIndexes.push(this.wordMap.voor);
  } else if (minutes >= 53 && minutes <= 57) {
    wordIndexes.push(this.wordMap.vijf);
    wordIndexes.push(this.wordMap.voor);
  }

  const textHour = minutes >= 0 && minutes <= 17 ? hours : hours + 1;

  console.log(textHour);

  wordIndexes.push(this.wordMap[textHour > 12 ? textHour - 12 : textHour]);

  if ((minutes >= 0 && minutes <= 2) || (minutes >= 58 && minutes <= 59)) {
    wordIndexes.push(this.wordMap.uur);
  }

  return wordIndexes;
};
