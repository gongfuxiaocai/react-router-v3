import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/*
    Tab
*/ 
class Tabs extends Component {

    constructor(props) {
        super( props );

        this.state = {
            dataSource: this.props.children.map( (child) => {
                return {
                    title: child.props.title,
                    content: child.props.children
                }
            } ) || this.props.dataSource || [],
            activeIndex: 0
        }

        this.onTabClick = this.onTabClick.bind( this );
    }

    onTabClick( index ) {
        this.setState( {
            activeIndex: index
        } );
    }

    render() {
        const { dataSource, activeIndex } = this.state;
        return(
            <div className="_tab">
                <div className="_tab_head_box">
                    {
                        dataSource.map((item, index) => {
                            const active = index === activeIndex ? "_tab_active" : ""
                            return <TabHead key={index} index={index} onClick={this.onTabClick} className={active}>{item.title}</TabHead>
                        })
                    }
                </div>
                <div className="_tab_panel_box">
                    {
                        dataSource.map((item, index) => {
                            const show = index === activeIndex ? "_tab_show" : ""
                            return <TabPanel key={index} className={show}>{item.content}</TabPanel>
                        })
                    }
                </div>
            </div>
        );
    }

}

Tabs.PropTypes = {
    dataSource: PropTypes.array
}

/*
    TabHead
*/ 
class TabHead extends Component{
    handleTab( index ) {
        if ( this.props.onClick ) {
            this.props.onClick( index );
        };
    }

    render() {
        const className = classnames( '_tab_head', this.props.className );
        return(
            <div className={ className } onClick={ this.handleTab.bind( this, this.props.index ) }>
                <span>{ this.props.children }</span>    
            </div>
        );
    }
}

TabHead.PropTypes = {
    title: PropTypes.string,
    index: PropTypes.number
}

/*
    TabPannel
*/
const TabPanel = ( props ) => {
    const className = classnames( "_tab_panel", props.className );

    return (
        <div className={ className }>
            { props.children }
        </div>
    );
}

export default Tabs;
export { Tabs };