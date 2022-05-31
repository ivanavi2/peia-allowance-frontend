const transformCamelCaseString = (string) => {
    let transformedString;
    transformedString = string.charAt(0).toUpperCase() + string.slice(1); // Capitalize the first letter
    transformedString = transformedString.replace(/([0-9A-Z])/g, " $&"); // Add space between camel casing
    return transformedString;
};

export default transformCamelCaseString;
