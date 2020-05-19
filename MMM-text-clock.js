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

  supportedLanguages: ['en', 'nl'],

  start: function () {
    Log.info(`Starting module: ${this.name}`);

    this.compact = this.config.compact;
    this.size = this.config.size;
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

    this.sendSocketNotification('SET_LANGUAGE', this.language);
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
});
