import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toVNDformat } from "./../../../helpers/common-helper";
import { apiGetProductDetail } from "./../../../apis/shops-management";
import { Carousel, Image } from "react-bootstrap";

const { Item, Caption } = Carousel;
const Modal = require("react-bootstrap-modal");

const { Header, Body } = Modal;

class ProductDetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.defaultState = {
            product: {
                images: [{
                    imgUrl: ""
                }]
            }
        };
        this.state = {
            ...this.defaultState,
            currentImg: 0
        };
    }

    componentDidMount() {
        const { productId } = this.props;
        apiGetProductDetail({ productId }, (result) => {
            const { product } = result.data;
            this.setState({
                product
            });
        });
    }

    handleClodeModal() {
        this.props.onToggleModal();
    }

    handleNextImage(e) {
        const { currentImg, product } = this.state;
        if (currentImg < product.images.length - 1) {
            this.setState({
                currentImg: currentImg + 1
            });
        }

    }
    handlePrevImage() {
        const { currentImg } = this.state;
        if (currentImg > 0) {
            this.setState({
                currentImg: currentImg - 1
            });
        }
    }


    render() {
        const { isOpenDetailModal } = this.props;
        const { product, currentImg } = this.state;
        const { images } = product;
        const nextDisabled = currentImg === images.length - 1;
        const prevDisabled = currentImg === 0;

        const imageWillRender = Array.isArray(images) && images.length > 0 ? images[currentImg].imgUrl : "";
        const items = images.map((image, index) => {
            return (
                <Item key={index}>
                    <img style={
                        {
                            width: "60%%",
                            margin: "auto",
                            height: "450px"
                        }
                    } alt="900x500" src={image.imgUrl} />
                    <Caption>
                        <h3>{this.state.product.productName}</h3>
                    </Caption>
                </Item>);
        });
        return (
            <div className="container" >
                <Modal
                    show={isOpenDetailModal}
                    aria-labelledby="ModalHeader"
                    onHide={this.handleClodeModal.bind(this)}
                    lg={true}
                >
                    <Body>
                        <div className="row">

                            {/* <div className="col-xs-12" >
                                <img style={{
                                    display: "block",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    maxHeight: "450px",
                                    width: "70%"
                                }}
                                    src={imageWillRender}
                                    className="thumbnail" />

                                <div style={{
                                    width: "30px",
                                    marginLeft: "auto",
                                    marginRight: "auto"
                                }}>
                                    <a disabled={prevDisabled} >
                                        <span
                                            onClick={this.handlePrevImage.bind(this)}
                                            className="glyphicon glyphicon-step-backward" />
                                    </a>
                                    <a disabled={nextDisabled}>
                                        <span onClick={this.handleNextImage.bind(this)}
                                            className="glyphicon glyphicon-step-forward" />
                                    </a>
                                </div>
                            </div> */}

                            <Carousel>
                                {items}
                            </Carousel>
                        </div>
                    </Body>
                </Modal>
            </div >
        );
    }
}

ProductDetailModal.propTypes = {
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
    const { shopViewReducer } = state;
    const { categories } = shopViewReducer;
    return {
        categories
    };
};


export default connect(mapStateToProps)(ProductDetailModal);
