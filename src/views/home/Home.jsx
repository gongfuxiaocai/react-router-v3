import React, { Component } from 'react';
import { Menu, TabLink } from '../../components/index';
import menuData from '../../dataSource/menuData';

class Home extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            linkArray: []
        };

        this.handleClickMenu = this.handleClickMenu.bind( this );
        this.handleClickTab = this.handleClickTab.bind( this );
    }

    componentDidMount() {
        const session = window.sessionStorage;
        if ( session.linkArray && JSON.parse( session.linkArray ).length !== 0 ) {
            const linkArray = JSON.parse( session.linkArray );
            this.setState( {
                linkArray
            } );
        }

        if ( !session.errorPage ) {
            if ( !session.linkArray || JSON.parse( session.linkArray ).length === 0 ) {
                window.location.hash = '/home/index';
                const linkArray = [ { link: "/home/index", text: "首页" } ];
                this.setState({
                    linkArray
                }, () => {
                    session.setItem( "linkArray", JSON.stringify( linkArray ) );
                } );
            }
        } else if ( session.errorPage === "true" ) {
            session.removeItem( "errorPage" );
        }

    }

    handleClickMenu( data ) {
        const linkArray = this.state.linkArray;
        data.link = data.link.replace( "#", "" );
        const hadLink = linkArray.some( ( item, i ) => item.link === data.link );

        if ( hadLink ) return false;

        if ( linkArray.length === 0 ) {
            linkArray.push( { link: "/home/index", text: "首页" } );
        }

        linkArray.push( data );
        this.setState( {
            linkArray
        }, () => {
            const session = window.sessionStorage;
            session.setItem( "linkArray", JSON.stringify( linkArray ) );
        } );
    }

    handleClickTab( link ) {
        const linkArray = this.state.linkArray;
        linkArray.forEach( ( item, i ) => {
            if ( item.link === link ) {
                linkArray.splice(i, 1);
                return false;
            }
        });

        this.setState( {
            linkArray
        }, () => {
            const session = window.sessionStorage;
            const hash = linkArray[ linkArray.length - 1 ].link;
            session.setItem( "linkArray", JSON.stringify( linkArray ) );
            window.location.hash = "#" + hash;
        } );
    }
   
    render() {
        const { linkArray } = this.state;
        return (
            <div>
                <Menu dataSource={ menuData } onClick={ this.handleClickMenu }/>
                <TabLink dataSource={ linkArray } onClick={ this.handleClickTab } />
                <div className="_content">
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default Home;