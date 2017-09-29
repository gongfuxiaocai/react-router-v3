import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

/**
 *标签
 */
class Label extends Component {
    /**
     *渲染组件
     */
    render() {
        const { required, children, _required, _type } = this.props;
        const cls = {
            'slds-form-element__label': true,
            'slds-float--left': _type === 'inline'
        };

        let requiredMark = '';

        if (required || _required) {
            requiredMark = <abbr className="slds-required" title="required">*</abbr>;
        }

        return (
            <label className={classNames(cls)}>
                {requiredMark}
                {children}
            </label>
        );
    }

}

Label.propTypes = {
    required: PropTypes.bool,
    _required: PropTypes.bool,
    children: PropTypes.any,
    _type: PropTypes.oneOf(['horizontal', 'inline'])
};

Label.defaultProps = { _required: false };

export { Label };
export default Label;