import React from "react";
import PropTypes from "prop-types";
import ProductsManagement from "./../components/products-management";
import OrdersManagement from "./../components/orders-management";
import { getAccessToken } from "./../../../helpers/cookie-helper";
import { getLocalUserProfile } from "./../../../helpers/jwt-helper";
import { connect } from "react-redux";

class ShopManagement extends React.Component {
    constructor(props) {
        super(props);
        this.userId = null;
        this.shopId = null;
        this.state = {
            tabs: [
                {
                    title: "Quảng lý sản phẩm",
                    active: true
                },
                {
                    title: "Quảng lý đơn hàng",
                    active: false
                }]
        };
    }
    componentDidMount() {
        const localStorage = window.localStorage;
        const accessToken = getAccessToken(localStorage) || null;
        const profile = accessToken === null ? null : getLocalUserProfile(accessToken);
        this.shopId = profile.shopId;
        this.forceUpdate();
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
                ><a href="#" key={index}>{tab.title}</a></li>
            );
        });

        const renderTabsContent = () => {
            for (let i = 0; i < tabs.length; i++) {
                const tab = tabs[i];
                if (tab.active) {
                    switch (tab.title) {
                        case "Quảng lý sản phẩm": return <ProductsManagement shopId={this.shopId} />
                        case "Quảng lý đơn hàng": return <OrdersManagement shopId={this.shopId} />
                        default: return null;
                    }
                }
            }
        };

        return (
            <div className="col-xs-12">
                <h2>Quảng lý cửa hàng</h2>
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
    const { authenticationReducer } = state;
    const { profile } = authenticationReducer;
    const userId = profile === null ? null : profile.userId;
    return {
        userId
    };
};

export default connect(mapStateToProps)(ShopManagement);
