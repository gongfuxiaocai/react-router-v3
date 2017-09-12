import React, { Component } from 'react';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import PropTypes from 'prop-types';

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleClose = this.handleClose.bind(this);
        this.handleEnsure = this.handleEnsure.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleClose() {
        this.modal.parentNode.removeChild(this.modal);
    }

    handleEnsure() {
        this.props.onEnsure ? this.props.onEnsure( this ) : null;
    }

    handleCancel() {
        this.props.onCancel ? this.props.onCancel( this ) : null;
    }

    render() {
        const { size, width, hasHeader, header, children, hasFooter, footer } = this.props;
        return ( 
            <div className="_modal" ref = { (div) => this.modal = div } >
                <div className={ `_modal_content _modal_content_${size}` } style={ { width: width } } >
                    <i className = "_modal_close" onClick = { this.handleClose } >×</i> 
                    { 
                        hasHeader 
                        ?
                        <ModalHeader _header = { header } />
                        :
                        null
                    } 
                    
                    <div className = "_modal_body" >
                        { children }
                    </div>

                    {
                        hasFooter
                        ?
                            <ModalFooter _onEnsure={this.handleEnsure} _onCancel={this.handleCancel } footer={ footer } />
                        :
                        null
                    }
                </div> 
            </div>
    );
}
}

Modal.PropTypes = {
    hasHeader: PropTypes.bool,
    header: PropTypes.object,
    hasFooter: PropTypes.bool,
    footer: PropTypes.object,
    iconName: PropTypes.string,
    size: PropTypes.string,
    width: PropTypes.string
};

Modal.defaultProps = {
    hasHeader: true,
    hasFooter: true,
    hasEnsure: true,
    hasCancel: true,
    size: "small"
};

export default Modal;
export { Modal };