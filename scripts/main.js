
// Import necessary modules and data
import students from "../data/student_data.js";
import courses from "../data/course_data.js";
import handleCourseSelection from "./course-management/handleCourseSelection.js";
import filterStudentScores from "./student-management/filterStudentScores.js"
import handleAddCourse from "./course-management/handleAddCourse.js";
import initializeCoursesSelect from "./course-management/initializeCoursesSelect.js";
import updateAllCourses from "./course-management/updateAllCourses.js";
import handleAddStudent from "./student-management/handleAddStudent.js";
import populateStudentsList from "./student-management/populateStudentList.js";
import calculateGradeAndStatus from "./grade-calculation/calculateGradeAndStatus.js";
import validateString from "./utils/validateString.js";
import validateScore from "./utils/validateScore.js"
import createStudentDetailRow from "./ui-creation/createStudentDetailRow.js"
import populateCoursesList from "./course-management/populateCoursesList.js"
import handleCourseEdit from "./course-management/handleCourseEdit.js"
import  calculateGPA from './grade-calculation/calculateGPA.js';
import handleStudentSearch from "./student-management/handleStudentSearch.js";
import handleCourseSearch from "./course-management/handleCourseSearch.js";


// Initialize the page after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initializePage();
});

// Function to initialize page content
function initializePage() {
    
    // Initialize course selection dropdowns
    initializeCoursesSelect("#course-select-filtered", "Please Select a course");
    initializeCoursesSelect("#selected-filtered-course", "All Courses");


    // Update all courses and populate course and student lists
    updateAllCourses();
    setupEventListeners();

    populateCoursesList();
    populateStudentsList();
}


// Function to set up event listeners for various elements

function setupEventListeners() {
    // Add student
    const addStudentForm = document.getElementById("studentForm");
    addStudentForm.addEventListener("submit", handleAddStudent);

    // Add student to a course
    const addStudentToCourseForm = document.querySelector(".add-student-to-course-form form");
    addStudentToCourseForm.addEventListener("submit", handleAddStudentToCourse);

    // View details, Edit, Delete operations on student table
    document.querySelector("#studentsTableBody").addEventListener("click", handleMoreOperationsClick);

    // Add Course
    const addCourseForm = document.getElementById("courseForm");
    addCourseForm.addEventListener("submit", handleAddCourse);


    // Display selected course information 
    const courseSelect = document.getElementById("course-select-filtered");
    courseSelect.addEventListener("change", handleCourseSelection)

    // Display selected Pass-Fail Course information 
    const statusSelect = document.querySelector("#selected-status");
    const selectedCourseCode = document.getElementById("selected-filtered-course");
    selectedCourseCode.addEventListener("change", filterStudentScores);
    statusSelect.addEventListener("change", filterStudentScores);

    // Edit - Delete Course
    document.getElementById("coursesTableBody").addEventListener("click", handleCourseEdit);


    // Search input listeners
    const studentSearchInput = document.getElementById("StudentSearchInput");
    const courseSearchInput = document.getElementById("CourseSearchInput");
    studentSearchInput.addEventListener("input", handleStudentSearch);
    courseSearchInput.addEventListener("input", handleCourseSearch);


}


function handleAddStudentToCourse(event) {
    event.preventDefault();

    // 1. Get form data and validate it
    const { selectedCourse, studentId, studentName, studentSurname, midtermScore, finalScore } = getFormData();
    if (!validateInput(selectedCourse, studentName, studentSurname, midtermScore, finalScore)) return;

    // 2. Find course and student
    const course = courses.find((c) => c.courseName === selectedCourse);
    const student = students.find((s) => s.id === studentId);

    // 3. Add or update student
    if (!student) {
        addNewStudentToCourse(studentId, studentName, studentSurname, midtermScore, finalScore, course);
    } else {
        updateExistingStudent(student, studentName, studentSurname, midtermScore, finalScore, course);
    }

    // 4. Update the student list
    populateStudentsList();
    handleCourseSelection()
}

