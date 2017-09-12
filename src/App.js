import React, { Component } from 'react';
import { Router, hashHistory } from 'react-router';
import routes from './routes/routes';

import './style/views/main.styl';

class App extends Component{
    

    render() {
        return(
            <Router history={ hashHistory } routes={routes} />
        );
    }
}

export default App;
