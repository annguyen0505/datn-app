import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MultiSelect } from "react-selectize";
import { getInitialState, register } from "./../actions/index";
import { uploadImage } from "./../../../helpers/firebase-helper";
import { isEmptyInput, validateEmail, validatePhoneNumber } from "./../../../helpers/validation-helper";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.file = null;
        this.defaultState = {
            coverPhoto: "https://www.ibridgenetwork.org/images/content/default-cover.jpg",
            selectedCategories: [],
            selectedProvinces: [],
            userName: {
                value: ""
            },
            password: {
                value: ""
            },
            confirmPassword: {
                value: ""
            },
            shopName: {
                value: ""
            },
            shopAddress: {
                value: ""
            },
            shopPhone: {
                value: ""
            },
            shopEmail: {
                value: ""
            },
            description: {
                value: ""
            }
        };

        this.state = {
            ...this.defaultState
        };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getInitialState());
    }

    componentWillReceiveProps(nextProps) {
        const { isSuccess, router } = nextProps;
        if (isSuccess) {
            router.push("/login");
            this.state = { ...this.defaultState };
        }
    }

    handleChangeImage(e) {
        const file = e.target.files[0];
        this.file = file;
        const reader = new FileReader();
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            reader.addEventListener("load", (e) => {
                const imgAsUrl = e.target.result;
                this.setState({
                    coverPhoto: imgAsUrl
                });

            });
        }
        reader.readAsDataURL(file);
    }

    handleLabelClick(e) {
        const fileInput = document.getElementById("file");
        fileInput.click();
    }

    handleCategoriesChange(values) {
        this.setState({
            selectedCategories: values
        });

    }
    handleProvincesChange(values) {
        this.setState({
            selectedCategories: values
        });
    }

    handleInputChange(e) {
        e.preventDefault();
        const { value, name } = e.target;

        this.setState(
            {
                [name]: {
                    value,
                    isDirty: true
                }
            }
        );
    }
    /*eslint-disable */

    handleInputOnBlur(e) {
        e.preventDefault();
        const {
            userName, password, confirmPassword
            , shopName, shopAddress, shopEmail, shopPhone } = this.state;
        userName.message = userName.isDirty && isEmptyInput(userName.value.trim()) ? "Nhập tên tài khoản" : "";
        password.message = password.isDirty && isEmptyInput(password.value.trim()) ? "Nhập tên mật khẩu" : "";
        confirmPassword.message = confirmPassword.isDirty && isEmptyInput(confirmPassword.value.trim()) ? "Xác thực mật khẩu" : "";
        shopName.message = shopName.isDirty && isEmptyInput(shopName.value.trim()) ? "Nhập tên cửa hàng" : "";
        shopAddress.message = shopAddress.isDirty && isEmptyInput(shopAddress.value.trim()) ? "Nhập địa chỉ cửa hàng" : "";
        shopEmail.message = shopEmail.isDirty && isEmptyInput(shopEmail.value.trim()) ? "Nhập Email cửa hàng" : "";
        shopPhone.message = shopPhone.isDirty && isEmptyInput(shopPhone.value.trim()) ? "Nhập điện thoại cửa hàng" : "";

        if (!isEmptyInput(userName.value) && userName.isDirty) {

        }

        if (!isEmptyInput(shopPhone.value) && shopPhone.isDirty) {

        }
        if (!isEmptyInput(shopEmail.value) && shopEmail.isDirty) {

        }

        this.forceUpdate();
    }

    toRegisterPayload() {
        const { coverPhoto, selectedCategories,
            selectedProvinces, userName, password, confirmPassword
            , shopName, shopAddress, shopEmail, shopPhone, description } = this.state;

        return {
            userName: userName.value,
            password: password.value,
            shopName: shopName.value,
            shopEmail: shopEmail.value,
            shopPhone: shopPhone.value,
            shopAddress: shopAddress.value,
            description: description.value,
            categories: selectedCategories,
            provinces: selectedProvinces
        };

    }

    handleSubmit() {

        uploadImage(this.file, (snapshot) => {
            const { downloadURL, ref } = snapshot;
            const payload = this.toRegisterPayload();
            payload.coverPhotoUrl = downloadURL;
            payload.coverPhotoRef = ref.location.path;
            const { dispatch } = this.props;
            dispatch(register(payload));
        });

    }

    render() {
        const { coverPhoto, selectedCategories,
            selectedProvinces, userName, password, confirmPassword
            , shopName, shopAddress, shopEmail, shopPhone, description } = this.state;
        const { categoryOptions, provinceOptions } = this.props;

        return (
            <div className="col-xs-12">
                <div className="col-xs-12 col-md-4">
                    <img
                        src={coverPhoto}
                        style={{ maxWidth: "400px", maxHeight: "300px" }}
                    />
                    <div className="col-xs-12">
                        <button className="btn btn-success" onClick={(e) => { this.handleLabelClick(); }}>Tải ảnh lên</button>
                        <input type="file" id="file" style={{ display: "none" }} onChange={(e) => { this.handleChangeImage(e); }} /><br />
                    </div>
                </div>
                <div className="col-xs-12 col-md-8">
                    <div className="row">
                        <div className="col-xs-6">
                            <h4>Thông tin cá nhân</h4>
                            <div className="form-group">
                                <label htmlFor="userName">Tài khoản</label>
                                <input type="text" id="userName" name="userName"
                                    className="form-control"
                                    value={userName.value}
                                    onBlur={this.handleInputOnBlur.bind(this)}
                                    onChange={this.handleInputChange.bind(this)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Mật khẩu</label>
                                <input type="password" id="password"
                                    name="password"
                                    value={password.value}
                                    onChange={this.handleInputChange.bind(this)}
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                                <input type="text" id="confirmPassword" name="confirmPassword"
                                    onChange={this.handleInputChange.bind(this)}
                                    value={confirmPassword.value}
                                    className="form-control" />
                            </div>

                        </div>
                        <div className="col-xs-6">
                            <h4>Thông tin cửa hàng</h4>
                            <div className="form-group">
                                <label htmlFor="shopName">Tên cửa hàng</label>
                                <input type="text" id="shopName" name="shopName"
                                    value={shopName.value}
                                    onChange={this.handleInputChange.bind(this)}
                                    className="form-control" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="shopAddress">Địa chỉ cửa hàng</label>
                                <input type="text" id="shopAddress" name="shopAddress"
                                    value={shopAddress.value}
                                    onChange={this.handleInputChange.bind(this)}
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="shopPhone">Điện thoại cửa hàng</label>
                                <input type="text" id="shopPhone" name="shopPhone"
                                    value={shopPhone.value}
                                    onChange={this.handleInputChange.bind(this)}
                                    onBlur={this.handleInputOnBlur.bind(this)}
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName">Email cửa hàng</label>
                                <input type="text" id="shopEmail" name="shopEmail"
                                    value={shopEmail.value}
                                    onChange={this.handleInputChange.bind(this)}
                                    onBlur={this.handleInputOnBlur.bind(this)}
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName">Cung cấp</label>
                                <MultiSelect
                                    onValuesChange={this.handleCategoriesChange.bind(this)}
                                    value={selectedCategories}
                                    placeholder="Tất cả"
                                    options={categoryOptions} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName">Khu vực cung cấp</label>
                                <MultiSelect
                                    placeholder="Tất cả"
                                    onValuesChange={this.handleProvincesChange.bind(this)}
                                    value={selectedProvinces}
                                    options={provinceOptions} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Mô tả</label>
                                <textarea id="description" name="description"
                                    value={description.value}
                                    onChange={this.handleInputChange.bind(this)}
                                    className="form-control" />
                            </div>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <button className="btn btn-success col-xs-6 pull-right"
                                onClick={this.handleSubmit.bind(this)}
                            >Đăng ký</button>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <button className="btn btn-default col-xs-6 pull-left">Quay lại</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

Register.propTypes = {
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
    const { homeReducer, registerReducer } = state;
    const { categories, provinces } = homeReducer;
    const { isSuccess } = registerReducer;
    const categoryOptions = [];

    const provinceOptions = [];

    categories.forEach(category => {
        categoryOptions.push({
            label: category.categoryName,
            value: category.categoryId
        });
    });
    provinces.forEach(province => {
        provinceOptions.push({
            label: province.province,
            value: province.provinceId
        });
    });
    return {
        categoryOptions,
        provinceOptions,
        isSuccess
    };
};


export default connect(mapStateToProps)(Register);
