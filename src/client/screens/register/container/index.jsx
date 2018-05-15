import React from "react";
import PropTypes from "prop-types";
import DemoGridView from "./../../../commons/gridview/demo-gridview";
import { connect } from "react-redux";
import { MultiSelect } from "react-selectize";
import { getInitialState } from "./../actions/index";
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.file = null;
        this.state = {
            coverPhoto: "https://www.ibridgenetwork.org/images/content/default-cover.jpg"
        };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getInitialState());
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


    render() {
        const { coverPhoto } = this.state;
        const { categories, provinces } = this.props;
        const categoryOptions = [{
            label: "Chọn",
            value: ""
        }];

        const provinceOptions = [{
            label: "Chọn",
            value: ""
        }];

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
                                <input type="text" id="userName" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName">Mật khẩu</label>
                                <input type="text" id="userName" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName">Xác nhận mật khẩu</label>
                                <input type="text" id="userName" className="form-control" />
                            </div>

                        </div>
                        <div className="col-xs-6">
                            <h4>Thông tin cửa hàng</h4>
                            <div className="form-group">
                                <label htmlFor="userName">Tên cửa hàng</label>
                                <input type="text" id="userName" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="userName">Địa chỉ cửa hàng</label>
                                <input type="text" id="userName" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName">Điện thoại cửa hàng</label>
                                <input type="text" id="userName" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName">Email cửa hàng</label>
                                <input type="text" id="userName" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName">Cung cấp</label>
                                <MultiSelect options={categoryOptions} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName">Khu vực cung cấp</label>
                                <MultiSelect options={provinceOptions} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName">Mô tả</label>
                                <textarea type="text" id="userName" className="form-control" />
                            </div>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <button className="btn btn-success col-xs-6 pull-right">Đăng ký</button>
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
    const { homeReducer } = state;
    const { categories, provinces } = homeReducer;
    return {
        categories,
        provinces
    };
};


export default connect(mapStateToProps)(Register);
