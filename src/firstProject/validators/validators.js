export const reguired = value => {
    if (value) return undefined;
    return 'field is reguired'
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength}`;
    return undefined
}