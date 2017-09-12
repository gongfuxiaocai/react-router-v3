import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ModalFooter extends Component {
    constructor( props ) {
        super( props );

        this.handleCancel = this.handleCancel.bind( this );
        this.handleEnsure = this.handleEnsure.bind( this );
    }

    handleEnsure() {
        this.props._onEnsure();
    }

    handleCancel() {
        this.props._onCancel();
    }

    render() {
        const { _footer } = this.props;
        const defaultFooter = [
            <button key="ensure" className="_modal_footer_ensure" onClick={ this.handleEnsure }>确定</button>,
            <button key="cancel" className="_modal_footer_cancel" onClick={ this.handleCancel }>取消</button>
        ];
        return(
            <div className="_modal_footer">
                {
                    _footer
                    ?
                    _footer
                    :
                    defaultFooter
                }
            </div>
        );
    }
}

ModalFooter.PropTypes = {
    _footer: PropTypes.object
};

export default ModalFooter;
export { ModalFooter };