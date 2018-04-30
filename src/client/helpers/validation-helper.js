
export const isEmptyInput = (input) => {
    return input.length === 0;
};

export const requiedMessage = (field) => {
    return `Vui lòng nhập  ${field}`;
};

export const validateEmail = (email) => {
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return emailPattern.test(email);
};

export const validatePhoneNumber = (phone) => {
    const phonePattern = /(\+84|0)\d{9,10}$/;
    return phonePattern.test(phone);
};
