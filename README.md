# MMM-text-clock

This MagicMirror module is a clock which shows the time as text.

![Screenshot of module](https://github.com/ngnijland/MMM-text-clock/raw/master/screenshots/MMM-text-clock-screenshot.png)

Compact mode:

![Screenshot of module in compact mode](https://github.com/ngnijland/MMM-text-clock/raw/master/screenshots/MMM-text-clock-screenshot-compact.png)

## Installation

1. Go to the MagicMirror modules folder

```bash
cd ~/MagicMirror/modules
```

2. Clone this repository

```bash
git clone https://github.com/ngnijland/MMM-text-clock.git
```

3. Add this module to the modules array in the MagicMirror `config/config.js` file, like this:

```javascript
modules: [
  {
    module: "MMM-text-clock",
    position: "middle_center"
  }
]
```

## Language

The text clock will match it's language to MagicMirror's `language` config (documentation [here](https://docs.magicmirror.builders/getting-started/configuration.html#raspberry-specific)). When the configured language is not supported the module will fall back to English.
When the using the `language` option, the config language is ignored.

Supported languages:
- English
- Spanish
- Dutch
- French
- Japanese
- Italian
- Swiss German

## Configuration

Configure this module in your MagicMirror config file which is located at `config/config.js` in the MagicMirror repository. An example config for this module:

```javascript
modules: [
  {
    module: "MMM-text-clock",
    position: "middle_center",
    config: {
      // Options
    }
  }
]
```

The following configurations are available:

Config                        | Type                       | Default value | Description
:-----------------------------|:---------------------------|:--------------|:------------
`compact`                     | `boolean`                  | `false`       | Compact mode only shows highlighted letters
`size`                        | `small \| medium \| large` | `medium`      | The size of the clock
`language`                    | `string` \| `string[]`     |               | A language or list of languages to alternate through. Overrides config language.
`languageAlternationInterval` | `number`                   | `60`          | Interval in minutes at which the language changes (> 0)

## Todo
- [x] Code text clock (English)
- [x] Add description to README
- [x] Add screenshots to README
- [x] Add configuration to README
- [x] Add module to third party module list of MagicMirror
- [x] Add contribution guide
- [x] Make styling work for every position available in MagicMirror software
- [x] Add compact mode
- [x] Add internationalization (add Dutch laguage)
- [x] Add documentation on how to contribute a new language
