import courses from "../../data/course_data.js";

// Function to handle course search
function handleCourseSearch() {
    // Get the search input value and convert to lowercase for case-insensitive search
    const searchValue = document.getElementById("CourseSearchInput").value.toLowerCase();

    // Filter the courses based on the search input
    const filteredCourse = courses.filter((course) =>
        `${course.courseName}`.toLowerCase().includes(searchValue) // Match course name
    );
    console.log("filtered Courses :", filteredCourse); // Log the filtered results
    renderCourseResults(filteredCourse); // Render the filtered results
}

// Function to render the filtered course results in two tables
function renderCourseResults(filteredCourses) {
    const basicTableBody = document.querySelector("#CourseBasicAnalysisResults");
    const detailedTableBody = document.querySelector("#CourseDetailedAnalysisResults");

    // Check if the detailed table element exists
    if (!detailedTableBody) {
        console.error("CourseDetailedAnalysisResults element not found!");
    }

    // Clear the previous table content
    basicTableBody.innerHTML = "";
    detailedTableBody.innerHTML = "";

    // If no courses match the search, show a message
    if (filteredCourses.length === 0) {
        basicTableBody.innerHTML = `<tr><td colspan="5">No courses found.</td></tr>`;
        detailedTableBody.innerHTML = `<tr><td colspan="4">No detailed data available.</td></tr>`;
        return;
    }

    // Loop through each filtered course and populate the basic and detailed tables
    filteredCourses.forEach((course) => {
        // Render basic course details in the first table
        basicTableBody.innerHTML += `
        <tr>
          <td>${course.courseName}</td>
          <td>${course.courseCode}</td>
          <td>${course.instructor}</td>
          <td>${course.credit}</td>
          <td>${course.scale}</td>
        </tr>
      `;

        // Render detailed course analysis in the second table
        const enrolledStudents = course.students.length; // Total number of enrolled students
        const passedStudents = course.students.filter((student) => student.status === "Pass").length; // Number of passed students
        const failedStudents = course.students.filter((student) => student.status === "Fail").length; // Number of failed students
        const meanScore =
            course.students.reduce((total, student) => total + student.score, 0) / enrolledStudents || 0; // Calculate the average score

        detailedTableBody.innerHTML += `
        <tr>
          <td>${course.courseName}</td>
          <td>${enrolledStudents}</td>
          <td>${passedStudents}</td>
          <td>${failedStudents}</td>
          <td>${meanScore.toFixed(2)}</td> <!-- Display mean score rounded to 2 decimal places -->
        </tr>
      `;
    });
}

// Export the handleCourseSearch function for use in other files
export default handleCourseSearch;
