export const SET_USER_PROFILE = "SET_USER_PROFILE";
export const REMOVE_USER_PROFILE = "REMOVE_USER_PROFILE";
export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    };
};

export const removeUserProfile = () => {
    return {
        type: REMOVE_USER_PROFILE
    };
};


