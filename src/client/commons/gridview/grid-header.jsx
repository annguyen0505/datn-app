import React from "react";
import PropTypes from "prop-types"
export class GridHeader extends React.Component {
    render() {

        const { actions, columns, sortColumn, sortDirection, allowSorting, actionHeader } = this.props;


        const renderHeaderCells = () => {
            return columns.map((column, id) => {
                const renderSortIcon = function () {
                    if (allowSorting) {
                        if (column.data === sortColumn) {
                            const triangleTopClassName = sortDirection ? "glyphicon glyphicon-triangle-bottom" : "";
                            const triangleBottomClassName = sortDirection ? "" : "glyphicon glyphicon-triangle-top";
                            return (
                                <span>
                                    <i className={triangleTopClassName}></i>
                                    <i className={triangleBottomClassName}></i>
                                </span>
                            );
                        }
                    }

                    return null;
                };

                return (
                    <th onClick={() => {
                        if (allowSorting) {
                            this.props.onSorting(column.data);
                        }
                    }} key={id}
                    >{column.title} {renderSortIcon()}</th>
                );
            });
        };

        const renderHeaderActionsCell = function () {
            if (actions.length > 0) {
                return (
                    <th>{actionHeader !== undefined ? `${actionHeader}` : "Action"}</th>
                );
            }

            return null;
        };

        return (
            <thead>
                <tr>
                    {renderHeaderCells()}
                    {renderHeaderActionsCell()}
                </tr>
            </thead>
        );
    }
}

GridHeader.propTypes = {
    columns: PropTypes.array,
    actions: PropTypes.array,
    sortColumn: PropTypes.string,
    sortDirection: PropTypes.bool,
    allowSorting: PropTypes.bool,
    onSorting: PropTypes.func,
    actionHeader: PropTypes.string
};

export default GridHeader;
