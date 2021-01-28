module.exports = function (time) {
  const wordIndexes = [];

  wordIndexes.push(this.wordMap.il);
  wordIndexes.push(this.wordMap.est);

  const hours = time.getHours();
  const minutes = time.getMinutes();

  if ((minutes >= 3 && minutes <= 7) || (minutes >= 53 && minutes <= 57)) {
    wordIndexes.push(this.wordMap.cinq);
  } else if (
    (minutes >= 8 && minutes <= 12) ||
    (minutes >= 48 && minutes <= 52)
  ) {
    wordIndexes.push(this.wordMap.dix);
  } else if (minutes >= 13 && minutes <= 17) {
    wordIndexes.push(this.wordMap.etquart);
  } else if (minutes >= 43 && minutes <= 47) {
    wordIndexes.push(this.wordMap.lequart);
  } else if (
    (minutes >= 18) & (minutes <= 22) ||
    (minutes >= 38 && minutes <= 42)
  ) {
    wordIndexes.push(this.wordMap.vingt);
  } else if (
    (minutes >= 23 && minutes <= 27) ||
    (minutes >= 33 && minutes <= 37)
  ) {
    wordIndexes.push(this.wordMap.vingtcinq);
  } else if (minutes >= 28 && minutes <= 32) {
    wordIndexes.push(this.wordMap.etdemie);
  }

  if (minutes >= 33 && minutes <= 57) {
    wordIndexes.push(this.wordMap.moins);
  }

  const displayHour = minutes >= 33 && minutes <= 57 ? hours + 1 : hours;

  if (displayHour === 12) {
    wordIndexes.push(this.wordMap.midi);
  } else if (displayHour % 24 === 0) {
    wordIndexes.push(this.wordMap.minuit);
  } else {
    wordIndexes.push(
      this.wordMap[displayHour > 12 ? displayHour - 12 : displayHour]
    );
  }

  if (displayHour % 12 === 0) {
    // noop midnight/noon
  } else if (displayHour % 12 === 1) {
    wordIndexes.push(this.wordMap.heure);
  } else {
    wordIndexes.push(this.wordMap.heures);
  }

  return wordIndexes;
};