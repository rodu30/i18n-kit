import { translate, getMessages } from '../src/messageTranslator';

const messages = {
  'en-US': { foo: { message: 'foo' } },
  'de-DE': { foo: { message: 'bar' } },
  'de-CH': { foo: { message: 'baf' } },
};
const message = 'foo';
const options = { messageLocale: 'en-US' };

test('finding different locale types', () => {
  expect(getMessages('en', messages)).toBeTruthy();
  expect(getMessages('en-US', messages)).toBeTruthy();
  expect(getMessages('EN', messages)).toBeFalsy();
  expect(getMessages('US', messages)).toBeFalsy();
  expect(getMessages('de', messages)).toBeTruthy();
  expect(getMessages('de-DE', messages)).toBeTruthy();
  expect(getMessages('DE', messages)).toBeFalsy();
  expect(getMessages('deDE', messages)).toBeFalsy();
});

test('translates from English to German', () => {
  expect(translate('de-DE', messages, message, options)).toBe('bar');
  expect(translate('de-CH', messages, message, options)).toBe('baf');
  expect(translate('de', messages, message, options)).toBe('bar');
});

test('translates from English to English', () => {
  expect(translate('en-US', messages, message, options)).toBe('foo');
  expect(translate('en', messages, message, options)).toBe('foo');
});
