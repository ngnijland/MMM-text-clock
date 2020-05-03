Module.register('MMM-text-clock', {
  defaults: {
    text: 'Hello world',
  },

  getDom: function () {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.config.text;
    return wrapper;
  },
});
