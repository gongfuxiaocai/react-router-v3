import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Icon = (props) => (
    <i className={classNames(`_icon_${ props.name }`, props.className)}>
    </i>
);

Icon.PropTypes = {
    name: PropTypes.string,
    className: PropTypes.string
};

export default Icon;
export { Icon };