import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SubMenu from './SubMenu';

class ItemMenu extends Component {

    constructor( props ) {
        super( props );

        this.state = {
            dataSource: this.props.itemData || [],
            showList: false
        };

        this.handleClick = this.handleClick.bind( this );
        this.subMenuClick = this.subMenuClick.bind( this );
    }

    handleClick(ev) {
        if( ev.target.nodeName.toLowerCase() === 'h3' ){
            this.setState( {
                showList: !this.state.showList
            } );
        }
    };

    subMenuClick( data ) {
        this.props.onClick( data );
    };

    render() {
        const { dataSource, showList } = this.state;
        const { title, className } = this.props;
        return(
            <li onClick={ this.handleClick } className={ className }>
                <h3 data-type="itemMenu" className="_menu_itemList_title">{ title }</h3>
                {
                    showList
                    ?
                        dataSource.length !== 0
                        ?
                        <ul className="_menu_itemmemu">
                            { dataSource.map( ( sub, i ) =>
                                <SubMenu onClick={ this.subMenuClick } key={ i } route={ sub.route } title={ sub.title } component={ sub.component } />
                            ) }
                        </ul>
                        :
                        null
                    :
                    null
                }
            </li>
        );
    }

}

ItemMenu.PropTypes = {
    itemData: PropTypes.array,
    title: PropTypes.string
};

export default ItemMenu;
export { ItemMenu };