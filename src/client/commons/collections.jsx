import React from "react";
import PropTypes from "prop-types";
import Guid from "guid";
import Pagination from "react-js-pagination";

export default class Collections extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { data } = this.props;
        const renderCollections = () => {
            if (Array.isArray(data)) {
                return data.map((collection) => {
                    return (
                        <div key={`collection-${Guid.raw()}`} className="col-xs-4 col-md-2">
                            <div className="thumbnail" >
                                <img src={collection.coverPhoto} alt="" className="circle" />
                                <div className="caption">
                                    <h3>{collection.shopName}</h3>
                                    <p> {collection.categories.toString()}</p>
                                    <p><a href="#" className="btn btn-primary" role="button">Xem</a></p>
                                </div>
                            </div>
                        </div>
                    );
                });
            }
            return null;
        };

        return (
            <div>
                <ul className="collection">
                    {renderCollections()}
                </ul>
                <div>
                    <Pagination
                        activePage={1}
                        itemsCountPerPage={10}
                        totalItemsCount={450}
                        pageRangeDisplayed={5}
                    // onChange={: :this.handlePageChange}
                    />
                </div>
            </div>

        );
    }

}

Collections.propTypes = {
    data: PropTypes.array,
    totalRecords: PropTypes.number,
    handlePageChange: PropTypes.func
};

Collections.defaultProps = {
    data: [
        {
            coverPhoto: "https://vsdatablob.blob.core.windows.net/storeimages/thane_viviana_109f1.jpg",
            shopName: "Annk1",
            categories: ["Phone", "Clothing"]
        }, {
            coverPhoto: "https://vsdatablob.blob.core.windows.net/storeimages/thane_viviana_109f1.jpg",
            shopName: "Annk1",
            categories: ["Phone", "Clothing"]
        }, {
            coverPhoto: "https://vsdatablob.blob.core.windows.net/storeimages/thane_viviana_109f1.jpg",
            shopName: "Annk1",
            categories: ["Phone", "Clothing"]
        }, {
            coverPhoto: "https://vsdatablob.blob.core.windows.net/storeimages/thane_viviana_109f1.jpg",
            shopName: "Annk1",
            categories: ["Phone", "Clothing"]
        }, {
            coverPhoto: "https://vsdatablob.blob.core.windows.net/storeimages/thane_viviana_109f1.jpg",
            shopName: "Annk1",
            categories: ["Phone", "Clothing"]
        }, {
            coverPhoto: "https://vsdatablob.blob.core.windows.net/storeimages/thane_viviana_109f1.jpg",
            shopName: "Annk1",
            categories: ["Phone", "Clothing"]
        }, {
            coverPhoto: "https://vsdatablob.blob.core.windows.net/storeimages/thane_viviana_109f1.jpg",
            shopName: "Annk1",
            categories: ["Phone", "Clothing"]
        }
    ],
    totalRecords: 23
};
