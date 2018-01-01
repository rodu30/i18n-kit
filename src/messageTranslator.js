/**
 * Generates a key from a message string
 * @param {string} message
 * @returns {string}
 */
const generateKey = message => {
  // NOTE: Using shorter keys (e.g. hashed values) can result in faster read times.
  //       However as long as there are no perf issues we will simply use the message as key.
  return message;
};

/**
 * Returns message if message-key can be found in messages object and if message flag is not 'MISSING'
 * otherwise returns null
 * @param {object} messages
 * @param {string} message
 * @returns {string}
 */
export const getMessage = (messages, message) => {
  const msgKey = generateKey(message);
  const msgArr = Object.entries(messages).find(
    ([key, value]) => key === msgKey && value.message && value.flag !== 'MISSING'
  );
  if (msgArr) return msgArr[1].message;
  return null;
};

/**
 * Returns messages for a given locale (if locale can be found; Note: matching is case sensitive),
 * if locale only contains a language tag (lowercases) the first match of language is used
 * @param {string} locale
 * @param {object} messages
 * @returns {string}
 */
export const getMessages = (locale, messages) => {
  const msgsArr = Object.entries(messages).find(
    ([key, value]) => (key.indexOf(locale) === 0 ? value : null)
  );
  if (msgsArr) return msgsArr[1];
  return null;
};

/**
 * Gets the translation for given string (or a string with placeholders variables)
 * from a translated-messages object according to provided locale
 * @param {string} locale
 * @param {object} messages
 * @param {string} message
 * @param {object} options:
 *                 disableWarnings: {boolean}  disables warnings about missing translations
 *                 messageLocale: {string}     the locale of provided message (no warning is printed if current locale is default)
 * @returns {string}
 */
export const translate = (locale, messages, message, options = {}) => {
  const { disableWarnings, messageLocale } = options;

  const messagesPerLocale = getMessages(locale, messages);

  // If requested locale doesn't exist yet return default (+ warning)
  if (!messagesPerLocale) {
    if (!disableWarnings) {
      console.warn(
        `Warning: Displaying default message\nLocale "${locale}" is missing in list of locales.`
      );
    }
    return message;
  }

  // Check if message exists for current locale
  const existingMessage = getMessage(messagesPerLocale, message);

  // If message key doesn't exist in requested locale...
  if (!existingMessage) {
    // ...and requested locale is default locale, returns default (no warning b/c message is already in correct language)
    if (messageLocale && messageLocale === locale) return message;

    // ...return default (+ warning)
    if (!disableWarnings) {
      console.warn(
        `Warning: Displaying default message\n"${message}" has not been translated to requested locale "${locale}".`
      );
    }
    return message;
  }

  // If message key exists in requested locale return message according to provided locale
  if (existingMessage) return existingMessage;

  // just in case
  return null;
};
