import React from "react";
import PropTypes from "prop-types";
import GridView from "./../../../commons/gridview/gridview";
import { apiGetOrders } from "./../../../apis/order-management-api";
import { connect } from "react-redux";
import { getOrders, deleteOrder, changeConfirmation } from "./../actions/order-action";

class OrdersManagement extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { criteria, dispatch, shopId } = this.props;
        criteria.shopId = shopId;
        dispatch(getOrders(criteria));
    }

    componentWillReceiveProps(nextProps) {
        const { needReload, criteria, dispatch } = nextProps;
        if (needReload) {
            dispatch(getOrders(criteria));
        }
    }

    handleGridViewActionClick(action, identifier) {
        switch (action) {
            case "delete":
                {
                    const { dispatch } = this.props;
                    dispatch(deleteOrder(identifier));
                    break;
                }
        }
    }

    handleGridViewCheckBoxClick(identifier, value, column) {
        const { dispatch } = this.props;
        dispatch(changeConfirmation(identifier, value));
    }

    //Reload datasource by criteria here
    handleGridViewReload(gridCriteria) {
        // const { criteria, dispatch } = this.props;
        // const { page, itemPerPage } = gridCriteria;
        // const newCriteria = {
        //     ...criteria,
        //     pageNumber: page,
        //     pageSize: itemPerPage
        // };
        // dispatch(getShopProducts(newCriteria));
    }

    render() {
        const { columns, criteria, orders, totalRecords } = this.props;
        const gridCriteria = {
            sortColumn: "RowNumber",
            sortDirection: true,
            page: criteria.pageNumber,
            itemPerPage: criteria.pageSize
        };
        return (
            <div className="row">
                <GridView
                    allowSorting={false}
                    criteria={gridCriteria}
                    totalRecords={totalRecords}
                    datasources={orders} //Pass datasources
                    columns={columns} //Pass columns array
                    identifier={"orderId"} //Identifier for grid row
                    defaultSortColumn={""} //Default sort column
                    actions={["delete", "review"]} //Remove if no action needed
                    actionHeader=" "
                    onGridViewReload={this.handleGridViewReload.bind(this)} //Paginate changed => need reload datasource base on criteria
                    onActionClick={this.handleGridViewActionClick.bind(this)} //Handle actions
                    onCheckboxClick={this.handleGridViewCheckBoxClick.bind(this)}
                />
            </div>
        );
    }

}

OrdersManagement.propTypes = {
    dispatch: PropTypes.func
};

OrdersManagement.defaultProps = {
    columns: [
        {
            title: "ID",
            data: "orderId"
        },
        {
            title: "Ngày đặt hàng",
            data: "dateOrdered",
            type: "datetime"
        },
        {
            title: "Tên khách hàng",
            data: "customerName"
        },
        {
            title: "Địa chỉ khách hàn",
            data: "customerAddress"
        },
        {
            title: "SĐT khách hàng",
            data: "customerPhone"
        },
        {
            title: "Email khách hàng",
            data: "customerEmail"
        },
        {
            title: "Xác nhận",
            data: "confirmed",
            type: "checkboxChange"
        }
    ]
};
const mapStateToProps = (state) => {
    const { orderReducer } = state;
    const { criteria, needReload, orders, totalRecords } = orderReducer;
    return {
        criteria,
        needReload,
        orders,
        totalRecords
    };
};


export default connect(mapStateToProps)(OrdersManagement);
