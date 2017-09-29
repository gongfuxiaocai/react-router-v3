import React, { Component, PropTypes, Children, cloneElement } from 'react';
import classNames from 'classnames';
import Label from './label';
import Input from './input';
import Checkbox from './checkbox';
import CheckboxGroup from './checkbox-group';
import Radio from './radio';
import RadioGroup from './radio-group';
import Select from './select';
import Textarea from './textarea';

/**
 *表单域组件
 */
class FormItem extends Component {
    /**
     *初始状态定义
     */
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            validate: true
        };

        this.handleChange = this.handleChange.bind(this);
    }

    /**
     *初始状态有值，则触发内部回调
     */
    componentDidMount() {
        const { data } = this.state;

        for (const key in data) {
            if (this.props._onChange) {
                this.props._onChange(data[key], this.state.validate, key);
            }
        }
    }

    /**
     *内部回调函数定义
     */
    handleChange(newValue, newValidate, newName) {
        const { data } = this.state;

        data[newName] = newValue;
        this.setState({ data });
        this.setState({ validate: newValidate });

        for (const key in data) {
            if (this.props._onChange) {
                this.props._onChange(data[key], newValidate, key);
            }
            if (this.props.onChange) {
                this.props.onChange(data, newValidate);
            }
        }
    }

    /**
     *对 children 组件进行处理
     */
    renderChildren(children) {
        const { checkNow, readonly, readOnly, required, name, disabled, type } = this.props;

        return Children.map(children, (child, index) => {
            if (!child) {
                return null;
            }
            if (typeof child === 'string') {
                return child;
            }

            const props = {};

            if ((child.type === Input || child.type === Checkbox || child.type === CheckboxGroup || child.type === Radio || child.type === RadioGroup || child.type === Select || child.type === Textarea) && child.props) {
                props._onChange = this.handleChange;
                props.checkNow = checkNow;
                props.disabled = child.props.disabled || disabled;
                props.name = child.props.name || name;
                props.readOnly = child.props.readonly || child.props.readOnly || readonly || readOnly;
                props.required = child.props.required || required;
                props.key = index;
                props._type = type;
                props.checkNow = checkNow;
            } else if (child.type === Label && child.props) {
                props.required = child.props.required || required;
                props._type = type;
                props.key = index;
            } else if (child.props.children) {
                props.children = this.renderChildren(child.props.children);
            }

            return cloneElement(child, props);
        });
    }

    /**
     *渲染组件
     */
    render() {
        const { type, unvalidateMsg, children, required } = this.props;
        const cls = {
            'slds-form-element': true,
            'is-required': required || this.state.validate === false,
            'slds-has-error': this.state.validate === false,
            'slds-clearfix': type === 'inline'
        };

        let errorMark = '';

        if (this.state.validate === false) {
            errorMark = <div className="slds-form-element__help">{unvalidateMsg}</div>;
        }

        return (
            <div className={classNames(cls)}>
                {this.renderChildren(children)}
                {errorMark}
            </div>
        );
    }

}

FormItem.propTypes = {
    name: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    readonly: PropTypes.bool,
    readOnly: PropTypes.bool,
    unvalidateMsg: PropTypes.string,
    type: PropTypes.oneOf(['horizontal', 'inline']),
    checkNow: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.oneOf([Label, Checkbox, CheckboxGroup, Radio, RadioGroup, Textarea, Select, Input]) })),
        PropTypes.shape({ type: PropTypes.oneOf([Label, Checkbox, CheckboxGroup, Radio, RadioGroup, Textarea, Select, Input]) })
    ]),
    onChange: PropTypes.func,
    _onChange: PropTypes.func
};

FormItem.defaultProps = {
    readonly: false,
    disabled: false,
    required: false,
    unvalidateMsg: '请输入正确内容'
};

export { FormItem };
export default FormItem;