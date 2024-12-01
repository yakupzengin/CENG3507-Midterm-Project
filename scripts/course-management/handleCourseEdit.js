import students from "../../data/student_data.js";
import courses from "../../data/course_data.js";
import handleCourseSelection from "./handleCourseSelection.js";
import filterStudentScores from "../student-management/filterStudentScores.js"
import initializeCoursesSelect from "./initializeCoursesSelect.js";
import updateAllCourses from "./updateAllCourses.js";
import populateStudentsList from "../student-management/populateStudentList.js";
import populateCoursesList from "./populateCoursesList.js"
import { updateStudentGPAAndGrades } from "../student-management/updateStudentGPAAndGrades.js"


// Handles course editing and deletion operations

function handleCourseEdit(event) {
    console.log("COURSE EDIT/DELETE OPERATIONS.");


    // Check if the edit button is clicked
    if (event.target.classList.contains("course-edit-btn")) {
        const courseCode = event.target.getAttribute("data-index");
        console.log("EDİT PART COURSES:",courses)
        console.log("EDİT PART STUDENTS:",students)
        updateCourse(courseCode);

    // Check if the delete button is clicked
    } else if (event.target.classList.contains("course-delete-btn")) {
        console.log("DELETE PART COURSES:",courses)
        console.log("DELETE PART STUDENTS:",students)
        const courseCode = event.target.getAttribute("data-index");
        const isConfirmed = confirm(
            "Are you sure you want to delete this course?"
        );
        if (isConfirmed) {
            deleteCourseAndUpdateStudents(courseCode);
        } else {
            alert("Deletion operation has been canceled.");
        }
    }
}



// Updates a student's course details and recalculates GPA
function updateStudentCourse(student, updatedCourse) {
    console.log("UPDATE STUDENT COURSE ", student);
    console.log("ALL COURSES :",courses)
    student.courses.forEach((course) => {
        if (course.courseCode === updatedCourse.oldCourseCode) { // Check for the old course code
            course.courseName = updatedCourse.courseName;
            course.courseCode = updatedCourse.courseCode;
            course.credit = updatedCourse.credit;
            course.scale=updatedCourse.scale;
        }
    });
    
    // Recalculate GPA
    console.log("UPDATE STUDENT COURSE ", student);
    console.log("ALL COURSES :",courses)
    updateStudentGPAAndGrades(student, updatedCourse);
}

// Deletes a course and updates all related student records
function deleteCourseAndUpdateStudents(courseCode) {
    const courseIndex = courses.findIndex((c) => c.courseCode === courseCode);
    if (courseIndex === -1) {
        alert("The course to be deleted could not be found.");
        return;
    }

    const course = courses[courseIndex];

    // Filter students who are enrolled in the course
    const filteredStudents = students.filter((student) =>
        student.courses.some((c) => c.courseCode === courseCode)
    );

    if (filteredStudents.length === 0) {
        console.log(`No students are enrolled in the course with code ${courseCode}.`);
    } else {
        console.log(`Students enrolled in the course with code ${courseCode}:`);
        filteredStudents.forEach((student) => {
            console.log(`${student.firstName} ${student.lastName} (ID: ${student.id})`);
            
            // Remove the course from the student's list and update their information
            student.courses = student.courses.filter((c) => c.courseCode !== courseCode);
            updateStudentGPAAndGrades(student, course);
        });
    }

    // Remove the course from the courses dataset
    courses.splice(courseIndex, 1);

    // Update the UI and related elements
    populateCoursesList();
    populateStudentsList();
    updateAllCourses();
    initializeCoursesSelect("#course-select-filtered", "Please Select a course");
    initializeCoursesSelect("#selected-filtered-course", "All Courses");

    filterStudentScores();

    alert(`${course.courseName} (${course.courseCode}) has been successfully deleted.`);
}

// Updates course details and reflects the changes across related records
function updateCourse(courseCode) {
    const course = courses.find((c) => c.courseCode === courseCode);
    if (!course) {
        alert("The course to be edited was not found.");
        return;
    }

    // Prompt the user for new course details
    const newCourseName = prompt("Enter the new course name:", course.courseName);
    const newCourseCode = prompt("Enter the new course code:", course.courseCode);
    const newInstructor = prompt("Enter the new instructor name:", course.instructor || "");
    const newCredit = parseInt(prompt("Enter the new credit value:", course.credit || 0), 10);
    let newCourseScale = parseInt(prompt("Enter the new course grading scale (10 or 7 only):", course.courseScale || 10), 10);

    // Validate input
    if (!newCourseName || !newCourseCode || !newInstructor || isNaN(newCredit)) {
        alert("Please ensure all fields are filled out correctly.");
        return;
    }
    if (![10, 7].includes(newCourseScale)) {
        alert("Grading scale must be either 10 or 7.");
        return;
    }

    // Prepare the updated course details
    const updatedCourse = {
        oldCourseCode: courseCode, // Keep the old course code for reference
        courseName: newCourseName,
        courseCode: newCourseCode,
        instructor: newInstructor,
        credit: newCredit,
        scale: Number(newCourseScale),
    };

    console.log("updateCourse *******", updatedCourse)

    // Filter students who are enrolled in the course
    const filteredStudents = students.filter((student) =>
        student.courses.some((course) => course.courseCode === courseCode)
    );

    // Log the students for debugging purposes
    if (filteredStudents.length === 0) {
        console.log(`No students are enrolled in the course with code ${courseCode}.`);
    } else {
        console.log(`Students enrolled in the course with code ${courseCode}:`);
        filteredStudents.forEach((student) => {
            console.log(`${student.firstName} ${student.lastName} (ID: ${student.id})`);
        });
    }
    console.log("filteredStudents -<<<<<<<<<<<<<<<<<<<<<< ", filteredStudents)

    // Update each student's course details and GPA
    filteredStudents.forEach((student) => updateStudentCourse(student, updatedCourse));

    // Update the course details in the courses dataset
    Object.assign(course, updatedCourse);

    // Update the UI and related elements
    populateCoursesList();
    populateStudentsList();
    updateAllCourses();
    handleCourseSelection();
    initializeCoursesSelect("#course-select-filtered", "Please Select a course");
    initializeCoursesSelect("#selected-filtered-course", "All Courses");
    filterStudentScores();

    alert(`${course.courseName} (${course.courseCode}) has been successfully updated!`);
    console.log("ALL COURSES WİTH UPDATED COURSE :", courses)
    console.log("ALL COURSES WİTH UPDATED STUDENTS :", students)

}


export default handleCourseEdit;
