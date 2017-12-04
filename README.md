# i18n-kit

This is a library to add basic i18n functionality to JavaScript apps.

A **demo** is available [here](https://github.com/rodu30/i18n-kit-demo).

## Concepts

The core of the **i18n-kit** is a simple API that tries to enable three aspects of i18n in a
project:

* language specific formatting (localization) of numbers
* language specific formatting (localization) of dates and time
* translation (localization) of strings

In case of the two former the library makes use of the build-in
[global JavaScript `Intl` Object](link) and therefore doesn't need to rely on big locale files.

The translation API follows a similar design. The goal is to make internationalization as easy as
possible for the developer. Therefore there are no keys which need to be associated to the actual
text and maintained somewhere else - a setting most i18n solutions use. Instead the developer
provides just the string (and possible variables) in his language of choice. These strings can later
be extracted from code and passed to a translation platform, a CMS or translated manually.

This has a few advantages:

* code readability: no keys where you have to guess the content
* speed: reducing effort for i18n the code to a minimum, just code, translations can be added later
* ...

## Getting started

Add **i18n-kit** to your project:

```bash
$ npm install --save git+ssh://git@github.com:rodu30/i18n-kit.git
```

### Init

In order to make the same language and formatting settings available everywhere in your app import
the `I18n` object to the entry point of your app (in a react app this usually is `index.js`). Then
create a new instance with a few arguments:

* `messages`: an object with the translations; has to be structured like this:

```javascript
{<locale>: { <key>: { message: <message> }}}
```

* `locale`: the current locale which determines how text, numbers etc are formatted
* Options (_optional_): all possible formatting options (see below)

Example:

```javascript
import I18n from 'i18n-kit';
import messages from './messages';

const locale =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage ||
  'en-US';

const options = {
  message: {
    messageLocale: 'en-US'
  },
  dateTime: {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'long'
  }
};

const i18n = new I18n(messages, locale, options);
```

Once instantiated the object can be passed to components or imported in other modules.

### Provider for react app

If using react the **i18n-kit** contains a provider component to make the `i18n` object available
everywhere in the app (via context) without wrapping every component.

TBA

## Usage

### Number formatting

```javascript
i18n.formatNumber(<number>[, options]);
```

Options can be added or changed in three ways:

* passed directly for the individual number (helpful to overwrite global settings)
* globally via constructor (probably the standard case)
* globally via class method (use this option if the options are changed somewhere in the app e.g.
  via user settings - however should be avoided because it has side effects):

```js
i18n.setNumberOptions(options);
```

See
[`Intl.numberFormat` options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)
for more details.

### DateTime formatting

```js
i18n.formatDateTime(new Date()[, options]);
```

Same as for numbers

See
[`Intl.dateTimeFormat` options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat)
for more details.

### String translation

```js
i18n.translateMessage(<message>[, args]);
```

... The arguments-object can contain a description of the context (can be useful for the translator
doesn't know the app) and values that replace placeholder after translation:

```js
i18n.translateMessage(`This is {num1} test for {num2}.`, {
  description: 'a test message',
  num1: 1,
  num2: 2
});
```

> NOTE: If you are using the **i18n-cli** for extracting messages you need to pass the message and
> the args to the method object directly as argument (not via variable) because variables cannot be
> interpreted by the extract-script.

Options can be passed in only globally (there is no use case where local options could be helpful)
via constructor or via method:

```js
i18n.setMessageOptions(options);
```

Options are:

* `disableWarnings`: Set to false in order to disable all warnings about status of the translation
  (e.g. not found). This can be useful when you are not using translations e.g. in a component
  library.
* `messageLocale`: Provide the locale for default messages (no warning is printed if current locale
  is the same as default).

...

#### Message extracting

The defined messages can be extracted from code and translated to other languages using the
**i18n-cli**. See [here](https://github.com/rodu30/i18n-cli) for more infos.

## Other use cases

### Multiple settings or encapsulation

It's not always useful to use one global instance for i18n. If you want to keep formatting more
locally and encapsulated in a module or component just import the `I18n` class locally and create a
new instance with individual settings.

> NOTE: If you also want to extract these messages 'locally' with the **i18n-cli** you have to point
> the script to the exact location and set the function-name (if you name the instance differently).

### Multiple Languages or multiple configs

If you need to use multiple languages or different configs at once for some reasons just create
separate instances of the `I18n` class and pass the same messages to it.

### No translations

In some cases you may want to make your app i18n-ready but don't want to add translations yet. In
this case just instantiate the class with an empty object instead of messages and set the
`disbaleWarnings` option for messages to avoid warnings about missing translations
