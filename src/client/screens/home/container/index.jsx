import React from "react";
import PropTypes from "prop-types";
import Guid from "guid";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import { getShops, getCategories, getInitialState } from "./../actions/index";
import ReactSelectize from "react-selectize";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, searchCriteria } = this.props;
        dispatch(getInitialState(searchCriteria));
    }

    handlePageChange(pageNumber) {
        const { searchCriteria, dispatch } = this.props;
        searchCriteria.pageNumber = pageNumber;
        dispatch(getShops(searchCriteria));
    }
    render() {
        const { shops } = this.props;
        const { SimpleSelect } = ReactSelectize;
        const { searchCriteria, categories } = this.props;
        const categoryOptions = categories.map((category) => {
            const { categoryName, categoryId } = category;
            return {
                label: categoryName,
                value: categoryId
            };
        });
        const renderCollections = () => {
            if (Array.isArray(shops)) {
                return shops.map((collection) => {
                    return (
                        <div key={`shops-${Guid.raw()}`} className="col-xs-4 col-md-2">
                            <div className="thumbnail" >
                                <img src={collection.imgUrl} alt="" className="circle" />
                                <div className="caption">
                                    <h3><b>Cửa hàng: </b> {collection.shopName}</h3>
                                    <p><b>Cung cấp:</b> {collection.categories}</p>
                                    <p><a href="#" className="btn btn-primary" role="button">Xem</a></p>
                                </div>
                            </div>
                        </div>
                    );
                });
            }
            return null;
        };

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <div className="input-group">
                            <label htmlFor="shopOrShopKeeper">Tên cửa hàng/chủ/sản phẩm: </label>
                            <input type="text" className="form-control" id="shopOrShopKeeper" />
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="input-group ">
                            <label htmlFor="shopOrShopKeeper">Loại sản phẩm</label>
                            <SimpleSelect options={categoryOptions} theme="bootstrap3" placeholder="Chon" />
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <label className="invisible">hidden text</label>
                        <div className="row">
                            <div className="col-md-6">
                                <button type="button" className="col-md-12 btn btn-success  ">Tìm kiếm</button>
                            </div>
                            <div className="col-md-6">
                                <button type="button" className=" col-md-12 btn btn-default col-md-12">Trở về</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    {renderCollections()}
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-8">
                        <Pagination
                            activePage={searchCriteria.pageNumber}
                            itemsCountPerPage={2}
                            totalItemsCount={searchCriteria.totalRecords}
                            pageRangeDisplayed={10}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>

                </div>
            </div >

        );
    }

}

Home.propTypes = {
    shops: PropTypes.array,
    totalRecords: PropTypes.number,
    handlePageChange: PropTypes.func
};

const mapStateToProps = (state) => {
    const { homeReducer } = state;
    const { shops, totalRecords, searchCriteria, categories } = homeReducer;
    return {
        shops,
        totalRecords,
        searchCriteria,
        categories
    };
};

export default connect(mapStateToProps)(Home);
