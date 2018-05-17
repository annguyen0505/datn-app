import React from "react";
class Nav extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span> 
                         </button>
                        <a className="navbar-brand" href="#">LOGO</a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul class="nav navbar-nav">
                            <li><a href="#">Trang chủ</a></li>
                            <li><a href="#">Thanh toán</a></li>
                            <li><a href="#">Giỏ hàng</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#"><span className="glyphicon glyphicon-user" /> Đăng ký</a></li>
                            <li><a href="#"><span className="glyphicon glyphicon-log-in" /> Đăng nhập</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav;
