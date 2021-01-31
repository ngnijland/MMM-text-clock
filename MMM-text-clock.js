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
  },

  supportedLanguages: ['en', 'es', 'fr', 'jp', 'nl'],

  start: function () {
    Log.info(`Starting module: ${this.name}`);

    this.compact = this.config.compact;
    this.size = this.config.size;

    /*
     * Read language alternation list
     */
    if (
      this.config.languageAlternationList !== undefined &&
      this.config.languageAlternationList.constructor === Array
    ) {
      // Only retain those languages supported
      this.languageAlternationList = this.config.languageAlternationList.filter(
        function (item) {
          return this.indexOf(item) >= 0;
        },
        this.supportedLanguages
      );
      if (this.languageAlternationList.length === 0) {
        this.languageAlternationList = undefined;
        console.warn(
          'MMM-text-clock ignored languageAlternationList because no supported languages  were found, choose from: ',
          this.supportedLanguages.join(' ')
        );
      } else {
        console.info(
          'MMM-text-clock will alternate languages: ',
          this.languageAlternationList.join(' ')
        );
      }
    }

    /*
     * Check we have a valid alternation interval if provided
     */
    this.languageAlternationInterval = this.config.languageAlternationInterval;
    if (this.languageAlternationInterval !== undefined) {
      if (typeof this.languageAlternationInterval !== 'number') {
        Log.error(
          `"languageAlternationInterval: ${this.languageAlternationInterval}" is not a number. Defaulting to 60 minutes.`
        );
        this.languageAlternationInterval = 60;
      }
    }

    /*
     * Ensure we always have an alternation interval when we have an alternation list
     */
    if (
      this.languageAlternationList !== undefined &&
      (this.languageAlternationInterval === undefined ||
        this.languageAlternationInterval === 0)
    ) {
      this.languageAlternationInterval = 60; // Default to 60 mins
    }

    this.language = this.supportedLanguages.includes(config.language)
      ? config.language
      : 'en';

    if (typeof this.compact !== 'boolean') {
      Log.error(`"${this.compact}" is not a boolean. Falling back to "false".`);
      this.compact = false;
    }

    if (
      this.size !== 'small' &&
      this.size !== 'medium' &&
      this.size !== 'large'
    ) {
      Log.error(
        `"${this.size}" is not a supported value. Please use "small", "medium" or "large". Falling back to "medium".`
      );
      this.size = 'medium';
    }

    this.getActiveWords = undefined;
    this.gridColumns = 0;
    this.letters = [];
    this.wordMap = {};

    /*
     * Iterate those alternate languages over time
     */
    if (this.languageAlternationList !== undefined) {
      // This is safe because we ensured above the array contains at least 1 element
      this.sendSocketNotification(
        'SET_LANGUAGE',
        this.languageAlternationList[0]
      );
      var currentAlternationIndex = 0;

      setInterval(() => {
        ++currentAlternationIndex;
        if (currentAlternationIndex >= this.languageAlternationList.length) {
          currentAlternationIndex = 0;
        }

        this.sendSocketNotification(
          'SET_LANGUAGE',
          this.languageAlternationList[currentAlternationIndex]
        );

        console.info(
          'MMM-text-clock switched language to: ',
          this.languageAlternationList[currentAlternationIndex]
        );
      }, this.languageAlternationInterval * 60 * 1000);
    } else {
      // Else default to config language
      this.sendSocketNotification('SET_LANGUAGE', this.language);
    }
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === 'SET_LANGUAGE') {
      const revivedPayload = JSON.parse(payload, (_, value) => {
        if (typeof value === 'string' && value.indexOf('__FUNC__') === 0) {
          return eval(`(${value.slice(8)})`);
        }
        return value;
      });

      this.getActiveWords = revivedPayload.getActiveWords;
      this.gridColumns = revivedPayload.gridColumns;
      this.letters = revivedPayload.letters;
      this.wordMap = revivedPayload.wordMap;

      const self = this;

      setInterval(() => {
        self.updateDom();
      }, 10000);

      self.updateDom();
    }
  },

  getDom: function () {
    if (typeof this.getActiveWords !== 'function') {
      return document.createElement('div');
    }

    const grid = document.createElement('div');
    grid.classList.add('letters');
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

    const words = this.getActiveWords(new Date());

    if (this.compact) {
      grid.textContent = words
        .map((word) => word.map((letter) => this.letters[letter]).join(''))
        .join(' ');
    } else {
      this.letters.forEach((letter, index) => {
        const letterIndexes = words.reduce(
          (acc, word) => [...acc, ...word],
          []
        );
        const element = document.createElement('span');

        letterIndexes.includes(index) && element.classList.add('bright');
        element.textContent = letter;

        grid.appendChild(element);
      });
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
