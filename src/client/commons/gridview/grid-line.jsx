import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

/*eslint-disable */

export class GridLine extends React.Component {

    render() {
        const self = this;
        const { data, columns, actions, rownumber, allowRowSelect } = this.props;
        const renderCells = function () {

            return columns.map((column, cellId) => {
                switch (column.type) {
                    case "checkbox":
                        return (
                            <td key={cellId}><input type="checkbox" readOnly="readOnly" checked={data[column.data]} /> </td>
                        );
                    case "checkboxChange":
                        return (
                            <td key={cellId}><input type="checkbox" checked={data[column.data]} onChange={(e) => self.props.onCheckboxClick(e.target.checked, column.data)} /> </td>
                        );

                    case "image":
                        return (<td key={cellId}><img src={data[column.data]} style={{ width: "auto", height: "auto", maxWidth: "50px", maxHeight: "50px" }} />
                        </td>
                        );
                    case "datetime":
                        {
                            let date = "";
                            if (data[column.data]) {
                                date = moment(data[column.data]).format("MM/DD/YYYY HH:mm:ss A").toString();
                            }
                            return (
                                <td key={cellId}>{date}</td>
                            );
                        }

                    case "link":
                        return (<td key={cellId}><a href="#" onClick={() => self.props.onActionClick(column.action)}>{data[column.data]}</a></td>);
                    case "rownumber":
                        return (<td key={cellId}>{rownumber + 1}</td>);

                    case "client-action":
                        {
                            const inActive = data.Inactive;
                            return (
                                <div>
                                    <button onClick={() => self.props.onActionClick("edit")} className="btn btn-default glyphicon glyphicon-pencil offset3"></button>
                                    {inActive ? <button onClick={() => self.props.onActionClick("changeStatus")} className="btn btn-default glyphicon glyphicon-repeat offset3"></button> :
                                        <button onClick={() => self.props.onActionClick("changeStatus")} className="btn btn-default glyphicon glyphicon-lock offset3"></button>}
                                </div>
                            );
                        }

                    default:
                        {
                            if (data[column.data] && data[column.data].toString().length > 40) {
                                return (<td key={cellId}><label title={data[column.data].toString()}>{`${data[column.data].toString().substr(0, 40)}...`}</label></td>);
                            } else {
                                return (
                                    <td key={cellId}>{data[column.data]}</td>
                                );
                            }
                        }
                }
            });
        };


        const renderActionCell = function () {
            if (actions.length > 0) {
                const renderActionButtons = () => {
                    return actions.map((action, actionId) => {
                        let buttonClassName = "";
                        switch (action) {
                            case "edit":
                                buttonClassName = "glyphicon glyphicon-pencil";
                                break;
                            case "delete":
                                buttonClassName = "glyphicon glyphicon-remove";
                                break;
                            case "review":
                                buttonClassName = "glyphicon glyphicon-search";
                                break;
                        }
                        return (
                            <button className="btn btn-xs" onClick={() => {
                                self.props.onActionClick(action);
                            }} key={actionId} className={buttonClassName}
                            >{action}</button>
                        );
                    });
                };

                return (<td>{renderActionButtons()}</td>);
            }

            return null;
        };

        const renderMainRow = function (e) {
            if (allowRowSelect) {
                data.isSelected = !data.isSelected;
                self.props.onRowClick(data);
            }
        };

        return (
            <tr onClick={(e) => {
                renderMainRow(e);
            }}
                className={(data.isSelected && allowRowSelect) ? "text-danger" : ""}
            >
                {renderCells()}
                {renderActionCell()}
            </tr>
        );
    }
}

GridLine.propTypes = {
    columns: PropTypes.array,
    actions: PropTypes.array,
    data: PropTypes.object,
    onActionClick: PropTypes.func,
    onCheckboxClick: PropTypes.func,
    rownumber: PropTypes.number,
    allowRowSelect: PropTypes.bool
};

export default GridLine;
                        /*eslint-disable */
