import React from "react";
class Nav extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar nav-background">
                    <div className="navbar-header">
                        <h3>World Shop Online</h3>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#"><span className="glyphicon glyphicon-user" /> Sign Up</a></li>
                        <li><a href="#"><span className="glyphicon glyphicon-log-in" /> Login</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Nav;
