import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../../style/components/form/select.styl';

class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.props.dataSource || this.props.children.map((child) => {
                return {
                    value: child.props.value,
                    content: child.props.children,
                    disabled: child.props.disabled
                }
            }) || [],
            selected: this.props.selected || null,
            content: this.props.placeholder,
            showOptions: false,
            disabled: this.props.disabled
        };

        this.handleTrigger = this.handleTrigger.bind(this);
        this._onHandleClick = this._onHandleClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this._onHandleClick, false);

        this.setState({
            content: this.findContent( this.props.selected ) || this.props.placeholder
        })
    }

    componentWillReceiveProps( nextProps ) {
        if( this.props.dataSource !== nextProps.dataSource ) {
            this.setState({
                dataSource: nextProps.dataSource
            })
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this._onHandleClick, false);
    }

    handleTrigger(ev) {
        ev.nativeEvent.stopImmediatePropagation();

        if( this.state.disabled  ) {
            return false;
        }

        this.setState({
            showOptions: true
        })
    }

    handleSelect(val, ev) {
        ev.nativeEvent.stopImmediatePropagation();
        const targetNode = ev.target;

        const className = targetNode.getAttribute("class");
        if(className && className.split(" ").indexOf("_select_disabled") >= 0) {
            return false;
        }

        const value = val;
        const name = this.props.name;

        if(this.props.onChange) {
            this.props.onChange(value, name);
        }

        this.setState({
            content: this.findContent(value),
            showOptions: false,
            value
        });
    }

    findContent(name) {
        if(!name) return false;

        let content;
        this.state.dataSource.forEach( ( item, index ) => {
            if(item.value === name) {
                content = item.content;
            }
        } );

        return content;
    }

    _onHandleClick(ev) {
        ev.stopPropagation();

        const targetNode = ev.target;
        if(targetNode !== this.selectTitle) {
            this.setState({
                showOptions: false
            })
        }
    }

    render() {
        const { dataSource, showOptions, disabled } = this.state;
        const className = classnames('_select_title', {
            '_select_disabled': disabled
        });
        const { checkbox } = this.props;
        return (
            <div className="_select">
                <p ref={ (selectTitle) => this.selectTitle = selectTitle } onClick={ this.handleTrigger } className={className}>{this.state.content}</p>
                {
                    showOptions
                    ?
                    <ul className="_select_options_box">
                        {
                            dataSource.map( (opt, index) => {
                                return (
                                    <li key={index} onClick={this.handleSelect.bind(this, opt.value)} className={ opt.disabled ? '_select_disabled' : null }>
                                        {
                                            checkbox
                                            ?
                                            <span></span>
                                            :
                                            null
                                        }
                                        { opt.content }
                                    </li>
                                )
                            } )
                        }
                    </ul>
                    :
                    null
                }
            </div>
        );
    }
}

Select.PropTypes = {
    dataSource: PropTypes.array,
    selected: PropTypes.string,
    multiple: PropTypes.bool,
    placeholder: PropTypes.string
};

export default Select;
export { Select };