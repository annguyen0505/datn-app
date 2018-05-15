import React from "react";
import { Route, IndexRoute } from "react-router";
import MasterPage from "./screens/root-component/container";
import Login from "./screens/authencation/container";
import Collections from "./commons/collections";
// import UploadDemo from "./commons/upload-to-filebase";
import Home from "./screens/home/container";
import ShopView from "./screens/shop-view/container";
import ShopManagement from "./screens/shop-management/container";
import CartManagement from "./screens/cart-management/container/index";
import Register from "./screens/register/container/index";
export const routes = (
    <Route path="/" component={MasterPage}>
        <IndexRoute component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/demo-collection" component={Collections} />
        {/* <Route path="/demo-upload/:shopId" component={UploadDemo} /> */}
        <Route path="/shop-view/:shopId" component={ShopView} />
        <Route path="/shop-management" component={ShopManagement} />
        <Route path="/cart" component={CartManagement} />
        <Route path="/register" component={Register} />

    </Route>
);

