module.exports = function (time) {
  const wordIndexes = [];

  wordIndexes.push(this.wordMap.nowthetime);

  const hours = time.getHours();
  const minutes = time.getMinutes();

  let displayHour = minutes >= 33 ? hours + 1 : hours;

  if (minutes >= 58 || minutes <= 2 || (minutes >= 28 && minutes <= 32)) {
    wordIndexes.push(this.wordMap.is_on_the_hour);
  } else {
    wordIndexes.push(this.wordMap.is);
  }

  if (hours * 60 + minutes <= 720) {
    wordIndexes.push(this.wordMap.morning);
  } else {
    wordIndexes.push(this.wordMap.afternoon);
  }

  if (minutes >= 3 && minutes <= 7) {
    wordIndexes.push(this.wordMap.five);
  } else if (minutes >= 53 && minutes <= 57) {
    wordIndexes.push(this.wordMap.fiveto);
  } else if (minutes >= 8 && minutes <= 12) {
    wordIndexes.push(this.wordMap.ten);
  } else if (minutes >= 48 && minutes <= 52) {
    wordIndexes.push(this.wordMap.tento);
  } else if (minutes >= 13 && minutes <= 17) {
    wordIndexes.push(this.wordMap.quarter);
  } else if (minutes >= 43 && minutes <= 47) {
    wordIndexes.push(this.wordMap.quarterto);
  } else if (minutes >= 18 && minutes <= 22) {
    wordIndexes.push(this.wordMap.twenty);
  } else if (minutes >= 38 && minutes <= 42) {
    wordIndexes.push(this.wordMap.twentyto);
  } else if (minutes >= 23 && minutes <= 27) {
    wordIndexes.push(this.wordMap.twentyfive);
  } else if (minutes >= 33 && minutes <= 37) {
    wordIndexes.push(this.wordMap.twentyfiveto);
  } else if (minutes >= 28 && minutes <= 32) {
    displayHour = displayHour + 0.5;
  }

  wordIndexes.push(
    this.wordMap[displayHour > 12 ? displayHour - 12 : displayHour]
  );

  return wordIndexes;
};
