import React from 'react';
import { Menu, TabLink } from '../../components/index';
import menuData from '../../dataSource/menuData';

const Home = ( props ) => {
    return(
        <div>
            <Menu dataSource={ menuData }/>
            <div>
                { props.children }
            </div>
        </div>
    );
}

export default Home;