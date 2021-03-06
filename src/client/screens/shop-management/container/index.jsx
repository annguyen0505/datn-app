import React from "react";
import PropTypes from "prop-types";
import ProductsManagement from "./../components/products-management";
import OrdersManagement from "./../components/orders-management";
import { getAccessToken } from "./../../../helpers/cookie-helper";
import { getLocalUserProfile } from "./../../../helpers/jwt-helper";
import { connect } from "react-redux";
import { Badge } from "react-bootstrap";
import { getNewOrders } from "./../actions/order-action";
class ShopManagement extends React.Component {
    constructor(props) {
        super(props);
        this.userId = null;
        this.shopId = null;
        this.state = {
            tabs: [
                {
                    title: "Quản lý sản phẩm",
                    active: true
                },
                {
                    title: "Quản lý đơn hàng",
                    active: false
                }]
        };
    }
    componentDidMount() {
        const localStorage = window.localStorage;
        const accessToken = getAccessToken(localStorage) || null;
        const profile = accessToken === null ? null : getLocalUserProfile(accessToken);
        if (profile === null) {
            const { router } = this.props;
            router.push("/login");
        }
        else {
            this.shopId = profile.shopId;
            const { dispatch } = this.props;
            dispatch(getNewOrders(this.shopId));
            this.forceUpdate();
        }
    }

    handleTabClick(index) {
        const { tabs } = this.state;
        const newTabs = tabs.map((tab, position) => {
            return {
                ...tab,
                active: index === position ? true : false
            };
        });
        this.setState({
            tabs: newTabs
        });
    }

    render() {
        const { tabs } = this.state;

        const tabsWillRender = tabs.map((tab, index) => {
            const classNameActive = tab.active ? "active" : "";
            return (
                <li onClick={() => {
                    this.handleTabClick(index);
                }} key={index} className={classNameActive}
                ><a style={{ border: "1px solid black", borderRadius: "4px" }}
                    href="#" key={index}>
                        {tab.title}
                        {tab.title === "Quản lý đơn hàng" ? <Badge bsClass="badge">{this.props.newOrders}</Badge> : null}
                    </a></li>
            );
        });

        const renderTabsContent = () => {
            const { router } = this.props;
            for (let i = 0; i < tabs.length; i++) {
                const tab = tabs[i];
                if (tab.active) {
                    switch (tab.title) {
                        case "Quản lý sản phẩm": return <ProductsManagement router={router} shopId={this.shopId} />
                        case "Quản lý đơn hàng": return <OrdersManagement shopId={this.shopId} />
                        default: return null;
                    }
                }
            }
        };

        return (
            <div className="col-xs-12">
                <h2 className="title" style={{ textAlign: "center" }}>Quản lý cửa hàng</h2>

                <hr />
                <div className="col-xs-12">
                    <ul className="nav nav-pills">
                        {tabsWillRender}
                    </ul>
                </div>

                <div>
                    {renderTabsContent()}
                </div>

            </div>
        );
    }

}

ShopManagement.propTypes = {
    dispatch: PropTypes.func,
    userId: PropTypes.number
};

const mapStateToProps = (state) => {
    const { authenticationReducer, orderReducer } = state;
    const { profile } = authenticationReducer;
    const userId = profile === null ? null : profile.userId;
    return {
        userId,
        newOrders: orderReducer.newOrders
    };
};

export default connect(mapStateToProps)(ShopManagement);
