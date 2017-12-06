import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Component that makes i18n context available in child component via render prop
 * @class I18n
 * @extends {Component}
 */
class I18nGetter extends Component {
  render() {
    const { i18n } = this.context;

    return this.props.children(i18n);
  }
}

I18nGetter.contextTypes = {
  i18n: PropTypes.object.isRequired,
};

I18nGetter.propTypes = {
  children: PropTypes.func.isRequired,
};

export default I18nGetter;
