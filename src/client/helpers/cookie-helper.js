
export const saveAccessToken = (localStorage, accessToken) => {
    localStorage.setItem("accessToken", accessToken);
};

export const getAccessToken = (localStorage) => {
    return localStorage.getItem("accessToken");
};

export const removeAccessToken = (localStorage) => {
    localStorage.removeItem("accessToken");
};
