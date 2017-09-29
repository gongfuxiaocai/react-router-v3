import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class Input extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }



    static defaultProps = {
        model: "primary",
        size: "medium",
        rules: []
    }
    static propTypes = {
        width: PropTypes.number,
        rules: PropTypes.array,
    };

    handleChange(ev) {
        this.validate(ev, 'onChange');
    }

    handleBlur(ev) {
        this.validate(ev, 'onBlur');
    }

    validate(ev, type) {
        const value = ev.currentTarget.value;
        const name = ev.currentTarget.name;
        const rules = this.props.rules;
        let eventType = null;
        let errorMsg = null;
        let validate = true;
        let validateAccount = 0;
        let errorNum = 0;

        if (type === "onChange") {
            eventType = this.props.onChange;
        } else if (type === "onBlur") {
            eventType = this.props.onBlur;
        }
        if (eventType) {
            if (rules.length !== 0) {
                this.clearTime();
                this.timer = setTimeout(() => {
                    rules.forEach((rule, index) => {
                        validate = rule.validate(value);
                        if (!validate && ++errorNum === 1) {
                            errorMsg = rule.errorMsg;
                            eventType(value, name, validate, errorMsg);
                            return false;
                        } else {
                            validateAccount++;
                            if (validateAccount === rules.length) {
                                eventType(value, name, validate);
                            }
                        };
                        return false;
                    });
                }, 200);
            } else {
                eventType(value, name);
            }
        }

    }

    clearTime() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }


    render() {
        const { className, model, width, size, name, rules, onChange, onBlur, ...others } = this.props;
        const cls = classNames({
            'swiftBI_input': true,
            'primary': model === "primary",
            'medium': size === "medium",
            'small': size === "small",
            'big': size === "big",
            [className]: className
        });

        let styleWidth = {
            width: width + 'px'
        }
        return (

            <input onChange={this.handleChange} name={name} onBlur={this.handleBlur} className={cls} style={styleWidth} {...others} />

        )
    }

}
