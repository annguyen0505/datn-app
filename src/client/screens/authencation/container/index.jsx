import React from "React";


class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <h3>Đăng Nhập</h3>
                <div >
                    <div className="input-field col s6">
                        <input id="user_name" type="text" className="validate" />
                        <label htmlFor="user_name">Tài Khoản</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="password" type="text" className="validate" />
                        <label htmlFor="password">Mật khẩu</label>
                    </div>
                    <div className="row col s6">
                        <button className="col s6 input-field btn btn-save">
                            Đăng nhập
                        </button>
                        <button className="col s6 input-field btn btn-cancel">
                            Hủy
                        </button>
                    </div>
                </div>

            </div>
        );
    }

}

export default Login;
