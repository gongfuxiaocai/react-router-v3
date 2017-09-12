import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class TabLink extends Component{

    handleCloseLink( link ) {
        this.props.onClick( link );
    }

    render() {
        const { dataSource, index } = this.props;
        return(
            <div className="_tab_link_box">
                {
                    index !== 0
                    ?
                        <span className="_tab_link_cancel" onClick={ this.handleCloseLink.bind( this, dataSource.link ) }>×</span>
                    :
                        null
                }
                <Link className="_tab_link" activeClassName="_tab_link_active" to={ dataSource.link }>{ dataSource.text }</Link>
            </div>
        );
    }

}

TabLink.PropTypes = {
    dataSource: PropTypes.object,
    index: PropTypes.number
};

export default TabLink;
export { TabLink };