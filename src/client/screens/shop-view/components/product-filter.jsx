import React from "react";
import PropTypes from "prop-types";
import { SimpleSelect } from "react-selectize";
import { connect } from "react-redux";
import { getShopCategories } from "./../actions";

class ProductFilter extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        const { dispatch, shopId } = this.props;
        dispatch(getShopCategories(shopId));
    }
    render() {
        const { categories } = this.props;
        const categoryOptions = categories.map((category) => {
            const { categoryName, categoryId } = category;
            return {
                label: categoryName,
                value: categoryId
            };
        });
        return (
            <div className="row">
                <div className="col-md-3">
                    <div className="input-group">
                        <label htmlFor="shopOrShopKeeper">Tên sản phẩm: </label>
                        <input type="text" className="form-control" id="shopOrShopKeeper" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="input-group ">
                        <label htmlFor="shopOrShopKeeper">Loại sản phẩm</label>
                        <SimpleSelect options={categoryOptions} theme="bootstrap3" placeholder="Chon" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="input-group">
                        <label htmlFor="shopOrShopKeeper">Giá:</label>
                        <input type="text" className="form-control" id="shopOrShopKeeper" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="radio">
                        <label>
                            <input type="radio" name="higherRadio" id="higherRadio" value="option1" />
                            Trên
                    </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" name="lowerRadio" id="lowerRadio" value="option2" />
                            Dưới
                   </label>
                    </div>
                </div>
            </div>
        );
    }

}

ProductFilter.propTypes = {
    dispatch: PropTypes.func,
    searchCriteria: PropTypes.object,
    shopId: PropTypes.string,
    categories: PropTypes.array
};

const mapStateToProps = (state) => {
    const { shopViewReducer } = state;
    const { searchCriteria, categories } = shopViewReducer;
    return {
        searchCriteria,
        categories
    };
};


export default connect(mapStateToProps)(ProductFilter);