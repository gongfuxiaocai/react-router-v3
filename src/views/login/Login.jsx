import React, { Component } from 'react';

class Login extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            errorMessage: null
        }

        this.handleSubmit = this.handleSubmit.bind( this );
    }

    handleSubmit() {

    }

    render() {
        return(
            <div>
                <form action="">
                    <input type="text" name="username" />
                    <input type="password" name="password" />
                    <button onClick={ this.handleSubmit }>登录</button>
                </form>
            </div>
        );
    }
};

export default Login;
export { Login };