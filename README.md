# MMM-text-clock

This MagicMirror module is a clock which shows the time as text.

![Screenshot of module](https://github.com/ngnijland/MMM-text-clock/raw/master/screenshots/MMM-text-clock-screenshot.png)

## Installation

1. Go to the MagicMirror modules folder

```bash
cd ~/MagicMirror/modules`
```

2. Clone this repository

```bash
git clone https://github.com/ngnijland/MMM-text-clock.git
```

3. Add the this module to the modules array in the MagicMirror `config/config.js` file, like this:

```javascript
modules: [
  {
    module: "MMM-text-clock",
    position: "middle_center"
  }
]
```

**NOTE:** This module works best at the `middle_center` position of MagicMirror.

## Todo
- [x] Code text clock (English)
- [x] Add description to README
- [x] Add screenshots to README
- [x] Add configuration to README
- [ ] Add module to third party module list of MagicMirror
- [ ] Add contribution guide
- [ ] Make styling work for every position available in MagicMirror software
- [ ] Add compact mode
- [ ] Add internationalization (add Dutch laguage)
- [ ] Add documentation on how to contribute a new language
