import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getShopView } from "./../../shop-view/actions";
import { getAccessToken } from "./../../../helpers/cookie-helper";
import { getLocalUserProfile } from "./../../../helpers/jwt-helper";
import { getShopCategories, getShopProvinces } from "./../../shop-view/actions";
import { getCategories, getProvinces } from "./../../home/actions";
import { MultiSelect } from "react-selectize";
import { apiUpdateShopInfo, apiUpdateShopInfoWithoutImage } from "./../../../apis/shops-management";
import { uploadImage } from "./../../../helpers/firebase-helper";
import { isEmptyInput, validateEmail, validatePhoneNumber } from "./../../../helpers/validation-helper";

import { showError, showSuccess } from "./../../root-component/actions/notification";
class UpdateShopInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                shopName: {
                    value: ""
                },
                shopAddress: {
                    value: ""
                }, shopEmail: {
                    value: ""
                }, shopPhone: {
                    value: ""
                },
                imgUrl: ""
            }
        };
        this.file = null;
    }
    componentDidMount() {
        const localStorage = window.localStorage;
        const accessToken = getAccessToken(localStorage) || null;
        const profile = accessToken === null ? null : getLocalUserProfile(accessToken);
        if (profile === null) {
            const { router } = this.props;
            router.push("/login");
        } else {
            const { dispatch } = this.props;
            dispatch(getShopView(profile.shopId));
            dispatch(getShopCategories(profile.shopId));
            dispatch(getShopProvinces(profile.shopId));
            dispatch(getCategories());
            dispatch(getProvinces());
        }
    }


    componentWillReceiveProps(nextProps) {
        const { shop, shopCategories, shopProvinces } = nextProps;

        const shopCategoriesSelected = [];
        if (shopCategories.length > 0) {
            shopCategories.forEach(category => {
                shopCategoriesSelected.push({
                    label: category.categoryName,
                    value: category.categoryId
                });
            });
        }

        const shopProvincesSelected = [];
        if (shopProvinces.length) {
            shopProvinces.forEach(provd => {
                shopProvincesSelected.push({
                    label: provd.province,
                    value: provd.provinceId
                });
            });
        }


        this.defaultState = {
            shopId: shop.shopId,
            shopName: {
                value: shop.shopName
            },
            shopAddress: {
                value: shop.shopAddress
            }, shopEmail: {
                value: shop.shopEmail
            }, shopPhone: {
                value: shop.shopPhone
            },
            imgUrl: shop.imgUrl,
            shopCategoriesSelected, shopProvincesSelected
        };
        this.setState({
            inputs: {
                ...this.defaultState
            }
        });

    }

    handleLabelClick(e) {
        const fileInput = document.getElementById("file");
        fileInput.click();
    }

    handleInputChange(e) {
        const property = e.target.name;
        const value = e.target.value;
        const { inputs } = this.state;
        inputs[`${property}`].value = value;
        this.setState({
            inputs
        });
    }

    /*eslint-disable */

    validateInputs() {
        const { inputs } = this.state;
        const { shopName, shopAddress, shopPhone, shopEmail } = inputs;
        shopName.message = isEmptyInput(shopName.value) ? "Nhập tên cửa hàng" : "";
        shopAddress.message = isEmptyInput(shopAddress.value) ? "Nhập địa chỉ cửa hàng" : "";
        shopPhone.message = isEmptyInput(shopPhone.value) ? "Nhập số điện thoại cửa hàng" : "";
        shopEmail.message = isEmptyInput(shopEmail.value) ? "Nhập email cửa hàng" : "";

        if (!isEmptyInput(shopPhone.value)) {
            shopPhone.message = !validatePhoneNumber(shopPhone.value) ? "Số điện thoại không hợp lệ" : "";
        }

        if (!isEmptyInput(shopEmail.value)) {
            shopEmail.message = !validateEmail(shopEmail.value) ? "Email không hợp lệ" : "";
        }
        this.forceUpdate();
        return (
            shopName.message.length === 0 && shopAddress.message.length === 0
            && shopEmail.message.length === 0 && shopPhone.message.length === 0);
    }
    /*eslint-enable */

    handleCategoriesChange(values) {
        const { inputs } = this.state;
        inputs.shopCategoriesSelected = values;
        this.setState({
            inputs
        });
    }

    handleShopProvincesChange(values) {
        const { inputs } = this.state;
        inputs.shopProvincesSelected = values;
        this.setState({
            inputs
        });
    }
    handleChangeImage(e) {
        const file = e.target.files[0];
        this.file = file;
        const reader = new FileReader();
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            reader.addEventListener("load", (e) => {
                const imgAsUrl = e.target.result;
                const { inputs } = this.state;
                inputs.imgUrl = imgAsUrl;
                this.setState({
                    inputs
                });

            });
        }
        reader.readAsDataURL(file);
    }


    parseInputToPayload(inputs) {
        const { shopCategoriesSelected, shopProvincesSelected } = inputs;
        const { shopName, shopAddress, shopPhone, shopEmail, shopId } = inputs;

        const payload = {
            shopId,
            shopName: shopName.value,
            shopAddress: shopAddress.value,
            shopEmail: shopEmail.value,
            shopPhone: shopPhone.value,
            shopCategories: shopCategoriesSelected,
            shopProvinces: shopProvincesSelected
        };

        return payload;
    }


    handleSubmit() {
        if (this.validateInputs()) {
            const { inputs } = this.state;
            const { dispatch } = this.props;
            const payload = this.parseInputToPayload(inputs);
            if (this.file !== null) {
                this.setState({
                    isFetching: true
                });
                uploadImage(this.file, (snapshot) => {
                    const { downloadURL, ref } = snapshot;
                    const storageRef = ref.location.path;
                    payload.imgUrl = downloadURL;
                    payload.imgRef = storageRef;
                    apiUpdateShopInfo(payload, (rs) => {
                        this.setState({
                            isFetching: false
                        });
                        this.file = null;
                        dispatch(showSuccess("Cập nhật thành công"));
                    }, (err) => {
                        this.setState({
                            isFetching: false
                        });
                        dispatch(showError("Cập nhật không thành công"));
                    });

                });
            } else {
                this.setState({
                    isFetching: true
                });
                apiUpdateShopInfoWithoutImage(payload, (rs) => {
                    this.setState({
                        isFetching: false
                    });
                    dispatch(showSuccess("Cập nhật thành công"));
                }, (err) => {
                    this.setState({
                        isFetching: false
                    });
                    dispatch(showError("Cập nhật không thành công"));
                });
            }
        }
    }

    render() {
        const { inputs } = this.state;
        const { shopCategoriesSelected, shopProvincesSelected, shop } = inputs;
        const { categories, provinces } = this.props;
        const categoriesOptions = [];
        const { shopName, shopAddress, shopPhone, shopEmail } = inputs;
        categories.forEach(category => {
            categoriesOptions.push({
                label: category.categoryName,
                value: category.categoryId
            });
        });

        const provincesOptions = [];

        provinces.forEach(pdv => {
            provincesOptions.push({
                label: pdv.province,
                value: pdv.provinceId
            });
        });


        return (
            <div className="col-xs-12">
                <div className="col-xs-4">
                    <img
                        src={inputs.imgUrl}
                        className="thumbnail shop-cover-photo"
                        alt="..."
                        style={{ display: "block", margin: "auto", width: "85%", height: "inherit" }} />
                        <br/>
                <button className="btn btn-success center-block" onClick={(e) => { this.handleLabelClick(); }} >Thay đổi</button>
                <input type="file" id="file" style={{ display: "none" }} onChange={(e) => { this.handleChangeImage(e); }} /><br />

            </div>
            <div className="col-xs-8 ">
                <div className="row">
                    <div className="col-xs-6">
                        <div>
                            <label htmlFor="shopName">Tên cửa hàng</label>
                            <input type="text" id="shopName" name="shopName"
                                className="form-control"
                                value={shopName.value}
                                onBlur={(e) => { this.validateInputs(false); }}
                                onChange={this.handleInputChange.bind(this)}
                            />
                            <span className="text-danger">{shopName.message}</span>
                        </div>
                        <div>
                            <label htmlFor="shopAddress">Địa chỉ cửa hàng</label>
                            <input type="text" id="shopAddress" name="shopAddress"
                                className="form-control"
                                value={shopAddress.value}
                                onBlur={(e) => { this.validateInputs(false); }}
                                onChange={this.handleInputChange.bind(this)}
                            />
                            <span className="text-danger">{shopAddress.message}</span>
                        </div>
                        <div>
                            <label htmlFor="shopEmail">Email</label>
                            <input type="text" id="shopEmail" name="shopEmail"
                                className="form-control"
                                value={shopEmail.value}
                                onBlur={(e) => { this.validateInputs(false); }}
                                onChange={this.handleInputChange.bind(this)}
                            />
                            <span className="text-danger">{shopEmail.message}</span>
                        </div>
                        <div>
                            <label htmlFor="shopPhone">Số điện thoại</label>
                            <input type="text" id="shopPhone" name="shopPhone"
                                className="form-control"
                                value={shopPhone.value}
                                onBlur={(e) => { this.validateInputs(false); }}
                                onChange={this.handleInputChange.bind(this)}
                            />
                            <span className="text-danger">{shopPhone.message}</span>
                        </div>
                    </div>
                    <div className="col-xs-6">

                        <div className="form-group">
                            <label htmlFor="userName">Cung cấp</label>
                            <MultiSelect
                                onValuesChange={this.handleCategoriesChange.bind(this)}
                                values={shopCategoriesSelected}
                                placeholder="Tất cả"
                                options={categoriesOptions} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="userName">Khu vực kinh doanh</label>
                            <MultiSelect
                                onValuesChange={this.handleShopProvincesChange.bind(this)}
                                values={shopProvincesSelected}
                                placeholder="Tất cả"
                                options={provincesOptions} />
                        </div>
                    </div>
                </div>
                <br />
                <div>
                    <div className="col-xs-12 col-md-6">
                        <button className="btn btn-success col-xs-6 pull-right"
                            onClick={this.handleSubmit.bind(this)}
                        >Cập nhật</button>
                    </div>
                    <div className="col-xs-6">
                        <button className="btn btn-default col-xs-6 pull-left">Hủy</button>
                    </div>
                </div>
            </div>
            <br />
            <div id="loader" style={
                {
                    clear: "both",
                    marginTop: "15px"
                }
            }>
                {this.state.isFetching ?
                    <button className="btn btn-lg btn-warning center-block">
                        <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate" />
                        Đang xử lý...
                      </button> : null
                }
                <br />

            </div>

            </div >
        );
    }

}

UpdateShopInfo.propTypes = {
    dispatch: PropTypes.func,
    searchCriteria: PropTypes.object,
    shopId: PropTypes.string,
    shop: PropTypes.object,
    products: PropTypes.array
};

const mapStateToProps = (state) => {
    const { shopViewReducer, homeReducer
    } = state;
    const { shop } = shopViewReducer;

    return {
        shop,
        shopCategories: shopViewReducer.categories,
        categories: homeReducer.categories,
        provinces: homeReducer.provinces,
        shopProvinces: shopViewReducer.shopProvinces
    };
};


export default connect(mapStateToProps)(UpdateShopInfo);