// 1. Get form data for student and course
function getFormData() {
    const courseSelect = document.getElementById("course-select");
    return {
        selectedCourse: courseSelect.value,
        studentId: document.getElementById("courseStudentId").value.trim(),
        studentName: document.getElementById("courseStudentName").value.trim(),
        studentSurname: document.getElementById("courseStudentSurname").value.trim(),
        midtermScore: document.getElementById("midtermScore").value.trim(),
        finalScore: document.getElementById("finalScore").value.trim()
    };
}

// 2. Validate the input data
function validateInput(selectedCourse, studentName, studentSurname, midtermScore, finalScore) {
    // Check if a course is selected
    if (!selectedCourse) {
        alert("Please select a course.");
        return false;
    }

    // Validate the student's name and surname
    if (!validateString(studentName, "First Name") || !validateString(studentSurname, "Last Name")) {
        return false;
    }

    // Validate the midterm and final scores
    if (!validateScore(midtermScore, "Midterm") || !validateScore(finalScore, "Final")) {
        return false;
    }

    // If all validations pass return true
    return true;
}

// 3. Add new student to course
function addNewStudentToCourse(studentId, studentName, studentSurname, midtermScore, finalScore, course) {

    // Calculate the score, letter grade, and status based on the midterm and final scores
    const { score, letterGrade, status } = calculateGradeAndStatus(midtermScore, finalScore, course.scale);


    // Create a new student object with the given details and course information
    const newStudent = {
        id: studentId,
        firstName: studentName,
        lastName: studentSurname,
        courses: [
            {
                courseCode: course.courseCode,
                courseName: course.courseName,
                credit: course.credit,
                midterm: midtermScore,
                final: finalScore,
                score,
                letterGrade,
                status
            }
        ],
        GPA: 0
    };
    // Add the new student to the students array and the course's students list
    students.push(newStudent);
    course.students.push({ studentId, midterm: midtermScore, final: finalScore, score, letterGrade, status });

    // Calculate the GPA for the new student
    newStudent.GPA = calculateGPA(newStudent);

    // Show a success message and update course selection
    alert(`New student ${newStudent.firstName} ${newStudent.lastName} has been successfully added.`);
    handleCourseSelection()
}

// 4. Update existing student's course records
function updateExistingStudent(student, studentName, studentSurname, midtermScore, finalScore, course) {
    // Check if the provided student name and surname match the student's data
    if (student.firstName.toLowerCase() !== studentName.toLowerCase() || student.lastName.toLowerCase() !== studentSurname.toLowerCase()) {
        alert("The provided student ID does not match the name and surname.");
        return;
    }

    // Check if the student is already enrolled in the course
    const existingStudentInCourse = course.students.find(s => s.studentId === student.id);
    
    // If the student is already enrolled, update their course records
    if (existingStudentInCourse) {
        updateCourseAndStudentRecords(existingStudentInCourse, student, midtermScore, finalScore, course);
        alert(`${student.firstName} ${student.lastName}'s grades have been updated.`);
    } else {
        // If the student is not enrolled in the course, add the student to the course
        addCourseToStudent(student, course, midtermScore, finalScore);
    }
    
    // Update the course selection after the operation
    handleCourseSelection();
}

// 5. Update both student and course records
function updateCourseAndStudentRecords(existingStudentInCourse, student, midtermScore, finalScore, course) {
    const { score, letterGrade, status } = calculateGradeAndStatus(midtermScore, finalScore, course.scale);

    // Update course record
    existingStudentInCourse.midterm = midtermScore;
    existingStudentInCourse.final = finalScore;
    existingStudentInCourse.score = score;
    existingStudentInCourse.letterGrade = letterGrade;
    existingStudentInCourse.status = status;

    // Update student record
    const existingCourseInStudent = student.courses.find(c => c.courseName === course.courseName);
    existingCourseInStudent.midterm = midtermScore;
    existingCourseInStudent.final = finalScore;
    existingCourseInStudent.score = score;
    existingCourseInStudent.letterGrade = letterGrade;
    existingCourseInStudent.status = status;

    student.GPA = calculateGPA(student);
    handleCourseSelection()
}

