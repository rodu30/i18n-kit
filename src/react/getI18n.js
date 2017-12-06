import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** Higher order component that makes i18n context available in wrapped component */
const getI18n = WrappedComponent => {
  class I18nContext extends Component {
    render() {
      const { i18n } = this.context;

      return <WrappedComponent {...this.props} i18n={i18n} />;
    }
  }

  I18nContext.contextTypes = {
    i18n: PropTypes.object.isRequired,
  };

  return I18nContext;
};

export default getI18n;
