import React from "react";
import PropTypes from "prop-types";
import ProductsManagement from "./../components/products-management";
import OrdersManagement from "./../components/orders-management";
import { connect } from "react-redux";

class ShopManagement extends React.Component {
    constructor(props) {
        super(props);
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
        return (
            <div className="row">
                <h2>Quảng lý cửa hàng</h2>
                <ul className="nav nav-tabs">
                    {tabsWillRender}
                </ul>
            </div>
        );
    }

}

ShopManagement.propTypes = {
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
    return {

    };
};


export default connect(mapStateToProps)(ShopManagement);
