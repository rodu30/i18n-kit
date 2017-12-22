# i18n-kit

This is a library to add basic i18n functionality to JavaScript apps.

A **demo** is available [here](https://github.com/rodu30/i18n-kit-demo).

## Concepts

The core of the **i18n-kit** is a simple API that tries to enable three aspects of i18n:

* language specific formatting (localization) of numbers
* language specific formatting (localization) of dates and time
* translation (localization) of strings

In case of the two former the library makes use of the global
[JavaScript `Intl` Object](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Intl)
which provides build-in locale specific formatting. No big locale files necessary.

The translation API follows a similar design. The goal is to make internationalization as easy as
possible for the developer. Therefore there are no keys which need to be associated to the actual
text and maintained somewhere else - a setup most i18n solutions use. Instead the developer just
provides the string (and possible variables) in one default language of his choice directly while
coding. The defined strings can later be extracted from code and passed to a translation platform, a
CMS or translated manually in a JSON file.

The extraction part can be solved by the [**i18n-cli**](https://github.com/rodu30/i18n-cli). The CLI
is designed to work with the **i18n-kit** but it is optional.

This setup has a few advantages over other solutions:

* code readability: no keys where you don`t know the actual content that is rendered later
* speed: reducing the effort to add internationalization to the code to a minimum: "just code,
  translations can be added later"
* flexibility: since the solution is purely build in JavaScript and is basically just one class a
  lot of different use cases are possible
* maintainability: using build-in standards where possible (like the Intl object), reduces need for
  breaking changes
* context sensitivity: not every text means the same in every context, in order to give the
  translator an idea about context the exact location is extracted with the string (using the CLI)
* ...

## Getting started

Add **i18n-kit** to your project:

```bash
$ npm install --save git+ssh://git@github.com:rodu30/i18n-kit.git
```

### In any JavaScript app

In order to make the same language and formatting settings available everywhere in your app import
the `I18n` class (default export) to the entry point of your app (in a react app this usually is
`index.js`). Then create a new instance with a few arguments:

* `messages`: an object with the translations; has to be structured like this:

```javascript
{[locale]: { [key]: { message: ... }}}
```

* `locale`: the current locale which determines how text, numbers etc are formatted
* Options (_optional_): all possible formatting options (see 'Setting options')

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

Once instantiated, the object can be passed to components or exported to other modules.

### In a React app

The **i18n-kit** contains a few components that take care of most the manual steps.

#### Provider

`I18nProvider` creates the of the I18n class and adds it to context in order to make it available in
every component. Just import it to the entry point and wrap it around your app:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { I18nProvider } from 'i18n-kit';
import messages from './messages';
import App from './App';

const options = {
  message: {
    messageLocale: 'en-US'
  },
  currency: {
    currency: 'USD'
  }
};

ReactDOM.render(
  <I18nProvider messages={messages} options={options}>
    <App />
  </I18nProvider>,
  document.getElementById('root')
);
```

Props are the same as for the I18n constructor, except locale is also optional because the provider
will use the browser language as default value automatically.

#### Higher order component

To use the i18n object in the individual components you need to wrap the component in a higher order
component for consuming the context.

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { getI18n } from 'i18n-kit';

const ExampleComponent = ({ i18n }) => {
  return <div>{i18n.n(3500)}</div>;
};

export default getI18n(ExampleComponent);
```

#### Component with render prop

Some people prefer "render props" over higher order components. You can use it like that:

```javascript
import React from 'react';
import { I18nGetter } from 'i18n-kit';

const ExampleComponent = props => {
  return <I18nGetter>{i18n => <div>{i18n.n(3500)}</div>}</I18nGetter>;
};

export default ExampleComponent;
```

## Usage

The API is pretty similar for all supported formats. Basically there is an individual formatting
function for every type and some options that can be added globally or locally.

### Setting options

Options for all formatter can be added or changed in different ways:

* They can be added globally via the constructor or Provider using keys for individual settings:

```js
new I18n(messages, locale, {number: { ... }});
```

* They can be passed directly to the format function for the individual data to overwrite or
  complement the default options. This is helpful to overwrite global settings locally

Use the `options` getter to read global options:

```js
const options = i18n.options;
```

### Setting locale

<!-- The locale can be changed during runtime. Just make sure your app gets re-rendered afterwards in
order to apply the changes.
 -->

To change the language and formatting rules just create a new instance of the I18n class with the
same options and the new locale.

> Note: Currently the locale can't be changed for an existing instance because mutating the object
> can have unpredictable side effects e.g. when used in multiple components. Another problem is that
> mutated objects can't be compared against earlier versions (important in React to re-render
> components).

To get the current locale use the `locale` getter:

```js
const locale = i18n.locale;
```

#### React locale setter

Since the `I18nProvider` for React takes care of creating an I18n instance it also adds an
additional `locale` setter to this instance. It can be uses to change the language everywhere in the
app e.g. via user input. This setter however doesn't mutate the object but changes the state in the
provider. Therefore a new instance is created and the component-tree gets re-rendered.

Use the `locale` setter:

```js
console.log(i18n.locale);
// en-US

i18n.locale = 'de-DE';
```

In order to reset the locale to the initial default locale just assign `null` or `undefined` to the
setter:

```js
console.log(i18n.locale);
// en-US

i18n.locale = 'de-DE';
i18n.locale = null;

console.log(i18n.locale);
// en-US
```

### Formatting number types

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

#### Number

Use the `n()` function:

```javascript
const i18n = new I18n(messages, locale);

i18n.n(number[, options]);
```

Additional options: _none_

#### Currency

Use the `c()` function:

```javascript
const i18n = new I18n(messages, locale);

i18n.c(sum[, options]);
```

Additional options:

* `currency`: The currency to use in currency formatting. Possible values are the ISO 4217 currency
  codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB — see the
  Current currency & funds code list. _Default is "EUR"._
* `currencyDisplay`: How to display the currency in currency formatting. Possible values are
  "symbol" to use a localized currency symbol such as €, "code" to use the ISO currency code, "name"
  to use a localized currency name such as "dollar"; the default is "symbol".

#### Percent

Use the `p()` function:

```javascript
const i18n = new I18n(messages, locale);

i18n.p(number[, options]);
```

Additional options: _none_

### Formatting dateTime

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

#### Date

Use the `d()` function:

```javascript
const i18n = new I18n(messages, locale);

i18n.d(date[, options]);
```

Additional options:

* `timeZoneName`: The representation of the time zone name. Possible values are "short", "long".
* `weekday`: The representation of the weekday. Possible values are "narrow", "short", "long".
* `era`: The representation of the era. Possible values are "narrow", "short", "long".
* `year`: The representation of the year. Possible values are "numeric", "2-digit".
* `month`: The representation of the month. Possible values are "numeric", "2-digit", "narrow",
  "short", "long".
* `day`: The representation of the day. Possible values are "numeric", "2-digit".

_Default: year, month, day (`numeric`; set to `undefined` to overwrite)_

#### Time

Use the `t()` function:

```javascript
const i18n = new I18n(messages, locale);

i18n.t(date[, options]);
```

Additional options:

* `hour`: The representation of the hour. Possible values are "numeric", "2-digit".
* `minute`: The representation of the minute. Possible values are "numeric", "2-digit".
* `second`: The representation of the second. Possible values are "numeric", "2-digit".

_Default: hour, minute (`numeric`; set to `undefined` to overwrite)_

### Formatting strings

#### Options

* `disableWarnings`: Set to false in order to disable all warnings about status of the translation
  (e.g. not found). This can be useful when you are not using translations e.g. in a component
  library.
* `messageLocale`: Provide the locale for default messages (no warning is printed if current locale
  is the same as default).

#### Message translation

Use the `m()` function:

```js
const i18n = new I18n(messages, locale);

i18n.m(message[, args]);
```

In order to enable placeholders, plurals and genders use the [ICU message syntax](http://userguide.icu-project.org/formatparse/messages)) in the message string (e.g. placholders in curly braces). The i18n-kit has a parser for this international standard integrated. Pass the values, current gender or current plural within the additional arguments-object. This object can also contain a `description` of the context (can be useful for the
translator doesn't know the app), an `options` object and values that replace placeholders after translation.

Example:

```js
i18n.m(`This is {num1} test for {num2}.`, {
  description: 'a test message',
  num1: 1,
  num2: 2
});
```

> NOTE: If you are using the **i18n-cli** for extracting messages you need to pass the message and
> the args to the `m` function directly (not via a variable) because variables cannot be resolved by
> the extract-script.

## Other use cases

The flexibility of the design allows for a lot of different use cases. Some possible use cases are:

### Multiple settings or encapsulation

It's not always useful to use one global instance for i18n. If you want to keep formatting more
locally and encapsulated in a module or component just import the `I18n` class locally and create a
new instance with individual settings.

> NOTE: If you also want to extract these messages 'locally' with the **i18n-cli** you have to point
> the script to the exact location and set the function-name (if you name the instance differently).

### Multiple Languages or multiple configs

If you need to use multiple languages or different configs at once for some reason just create
separate instances of the `I18n` class and pass the same messages to it.

### No translations

In some cases you may want to make your app i18n-ready but don't want to add translations yet. In
this case just instantiate the class with an empty object instead of messages and set the
`disbaleWarnings` option for messages to avoid warnings about missing translations
