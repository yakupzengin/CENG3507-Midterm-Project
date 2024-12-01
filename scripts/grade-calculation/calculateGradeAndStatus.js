
// Calculate grade and status based on midterm and final scores and grading scale

function calculateGradeAndStatus(midtermScore, finalScore, gradingScale) {
    
    // Calculate the total score based on the weights of midterm (40%) and final (60%)
    const score = (parseFloat(midtermScore) * 0.4) + (parseFloat(finalScore) * 0.6);

    // Round the score to 2 decimal places
    const roundedScore = parseFloat(score.toFixed(2));


    // Convert grading scale to a number
    gradingScale = Number(gradingScale);
    let letterGrade, status;


    // Log the grading scale for debugging purposes
    console.log("calculateGradeAndStatus function gradingScale:", gradingScale)


    // Determine the letter grade based on the grading scale
    if (gradingScale === 7) {
        if (roundedScore >= 93) letterGrade = "A";
        else if (roundedScore >= 85) letterGrade = "B";
        else if (roundedScore >= 77) letterGrade = "C";
        else if (roundedScore >= 70) letterGrade = "D";
        else letterGrade = "F";
    } else if (gradingScale === 10) {
        if (roundedScore >= 90) letterGrade = "A";
        else if (roundedScore >= 80) letterGrade = "B";
        else if (roundedScore >= 70) letterGrade = "C";
        else if (roundedScore >= 60) letterGrade = "D";
        else letterGrade = "F";
    } else {
        // Throw an error if the grading scale is neither 7 nor 10
        throw new Error("Invalid grading scale. Please use '7' or '10'.");
    }

    status = letterGrade === "F" ? "Fail" : "Pass";

    
    // Return the calculated score, letter grade, and status
    return { score: roundedScore, letterGrade, status };
}
export default calculateGradeAndStatus;