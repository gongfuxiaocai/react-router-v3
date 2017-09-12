import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {

    constructor(props) {
        super( props );

        this.state = {
            dataSource: this.props.dataSource || []
        }
    }

    render() {
        return(
            <div className="_tab">

            </div>
        );
    }

}

Tab.PropTypes = {
    dataSource: PropTypes.array
}

export default Tab;
export { Tab };