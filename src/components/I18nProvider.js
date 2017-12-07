import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from '../I18n';

/**
 * Provider for i18n that creates instance of a I18n class and adds it to context in order to make it available in every component
 * @class I18nProvider
 * @extends {Component}
 */
class I18nProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocale: this.props.locale,
      initialLocale: this.props.locale,
    };
  }

  /**
   * Setter for current locale, creates new I18n instance
   * if no locale is provided locale is set to default
   * @memberof I18nProvider
   */
  handleSetLocale = locale => {
    if (locale) {
      this.setState(prevState => {
        if (prevState.currentLocale !== locale)
          return {
            currentLocale: locale,
          };
      });
    } else {
      this.setState(prevState => {
        if (prevState.currentLocale !== this.state.initialLocale)
          return {
            currentLocale: this.state.initialLocale,
          };
      });
    }
  };

  /**
   * Getter for current locale
   * @memberof I18nProvider
   */
  handleGetLocale = () => this.state.currentLocale;

  getChildContext() {
    const { messages, options } = this.props;
    const { currentLocale } = this.state;

    // Create new instance
    const instance = new I18n(messages, currentLocale, options);
    // Add custom getter and setter
    Object.defineProperty(instance, 'locale', {
      set: this.handleSetLocale,
      get: this.handleGetLocale,
    });

    return {
      i18n: instance,
    };
  }

  render() {
    return this.props.children;
  }
}

I18nProvider.childContextTypes = {
  i18n: PropTypes.instanceOf(I18n),
};

I18nProvider.propTypes = {
  children: PropTypes.node.isRequired,
  messages: PropTypes.object.isRequired,
  locale: PropTypes.string,
  options: PropTypes.object,
};

I18nProvider.defaultProps = {
  locale:
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage ||
    'en-US',
  options: undefined,
};

export default I18nProvider;
