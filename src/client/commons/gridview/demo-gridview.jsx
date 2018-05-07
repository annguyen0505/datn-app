import React from "react";
import GridView from "./GridView";

export class DemoGridView extends React.Component {

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
    handleGridViewReload(criteria) {
        console.log(criteria);
    }

    render() {
        const { datasources, columns, defaultCriteria } = this.props;
        return (
            <GridView
                criteria={defaultCriteria}
                totalRecords={10}
                datasources={datasources} //Pass datasources
                columns={columns} //Pass columns array
                identifier={"id"} //Identifier for grid row
                defaultSortColumn={"id"} //Default sort column
                actions={["edit", "delete"]} //Remove if no action needed
                onGridViewReload={this.handleGridViewReload.bind(this)} //Paginate changed => need reload datasource base on criteria
                onActionClick={this.handleGridViewActionClick.bind(this)} //Handle actions
            />
        );
    }
}

DemoGridView.defaultProps = {

    columns: [
        {
            title: "ID",
            data: "id"
        },
        {
            title: "Name",
            data: "name"
        },
        {
            title: "Address",
            data: "address"
        },
        {
            title: "Active",
            data: "isActive",
            type: "checkbox"
        }, {
            title: "Deposit",
            data: "deposit",
            type: "money"
        }, {
            title: "Document",
            data: "name",
            type: "link",
            action: "download"
        },
        {
            title: "Images",
            data: "image",
            type: "image"
        }
    ],

    datasources: [{
        id: 1,
        name: "Le Viet Khanh",
        age: 29,
        address: "Hoi An",
        isActive: true,
        deposit: 100,
        image: "https://znews-photo-td.zadn.vn/w660/Uploaded/Vyxqxqeiox/2018_04_12/0.jpg"
    }, {
        id: 2,
        name: "Pham Linh Vy",
        age: 27,
        address: "Da Nang",
        isActive: true,
        deposit: 200
    },
    {
        id: 3,
        name: "Nguyen Thi Lan",
        age: 27,
        address: "Da Nang",
        isActive: false,
        deposit: 300
    }
    ],
    defaultCriteria: {
        sortColumn: "RowNumber",
        sortDirection: true,
        page: 1,
        itemPerPage: 10
    }
};

export default DemoGridView;