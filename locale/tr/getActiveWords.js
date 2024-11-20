module.exports = function (time) {
  const wordIndexes = [];
  const display = this.displayTime(time);

  let hour = display.hours_to_display;
  let minutes = display.minutes_to_display;

  wordIndexes.push(this.wordMap.saat);

  if (hour === 0) {
	  hour = 12;
  }

  if (hour === 12 && minutes === 30) {
    // special case : 00:30 and 12:30 are "saat yarım""
    wordIndexes.push(this.wordMap.yarım);
    return wordIndexes; // all done
  }

  if (minutes < 0) {
    hour -= 1;
    hour = hour === 0 ? 12 : hour;
    minutes = 60 + minutes
  }

  if (hour >= 11) {
    wordIndexes.push(this.wordMap[10]);
    hour = hour - 10;
  }

  if (minutes === 0 || minutes === 30) {
    // use normal number form

  } else {
    // use dative form
  	hour = hour + 100
  }

  wordIndexes.push(this.wordMap[hour]);

  if (minutes === 5) {
    wordIndexes.push(this.wordMap.beş);
  } else if (minutes === 10) {
    wordIndexes.push(this.wordMap.on);
  } else if (minutes === 15) {
    wordIndexes.push(this.wordMap.çeyrek);
  } else if (minutes === 20) {
    wordIndexes.push(this.wordMap.yirmi);
  } else if (minutes === 25) {
    wordIndexes.push(this.wordMap.yirmi);
    wordIndexes.push(this.wordMap.beş);
  } else if (minutes === 30) {
    wordIndexes.push(this.wordMap.buçuk);
  } else if (minutes === 35) {
    wordIndexes.push(this.wordMap.otuz);
    wordIndexes.push(this.wordMap.beş);
  } else if (minutes === 40) {
    wordIndexes.push(this.wordMap.kırk);
  } else if (minutes === 45) {
    wordIndexes.push(this.wordMap.kırk);
    wordIndexes.push(this.wordMap.beş);
  } else if (minutes === 50) {
    wordIndexes.push(this.wordMap.elli);
  } else if (minutes === 55) {
    wordIndexes.push(this.wordMap.elli);
    wordIndexes.push(this.wordMap.beş);
  }

  if (minutes == 0 || minutes == 30) {
  	// we are done on the clock and half past
  } else {
    push(this.wordMap.geçiyor);
  }
  return wordIndexes;
};
