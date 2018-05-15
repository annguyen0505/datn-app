
export const hasStringValue = (input) => {
    return input !== null && input !== undefined && input !== "";
};

export const toVNDformat = (moneyValue) => {
    let formatString = "";
    const moneyString = moneyValue.toString();
    const length = moneyString.length;
    for (let i = 0; i < length; i++) {
        const nextChar = ((length - i) % 3 === 0) ? `,${moneyString[i]}` : moneyString[i];
        formatString += nextChar;
    }
    if (formatString[0] === ",") {
        formatString = formatString.replace(",", "");
    }
    return formatString;
};
