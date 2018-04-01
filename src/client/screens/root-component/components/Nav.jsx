import React from "react";
class Nav extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="nav-background">
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">Logo</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="sass.html">Đăng nhập</a></li>
                            <li><a href="badges.html">Giỏ hàng</a></li>
                            <li><a href="collapsible.html">Cửa hàng của bạn</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Nav;