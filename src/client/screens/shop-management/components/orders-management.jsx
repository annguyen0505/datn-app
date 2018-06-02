import React from "react";
import PropTypes from "prop-types";
import GridView from "./../../../commons/gridview/gridview";
import { apiSeenAllOrders } from "./../../../apis/order-management-api";
import { connect } from "react-redux";
import { getOrders, deleteOrder, changeConfirmation, getNewOrders } from "./../actions/order-action";
import { SimpleSelect } from "react-selectize";
import OrderDetailModal from "./order-details-modal";
import DeleteOrderModal from "./order-delete-modal";
class OrdersManagement extends React.Component {
    constructor(props) {
        super(props);
        this.orderSelected = null;
        this.defaultState = {
            searchName: "",
            confirm: {
                label: "Chọn",
                value: ""
            },
            isOpenDetailModal: false,
            isOpenDeleteModal: false
        };

        this.state = { ...this.defaultState };
    }
    componentDidMount() {
        const { criteria, dispatch, shopId } = this.props;
        criteria.shopId = shopId;
        dispatch(getOrders(criteria));
        apiSeenAllOrders({ shopId }, (rs) => { dispatch(getNewOrders(shopId)); });
    }

    toggleDetailModal() {
        const { isOpenDetailModal } = this.state;
        this.setState({
            isOpenDetailModal: !isOpenDetailModal
        });
    }
    toggleDeleteModal() {
        const { isOpenDeleteModal } = this.state;
        this.setState({
            isOpenDeleteModal: !isOpenDeleteModal
        });
    }

    componentWillReceiveProps(nextProps) {
        const { needReload, criteria, dispatch } = nextProps;
        if (needReload) {
            dispatch(getOrders(criteria));
        }
    }

    handleInputOnChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    handleConfirmationChange(value) {
        this.setState({
            confirm: value
        });
    }

    handleBtnSearchClick() {
        const { dispatch, criteria } = this.props;
        const { searchName, confirm } = this.state;
        criteria.searchName = searchName;
        criteria.isConfirmed = confirm.value;
        dispatch(getOrders(criteria));
    }

    handleGridViewActionClick(action, identifier) {
        switch (action) {
            case "delete":
                {
                    this.orderSelected = identifier;

                    this.toggleDeleteModal();
                    break;
                }
            case "review":
                {
                    this.orderSelected = identifier;
                    this.toggleDetailModal();
                    break;
                }
        }
    }

    handleAcceptDelete() {
        const { dispatch } = this.props;
        dispatch(deleteOrder(this.orderSelected));
        this.toggleDeleteModal();
    }

    handleGridViewCheckBoxClick(identifier, value, column) {
        const { dispatch } = this.props;
        dispatch(changeConfirmation(identifier, value));
    }

    //Reload datasource by criteria here
    handleGridViewReload(gridCriteria) {
        const { criteria, dispatch } = this.props;
        const { page, itemPerPage } = gridCriteria;
        const newCriteria = {
            ...criteria,
            pageNumber: page,
            pageSize: itemPerPage
        };
        console.log(newCriteria);
        dispatch(getOrders(newCriteria));
    }

    render() {
        const { columns, criteria, orders, totalRecords } = this.props;
        const { searchName, confirm } = this.state;
        const confirmationOptions = [
            {
                label: "Chọn",
                value: ""
            },
            {
                label: "Xác nhận",
                value: 1
            },
            {
                label: "Chưa xác nhận",
                value: 0
            }
        ];
        const gridCriteria = {
            sortColumn: "RowNumber",
            sortDirection: true,
            page: parseInt(criteria.pageNumber),
            itemPerPage: criteria.pageSize
        };
        return (
            <div style={{ marginTop: "1em" }} className="col-xs-12">
                <div className="row" style={{ marginBottom: "1em" }}>
                    <div className="col-md-3">
                        <div className="input-group">
                            <label htmlFor="searchName">Thông tin khác hàng</label>
                            <input type="text"
                                name="searchName" className="form-control"
                                id="searchName"
                                value={searchName}
                                onChange={(e) => { this.handleInputOnChange(e); }}
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-group ">
                            <label htmlFor="shopOrShopKeeper">Xác nhận</label>
                            <SimpleSelect options={confirmationOptions}
                                theme="bootstrap3"
                                value={confirm}
                                onValueChange={this.handleConfirmationChange.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="col-md-3 pull-right">
                        <label className="invisible">hidden text</label>
                        <div className="row">
                            <div className="col-md-6">
                                <button type="button" className="col-md-12 btn btn-success"
                                    onClick={(e) => { this.handleBtnSearchClick(e); }}>Tìm kiếm</button>
                            </div>
                            <div className="col-md-6">
                                <button type="button" className=" col-md-12 btn btn-default col-md-12"
                                    onClick={(e) => { this.handleBtnResetClick(e); }}>Trở về</button>
                            </div>
                        </div>
                    </div>
                </div>
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
                {this.state.isOpenDetailModal ? <OrderDetailModal
                    isOpenDetailModal={this.state.isOpenDetailModal}
                    handleToggleModal={this.toggleDetailModal.bind(this)}
                    orderId={this.orderSelected} /> : null}
                <DeleteOrderModal
                    isOpenDeleteModal={this.state.isOpenDeleteModal}
                    handleToggleModal={this.toggleDeleteModal.bind(this)}
                    onAcceptDetete={this.handleAcceptDelete.bind(this)}
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
            title: "Địa chỉ khách hàng",
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
