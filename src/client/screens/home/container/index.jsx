import React from "react";
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import { getShops, getInitialState } from "./../actions/index";
import ReactSelectize from "react-selectize";
import { Link } from "react-router";

const uuidv1 = require("uuid/v1");


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
        const rendershops = () => {
            if (Array.isArray(shops)) {
                return shops.map((shop) => {

                    return (
                        <div key={`shops-${uuidv1()}`} className="col-xs-12">
                            <div className="" >
                                <div className="col-xs-6">
                                    <img src={shop.imgUrl} style={{ maxWidth: "300px", height: "auto" }} alt="" className="img-responsive" />
                                </div>
                                <div className="col-xs-6">
                                    <div className="caption">
                                        <h3>Cửa hàng: {shop.shopName}</h3>
                                        <p><b>Cung cấp:</b> {shop.categories}</p>
                                        <p><b>Khu vực kinh doanh:</b> {shop.businessLocations}</p>
                                        <button className="btn btn-info" >
                                            <Link >Xem</Link>
                                        </button>
                                    </div>
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
                    {rendershops()}
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
    handlePageChange: PropTypes.func,
    categories: PropTypes.array,
    dispatch: PropTypes.func,
    searchCriteria: PropTypes.object
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
