// Function to validate a string input for a field, ensuring it's not empty and contains only letters and spaces

function validateString(input, fieldName) {
    // Check if the input is empty or only consists of spaces
    if (!input.trim()) {
        alert(`${fieldName} cannot be empty.`);
        return false;  
    }

    // Check if the input contains only letters (including Turkish characters) and spaces
    if (!/^[a-zA-ZığüşöçİĞÜŞÖÇ\s]+$/.test(input)) {

        alert(`${fieldName} should only contain letters and spaces.`);
        return false;  
    }

    return true;  // Return true if the input is valid
}

export default validateString;  
