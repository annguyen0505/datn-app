import React from "react";
import GridLine from "./grid-line";
import GridHeader from "./grid-header";
import GridPaginate from "./grid-paginate";
import PropTypes from "prop-types";

export class GridView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortColumn: this.props.criteria.sortColumn,
            sortDirection: this.props.criteria.sortDirection,
            itemPerPage: this.props.criteria.itemPerPage,
            page: this.props.criteria.page,
            allowRowSelect: this.props.allowRowSelect
        };
    }

    componentWillReceiveProps(nextProps) {
        const { criteria } = nextProps;
        const newState = {
            sortColumn: criteria.sortColumn,
            sortDirection: criteria.sortDirection,
            itemPerPage: criteria.itemPerPage,
            page: criteria.page,
            allowRowSelect: nextProps.allowRowSelect
        };

        this.setState(newState);
    }

    handleSorting(sortColumn) {
        let sortDirection = this.state.sortDirection;
        if (sortColumn === this.state.sortColumn) {
            sortDirection = !sortDirection;
        }

        this.setState({
            sortColumn,
            sortDirection
        });

        this.props.onGridViewReload({ ...this.state, sortColumn, sortDirection });
    }

    handlePaginateChanged(page, itemPerPage) {
        this.setState({
            page,
            itemPerPage
        });
        this.props.onGridViewReload({ ...this.state, page, itemPerPage });
    }

    render() {
        const { isUseNoRecordFoundSearchMessage, totalRecords, datasources, columns, actions, identifier, allowSorting, noRecordFoundStr, allowRowSelect, agentCustomAction } = this.props;
        const self = this;
        const renderGridLines = () => {

            if (datasources.length === 0) {

                let noRecordFoundMessage = "There are no records to show.";

                if (noRecordFoundStr) {
                    noRecordFoundMessage = noRecordFoundStr;
                } else if (isUseNoRecordFoundSearchMessage) {
                    noRecordFoundMessage = "No record found. Please try again with different search criteria.";
                }

                let colSpan = columns.length;
                if (actions.length > 0) {
                    colSpan += 1;
                }

                return (
                    <tr>
                        <td colSpan={colSpan}>
                            {noRecordFoundMessage}
                        </td>
                    </tr>
                );
            }

            return datasources.map((data, i) => {
                if (agentCustomAction) {
                    return (
                        <GridLine
                            onRowClick={(data) => { this.props.onRowClick(data); }}
                            onActionClick={(action) => { this.props.onActionClick(action, data[identifier]); }}
                            onCheckboxClick={(value, column) => this.props.onCheckboxClick(data[identifier], value, column)}
                            key={i} rownumber={i} data={data} columns={columns} actions={data.actionOption || []} allowRowSelect={allowRowSelect}
                        />
                    );
                } else {
                    return (
                        <GridLine
                            onRowClick={(data) => { this.props.onRowClick(data); }}
                            onActionClick={(action) => { this.props.onActionClick(action, data[identifier]); }}
                            onCheckboxClick={(value, column) => this.props.onCheckboxClick(data[identifier], value, column)}
                            key={i} rownumber={i} data={data} columns={columns} actions={actions} allowRowSelect={allowRowSelect}
                        />
                    );
                }

            });
        };

        const renderGridPaginate = function () {
            if (self.props.allowPaging && totalRecords > 0) {
                return (
                    <GridPaginate onPaginateChanged={self.handlePaginateChanged.bind(self)} totalRecords={totalRecords} {...self.props.criteria} />
                );
            }
            return null;
        };

        return (
            <div>
                <table className="table table-hover table-striped">
                    <GridHeader onSorting={this.handleSorting.bind(this)} allowSorting={allowSorting}
                        columns={columns} actions={actions} sortColumn={this.state.sortColumn}
                        sortDirection={this.state.sortDirection} actionHeader={this.props.actionHeader}
                    />
                    <tbody>
                        {renderGridLines()}
                    </tbody>
                </table>
                {renderGridPaginate()}
            </div>
        );
    }
}


GridView.defaultProps = {
    datasources: [],
    columns: [],
    actions: [],
    allowPaging: true,
    allowSorting: true,
    totalRecords: 0,
    isUseNoRecordFoundSearchMessage: false,
    allowRowSelect: false
};

GridView.propTypes = {
    datasources: PropTypes.array,
    columns: PropTypes.array,
    actions: PropTypes.arrayOf(PropTypes.string),
    identifier: PropTypes.string,
    defaultSortColumn: PropTypes.string,
    allowSorting: PropTypes.bool,
    onActionClick: PropTypes.func,
    onCheckboxClick: PropTypes.func,
    allowPaging: PropTypes.bool,
    onGridViewReload: PropTypes.func,
    totalRecords: PropTypes.number,
    criteria: PropTypes.object,
    noRecordFoundStr: PropTypes.string,
    isUseNoRecordFoundSearchMessage: PropTypes.bool,
    allowRowSelect: PropTypes.bool,
    actionHeader: PropTypes.string,
    agentCustomAction: PropTypes.bool
};

export default GridView;