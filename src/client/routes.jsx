import React from "react";
import { Route, IndexRoute } from "react-router";
import MasterPage from "./screens/root-component/container";
import Login from "./screens/authencation/container";
import Collections from "./commons/collections";
import UploadDemo from "./commons/upload-to-filebase";
import Home from "./screens/home/container";
export const routes = (
    <Route path="/" component={MasterPage}>
        <IndexRoute component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/demo-collection" component={Collections} />
        <Route path="/demo-upload" component={UploadDemo} />
    </Route>
);

