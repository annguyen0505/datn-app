import React from "react";
import PropTypes from "prop-types";
import { SimpleSelect } from "react-selectize";
import { connect } from "react-redux";
import { apiGetProduct } from "./../../../apis/shops-management";
const Modal = require("react-bootstrap-modal");

const { Header, Body } = Modal;

class ProductUpdateModal extends React.Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            productName: {
                value: ""
            },
            price: {
                value: ""
            },
            category: {
                value: "",
                label: ""
            },
            images: []
        };
        this.state = {
            ...this.defaultState
        };
    }

    componentDidMount() {
        const { productId } = this.props;
        apiGetProduct({ productId }, (result) => {
            const { product, images } = result.data;
            console.log(product.productName);
            this.setState({
                productName: {
                    value: product.productName
                },
                price: {
                    value: product.price
                },
                category: {
                    value: product.categoryId,
                    label: product.categoryName
                },
                images
            });
        });
    }

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

    handleToggleModal() {
        this.props.handleToggleModal();
    }

    render() {
        const { productName, price, category, images } = this.state;
        const { isOpenUpdateModal } = this.props;
        const { categories } = this.props;
        const categoryOptions = [];
        categories.map((option) => {
            const { categoryName, categoryId } = option;
            categoryOptions.push({
                label: categoryName,
                value: categoryId
            });
        });

        return (
            <div className="col-xs-6">
                <Modal
                    show={isOpenUpdateModal}
                    aria-labelledby="ModalHeader"
                    onHide={this.handleToggleModal.bind(this)}
                    lg={true}
                >   <Header closeButton>
                        <h4 className="text-info">
                            Chỉnh sửa thông tin sản phẩm
                        </h4>
                    </Header>
                    <Body>
                        <div className="">
                            <div className="row">
                                <div className="col-xs-6">
                                    <label htmlFor="productName" >Tên sản phẩm</label>
                                    <input id="productName"
                                        name="productName"
                                        value={productName.value}
                                        onChange={this.handleInputOnChange.bind(this)}
                                        className="form-control" />
                                </div>
                                <div className="col-xs-6">
                                    <label htmlFor="productName" >Giá (VNĐ)</label>
                                    <input id="price" type="number"
                                        name="price"
                                        onChange={this.handleInputOnChange.bind(this)}
                                        value={price.value}
                                        className="form-control" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-6">
                                    <label htmlFor="shopOrShopKeeper">Loại sản phẩm</label>
                                    <SimpleSelect 
                                    options={categoryOptions} 
                                    value={category}
                                    onValueChange={this.handlecategorySelected.bind(this)}
                                     />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-xs-12">
                                    <button className="btn btn-success" >Tải ảnh lên</button>
                                    <input type="file" id="file" style={{ display: "none" }} /><br />
                                </div>
                            </div>
                        </div>

                    </Body>
                </Modal>
            </div>
        );
    }
}

ProductUpdateModal.propTypes = {
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
    const { shopViewReducer } = state;
    const { categories } = shopViewReducer;
    return {
        categories
    };
};


export default connect(mapStateToProps)(ProductUpdateModal);
