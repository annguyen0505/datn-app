export const saveAccessToken = (accessToken) => {
    const cookie = JSON.parse(document.cookie);
    if (cookie) {
        cookie.accessToken = accessToken;
    }

    document.cookie = JSON.stringify(cookie);
};

export const getAccessToken = () => {
    const cookie = JSON.parse(document.cookie);
    if (cookie.accessToken) {
        return cookie.accessToken;
    }
    return null;
};

export const removeAccessToken = () => {
    const cookie = JSON.parse(document.cookie);
    cookie.accessToken = null;
    document.cookie = JSON.stringify(cookie);
};

