import initializeCoursesSelect from "./initializeCoursesSelect.js";
import populateCoursesList from "./populateCoursesList.js";
import validateString from "../utils/validateString.js";
import courses from "../../data/course_data.js";
import updateAllCourses from "./updateAllCourses.js"

// Function to handle adding a new course
function handleAddCourse(event){
    event.preventDefault();
    
    // Retrieve and trim the input values
    const courseName = document.getElementById("courseName").value.trim();;
    const courseCode = document.getElementById("courseCode").value.trim();;
    const courseInstructor = document.getElementById("courseInstructor").value.trim();;
    const courseCredit = document.getElementById("courseCredit").value.trim();

    // Retrieve the selected course scale
    const courseScaleSelect = document.getElementById("scale-select");
    const selectedScale = Number(courseScaleSelect.value);
    
    // Check if the course code already exists
    const isAddedBefore = courses.find((c) => c.courseCode === courseCode);

    if (isAddedBefore) {
        alert("A course with this Course ID already exists!");
        return;
    }

     // Ensure all required fields are filled
     if (!courseName || !courseCode || !courseInstructor || !courseCredit || !courseScaleSelect || !selectedScale) {
        alert("Please fill in all fields.");
        return;
    }

    // Validate course name and instructor name
    if (!validateString(courseName, "Course Name") || !validateString(courseInstructor, "Instructor")) {
        return;
    }

    // Create a new course object
    const newCourse = {
        courseName: courseName,
        courseCode: courseCode,
        instructor: courseInstructor,
        credit: parseFloat(courseCredit),
        scale: selectedScale,
        students: [] // Empty array to store students enrolled in the course
    };

    // Add the new course to the courses list
    courses.push(newCourse);
    alert("New course successfully added.");
    console.log("courses : ", courses);

    // Reinitialize course selection options and update the course list
    initializeCoursesSelect("#course-select-filtered", "Please Select a course");  
    initializeCoursesSelect("#selected-filtered-course", "All Courses");  
    updateAllCourses();
    populateCoursesList();
}

export default handleAddCourse;