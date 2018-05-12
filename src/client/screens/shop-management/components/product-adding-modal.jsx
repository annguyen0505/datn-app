import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SimpleSelect } from "react-selectize";
import { getShopCategories } from "./../../shop-view/actions";
import { uploadImage, deleteImage } from "./../../../helpers/firebase-helper";
import { showWarning } from "./../../root-component/actions/notification";
import { addProduct } from "./../actions/product-actions";
import { isEmptyInput } from "./../../../helpers/validation-helper";
const Modal = require("react-bootstrap-modal");
const { Header, Title, Body, Footer } = Modal;

class ProductAddingModal extends React.Component {
    constructor(props) {
        super(props);
        this.files = [];
        this.imageUrls = [];
        this.storageRefs = [];
        this.defaultState = {
            images: [],
            fileNames: [],
            category: {
                value: "",
                label: "Chọn"
            },
            productName: "",
            price: "",
            producNameMessage: "",
            priceMessage: "",
            categoryMessage: "",
            imageMessge: ""
        };
        this.state = {
            ...this.defaultState
        };
    }
    componentDidMount() {
        const { dispatch, shopId } = this.props;
        dispatch(getShopCategories(shopId));
    }

    handlecategorySelected(value) {
        this.setState({
            category: value
        });

        this.validateCategory();
    }

    validateCategory() {
        const {category} = this.state;
        const categoryMessage = isEmptyInput(category.value) ? "Chọn loại mặt hàng" : "";
        this.setState({
            categoryMessage
        });
        return categoryMessage;
    }

    resetModal() {
        this.setState({
            ...this.defaultState
        });
    }

    handleRemoveImage(index) {
        const { images, fileNames } = this.state;

        deleteImage(this.storageRefs[index], () => {

        });

        const newImages = [];
        const newFileNames = [];
        for (let i = 0; i < images.length; i++) {
            if (i !== index) {
                newImages.push(images[i]);
                newFileNames.push(fileNames[i]);
            }
        }

        this.setState({
            images: newImages,
            fileNames: newFileNames
        });

    }

