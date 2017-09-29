import React, { Component } from 'react';
import { Select, Option } from '../../components/index';

class SelectDemo extends Component{
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [
                {value: "select1", content: "我是select1"},
                {value: "select2", content: "我是select2"},
                {value: "select3", content: "我是select3"},
                {value: "select4", content: "我是select4"},
                {value: "select5", content: "我是select5"},
                {value: "select6", content: "我是select6"},
                {value: "select7", content: "我是select7"},
                {value: "select8", content: "我是select8"},
                {value: "select9", content: "我是select9"},
                {value: "select10", content: "我是select10"},
                {value: "select11", content: "我是select11"},
            ]
        };

        this.handleChange = this.handleChange.bind( this );
    }

    handleChange(value, name) {
        console.log(value, name)
    }

    render() {
        const {dataSource} = this.state;
        return(
            <div className="abc">
                <Select name="select" placeholder="请选择。。。" selected="select1" onChange={ this.handleChange } dataSource={ dataSource }></Select>
            </div>
        );
    }
}

export default SelectDemo;

