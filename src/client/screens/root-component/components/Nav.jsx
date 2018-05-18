import React from "react";
import { getAccessToken } from "./../../../helpers/cookie-helper";
import { getLocalUserProfile } from "./../../../helpers/jwt-helper";
import { Link } from "react-router";


class Nav extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const accessToken = getAccessToken(localStorage) || null;
        const profile = accessToken === null ? null : getLocalUserProfile(accessToken);
        this.profile = profile;
    }

    render() {

        const { isAuthenticated } = this.props;
        return (
            <nav className="navbar navbar-default nav-background"
                >
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                        <a className="navbar-brand" href="#">LOGO</a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Trang chủ</Link></li>
                            {isAuthenticated ?
                                <li>
                                    <Link to="/shop-management">Quản lý cửa hàng</Link>
                                </li> : null
                            }
                            <li><Link to="/cart">Giỏ hàng</Link></li>
                        </ul>
                        {isAuthenticated ? <ul className="nav navbar-nav navbar-right">
                            <li><a href="#"><span className="glyphicon glyphicon-user" /> {this.profile.userName}</a></li>
                            <li><a href="#"><span className="glyphicon glyphicon-log-in" /> Đăng xuất </a></li>
                        </ul> : <ul className="nav navbar-nav navbar-right">
                                <li><a href="#"><span className="glyphicon glyphicon-user" /> Đăng ký</a></li>
                                <li><a href="#"><span className="glyphicon glyphicon-log-in" /> Đăng nhập</a></li>
                            </ul>}
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav;
