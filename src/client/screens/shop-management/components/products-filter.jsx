import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { SimpleSelect } from "react-selectize";
import { getShopCategories } from "./../../shop-view/actions";
import { getShopProducts } from "./../actions/product-actions";

class ProductFilter extends React.Component {
    constructor(props) {
        super(props);
        this.defaultState = { ...this.props.criteria };
        this.state = {
            ...this.defaultState
        };
    }

    componentDidMount() {
        const { dispatch, shopId } = this.props;
        this.defaultState.shopId = shopId;
        dispatch(getShopCategories(shopId));
    }
    /*eslint-disable */

    handleInputOnChange(e) {
        const property = e.target.name;
        const value = e.target.value;
        this.setState({ [property]: value });
    }

    handlecategorySelected(value) {
        this.setState({
            category: value
        });
    }

    handleBtnSearchClick(e) {
        const { criteria, dispatch } = this.props;
        const newCriteria = {
            ...criteria,
            ...this.state,
            pageNumber: 1
        }
        dispatch(getShopProducts(newCriteria));
    }

    handleBtnResetClick(e) {
        e.preventDefault();
        // this.state = { ...this.defaultState };
        this.setState({...this.defaultState});
        const { dispatch } = this.props;
        dispatch(getShopProducts({ ...this.defaultState }));

    }

    render() {
        const { categories } = this.props;
        const { atPrice, productName, category, priceDirection } = this.state;
        const categoryOptions = [{
            label: "Tất cả",
            value: ""
        }];
        categories.map((option) => {
            const { categoryName, categoryId } = option;
            categoryOptions.push({
                label: categoryName,
                value: categoryId
            });
        });
        return (
            <div className="row">
                <div className="col-md-3">
                    <div className="input-group">
                        <label htmlFor="shopOrShopKeeper">Tên sản phẩm</label>
                        <input type="text" name="productName" className="form-control" id="shopOrShopKeeper" value={productName} onChange={(e) => { this.handleInputOnChange(e); }} />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="input-group ">
                        <label htmlFor="shopOrShopKeeper">Loại sản phẩm</label>
                        <SimpleSelect options={categoryOptions} theme="bootstrap3" value={category} onValueChange={this.handlecategorySelected.bind(this)} />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="input-group">
                        <label htmlFor="atPrice">Giá
                        </label>
                        <input type="number" name="atPrice" className="form-control" id="atPrice" value={atPrice} onChange={(e) => { this.handleInputOnChange(e); }} />
                        <div>
                            <label>
                                <input type="radio" name="priceDirection" id="higherPrice"
                                    value={1} onChange={(e) => { this.handleInputOnChange(e); }}
                                    checked={!!parseInt(priceDirection)} />
                                Trên
                            </label>
                            <label>
                                <input type="radio" name="priceDirection" id="lowerPrice"
                                    value={0} onChange={(e) => { this.handleInputOnChange(e); }}
                                    checked={!parseInt(priceDirection)} />
                                Dưới
                           </label>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <label className="invisible">hidden text</label>
                    <div className="row">
                        <div className="col-md-6">
                            <button type="button" className="col-md-12 btn btn-success"
                                onClick={(e) => { this.handleBtnSearchClick(e); }}>Tìm kiếm</button>
                        </div>
                        <div className="col-md-6">
                            <button type="button" className=" col-md-12 btn btn-default col-md-12"
                                onClick={(e) => { this.handleBtnResetClick(e); }}>Trở về</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

ProductFilter.propTypes = {
    dispatch: PropTypes.func,
    criteria: PropTypes.object,
    shopId: PropTypes.string,
    categories: PropTypes.array
};

const mapStateToProps = (state) => {
    const { shopViewReducer, productReducer } = state;
    const { categories } = shopViewReducer;
    const { criteria } = productReducer;
    return {
        categories,
        criteria
    };
};


export default connect(mapStateToProps)(ProductFilter);
