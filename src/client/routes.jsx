import React from "react";
import { Route, IndexRoute } from "react-router";
import Home from "./screens/root-component/container";
import Login from "./screens/authencation/container";

const About = () => {
    return (
        <div>
            <h2>About page</h2>
        </div>
    );
};

export const routes = (
    <Route path="/" component={Home}>
        <IndexRoute component={About} />
        <Route path="/login" component={Login} />
    </Route>
);