// 6. Add new course to student
function addCourseToStudent(student, course, midtermScore, finalScore) {
    // Calculate the score, letter grade, and status based on the midterm and final scores
    const { score, letterGrade, status } = calculateGradeAndStatus(midtermScore, finalScore, course.scale);

    // Add the student to the course with the calculated grades
    course.students.push({ studentId: student.id, midterm: midtermScore, final: finalScore, score, letterGrade, status });

    // Add the course to the student's courses list with the calculated grades
    student.courses.push({
        courseCode: course.courseCode,
        courseName: course.courseName,
        credit: course.credit,
        midterm: midtermScore,
        final: finalScore,
        score,
        letterGrade,
        status
    });

    // Recalculate the student's GPA after adding the course
    student.GPA = calculateGPA(student);

    // Show an alert that the course has been added to the student's record
    alert(`${student.firstName} ${student.lastName} has been enrolled in ${course.courseName}.`);

    // Refresh the course selection display
    handleCourseSelection();
}


// Function to handle operations on student table (view details, edit, delete)
function handleMoreOperationsClick(event) {
    console.log(event.target.getAttribute)

    // Check if the clicked element is a "more-info-btn"
    if (event.target.classList.contains("more-info-btn")) {
        const studentID = event.target.getAttribute("data-index");
        console.log("studentID : ", studentID)
        const student = students[studentID];


        // Check if the student details row already exists
        const existingDetailRow = document.querySelector(`#student-details-${student.id}`);

        // If the details row doesn't exist, create and insert it after the student row
        if (!existingDetailRow) {
            const detailRow = createStudentDetailRow(student);
            const studentRow = event.target.closest("tr");
            studentRow.insertAdjacentElement("afterend", detailRow);
        } else {
            
            // If the details row exists, toggle its visibility
            existingDetailRow.style.display = existingDetailRow.style.display === "none" ? "" : "none";
        }

    // Check if the clicked element is an "edit-btn"

    } else if (event.target.classList.contains("edit-btn")) {
        const studentID = event.target.getAttribute("data-index");
        console.log("studentID :", studentID);
        const student = students.find((s) => s.id === studentID);
        console.log(student);

        // Prompt user to edit the student's name and surname
        const newName = prompt("Enter new name :", student.firstName);
        const newSurname = prompt("Enter new surname :", student.lastName);

        // Validate that the new name is different from the current one
        if (newName == student.firstName && newSurname == student.lastName) {
            alert("No changes have been made.");            
            return;
        }
        // Ensure that the new name and surname are valid strings
        if (!validateString(newName, "Name") || !validateString(newSurname, "Surname")) {
            return;
        }


        student.firstName = newName;
        student.lastName = newSurname;

        console.log("Updated student:", student);

        // After updating, refresh the student list
        populateStudentsList();

        // Notify the user that the student's name has been updated
        alert(`${student.firstName} ${student.lastName} has been updated!`);


     // Check if the clicked element is a "delete-btn"
    } else if (event.target.classList.contains("delete-btn")) {
        const studentID = event.target.getAttribute("data-index");
        console.log("studentID :", studentID);

        // Find student will be delete
        const studentIndex = students.findIndex((s) => s.id === studentID);
        const student = students[studentIndex];
        console.log(student);

        // If student is not found, alert the user
        if (studentIndex === -1) {
            alert("The student you want to delete could not be found.");
            return;
        }

        // Ask for confirmation before deleting
        const isConfirmed = confirm(
            `Are you sure you want to delete student ${student.firstName} ${student.lastName}?`
        );

        if (isConfirmed) {
             // Remove the student from the students array
             students.splice(studentIndex, 1);
             console.log(`Student ${student.firstName} ${student.lastName} has been deleted.`);
 
             // Remove the student from all courses
             courses.forEach(course => {
                course.students = course.students.filter(s => s.studentId !== studentID);
                console.log("Removing from courses data...");
            });

            console.log("Updated courses:", courses);

            // Update the student list and refresh the course selection
            populateStudentsList();
            handleCourseSelection();
            alert(`${student.firstName} ${student.lastName} has been successfully deleted.`);
        } else {
            // If deletion is cancelled, notify the user
            alert("Delete operation was cancelled.");
        }
    }



}


