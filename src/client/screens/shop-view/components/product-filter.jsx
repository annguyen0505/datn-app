import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { SimpleSelect } from "react-selectize";
import { getShopCategories } from "./../actions";
import { searchProducts } from "./../actions";


class ProductFilter extends React.Component {
    constructor(props) {
        super(props);
        this.defaultState = { ...this.props.criteria };
        this.state = {
            ...this.props.criteria
        };
    }

    componentDidMount() {
        const { dispatch, shopId } = this.props;
        dispatch(getShopCategories(shopId));
    }

    handleInputOnChange(e) {
        e.preventDefault();
        const property = e.target.name;
        const value = e.target.value;
        this.setState({
            [property]: value
        });
    }

    handlecategorySelected(value) {
        this.setState({
            category: value
        });
    }

    handleBtnSearchClick(e) {
        e.preventDefault();
        const { criteria, dispatch } = this.props;
        const { atPrice, productName, category, priceDirection } = this.state;

        const newCriteria = {
            ...criteria,
            atPrice,
            productName,
            category,
            priceDirection
        };
        dispatch(searchProducts(newCriteria));
    }

    render() {
        const { categories } = this.props;
        const { atPrice, productName, category } = this.state;
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
            <div className="col-xs-12">
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
                    <div className="input-group inline1">
                        <label htmlFor="atPrice" style={{ width: "67%" }}>Giá     
                        </label>
                        <input type="number" name="atPrice" className="form-control" id="atPrice" value={atPrice} onChange={(e) => { this.handleInputOnChange(e); }} />
                        <div className="inline1" style={{ display: "inline-block", margin: "0 5px", }}>
                            <label>
                                <input type="radio" name="priceDirection" id="higherPrice" value={1} onChange={(e) => { this.handleInputOnChange(e); }} checked />
                                Trên
                            </label>
                            <label>
                                <input type="radio" name="priceDirection" id="lowerPrice" value={0} onChange={(e) => { this.handleInputOnChange(e); }} />
                                Dưới
                           </label>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <label className="invisible">hidden text</label>
                    <div className="row">
                        <div className="col-md-6">
                            <button type="button" className="col-md-12 btn btn-success" onClick={(e) => { this.handleBtnSearchClick(e); }}>Tìm kiếm</button>
                        </div>
                        <div className="col-md-6">
                            <button type="button" className=" col-md-12 btn btn-default col-md-12">Trở về</button>
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
    const { shopViewReducer } = state;
    const { criteria, categories } = shopViewReducer;
    return {
        criteria,
        categories
    };
};


export default connect(mapStateToProps)(ProductFilter);
