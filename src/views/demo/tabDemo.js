import React from 'react';
import { Tabs, TabList } from '../../components/index';

const ModalDemo = (props) => (
    <div>
        <Tabs>
            <TabList title="tab1">我是tab1</TabList>
            <TabList title="tab2">我是tab2</TabList>
            <TabList title="tab3">我是tab3</TabList>
            <TabList title="tab4">我是tab4</TabList>
        </Tabs>
    </div>
);

export default ModalDemo;

