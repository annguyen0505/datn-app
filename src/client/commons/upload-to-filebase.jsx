import React from "react";
import Guid from "guid";
import firebase from "./../helpers/firebase-helper.js";
import { axiosGet } from "./../helpers/axios-helper.js";
import { apiGetShops } from "./../apis/shops-management.jsx";
const uuidv1 = require("uuid/v1");

export default class UploadDemo extends React.Component {
    constructor(props) {
        super(props);
        this.fileInput = null;
    }
    componentDidMount() {

    }
    handleSubmit(e) {
        e.preventDefault();
        const ref = firebase.storage().ref();
        const imagesRef = ref.child("images");
        const file = this.fileInput.files[0];
        const fileName = `${file.name}-${uuidv1()}`;
        const metadata = {
            contentType: file.type
        };

        imagesRef.child(fileName).put(file, metadata).then((snapshot) => {
            console.log(snapshot);
        });
    }

    handleCallAxios(e) {
        e.preventDefault();

        const params = {
            shopName: "an",
            category: 1,
            pageNumber: 1
        };

        apiGetShops(params, (result) => {
            console.log(result);
        }, (error) => {
            console.log(error);
        });

    }

    render() {
        return (
            <div>
                <h2>{this.props.params.shopId}</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Upload file:
                   <input type="file" ref={input => { this.fileInput = input; }} />
                    </label>
                    <br />
                    <button type="submit" onClick={this.handleSubmit.bind(this)}>Submit</button>
                    <button onClick={this.handleCallAxios.bind(this)}>Call Axios</button>
                </form>

            </div>
        );
    }
}
