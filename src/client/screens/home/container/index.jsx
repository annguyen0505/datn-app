import React from "react";
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import { getShops, getInitialState, loadMoreShops } from "./../actions/index";
import ReactSelectize from "react-selectize";
import { Link } from "react-router";
import $ from "jquery";
const uuidv1 = require("uuid/v1");


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            searchName: "",
            category: {
                label: ""
            },
            province: {
                label: ""
            }
        };
        this.state = {
            ...this.defaultState
        };
    }
    navidateTo(path) {
        const { router } = this.props;
        router.push(path);
    }

    componentDidMount() {
        const { dispatch, criteria } = this.props;
        window.addEventListener("scroll", this.handleScroll.bind(this));
        dispatch(getInitialState(criteria));
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll.bind(this));
    }

    handleScroll(event) {
        const { hasMoreItems } = this.props;
        if ($(window).scrollTop() + $(window).height() === $(document).height() && hasMoreItems) {
            const { dispatch, criteria } = this.props;
            criteria.pageNumber = ++criteria.pageNumber;
            dispatch(getShops(criteria));
        }
    }

    componentWillReceiveProps(nextProps) {
        const { needReload, criteria, dispatch } = nextProps;
        if (needReload) {
            dispatch(getShops(criteria));
        }
    }

    handleLoadMore(page) {
        console.log(page);
        const { dispatch } = this.props;
        dispatch(loadMoreShops(page));
    }

    handleInputChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleCategorySelect(value) {
        this.setState({
            category: value
        });
    }

    handleProvinceSelect(value) {
        this.setState({
            province: value
        });
    }

    handleBtnSearchClick() {
        const { criteria, dispatch } = this.props;
        const { searchName, category, province } = this.state;
        criteria.pageNumber = 1;
        criteria.searchName = searchName;
        criteria.category = category.value;
        criteria.province = province.value;
        dispatch(getShops(criteria, true));
    }

    handleBtnResetClick() {
        const { criteria, dispatch } = this.props;
        const { searchName, category, province } = this.defaultState;
        this.setState({
            ...this.defaultState
        });
        criteria.pageNumber = 1;
        criteria.searchName = searchName;
        criteria.category = category.value;
        criteria.province = province.value;
        dispatch(getShops({ ...criteria }, true));
    }

    render() {
        const { shops } = this.props;
        const { SimpleSelect } = ReactSelectize;
        const { criteria, categories, provinces, hasMoreItems } = this.props;
        const categoryOptions = categories.map((category) => {
            const { categoryName, categoryId } = category;
            return {
                label: categoryName,
                value: categoryId
            };
        });

        const provinceOptions = provinces.map((prv) => {
            const { provinceId, province } = prv;
            return {
                label: province,
                value: provinceId
            };
        });

        const { searchName, category, province } = this.state;
        const loader = <div key={"loader-shop"} className="loader">Loading ...</div>;

        const rendershops = () => {
            if (Array.isArray(shops)) {
                return shops.map((shop) => {
                    const toPath = `shops/${shop.shopId}`;
                    return (
                        <div key={`shops-${uuidv1()}`} className="col-xs-6"
                            style={
                                {
                                    height: "250px",
                                    maxHeight: "250px",
                                    marginBottom: "1em"
                                }}>
                            <div style={
                                {
                                    border: "1px solid #39c13057",
                                    borderRadius: "1em",
                                    borderWidth: "1px",
                                    maxWidth: "inherit",
                                    padding: "3em",
                                    height: "250px",
                                    maxHeight: "250px",
                                    marginBottom: "1em",
                                    overflow: "hidden",
                                    backgroundColor: "#f0f8ff"
                                }} >
                                <div className="col-xs-6">
                                    <img src={shop.imgUrl} style={{ maxWidth: "95%", maxHeight: "230px", height: "auto", margin: "2px 2px" }} alt="" className="img-thumbnail" />
                                </div>
                                <div className="col-xs-6" style={{ height: "200px" }}>
                                    <div className="caption">
                                        <h3>Cửa hàng: {shop.shopName}</h3>
                                        <p><b>Cung cấp:</b> {shop.categories}</p>
                                        <p><b>Khu vực kinh doanh:</b> {shop.businessLocations}</p>
                                        <button onClick={(e) => { this.navidateTo(toPath); }}
                                            className="btn btn-success btn-sm" style={{ position: "absolute", bottom: "0", width: "40%", backgroundColor: "#28d6285c" }}>
                                            <a to={`shops/${shop.shopId}`} style={{ color: "white" }}>Xem</a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div >
                    );
                });
            }
            return null;
        };

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="input-group">
                            <label htmlFor="searchName">Thông tin cửa hàng </label>
                            <input type="text"
                                className="form-control"
                                id="searchName"
                                name="searchName"
                                value={searchName}
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="col-md-3 ">
                        <div className="input-group ">
                            <label htmlFor="shopOrShopKeeper">Loại sản phẩm</label>
                            <SimpleSelect options={categoryOptions}
                                value={category}
                                onValueChange={this.handleCategorySelect.bind(this)}
                                theme="bootstrap3" placeholder="Chon" />
                        </div>
                    </div>
                    <div className="col-md-3 ">
                        <div className="input-group ">
                            <label htmlFor="shopOrShopKeeper">Khu vực cung cấp </label>
                            <SimpleSelect
                                options={provinceOptions}
                                value={province}
                                onValueChange={this.handleProvinceSelect.bind(this)}
                                theme="bootstrap3" placeholder="Chon" />
                        </div>
                    </div>
                    <div className="col-md-3 ">
                        <label className="invisible">hidden text</label>
                        <div className="row">
                            <div className="col-md-6">
                                <button type="button"
                                    className="col-md-12 btn btn-success "
                                    onClick={this.handleBtnSearchClick.bind(this)}
                                >Tìm kiếm</button>
                            </div>
                            <div className="col-md-6">
                                <button type="button"
                                    onClick={this.handleBtnResetClick.bind(this)}
                                    className=" col-md-12 btn btn-default col-md-12">Trở về</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    {rendershops()}
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
    criteria: PropTypes.object
};

const mapStateToProps = (state) => {
    const { homeReducer } = state;
    const { shops, totalRecords, criteria, categories, provinces, needReload,
        hasMoreItems } = homeReducer;
    return {
        shops,
        totalRecords,
        criteria,
        categories,
        provinces,
        needReload,
        hasMoreItems
    };
};

export default connect(mapStateToProps)(Home);
