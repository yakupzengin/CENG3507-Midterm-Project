import students from "../../data/student_data.js";
import populateStudentsList from "../student-management/populateStudentList.js";
import validateString from "../utils/validateString.js";


// Function to handle adding a new student
function handleAddStudent(event) {
    event.preventDefault(); 

    // Retrieve and trim the input values
    const studentId = document.getElementById("studentId").value.trim();
    const studentName = document.getElementById("studentName").value.trim();
    const studentSurname = document.getElementById("studentSurname").value.trim();

    // Check if the student ID already exists in the student list
    const isEnrolledBefore = students.find((s) => s.id === studentId);

    if (isEnrolledBefore) {
        alert("A student with this ID is already registered!");
        return;
    }

    // Check if the student ID is 6 digits long
    if (studentId.length !== 6) {
        alert("ID must be a 6-digit number.");
        return;
    }

    // Ensure all fields are filled out
    if (!studentId || !studentName || !studentSurname) {
        alert("Please fill in all fields.");
        return;
    }

    // Validate the student's first and last names
    if (!validateString(studentName, "First Name") || !validateString(studentSurname, "Last Name")) {
        return;
    }

    // Create a new student object and add it to the students list
    const newStudent = {
        id: studentId,
        firstName: studentName,
        lastName: studentSurname,
        courses: [], // No courses assigned initially
        GPA: 0, // GPA is initialized to 0
    };

    students.push(newStudent);
    alert("New student successfully added.");

    // Update the student list and refresh the display
    populateStudentsList();
}

export default handleAddStudent;
