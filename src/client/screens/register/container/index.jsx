import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MultiSelect } from "react-selectize";
import { getInitialState, register, requestRegister } from "./../actions/index";
import { uploadImage } from "./../../../helpers/firebase-helper";
import { isEmptyInput, validateEmail, validatePhoneNumber } from "./../../../helpers/validation-helper";
import { apiCheckUserName } from "./../../../apis/authentication-api";
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.file = null;
        this.defaultState = {
            coverPhoto: "https://firebasestorage.googleapis.com/v0/b/datn-827e8.appspot.com/o/images%2Fdefault-cover.jpg?alt=media&token=9764a674-c9bf-4959-8ab1-cf31a99056af",
            coverPhotoRef: "images/default-cover.jpg",
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
        const { isSuccess, router, isFetching } = nextProps;
        console.log(nextProps);
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
            selectedProvinces: values
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

    validateInputs(isSumit = false) {
        const {
            userName, password, confirmPassword,
            shopName, shopAddress, shopEmail, shopPhone } = this.state;
        if (isSumit) {
            userName.isDirty = true; password.isDirty = true; confirmPassword.isDirty = true;
            shopName.isDirty = true; shopAddress.isDirty = true; shopEmail.isDirty = true; shopPhone.isDirty = true
        }

        userName.message = (userName.isDirty) && isEmptyInput(userName.value.trim()) ? "Nhập tên tài khoản" : "";
        password.message = (password.isDirty) && isEmptyInput(password.value.trim()) ? "Nhập tên mật khẩu" : "";
        confirmPassword.message = (confirmPassword.isDirty) && isEmptyInput(confirmPassword.value.trim()) ? "Xác thực mật khẩu" : "";
        shopName.message = (shopName.isDirty) && isEmptyInput(shopName.value.trim()) ? "Nhập tên cửa hàng" : "";
        shopAddress.message = (shopAddress.isDirty) && isEmptyInput(shopAddress.value.trim()) ? "Nhập địa chỉ cửa hàng" : "";
        shopEmail.message = (shopEmail.isDirty) && isEmptyInput(shopEmail.value.trim()) ? "Nhập Email cửa hàng" : "";
        shopPhone.message = (shopPhone.isDirty) && isEmptyInput(shopPhone.value.trim()) ? "Nhập điện thoại cửa hàng" : "";

        if (!isEmptyInput(userName.value)) {
            apiCheckUserName({ userName: userName.value }, (result) => {
                const { status, isExist } = result.data;
                userName.message = status & isExist ? "Tài khoản này đã được sử dụng" : ""
                this.setState({
                    userName
                });
            })
        }

        if (!isEmptyInput(shopPhone.value)) {
            shopPhone.message = !validatePhoneNumber(shopPhone.value) ? "Số điện thoại không hợp lệ" : "";
        }

        if (!isEmptyInput(shopEmail.value)) {
            shopEmail.message = !validateEmail(shopEmail.value) ? "Email không hợp lệ" : "";
        }
        if (!isEmptyInput(confirmPassword.value)) {
            confirmPassword.message = confirmPassword.value !== password.value ? "Xác nhận mật khẩu không đúng" : "";
        }

        this.forceUpdate();


        return (userName.message.length === 0 && password.message.length === 0 &&
            confirmPassword.message.length === 0 && shopName.message.length === 0 && shopAddress.message.length === 0
            && shopEmail.message.length === 0 && shopPhone.message.length === 0);
    }
    /*eslint-enable */

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
        if (this.validateInputs(true)) {
            if (this.file !== null) {
                const { dispatch } = this.props;
                dispatch(requestRegister());
                uploadImage(this.file, (snapshot) => {
                    const { downloadURL, ref } = snapshot;
                    const payload = this.toRegisterPayload();
                    payload.coverPhotoUrl = downloadURL;
                    payload.coverPhotoRef = ref.location.path;
                    dispatch(register(payload));
                });
            } else {
                const payload = this.toRegisterPayload();
                payload.coverPhotoUrl = this.state.coverPhoto;
                payload.coverPhotoRef = this.state.coverPhotoRef;
                const { dispatch } = this.props;
                dispatch(register(payload));
            }
        }
    }

    render() {
        const { coverPhoto, selectedCategories,
            selectedProvinces, userName, password, confirmPassword
            , shopName, shopAddress, shopEmail, shopPhone, description } = this.state;
        const { categoryOptions, provinceOptions, isFetching } = this.props;

        return (
            <div className="col-xs-12">
                {isFetching ?
                    <div className="col-xs-12">
                        <div className="col-xs-4" />

                        <div className="col-xs-4">
                            <button className="btn btn-lg btn-warning center-block">
                                <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate" />
                                Loading...
                            </button>
                        </div>
                    </div>
                    : null}
                <br />
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
                                    onBlur={(e) => { this.validateInputs(false); }}
                                    onChange={this.handleInputChange.bind(this)} />
                                <span className="text-danger">{userName.message}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Mật khẩu</label>
                                <input type="password" id="password"
                                    name="password"
                                    value={password.value}
                                    onChange={this.handleInputChange.bind(this)}
                                    onBlur={(e) => { this.validateInputs(false); }}

                                    className="form-control" />
                                <span className="text-danger">{password.message}</span>

                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                                <input type="password" id="confirmPassword" name="confirmPassword"
                                    onChange={this.handleInputChange.bind(this)}
                                    onBlur={(e) => { this.validateInputs(false); }}
                                    value={confirmPassword.value}
                                    className="form-control" />
                                <span className="text-danger">{confirmPassword.message}</span>

                            </div>

                        </div>
                        <div className="col-xs-6">
                            <h4>Thông tin cửa hàng</h4>
                            <div className="form-group">
                                <label htmlFor="shopName">Tên cửa hàng</label>
                                <input type="text" id="shopName" name="shopName"
                                    value={shopName.value}
                                    onChange={this.handleInputChange.bind(this)}
                                    onBlur={(e) => { this.validateInputs(false); }}
                                    className="form-control" />
                                <span className="text-danger">{shopName.message}</span>

                            </div>

                            <div className="form-group">
                                <label htmlFor="shopAddress">Địa chỉ cửa hàng</label>
                                <input type="text" id="shopAddress" name="shopAddress"
                                    value={shopAddress.value}
                                    onBlur={(e) => { this.validateInputs(false); }}
                                    onChange={this.handleInputChange.bind(this)}
                                    className="form-control" />
                                <span className="text-danger">{shopAddress.message}</span>

                            </div>
                            <div className="form-group">
                                <label htmlFor="shopPhone">Điện thoại cửa hàng</label>
                                <input type="text" id="shopPhone" name="shopPhone"
                                    value={shopPhone.value}
                                    onChange={this.handleInputChange.bind(this)}
                                    onBlur={(e) => { this.validateInputs(false); }}
                                    className="form-control" />
                                <span className="text-danger">{shopPhone.message}</span>

                            </div>
                            <div className="form-group">
                                <label htmlFor="shopEmail">Email cửa hàng</label>
                                <input type="text" id="shopEmail" name="shopEmail"
                                    value={shopEmail.value}
                                    onChange={this.handleInputChange.bind(this)}
                                    onBlur={(e) => { this.validateInputs(false); }}
                                    className="form-control" />
                                <span className="text-danger">{shopEmail.message}</span>

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
    const { isSuccess, isFetching } = registerReducer;
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
        isSuccess,
        isFetching
    };
};


export default connect(mapStateToProps)(Register);