    handleChangeImage(e) {
        const file = e.target.files[0];
        const { images, fileNames } = this.state;
        const reader = new FileReader();
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            reader.addEventListener("load", (e) => {
                this.files.push(file);
                const imgAsUrl = e.target.result;
                const newImages = [...images, imgAsUrl];
                const newFileNames = [...fileNames, file.name];
                uploadImage(file, (snapshot) => {
                    const { downloadURL, ref } = snapshot;
                    const storageRef = ref.location.path;
                    this.imageUrls.push(downloadURL);
                    this.storageRefs.push(storageRef);
                });

                this.setState({
                    images: newImages,
                    fileNames: newFileNames
                });
            });
        }
        reader.readAsDataURL(file);
    }

    validateProductName() {
        const { productName } = this.state;
        const producNameMessage = isEmptyInput(productName) ? "Nhập tên sản phẩm" : "";
        // const priceMessage = price !== null &&
        this.setState({
            producNameMessage
        });
        return producNameMessage;
    }

    validatePrice() {
        const { price } = this.state;
        const priceMessage = isEmptyInput(price) ? "Nhập giá sản phẩm" : "";
        // const priceMessage = price !== null &&
        this.setState({
            priceMessage
        });
        return priceMessage;
    }

    validateForm() {
        const producNameMessage = this.validateProductName();

        const priceMessage = this.validatePrice();

        const categoryMessage = this.validateCategory();

        return (producNameMessage.length === 0 && priceMessage.length === 0 && categoryMessage.length === 0);
    }

    handleLabelClick(e) {
        const fileInput = document.getElementById("file");
        const { images } = this.state;
        if (images.length === 3) {
            const { dispatch } = this.props;
            dispatch(showWarning("Chỉ được tải lên tối đa 3 hình ảnh"));
        } else {
            fileInput.click();
        }
    }

    handleInputOnChange(e) {
        const property = e.target.name;
        const value = e.target.value;
        this.setState({ [property]: value });
    }

    handleToggleModal() {
        const { handleToggleModal } = this.props;

        Promise.all(this.storageRefs.map((ref)=>{
            deleteImage(ref);
        })).then(() => {
            console.log("delete success");
            this.resetModal();
            handleToggleModal();
        });

    }

    handleBtnAddClick() {
        if (this.validateForm()) {
            const { productName, price, category } = this.state;
            const { shopId, dispatch } = this.props;
            const payload = {
                productName,
                shopId,
                price,
                category: category.value,
                imageUrls: this.imageUrls,
                storageRefs: this.storageRefs
            };
            this.handleToggleModal();
            dispatch(addProduct(payload));
        }
    }
    render() {
        const { isOpenAddModal } = this.props;
        const { images, fileNames, category, productName, price } = this.state;
        const { categories } = this.props;

        const categoryOptions = [{
            label: "Chọn",
            value: ""
        }];

        categories.map((option) => {
            const { categoryName, categoryId } = option;
            categoryOptions.push({
                label: categoryName,
                value: categoryId
            });
        });

        const renderPreviewer = () => {
            return images.map((image, index) => {
                return (
                    <div key={index}>
                        <img src={image} style={{ width: "auto", height: "auto", maxWidth: "100px", maxHeight: "100px" }} />
                        <br />
                        <button onClick={() => { this.handleRemoveImage(index); }} className="btn btn-default">Xóa</button>
                    </div>
                );
            });

        };
        return (
            <div className="container">
                <Modal
                    show={isOpenAddModal}
                    aria-labelledby="ModalHeader"
                    onHide={this.handleToggleModal.bind(this)}
                    lg={true}
                >
                    <Header closeButton>
                        <Title id="ModalHeader"><p className="text-info">Thêm mới sản phẩm</p></Title>
                    </Header>
                    <Body>
                        <div className="">
                            <div className="row">
                                <div className="col-xs-6">
                                    <label htmlFor="productName" >Tên sản phẩm</label>
                                    <input id="productName" name="productName" value={productName}
                                        onChange={(e) => { this.handleInputOnChange(e); }}
                                        onBlur={(e) => { this.validateProductName(e); }}
                                        className="form-control" />
                                    <span className="text-danger">{this.state.producNameMessage}</span>

                                </div>
                                <div className="col-xs-6">
                                    <label htmlFor="productName" >Giá (VNĐ)</label>
                                    <input id="price" type="number
                                    " name="price" value={price}
                                    onChange={(e) => { this.handleInputOnChange(e); }}
                                    onBlur={(e) => {this.validatePrice(e);}}
                                    className="form-control" />
                                <span className="text-danger">{this.state.priceMessage}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-6">
                                    <label htmlFor="shopOrShopKeeper">Loại sản phẩm</label>
                                    <SimpleSelect options={categoryOptions}
                                     theme="bootstrap3"
                                     value={category}
                                     defaultValue={categoryOptions[0]}
                                     onValueChange={this.handlecategorySelected.bind(this)} />
                                    <span className="text-danger">{this.state.categoryMessage}</span>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-xs-12">
                                    <button className="btn btn-success" onClick={(e) => { this.handleLabelClick(); }}>Tải ảnh lên</button>
                                    <p>{fileNames.toString().replace(/,/g, "|")}</p>
                                    <input type="file" id="file" style={{ display: "none" }} onChange={(e) => { this.handleChangeImage(e); }} /><br />
                                    {renderPreviewer()}
                                </div>
                            </div>
                        </div>

                    </Body>
                    <Footer>
                        <button className="btn btn-success" style={{ width: "100px" }} onClick={this.handleBtnAddClick.bind(this)} >
                            Thêm
                        </button>
                        <button onClick={this.handleToggleModal.bind(this)} className="btn btn-default" style={{ width: "100px" }}>
                            Hủy
                        </button>
                    </Footer>
                </Modal>
            </div>
        );
    }

}

ProductAddingModal.propTypes = {
    dispatch: PropTypes.func,
    isOpenAddModal: PropTypes.bool,
    handleToggleModal: PropTypes.func
};

const mapStateToProps = (state) => {
    const { shopViewReducer } = state;
    const { categories } = shopViewReducer;
    return {
        categories
    };
};


export default connect(mapStateToProps)(ProductAddingModal);
