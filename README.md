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

The API is pretty similar for all supported formats. Basically there is a individual formatting
function for every type and some options that can be added globally or locally.

### Setting options

Options for all number styles can be added or changed in three ways:

* passed directly for the individual format (helpful to overwrite global settings - Exception are
  message options: currently there is no use case where local options could be helpful)
* globally via constructor (probably standard case):

```js
new I18n(messages, locale, {number: { ... }});
```

* globally via class setter (use this if options are set or changed at a different place in the app
  than where the class is instantiated, e.g. via user settings - should be avoided because it has
  side effects on all formatted content):

```js
const i18n = new I18n(messages, locale);

i18n.options = {number: { ... }};
```

### Numbers

Common options _(can be used for every number style)_:

* `localeMatcher`: The locale matching algorithm to use. Possible values are "lookup" and "best
  fit"; the default is "best fit". For information about this option, see the Intl page.
* `useGrouping`: Whether to use grouping separators, such as thousands separators or
  thousand/lakh/crore separators. Possible values are true and false; the default is true.

The following properties fall into two groups: minimumIntegerDigits, minimumFractionDigits, and
maximumFractionDigits in one group, minimumSignificantDigits and maximumSignificantDigits in the
other. If at least one property from the second group is defined, then the first group is ignored.

* `minimumIntegerDigits`: The minimum number of integer digits to use. Possible values are from 1 to
  21; the default is 1.
* `minimumFractionDigits`: The minimum number of fraction digits to use. Possible values are from 0
  to 20; the default for plain number and percent formatting is 0; the default for currency
  formatting is the number of minor unit digits provided by the ISO 4217 currency code list (2 if
  the list doesn't provide that information).
* `maximumFractionDigits`: The maximum number of fraction digits to use. Possible values are from 0
  to 20; the default for plain number formatting is the larger of minimumFractionDigits and 3; the
  default for currency formatting is the larger of minimumFractionDigits and the number of minor
  unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that
  information); the default for percent formatting is the larger of minimumFractionDigits and 0.
* `minimumSignificantDigits`: The minimum number of significant digits to use. Possible values are
  from 1 to 21; the default is 1.
* `maximumSignificantDigits`: The maximum number of significant digits to use. Possible values are
  from 1 to 21; the default is minimumSignificantDigits.

> Taken from
> [`Intl.NumberFormat` MDN page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)

#### Number formatting

Use the `n` function:

```javascript
const i18n = new I18n(messages>, locale);

i18n.n(<number>[, options]);
```

Additional options: _none_

#### Currency formatting

Use the `n` function:

```javascript
const i18n = new I18n(messages, locale);

i18n.c(<sum>[, options]);
```

Additional options:

* `currency`: The currency to use in currency formatting. Possible values are the ISO 4217 currency
  codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB — see the
  Current currency & funds code list. _Default is "EUR"._
* `currencyDisplay`: How to display the currency in currency formatting. Possible values are
  "symbol" to use a localized currency symbol such as €, "code" to use the ISO currency code, "name"
  to use a localized currency name such as "dollar"; the default is "symbol".

#### Percent formatting

Use the `p` function:

```javascript
const i18n = new I18n(messages, locale);

i18n.p(<number>[, options]);
```

Additional options: _none_

### DateTime

Common options _(can be used for every dateTime style)_:

* `localeMatcher`: The locale matching algorithm to use. Possible values are "lookup" and "best
  fit"; the default is "best fit". For information about this option, see the Intl page.
* `timeZone`: The time zone to use. The only value implementations must recognize is "UTC"; the
  default is the runtime's default time zone. Implementations may also recognize the time zone names
  of the IANA time zone database, such as "Asia/Shanghai", "Asia/Kolkata", "America/New_York".
* `hour12`: Whether to use 12-hour time (as opposed to 24-hour time). Possible values are true and
  false; the default is locale dependent. This option overrides the hc language tag and/or the
  hourCycle option in case both are present.
* `hourCycle`: The hour cycle to use. Possible values are "h11", "h12", "h23", or "h24". This option
  overrides the hc language tag, if both are present, and the hour12 option takes precedence in case
  both options have been specified.
* `formatMatcher`: The format matching algorithm to use. Possible values are "basic" and "best fit";
  the default is "best fit". See the following paragraphs for information about the use of this
  property.

The following properties describe the date-time components to use in formatted output, and their
desired representations. Implementations are required to support at least the following subsets:

* weekday, year, month, day, hour, minute, second
* weekday, year, month, day
* year, month, day
* year, month
* month, day
* hour, minute, second
* hour, minute

> Taken from
> [`Intl.DateTimeFormat` MDN page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat)

#### Date formatting

Use the `d` function:

```javascript
const i18n = new I18n(messages, locale);

i18n.d(<date>[, options]);
```

Additional options:

* `timeZoneName`: The representation of the time zone name. Possible values are "short", "long".
* `weekday`: The representation of the weekday. Possible values are "narrow", "short", "long".
* `era`: The representation of the era. Possible values are "narrow", "short", "long".
* `year`: The representation of the year. Possible values are "numeric", "2-digit".
* `month`: The representation of the month. Possible values are "numeric", "2-digit", "narrow",
  "short", "long".
* `day`: The representation of the day. Possible values are "numeric", "2-digit".

_default: year, month, day ("numeric");_ set to `undefined` to overwrite

#### Time formatting

Use the `t` function:

```javascript
const i18n = new I18n(messages, locale);

i18n.t(<date>[, options]);
```

Additional options:

* `hour`: The representation of the hour. Possible values are "numeric", "2-digit".
* `minute`: The representation of the minute. Possible values are "numeric", "2-digit".
* `second`: The representation of the second. Possible values are "numeric", "2-digit".

_default: hour, minute ("numeric");_ set to `undefined` to overwrite

### Strings

#### Message translation

Use the `m` function:

```js
const i18n = new I18n(messages, locale);

i18n.m(<message>[, args]);
```

The arguments-object can contain a `description` of the context (can be useful for the translator
doesn't know the app) and values that replace placeholder after translation:

```js
i18n.m(`This is {num1} test for {num2}.`, {
  description: 'a test message',
  num1: 1,
  num2: 2
});
```

> NOTE: If you are using the **i18n-cli** for extracting messages you need to pass the message and
> the args to the method object directly as argument (not via variable) because variables cannot be
> interpreted by the extract-script.

Options:

* `disableWarnings`: Set to false in order to disable all warnings about status of the translation
  (e.g. not found). This can be useful when you are not using translations e.g. in a component
  library.
* `messageLocale`: Provide the locale for default messages (no warning is printed if current locale
  is the same as default).

#### Message extracting

The defined messages can be extracted from code and translated to other languages using the
**i18n-cli**. See [here](https://github.com/rodu30/i18n-cli) for more infos.

### Locale/language change

The locale can be changed during runtime. Just make sure your app gets re-rendered afterwards in
order to apply the changes.

Use the `locale` setter:

```js
const i18n = new I18n(messages, 'en-US');

i18n.locale = 'de-DE';
```

In order to reset the locale to the initial default locale just assign `null` or `undefined` to the
setter:

```js
const i18n = new I18n(messages, 'en-US');

i18n.locale = 'de-DE';
i18n.locale = null;
```

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
