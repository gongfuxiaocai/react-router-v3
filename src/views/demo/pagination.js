import React, { Component } from 'react';
import { Pagination } from '../../components/index';

class PaginationDemo extends Component{
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind( this );
    }

    handleChange(index, pageSize) {
        console.log(index, pageSize)
    }

    render() {
        return(
            <div className="abc">
                <Pagination currentPage={ 1 } pageSize={ 10 } total={ 500 } onChange={ this.handleChange } showJump={true} showSize={true} />
            </div>
        );
    }
}

export default PaginationDemo;

