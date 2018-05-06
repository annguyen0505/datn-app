import React from "react";
import PropTypes from "prop-types";

import gridViewStyle from "./../../../styles/gridview.css";

export class PaginationBar extends React.Component {
    constructor(props) {
        super(props);
    }

    handleItemPerPageChanged() {
        const itemPerPage = parseInt(this.refs.itemPerPage.value, 10);
        this.props.onPaginateChanged(1, itemPerPage);
        this.refs.page.value = 1;
    }

    handlePageChanged(e) {
        let page = parseInt(this.refs.page.value, 10);
        const totalRecords = this.props.totalRecords;
        const totalPages = Math.ceil(totalRecords / this.props.itemPerPage);

        if (e.type === "keyup" && e.keyCode !== 13) {
            return;
        }

        if (isNaN(page)) {
            page = this.props.page;
        }

        if (page < 1) {
            page = 1;
        }

        if (page > totalPages) {
            page = totalPages;
        }

        this.props.onPaginateChanged(page, this.props.itemPerPage);
        this.refs.page.value = page;
    }

    componentDidUpdate() {
        const { page } = this.props;
        this.refs.page.value = page;
    }

    render() {
        let { page } = this.props;
        const { totalRecords, itemPerPage } = this.props;
        const firstPageClassName = (totalRecords === 0 || page === 1) ? gridViewStyle.disabled : "";
        const previousPageClassName = firstPageClassName;
        const totalPages = Math.ceil(totalRecords / itemPerPage);
        const nextPageClassName = (totalRecords === 0 || page === totalPages) ? gridViewStyle.disabled : "";
        const lastPageClassName = nextPageClassName;

        if (totalRecords === 0) {
            page = 0;
        }

        const pageList = this.props.pageList;

        const renderPageOptions = () => {

            return pageList.map((pageItem, id) => {
                return (
                    <option key={id} value={pageItem}>{pageItem}</option>
                );
            });
        };

        return (

            <div className="row">
                <hr />
                <div className="col-md-12">
                    <div className="pull-left">
                        <nav>
                            <ul className={`${gridViewStyle.pagination} clearfix`} style={{ padding: "0" }}>
                                <li title="First Page" className={`${gridViewStyle["pagination ul"]}`}>
                                    <a href="#" className={firstPageClassName} onClick={() => {
                                        this.refs.page.value = 1;
                                        this.props.onPaginateChanged(1, itemPerPage);
                                    }}
                                    >
                                        <span className="glyphicon glyphicon-step-backward"></span>
                                    </a>
                                </li>
                                <li title="Previous Page">
                                    <a href="#" className={previousPageClassName} onClick={() => {
                                        this.refs.page.value = page - 1;
                                        this.props.onPaginateChanged(page - 1, itemPerPage);
                                    }}
                                    >
                                        <span className="glyphicon glyphicon-backward"></span>
                                    </a>
                                </li>
                                <li>
                                    <div className="clearfix">
                                        Page <input className={gridViewStyle["txt-page-number"]} type="text" ref="page" id="txt-page-number" defaultValue={1} onBlur={this.handlePageChanged.bind(this)} onKeyUp={this.handlePageChanged.bind(this)} /> of {totalPages}
                                    </div>
                                </li>
                                <li title="Next Page">
                                    <a href="#" className={nextPageClassName} onClick={() => {
                                        this.refs.page.value = page + 1;
                                        this.props.onPaginateChanged(page + 1, itemPerPage);
                                    }}
                                    >
                                        <span className="glyphicon glyphicon-forward"></span>
                                    </a>
                                </li>
                                <li title="Last Page">
                                    <a href="#" className={lastPageClassName} onClick={() => {
                                        this.refs.page.value = totalPages;
                                        this.props.onPaginateChanged(totalPages, itemPerPage);
                                    }}
                                    >
                                        <span className="glyphicon glyphicon-step-forward"></span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div style={{ position: "absolute", left: "50%", zIndex: "1" }}>
                        <span>{totalRecords} record(s) found</span>
                    </div>
                    <div className="pull-right">
                        <nav>
                            <ul className={`${gridViewStyle["page-options"]} ${gridViewStyle["pull-right"]} clearfix`}>
                                <li><span>Show</span></li>
                                <li>
                                    <select value={itemPerPage} ref="itemPerPage" onChange={this.handleItemPerPageChanged.bind(this)}>
                                        {renderPageOptions()}
                                    </select>
                                </li>
                                <li>
                                    <span>items/page.</span>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div >
        );
    }
}

PaginationBar.defaultProps = {
    pageList: [1, 25, 50, 100, 250, 500, 1000]
};

PaginationBar.propTypes = {
    totalRecords: PropTypes.number,
    page: PropTypes.number,
    itemPerPage: PropTypes.number,
    onPaginateChanged: PropTypes.func,
    pageList: PropTypes.array
};

export default PaginationBar;
