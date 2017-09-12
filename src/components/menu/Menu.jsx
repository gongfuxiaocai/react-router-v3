import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemMenu from './ItemMenu';

class Menu extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            dataSource: this.props.dataSource || []
        };

        this.itemMenuClick = this.itemMenuClick.bind( this );
    };

    itemMenuClick( data ) {
        this.props.onClick( data );
    };

    render() {
        const { dataSource } = this.state;
        return (
            <ul className="_menu">
                {
                    dataSource.map( ( item, i ) =>
                       <ItemMenu key={ i } onClick={ this.itemMenuClick } itemData={ item.routes ? item.routes : [] } title={ item.title } />
                     )
                }
            </ul>
        );
    }
}

Menu.propTypes = {
  dataSource: PropTypes.array
};

export default Menu;
export { Menu };
