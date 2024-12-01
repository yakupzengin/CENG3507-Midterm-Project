import gradePoints from "./gradePoints.js";

// Function to calculate the GPA of a student
function calculateGPA(student) {
    let totalPoints = 0;
    let totalCredits = 0;
    console.log(student)
    
    // Iterate through each course the student is enrolled in
    student.courses.forEach(course => {
        const gradePoint = gradePoints[course.letterGrade] || 0; 
        totalPoints += gradePoint * course.credit;  
        totalCredits += course.credit;  
    });

    // Calculate the GPA as the total points divided by total credits, rounding to two decimal places
    const GPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    return GPA;
}
export default calculateGPA;