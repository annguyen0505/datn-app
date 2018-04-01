import getAccessToken from "./cookie-helper";
const jwtDecode = require("jwt-decode");

export const getLocalUserProfile = () => {
    return jwtDecode(getAccessToken());
};
