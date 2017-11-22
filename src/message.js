// --- Helper for formatting and adding messages ---

/**
 * Generates a string from the provided message containing placeholders (according to ICU standard) and an object with variables
 * @param {string} message
 * @param {object} vars
 * @returns {string}
 */
const generateStringWithVars = (message, vars = {}) => {
  let newMessage = message;
  Object.entries(vars).forEach(([key, value]) => {
    const pattern = new RegExp(`{${key}}`, 'g');
    newMessage = newMessage.replace(pattern, value);
  });
  return newMessage;
};

/**
 * Generates a key from a given message
 * @param {string} message
 */
export const generateKeyFromString = message =>
  message
    .toLowerCase()
    .replace(/{|}|\.|,|\?|\!/g, '')
    .replace(/ /g, '_');
// TODO: add more RegEx to remove special characters

/**
 * Adds new message and new locale (if necessary) to a given message object
 * @param {object} messages
 * @param {string} locale
 * @param {string} message
 * @returns {object} new messages
 */
export const addNewMessage = (messages, locale, message) => {
  // New message key
  const newKey = generateKeyFromString(message);

  // Clone messages
  const newMessages = { ...messages };

  // If locale doesn't exist, add it and then message to it
  if (!messages[locale]) {
    newMessages[locale] = locale;
    console.info(`A new locale "${locale}" was added.`);
  }

  // If message key already exists for locale and value is identical, do nothing, if not identical log error
  if (messages[locale][newKey] && messages[locale][newKey] !== message) {
    console.error(`Error: Message key "${newKey}" already exists`);
  }

  // If message key doesn't exist for locale, add it
  if (!messages[locale][newKey]) {
    newMessages[locale][newKey] = message;
    console.info(`A new message "${message}" was added to locale "${locale}".`);
  }
  return newMessages;
};

// --- Format text ---

/**
 * Formats a given string or
 * string`s translation (according to locale) with optional placeholder variables (ICU syntax)
 * @param {string} locale
 * @param {object} messages
 * @param {string} message
 * @param {object} options:
 *                 {object} vars variables for placeholder in message
 *                 {string} messageLocale if provided, the message will automatically be added to this locale
 *                 {string} description
 *                 {boolean} noWarnings
 * @returns {string}
 */
const formatMessage = (locale, messages, message, options = {}) => {
  // Deconstruct options
  const { vars, messageLocale, description, disableWarnings } = options;

  // Get complete string with vars
  const defaultWithVars = generateStringWithVars(message, vars);

  // // If messageLocale is set, add message to messages of default locale
  // if (messageLocale) {
  //   addNewMessage(messages, messageLocale, message);
  // }

  // If requested locale doesn't exist yet return default (+ warning)
  if (!messages[locale]) {
    if (!disableWarnings) {
      console.warn(
        `Warning: Displaying default message\nThere are no translations for "${
          locale
        }". Please add it to your list of locales.`
      );
    }
    return defaultWithVars;
  }

  const messageKey = generateKeyFromString(message);
  const existingMessage = Object.entries(messages[locale]).find(
    ([key, value]) => key === messageKey
  );

  // If message key doesn't exist in requested locale...
  if (!existingMessage) {
    // ...and locale is default locale, returns default (no warning b/c message was already added)
    if (messageLocale && messageLocale === locale) return defaultWithVars;

    // ...return default (+ warning)
    if (!disableWarnings) {
      console.warn(
        `Warning: Displaying default message\n"${
          defaultWithVars
        }" has not been translated to requested locale "${locale}". Please add translation.`
      );
    }
    return defaultWithVars;
  }

  // If message key exists in requested locale return message according to provided locale
  if (existingMessage) return generateStringWithVars(existingMessage[1], vars);

  // just in case
  return null;
};

export default formatMessage;
