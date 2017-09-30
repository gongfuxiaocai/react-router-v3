import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '../form/Select';

import '../../style/components/table/pagination.styl';

class Pagination extends Component {
    constructor( props ) {

        super(props);

        this.state = {
            total: this.props.total,
            pageSize: this.props.pageSize,
            currentPage: this.props.currentPage,
            showJump: this.props.showJump,
            showSize: this.props.showSize,
            sizeOptions: this.props.sizeOptions.map((item, index) => {
                return { value: item, content: item }
            }),
            pageValue: 1
        };

        this._prevPage = this._prevPage.bind(this);
        this._nextPage = this._nextPage.bind(this);
        this._handleChangeFirstPage = this._handleChangeFirstPage.bind(this);
        this._handleChangeLastPage = this._handleChangeLastPage.bind(this);
        this._handleChangePageValue = this._handleChangePageValue.bind(this);
        this._handleClickPageJump = this._handleClickPageJump.bind(this);
    }
    /*
    * 上一页
    * */
    _prevPage() {
        const {currentPage, pageSize} = this.state;

        if( currentPage === 1 ) {
            return false;
        }

        this.setState({
            currentPage: currentPage - 1
        });

        if(this.props.onChange) {
            this.props.onChange(currentPage - 1, pageSize)
        }
    }

    /*
    * 下一页
    * */
    _nextPage() {
        const {currentPage, pageSize} = this.state;
        const pageNum = this.getPageNum();

        if( currentPage === pageNum ) {
            return false;
        }

        this.setState({
            currentPage: currentPage + 1
        });

        if(this.props.onChange) {
            this.props.onChange(currentPage + 1, pageSize)
        }
    }

    /*
    * 点击改变页码
    * */
    _handleChangePage(index) {
        this.changePageCommonFun(index);
    }

    /*
    * 第一页
    * */
    _handleChangeFirstPage() {
        this.changePageCommonFun(1);
    }

    /*
    * 最后一页
    * */
    _handleChangeLastPage() {
        this.changePageCommonFun(this.getPageNum());
    }

    /*
    * 动态改变需要跳转页码的值
    * */
    _handleChangePageValue(ev) {
        const value = ev.currentTarget.value;

        this.setState({
            pageValue: value
        })
    }

    /*
    * 改变公用函数页码的
    * */
    changePageCommonFun(index){
        const {pageSize} = this.state;

        if(this.props.onChange) {
            this.props.onChange(index, pageSize);
        }

        this.setState({
            currentPage: index
        });
    }

    /*
    * 跳转指定页
    * */
    _handleClickPageJump() {
        const { pageSize, pageValue } = this.state;
        const pageNum = this.getPageNum();
        const value = parseInt(pageValue);

        if( value < 1 || isNaN(value) || value > pageNum ) {
            return false;
        }

        this.setState({
            currentPage: value
        });

        if( this.props.onChange ) {
            this.props.onChange( pageValue, pageSize );
        }
    }

    /*
    * 改变size重新渲染pagination
    * */
    _handleChangePageSize(value, name) {
        console.log( value, name );

        this.setState({
            pageSize: parseInt(value),
            currentPage: 1
        })
    }

    /*
    * 获取总页
    * */
    getPageNum() {
        const { total, pageSize } = this.state;

        return Math.ceil( total / pageSize );
    }

    /*
    * 生成页码
    * */
    getPages() {
        const pageNum = this.getPageNum();
        const { currentPage } = this.state;
        let left = Math.max(1, currentPage - 2);
        let right = Math.min( currentPage + 2, pageNum);
        const pagerList = [];

        if (currentPage - 1 <= 2) {
            right = 1 + 4;
        }

        if (pageNum - currentPage <= 2) {
            left = pageNum - 4;
        }

        for( let i = left; i <= right; i++ ) {
            const className = `_pagination_page ${i === currentPage ? '_pagination_page_active' : ''}`;
            pagerList.push(
                <li onClick={this._handleChangePage.bind(this, i)} className={ className } key={ i } >
                    { i }
                </li>
            );
        }

        if (currentPage - 1 >= 4) {
            pagerList.unshift(
                <li className="_pagination_ellipsis" key="prev..."  >
                    ...
                </li>
            );
        }
        if (pageNum - currentPage >= 4) {
            pagerList.push(
                <li className="_pagination_ellipsis" key="next..."  >
                    ...
                </li>
            );
        }

        if (left !== 1) {
            pagerList.unshift(
                <li onClick={this._handleChangeFirstPage} className="_pagination_page"  key={ 1 } >
                    1
                </li>
            );
        }
        if (right !== pageNum) {
            pagerList.push(
                <li onClick={this._handleChangeLastPage} className="_pagination_page"  key={ pageNum } >
                    { pageNum }
                </li>
            );
        }

        return pagerList;
    }

    render(){
        const pageNum = this.getPageNum();
        const { currentPage, showJump, showSize, sizeOptions } = this.state;

        return(
            <ul className="_pagination">
                <li onClick={this._prevPage} className={ `_pagination_prev ${ currentPage !== 1 ? '_pagination_has_prev' : '' }` }>
                    {`<`}
                </li>
                {
                    this.getPages()
                }
                <li onClick={this._nextPage} className={`_pagination_next ${ currentPage !== pageNum ? '_pagination_has_next' : '' }`}>
                    {`>`}
                </li>
                {
                    showJump
                    ?
                    <li className="_pagination_jump">
                        <span className="_pagination_jump_label">跳至</span>
                        <input type="text" className="_pagination_jump_value" onChange={this._handleChangePageValue} value={ this.state.pageValue }/>
                        <span className="_pagination_jump_content">页</span>
                        <button type="button" className="_pagination_jump_button" onClick={ this._handleClickPageJump }>确定</button>
                    </li>
                    :
                    null
                }
                {
                    showSize
                    ?
                    <li className="_pagination_pageSize">
                        <Select dataSource={ sizeOptions } onChange={this._handleChangePageSize.bind(this)} selected={sizeOptions[0].value} className="_pagination_select" />
                    </li>
                    :
                    null
                }
            </ul>
        );
    }

}

Pagination.PropTypes = {
    total: PropTypes.number,
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
    showJump: PropTypes.bool,
    sizeOptions: PropTypes.array,
};

Pagination.defaultProps = {
    total: 0,
    pageSize: 10,
    currentPage: 1,
    showJump: false,
    sizeOptions: [10, 20, 30, 50]
};

export default Pagination;
export { Pagination }