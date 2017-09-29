import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class TabLink extends Component{

    handleCloseLink( link ) {
        this.props.onClick( link );
    }

    render() {
        const { dataSource } = this.props;
        return(
            <div className="_tab_link">
                {
                    dataSource.map( ( item, index ) => {
                        return(
                            <div className="_tab_link_box">
                                {
                                    index !== 0
                                        ?
                                        <span key={`span${index}`} className="_tab_link_cancel" onClick={ this.handleCloseLink.bind( this, item.link ) }>×</span>
                                        :
                                        null
                                }
                                <Link key={`link${index}`} className="_tab_link_list" activeClassName="_tab_link_active" to={ item.link }>{ item.text }</Link>
                            </div>
                        )
                    } )
                }
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