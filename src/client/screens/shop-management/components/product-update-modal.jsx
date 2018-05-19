import React from "react";
import PropTypes from "prop-types";
import { SimpleSelect } from "react-selectize";
import { connect } from "react-redux";
import { apiGetProduct } from "./../../../apis/shops-management";
import { uploadImage, deleteImage } from "./../../../helpers/firebase-helper";
import { updateProduct } from "./../actions/product-actions";
const Modal = require("react-bootstrap-modal");

const { Header, Body, Footer } = Modal;

class ProductUpdateModal extends React.Component {
    constructor(props) {
        super(props);
        this.removedImages = [];
        this.uploadedImages = [];
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

        this.setState({
            [property]: {
                value
            }
        });
    }

    handlecategorySelected(value) {
        this.setState({
            category: value
        });
    }

    handleDeleteImage(index, e) {
        const { images } = this.state;
        this.removedImages.push(images[index].storageRef);
        const newImages = [];
        images.forEach((image, position) => {
            if (index !== position) {
                newImages.push(image);
            }
        });
        this.setState({
            images: newImages
        });
    }

    handleChangeImage(e) {
        const file = e.target.files[0];
        const { images } = this.state;
        const reader = new FileReader();
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            reader.addEventListener("load", (e) => {
                const imgAsUrl = e.target.result;
                const newImages = [...images, {
                    id: "",
                    imgUrl: imgAsUrl,
                    storageRef: ""
                }];
                uploadImage(file, (snapshot) => {
                    const { downloadURL, ref } = snapshot;
                    const storageRef = ref.location.path;
                    this.uploadedImages.push(storageRef);
                    const uploadedImg =
                        {
                            id: "",
                            imgUrl: downloadURL,
                            storageRef
                        };
                    const newUploadedImages = [...images, uploadedImg];

                    this.setState({
                        images: newUploadedImages
                    });
                });

                this.setState({
                    images: newImages
                });
            });
        }
        reader.readAsDataURL(file);
    }

    handleLabelClick() {
        this.refs.imgInput.click();

    }

    deleteImages(refs) {
        Promise.all(refs.map((ref) => {
            deleteImage(ref, () => {
                console.log("delete success");
            });

        }));
    }

    handleClodeModal() {
        this.deleteImages(this.uploadedImages);
        this.props.handleToggleModal();
    }

    handleBtnAddClick() {
        this.deleteImages(this.removedImages);
        const { productName, price, category, images } = this.state;
        const { productId, dispatch,handleToggleModal } = this.props;
        const imageUrls = [];
        const storageRefs = [];
        images.forEach(image => {
            imageUrls.push(image.imgUrl);
            storageRefs.push(image.storageRef);
        });
        const payload = {
            productId,
            productName: productName.value,
            price: price.value,
            category: category.value,
            imageUrls,
            storageRefs
        };
        dispatch(updateProduct(payload));
        handleToggleModal();
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

        const renderImages = () => {
            return images.map((image, index) => {
                return (
                    <div className="col-xs-3" key={index}>
                        <div className="row">
                            <img src={image.imgUrl}
                                alt={productName.value}
                                className="img-thumbnail center-block"
                                style={{ width: "inherit", height: "150px" }}
                            />
                        </div>
                        <div className="row">
                            <button onClick={(e) => { this.handleDeleteImage(index, e); }} 
                            className="btn btn-default center-block">Xóa</button>
                        </div>
                    </div>
                );

            });
        };

        return (
            <div className="col-xs-6" >
                <Modal
                    show={isOpenUpdateModal}
                    aria-labelledby="ModalHeader"
                    onHide={this.handleClodeModal.bind(this)}
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
                                <input type="file"
                                    ref="imgInput" id="file"
                                    onChange={(e) => { this.handleChangeImage(e); }}
                                    style={{ display: "none" }} /><br />
                            </div>
                            <div className="row">
                                <div className="col-xs-3">
                                    {images.length < 3 ?
                                        <button className="btn btn-success"
                                            onClick={(e) => { this.handleLabelClick(); }}>
                                            Thêm
                                        </button>
                                        : null
                                    }
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                {renderImages()}
                            </div>
                        </div>
                    </Body>
                    <Footer>
                        <button className="btn btn-success"
                            style={{ width: "100px" }}
                            onClick={this.handleBtnAddClick.bind(this)}
                        >
                            Cập nhật
                        </button>
                        <button onClick={this.handleClodeModal.bind(this)}
                            className="btn btn-default"
                            style={{ width: "100px" }}>
                            Hủy
                        </button>
                    </Footer>
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
