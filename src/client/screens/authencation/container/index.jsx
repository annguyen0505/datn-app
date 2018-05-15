import React from "React";
import { login } from "./../actions";
import { connect } from "react-redux";
import { isEmptyInput, requiedMessage } from "./../../../helpers/validation-helper";

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

    componentWillReceiveProps(nextProps) {
        const { isAuthenticated, router } = nextProps;
        if (isAuthenticated) {
            router.push("/shop-management");
        }
    }

    handleInputOnFocus(fieldName, e) {
        e.preventDefault();
        const { inputs } = this.state;
        inputs[fieldName].isDirty = true;
    }

    handleInputOnChange(fieldName, e) {
        e.preventDefault();
        const inputValue = e.target.value;
        const { inputs } = this.state;
        inputs[fieldName].value = inputValue;
        this.setState({
            inputs: { ...inputs }
        });
    }

    validateInputs() {
        const { inputs } = this.state;
        const { userName, password } = inputs;
        userName.message = (userName.isDirty || this.formDirty) && isEmptyInput(userName.value.trim()) ? requiedMessage("Tài khoản") : "";
        password.message = (password.isDirty || this.formDirty) && isEmptyInput(password.value.trim()) ? requiedMessage("Mật khẩu") : "";
        this.setState({
            inputs: { ...inputs }
        });
        return inputs;
    }

    validateForm() {
        const inputs = this.validateInputs();
        for (const property in inputs) {
            if (inputs[property].message.trim().length > 0) {
                return false;
            }
        }
        return true;
    }

    handleBtnLoginClick(e) {

        e.preventDefault();
        this.formDirty = true;
        if (this.validateForm()) {
            const { dispatch } = this.props;
            const { inputs } = this.state;
            const { userName, password } = inputs;
            const localStorage = window.localStorage;
            const credential = {
                userName: userName.value,
                password: password.value
            };
            dispatch(login(credential, localStorage));
        }
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
                            onFocus={(e) => { this.handleInputOnFocus("userName", e); }}
                            onChange={(e) => { this.handleInputOnChange("userName", e); }}
                            onBlur={(e) => { this.validateInputs(e); }}
                            className="form-control" id="email" />
                        <span className="text-danger">{userName.message}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input type="password"
                            value={password.value}
                            onFocus={(e) => { this.handleInputOnFocus("password", e); }}
                            onChange={(e) => { this.handleInputOnChange("password", e); }}
                            onBlur={(e) => { this.validateInputs(e); }}
                            className="form-control" id="pwd" />
                        <span className="text-danger">{password.message}</span>

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

const mapStateToProps = (state) => {
    const { authenticationReducer } = state;
    const { profile, isAuthenticated } = authenticationReducer
    return {
        profile,
        isAuthenticated
    };
};

export default connect(mapStateToProps)(Login);
