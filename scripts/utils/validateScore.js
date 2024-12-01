// Function to validate a score within the range of 0 to 100
function validateScore(score, fieldName) {


    // Check if the score is out of the valid range (0 - 100)
    if (score > 100 || score < 0) {

        alert(`${fieldName} , is not a valid score!`);
        return false;  
    }
    return true;  // Return true if the score is valid
}

export default validateScore; 
