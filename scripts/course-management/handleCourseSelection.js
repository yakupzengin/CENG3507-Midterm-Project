import courses from "../../data/course_data.js";

// Function to handle course selection and update the course info table
function handleCourseSelection(event) {
    
    // Get the selected course code from the dropdown
    const courseCode = document.getElementById("course-select-filtered").value;

    // Find the selected course in the courses array
    const selectedCourse = courses.find(course => course.courseCode === courseCode);

    // Get references to the table, table head, and table body
    const table = document.querySelector(".filtered-course-info table");
    const tableHead = table.querySelector("thead");
    const tableBody = document.getElementById("coursesTableBody-filtered");


    // If no course is selected, hide the table header and clear the table body
    if (!selectedCourse) {
        tableBody.innerHTML = ""; // Clear table body
        return;
    }

    // Otherwise, show the table header and clear the existing table content
    tableHead.style.display = ""; // Show table header
    tableBody.innerHTML = ''; 

    // Calculate the number of passed and failed students
    const passedStudents = selectedCourse.students.filter(student => student.status === "Pass").length;
    const failedStudents = selectedCourse.students.length - passedStudents; 

    let totalScore = 0;
    let meanScore = 0;

    // If there are enrolled students, calculate the total and average score
    if (selectedCourse.students.length > 0) {
        totalScore = selectedCourse.students.reduce((acc, student) => acc + student.score, 0);
        meanScore = totalScore / selectedCourse.students.length;
    }

    // Create a new row for the table with the calculated course details
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${selectedCourse.courseName}</td>
        <td>${selectedCourse.courseCode}</td>
        <td>${selectedCourse.students.length}</td>
        <td>${failedStudents}</td>
        <td>${passedStudents}</td>
        <td>${meanScore.toFixed(2)}</td>
    `;
    // Append the new row to the table body
    tableBody.appendChild(row);
}

// Export the function for use in other parts of the application
export default handleCourseSelection;
