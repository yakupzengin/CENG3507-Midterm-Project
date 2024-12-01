import students from "../../data/student_data.js";

// Function to handle student search
function handleStudentSearch() {
    // Get the search input value and convert it to lowercase
    const searchValue = document
        .getElementById("StudentSearchInput")
        .value.toLowerCase();

    // Filter students based on their full name (first and last name)
    const filteredStudents = students.filter((student) =>
        `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchValue)
    );

    console.log("filteredStudents : ", filteredStudents); // Log filtered students for debugging
    renderStudentResults(filteredStudents); // Pass the filtered students to the render function
}

// Function to render the results of the filtered students
function renderStudentResults(filteredStudents) {
    // Get references to the basic and detailed results table bodies
    const basicTableBody = document.getElementById("StudentBasicAnalysisResults");
    const detailedTableBody = document.getElementById("StudentDetailedPerformanceResults");

    // Clear the table bodies before adding new rows
    basicTableBody.innerHTML = "";
    detailedTableBody.innerHTML = "";

    // If no students match the search, display a message in the tables
    if (filteredStudents.length === 0) {
        basicTableBody.innerHTML = `<tr><td colspan="6">No students found.</td></tr>`;
        detailedTableBody.innerHTML = `<tr><td colspan="4">No students found.</td></tr>`;
        return; // Exit the function if no students are found
    }

    // Loop through each filtered student and populate the tables with their data
    filteredStudents.forEach((student) => {
        const totalCourses = student.courses.length;

        // Handle cases where the student is not enrolled in any courses
        if (totalCourses === 0) {
            basicTableBody.innerHTML += `
            <tr>
              <td>${student.id}</td>
              <td>${student.firstName} ${student.lastName}</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0%</td>
            </tr>
          `;

            detailedTableBody.innerHTML += `
            <tr>
              <td>${student.id}</td>
              <td>--</td>
              <td>--</td>
              <td>0.00</td>
            </tr>
          `;
            return; // Skip further processing for this student if no courses are enrolled
        }

        // Calculate the number of passed and failed courses
        const passedCourses = student.courses.filter(
            (course) => course.status === "Pass"
        ).length;
        const failedCourses = student.courses.filter(
            (course) => course.status === "Fail"
        ).length;
        const passRate = ((passedCourses / totalCourses) * 100).toFixed(2); // Calculate pass rate as percentage

        // Find the best and worst performing courses based on score
        const bestCourse = student.courses.reduce((best, current) =>
            current.score > best.score ? current : best
        );
        const worstCourse = student.courses.reduce((worst, current) =>
            current.score < worst.score ? current : worst
        );

        // Populate the basic analysis table with student statistics
        basicTableBody.innerHTML += `
          <tr>
            <td>${student.id}</td>
            <td>${student.firstName} ${student.lastName}</td>
            <td>${passedCourses}</td>
            <td>${failedCourses}</td>
            <td>${totalCourses}</td>
            <td>${passRate}%</td>
          </tr>
        `;

        // Populate the detailed performance table with best/worst courses and GPA
        detailedTableBody.innerHTML += `
          <tr>
            <td>${student.id}</td>
            <td>${bestCourse.courseName}</td>
            <td>${worstCourse.courseName}</td>
            <td>${student.GPA}</td>
          </tr>
        `;
    });
}

// Export the function for use in other parts of the application
export default handleStudentSearch;
