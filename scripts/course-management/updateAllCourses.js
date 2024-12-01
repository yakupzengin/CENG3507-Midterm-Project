import courses from "../../data/course_data.js";

function updateAllCourses() {
    const totalcoursesSelect = document.getElementById("course-select");
    totalcoursesSelect.innerHTML = "";  // Clear any existing options in the dropdown

    // Create the default "Please select a course" option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Please select a course";
    totalcoursesSelect.appendChild(defaultOption);

    // Iterate over the courses array and add each course as an option in the dropdown
    courses.forEach((course) => {
        const option = document.createElement("option");
        option.value = course.courseName;
        option.textContent = course.courseName;
        totalcoursesSelect.appendChild(option);
    });
}

export default updateAllCourses;
