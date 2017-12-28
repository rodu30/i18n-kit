import { translate } from '../src/messageTranslator';

const messages = { 'en-US': { foo: { message: 'foo' } }, 'de-DE': { foo: { message: 'bar' } } };
const message = 'foo';
const options = { messageLocale: 'en-US' };

test('translates from English to German', () => {
  expect(translate('de-DE', messages, message, options)).toBe('bar');
  expect(translate('de', messages, message, options)).not.toBe('bar');
});

test('translates from English to English', () => {
  expect(translate('en-US', messages, message, options)).toBe('foo');
  expect(translate('en', messages, message, options)).toBe('foo');
});
