import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class SubMenu extends Component {

    constructor( props ) {
        super( props );

        this.state = {
            route: this.props.route || []
        };

        this.handleClick = this.handleClick.bind( this );
    }

    handleClick( ev ) {
        const data = {
            link: ev.target.getAttribute("href"),
            text: ev.target.innerText
        };
        this.props.onClick( data );
    }

    render() {
        const { route } = this.state;
        const { title } = this.props;
        return(
            <li onClick={ this.handleClick } className="_menu_submenu">
                <Link className="_menu_submenu_link" activeClassName="_menu_submenu_active" to={ route } >{ title }</Link>
            </li>
        );
    }

}

SubMenu.PropTypes = {
  title: PropTypes.string,
  className: PropTypes.string
};

export default SubMenu;
export { SubMenu };