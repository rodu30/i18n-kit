import I18n from '../src/I18n';

const messages = { 'en-US': { foo: { message: 'foo' } }, 'de-DE': { foo: { message: 'bar' } } };
const options = { message: { messageLocale: 'en-US' } };

let i18n;
beforeEach(() => {
  i18n = new I18n(messages, 'de-DE', options);
});

test('format numbers in German', () => {
  expect(i18n.n(1000)).toBe('1.000');
  expect(i18n.c(1000, { currencyDisplay: 'name' })).toBe('1.000,00 Euro');
  expect(i18n.p(10)).toBe('10 %');
});

test('translates from English to German', () => {
  expect(i18n.m('foo')).toBe('bar');
});
