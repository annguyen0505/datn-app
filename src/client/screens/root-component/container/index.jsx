import React, { Component } from "react";
import Nav from "../components/Nav";


class MasterPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
               <Nav />
            </div>
        );
    }
}

export default MasterPage;
