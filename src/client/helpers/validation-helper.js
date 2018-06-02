
export const isEmptyInput = (input) => {
    return input.length === 0;
};

export const requiedMessage = (field) => {
    return `Vui lòng nhập  ${field}`;
};

// export const validateEmail = (email) => {
//     const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
//     return emailPattern.test(email);
// };
export const validateEmail = (value) => {
    return /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(value) || value.length === 0;

};

export const validatePhoneNumber = (phone) => {
    const phonePattern = /(\+84|0)\d{9,10}$/;
    return phonePattern.test(phone);
};
