import React, { Component } from 'react';

class Error404 extends Component{
    componentWillMount() {
        const session = window.sessionStorage;

        session.setItem( "errorPage", true );
    }

    render() {
        return(
            <h1>404</h1>
        );
    }
}

export default Error404;