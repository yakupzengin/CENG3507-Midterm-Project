import courses from "../../data/course_data.js";

// Function to initialize the course selection dropdown
function initializeCoursesSelect(querySelector, defaultTextContent) {

    
    // Get the select element based on the provided query selector
    const totalcoursesSelect = document.querySelector(querySelector);
    totalcoursesSelect.innerHTML = "";  

    // Create and append the default option to the dropdown
    const defaultOption = document.createElement("option");
    defaultOption.value = "";  
    defaultOption.textContent = defaultTextContent;  
    totalcoursesSelect.appendChild(defaultOption);

    courses.forEach((course) => {
        const option = document.createElement("option");
        option.value = course.courseCode;  
        option.textContent = course.courseName;  
        totalcoursesSelect.appendChild(option);
    });
}

export default initializeCoursesSelect;
