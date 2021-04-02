/* Magic Mirror
 * Module: Text clock
 *
 * By Niek Nijland
 * MIT Licensed.
 */

Module.register('MMM-text-clock', {
  defaults: {
    compact: false,
    size: 'medium',
    languageAlternationInterval: 60,
  },

  supportedLanguages: ['ar', 'ch', 'en', 'es', 'fr', 'it', 'jp', 'nl'],

  start: function () {
    Log.info(`Starting module: ${this.name}`);

    this.compact = this.config.compact;
    this.size = this.config.size;
    this.language = config.language;

    this.languageAlternationInterval = this.config.languageAlternationInterval;

    /*
     * Validate compact config
     */
    if (typeof this.compact !== 'boolean') {
      Log.error(`"${this.compact}" is not a boolean. Falling back to "false".`);
      this.compact = false;
    }

    /*
     * Validate size config
     */
    if (!['small', 'medium', 'large'].includes(this.size)) {
      Log.error(
        `"${this.size}" is not a supported value. Please use "small", "medium" or "large". Falling back to "medium".`
      );
      this.size = 'medium';
    }

    /*
     * Validate language config
     */
    if (typeof this.config.language === 'string') {
      if (this.supportedLanguages.includes(this.config.language)) {
        this.language = this.config.language;
      } else {
        Log.error(
          `"${
            this.config.language
          }" is not a supported language. Falling back to config language (${
            config.language
          }). Supported languages: ${this.supportedLanguages.join(', ')}`
        );
      }
    } else if (Array.isArray(this.config.language)) {
      this.language = this.config.language.filter((language) => {
        const supported = this.supportedLanguages.includes(language);

        if (!supported) {
          Log.error(
            `"${language}" is not a supported language. Removing it from language alternation list. Supported languages: ${this.supportedLanguages.join(
              ', '
            )}`
          );
        }

        return supported;
      });

      if (this.language.length === 0) {
        Log.error(
          `No supported languages in language list. Falling back to config language (${config.language}).`
        );

        this.language = config.language;
      }
    }

    /*
     * Validate languageAlternationInterval config
     */
    if (typeof this.languageAlternationInterval !== 'number') {
      Log.error(
        `"${this.languageAlternationInterval}" is not a number. Falling back to "60".`
      );

      this.languageAlternationInterval = 60;
    }

    this.getActiveWords = undefined;
    this.gridColumns = 0;
    this.letters = [];
    this.words = [];
    this.wordMap = {};

    /*
     * Alternate through languages if configured
     */
    if (Array.isArray(this.language)) {
      let alternationIndex = 0;

      this.sendSocketNotification('SET_LANGUAGE', {
        id: this.identifier,
        language: this.language[alternationIndex],
      });

      setInterval(() => {
        alternationIndex++;

        if (alternationIndex >= this.language.length) {
          alternationIndex = 0;
        }

        this.sendSocketNotification('SET_LANGUAGE', {
          id: this.identifier,
          language: this.language[alternationIndex],
        });

        Log.info(
          'MMM-text-clock switched language to: ',
          this.language[alternationIndex]
        );
      }, this.languageAlternationInterval * 60 * 1000);
    } else {
      this.sendSocketNotification('SET_LANGUAGE', {
        id: this.identifier,
        language: this.language,
      });
    }
  },

  updateInterval: undefined,

  socketNotificationReceived: function (notification, payload) {
    if (notification === 'SET_LANGUAGE') {
      const revivedPayload = JSON.parse(payload, (_, value) => {
        if (typeof value === 'string' && value.indexOf('__FUNC__') === 0) {
          return eval(`(${value.slice(8)})`);
        }
        return value;
      });

      if (this.identifier !== revivedPayload.id) {
        return;
      }
      clearInterval(this.updateInterval);

      this.getActiveWords = revivedPayload.getActiveWords;
      this.gridColumns = revivedPayload.gridColumns;
      this.letters = revivedPayload.letters;
      this.words = revivedPayload.words;
      this.wordMap = revivedPayload.wordMap;
      this.currentLanguage = revivedPayload.language;

      this.updateDom();

      this.updateInterval = setInterval(() => {
        this.updateDom();
      }, 10000);
    }
  },

  getDom: function () {
    if (typeof this.getActiveWords !== 'function') {
      return document.createElement('div');
    }

    const grid = document.createElement('div');
    grid.classList.add(this.compact ? 'bright' : 'dimmed');
    grid.classList.add(this.size);

    if (!this.compact) {
      grid.style.display = 'grid';
      grid.style.gridTemplateColumns = `repeat(${this.gridColumns}, 1fr)`;

      let gridGap;

      switch (this.size) {
        case 'small': {
          gridGap = '0.75rem 1.125rem';
          break;
        }
        case 'large': {
          gridGap = '2rem 2.25rem';
          break;
        }
        default: {
          gridGap = '1rem 1.5rem';
        }
      }

      grid.style.gridGap = gridGap;
    }

    const activeWords = this.getActiveWords(new Date());
    if (this.letters) {
      // Original mode, letter grid
      grid.classList.add('letters');
      if (this.compact) {
        grid.textContent = activeWords
          .map((word) => word.map((letter) => this.letters[letter]).join(''))
          .join(' ');
      } else {
        this.letters.forEach((letter, index) => {
          const letterIndexes = activeWords.reduce(
            (acc, word) => [...acc, ...word],
            []
          );
          const element = document.createElement('span');

          letterIndexes.includes(index) && element.classList.add('bright');
          element.textContent = letter;

          grid.appendChild(element);
        });
      }
    } else {
      // Word mode
      const activeWordsList = activeWords.flat(1);

      if (this.compact) {
        grid.textContent = activeWordsList
          .map((word) => this.words[word[0]][word[1]])
          .join(' ');
      } else {
        grid.classList.add('wordlayout');
        grid.classList.add('lang_' + this.currentLanguage);

        this.words.forEach((line, indexLine) => {
          const lineElement = document.createElement('span');
          lineElement.classList.add('wordrow');

          line.forEach((word, indexWord) => {
            const wordElement = document.createElement('span');
            wordElement.textContent = word;

            if (
              activeWordsList.some((item) => {
                return item[0] === indexLine && item[1] === indexWord;
              })
            ) {
              wordElement.classList.add('bright');
            }
            lineElement.appendChild(wordElement);
          });
          grid.appendChild(lineElement);
        });
      }
    }

    return grid;
  },

  getStyles: function () {
    return [this.file('css/MMM-text-clock.css')];
  },

  /*
   * Centralise the time display function in a manner that suits most languages
   * This function returns
   *   morning: a boolean which replicates the behaviour of AM/PM in english
   *   hours_to_display: the hour to display 12h format (past 30' on the hour = the next hour)
   *   minutes_to_display: in 5 minute increment, negative is "to the hour", positive is "past the hour"
   */
  displayTime: function (time) {
    const hours = time.getHours();
    const minutes = time.getMinutes();

    let normalizedMinutes = 0;

    if (minutes >= 3 && minutes <= 7) {
      normalizedMinutes = 5;
    } else if (minutes >= 53 && minutes <= 57) {
      normalizedMinutes = -5;
    } else if (minutes >= 8 && minutes <= 12) {
      normalizedMinutes = 10;
    } else if (minutes >= 48 && minutes <= 52) {
      normalizedMinutes = -10;
    } else if (minutes >= 13 && minutes <= 17) {
      normalizedMinutes = 15;
    } else if (minutes >= 43 && minutes <= 47) {
      normalizedMinutes = -15;
    } else if (minutes >= 18 && minutes <= 22) {
      normalizedMinutes = 20;
    } else if (minutes >= 38 && minutes <= 42) {
      normalizedMinutes = -20;
    } else if (minutes >= 23 && minutes <= 27) {
      normalizedMinutes = 25;
    } else if (minutes >= 33 && minutes <= 37) {
      normalizedMinutes = -25;
    } else if (minutes >= 28 && minutes <= 32) {
      normalizedMinutes = 30;
    }

    // If displaying minutes to the hour : bump the hour one notch
    const displayHour = (minutes >= 33 ? hours + 1 : hours) % 24;

    // use 12 hour format
    const normalizedHour = displayHour > 12 ? displayHour - 12 : displayHour;
    const minutesFromMidnight = hours * 60 + minutes;

    return {
      morning: minutesFromMidnight < 753 && minutesFromMidnight >= 33,
      hours_to_display: normalizedHour,
      minutes_to_display: normalizedMinutes,
    };
  },
});
