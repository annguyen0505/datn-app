import React from "React";
import { login } from "./../actions";
import { connect } from "react-redux";
import { apiCheckUserName } from "./../../../apis/authentication-api";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                userName: {
                    value: ""
                },
                password: {
                    value: ""
                }
            }
        };
    }

    handleInputOnChange(fieldName, e) {
        const inputValue = e.target.value;
        const { inputs } = this.state;
        inputs[fieldName].value = inputValue;
        inputs[fieldName].isDirty = true;
        this.setState({
            inputs: { ...inputs }
        });
    }

    handleInputOnblur(e) {
        e.preventDefault();
        const { inputs } = this.state;
        const { userName } = inputs;
        //validate for userName
        if (userName.isDirty) {
            apiCheckUserName({ userName: userName.value },
                (result) => {
                    userName.message = result.data.status ? "" : "Tài khoản không tồn tại";
                    this.forceUpdate();
                },
                (error) => {
                    userName.message = error.toString();
                    this.forceUpdate();
                });
        }
    }

    handleBtnLoginClick() {
        const { userName, password } = this.state.inputs;
        const { dispatch } = this.props;
        const localStorage = window.localStorage;
        const credential = {
            userName: userName.value,
            password: password.value
        };
        dispatch(login(credential, localStorage));
    }

    render() {
        const { userName, password } = this.state.inputs;
        return (
            <div className="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-4">
                <h3>Đăng Nhập</h3>
                <div className="col-xs-12">
                    <div className="form-group">
                        <label htmlFor="userName">Tài khoản</label>
                        <input type="userName"
                            value={userName.value}
                            onChange={(e) => { this.handleInputOnChange("userName", e); }}
                            onBlur={(e) => { this.handleInputOnblur(e); }}
                            className="form-control" id="email" />
                        <span className="text-danger">{userName.message}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input type="password"
                            value={password.value}
                            onChange={(e) => { this.handleInputOnChange("password", e); }}
                            className="form-control" id="pwd" />
                    </div>
                    <div className="checkbox">
                        <label><input type="checkbox" />Ghi nhớ tôi</label>
                    </div>
                    <div className="form-group">
                        <button className="col-xs-6 btn btn-save" onClick={this.handleBtnLoginClick.bind(this)}>
                            Đăng nhập
                        </button>
                        <button className="col-xs-6 btn btn-cancel">
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect()(Login);
