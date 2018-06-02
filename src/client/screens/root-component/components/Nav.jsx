/*eslint-disable */

import React from "react";
import { getAccessToken } from "./../../../helpers/cookie-helper";
import { getLocalUserProfile } from "./../../../helpers/jwt-helper";
import { Link } from "react-router";
import { connect } from "react-redux";
import { removeAccessToken } from "./../../../helpers/cookie-helper";
import { removeUserProfile } from "./../../authencation/actions/index";
import { socket } from "./../../../socket/socket";

class Nav extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const accessToken = getAccessToken(localStorage) || null;
        const profile = accessToken === null ? null : getLocalUserProfile(accessToken);
        this.profile = profile;
    }

    navidateTo(path) {
        const { router } = this.props;
        router.push(path);
    }

    handleLogout() {
        localStorage.removeItem("accessToken");
        this.props.dispatch(removeUserProfile());
        socket.emit("log-out",()=>{
            
        });
        this.navidateTo("/");
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
                        <a href="#" className="navbar-left"><img style={{
                            width: "70px",
                            height: "50px"
                        }}
                            src="https://firebasestorage.googleapis.com/v0/b/datn-827e8.appspot.com/o/images%2Flogo_offical.png?alt=media&token=0545cfc8-bf61-4464-8018-16f996ba4ce5" /></a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Trang chủ</Link></li>
                            {isAuthenticated ?
                                <li >
                                    <Link to="/shop-management">Quản lý cửa hàng</Link>
                                </li> : null
                            }
                            <li><Link to="/cart">Giỏ hàng</Link></li>
                        </ul>
                        {isAuthenticated ? <ul className="nav navbar-nav navbar-right">
                            <li><a href="#"><span className="glyphicon glyphicon-user" /> {this.profile.userName}</a></li>
                            <li onClick={(e) => { this.handleLogout(e); }}><a href="#"><span className="glyphicon glyphicon-log-in" /> Đăng xuất </a></li>
                        </ul> : <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <Link to="/register"><span className="glyphicon glyphicon-user" /> Đăng ký</Link></li>
                                <li>
                                    <Link to="/login"> <span className="glyphicon glyphicon-log-in" /> Đăng nhập</Link>
                                </li>
                            </ul>}
                    </div>
                </div>
            </nav>
        );
    }
}
const mapStateToProps = (state) => {
    return {

    };
};
export default connect(mapStateToProps)(Nav);
