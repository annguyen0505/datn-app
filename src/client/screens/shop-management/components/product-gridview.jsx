import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getShopProducts, deleteProduct } from "./../actions/product-actions";
import GridView from "./../../../commons/gridview/gridview";
import ProductAddingModal from "./product-adding-modal";
import DeleteProductModal from "./product-delete-modal";
class ProductGridView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenAddModal: false,
            isOpenDeleteModal: false
        };

    }

    componentDidMount() {
        const { criteria, dispatch, shopId } = this.props;
        const newCriteria = {
            ...criteria,
            shopId
        };
        dispatch(getShopProducts(newCriteria));
    }

    componentWillReceiveProps(nextProps) {
        const { addingStatus, deleteStatus, needReload, criteria, dispatch } = nextProps;
        if (addingStatus) {
            criteria.pageNumber = 1;
        }
        if (needReload) {
            dispatch(getShopProducts(criteria));
        }
    }
    handleTogleAddModal() {
        this.setState({
            isOpenAddModal: !this.state.isOpenAddModal
        });
    }
    handleTogleDeleteModal() {
        this.setState({
            isOpenDeleteModal: !this.state.isOpenDeleteModal
        });
    }

    handleAcceptDelete() {
        const { dispatch } = this.props;
        this.handleTogleDeleteModal();
        dispatch(deleteProduct(this.seletedProduct));
    }
    //Handle actions such as edit,delete
    handleGridViewActionClick(action, identifier) {
        switch (action) {
            case "edit":

                break;
            case "delete":
                this.seletedProduct = identifier;
                this.handleTogleDeleteModal();
                break;

        }
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
        dispatch(getShopProducts(newCriteria));
    }

    render() {
        const { products, columns, criteria, totalRecords } = this.props;
        const gridCriteria = {
            sortColumn: "RowNumber",
            sortDirection: true,
            page: parseInt(criteria.pageNumber),
            itemPerPage: criteria.pageSize
        };
        return (
            <div className="row">
                <div className="col-xs-12 col-md-2">
                    <button type="button" onClick={() => { this.handleTogleAddModal(); }} className="col-md-12 btn btn-success">
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        Thêm mới
                        </button>
                </div>
                <hr />
                <div className="col-xs-12">
                    <GridView
                        allowSorting={false}
                        criteria={gridCriteria}
                        totalRecords={totalRecords}
                        datasources={products} //Pass datasources
                        columns={columns} //Pass columns array
                        identifier={"productId"} //Identifier for grid row
                        defaultSortColumn={"productId"} //Default sort column
                        actions={["edit", "delete"]} //Remove if no action needed
                        actionHeader=" "
                        onGridViewReload={this.handleGridViewReload.bind(this)} //Paginate changed => need reload datasource base on criteria
                        onActionClick={this.handleGridViewActionClick.bind(this)} //Handle actions
                    />
                </div>
                <ProductAddingModal shopId={this.props.shopId} isOpenAddModal={this.state.isOpenAddModal} handleToggleModal={this.handleTogleAddModal.bind(this)} />
                <DeleteProductModal
                    isOpenDeleteModal={this.state.isOpenDeleteModal}
                    handleToggleModal={this.handleTogleDeleteModal.bind(this)}
                    onAccept={this.handleAcceptDelete.bind(this)}
                />
            </div>
        );
    }

}

ProductGridView.propTypes = {
    dispatch: PropTypes.func,
    criteria: PropTypes.object,
    shopId: PropTypes.string,
    products: PropTypes.array,
    columns: PropTypes.array,
    totalRecords: PropTypes.number

};

ProductGridView.defaultProps = {

    columns: [
        {
            title: "ID",
            data: "productId"
        },
        {
            title: "hình ảnh",
            data: "imgUrl",
            type: "image"
        },
        {
            title: "Tên Sản Phẩm",
            data: "productName"
        },
        {
            title: "Giá",
            data: "price"
        },
        {
            title: "Loại Sản Phẩm",
            data: "categoryName"
        }
    ]
};
const mapStateToProps = (state) => {
    const { productReducer } = state;
    const { criteria, products, totalRecords, addingStatus, needReload, deleteStatus } = productReducer;
    return {
        criteria,
        products,
        totalRecords,
        addingStatus,
        needReload,
        deleteStatus
    };
};


export default connect(mapStateToProps)(ProductGridView);
