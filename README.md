# i18n-kit

## Concepts

This is a library to add basic i18n functionality to JavaScript apps.

### Core API

It's core is a simple API that tries to solve three aspects of i18n:

* language specific formatting (localization) of numbers
* language specific formatting (localization) of dates and time
* easy translation of strings

In case of the two former the library makes use of the build-in [JavaScript Intl API](link) and
therefore doesn't need to rely on big locale files.

The translation API follows a similar design. The goal is to make internationalization as easy as
possible for the developer. Therefore there are no keys which need to be associated to the actual
text and maintained somewhere else, a setting most i18n solutions use. Instead the developer just
provides the string (and possible variables) in his individual language. This has a few advantages:

* code readability: no keys where you have to guess the content
* speed: reducing effort for i18n the code to a minimum, just code, translations can be added later
* ...

### I18n object

In order to make the same language and formatting settings available everywhere in the app the
library contains a single I18n-kit object. Once instantiated with a few configs it can be passed to
all components or imported in other modules. There it's simple methods can be used to the three main
tasks.

```javascript
I18n.formatNumber();
```

> Examples tba

### Message scanner

tba

## Getting started

tba

## Usage

### Global config + global messages

e.g. in react app

* Instantiate object with locale, messages and options at one point
* Use object methods for translating/formatting locally
* Use CLI/script to extract messages from code and write to global .json file according to config
* Use `formatMessage()` options to add namespace for the component/module (optional)

### Global configs + local messages

e.g. in libraries

* Instantiate object with locale and options at one point
* Use object methods for translating/formatting locally
* Use `addMessage()` locally to add translations for this particular component/module

### Local configs + local messages

e.g. in libraries

* Instantiate object with locale, messages and options locally
* Use object methods for translating/formatting locally

### Individual config + individual message

* just import base functions
* pass messages, current locale together with single message
* use script later to extract translations (?)

## Misc

### Multiple Languages or multiple configs

If you need to use multiple languages or different configs at once just create separate instances of
`I18n` and pass the same messages to it...
