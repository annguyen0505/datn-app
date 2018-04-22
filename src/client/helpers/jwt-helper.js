const jwtDecode = require("jwt-decode");

export const getLocalUserProfile = (accessToken) => {
    return jwtDecode(accessToken);
};
