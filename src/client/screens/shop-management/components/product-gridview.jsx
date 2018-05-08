import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getShopProducts } from "./../actions/product-actions";
import GridView from "./../../../commons/gridview/gridview";
import ProductAddingModal from "./product-adding-modal";
class ProductGridView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenAddModal: false
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

    handleTogleAddModal() {
        this.setState({
            isOpenAddModal: !this.state.isOpenAddModal
        });
    }

    //Handle actions such as edit,delete
    handleGridViewActionClick(action, identifier) {
        switch (action) {
            case "edit":
                console.log(`Edit ${identifier}`);
                break;
            case "delete":
                console.log(`Delete ${identifier}`);
                break;
            case "download":
                console.log(`Download ${identifier}`);
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
            <div className="">
                <div className="row">
                    <div className="col-xs-12 col-md-2">
                        <button type="button" onClick={() => { this.handleTogleAddModal(); }} className="col-md-12 btn btn-success">
                            <span className="glyphicon glyphicon-plus" aria-hidden="true">Thêm mới</span>
                        </button>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <GridView
                        criteria={gridCriteria}
                        totalRecords={totalRecords}
                        datasources={products} //Pass datasources
                        columns={columns} //Pass columns array
                        identifier={"productId"} //Identifier for grid row
                        defaultSortColumn={"productId"} //Default sort column
                        // actions={["edit", "delete"]} //Remove if no action needed
                        onGridViewReload={this.handleGridViewReload.bind(this)} //Paginate changed => need reload datasource base on criteria
                        onActionClick={this.handleGridViewActionClick.bind(this)} //Handle actions
                    />
                </div>
                <ProductAddingModal isOpenAddModal={this.state.isOpenAddModal} handleToggleModal={this.handleTogleAddModal.bind(this)} />
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
    const { criteria, products, totalRecords } = productReducer;
    return {
        criteria,
        products,
        totalRecords
    };
};


export default connect(mapStateToProps)(ProductGridView);
