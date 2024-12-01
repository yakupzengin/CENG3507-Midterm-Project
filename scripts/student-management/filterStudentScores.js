import students from "../../data/student_data.js";


// Function to filter student scores based on selected status and course
function filterStudentScores() {
    const selectedStatus = document.getElementById("selected-status").value;
    const selectedCourseCode = document.getElementById("selected-filtered-course").value;

    let filteredStudents = students;  // Start with the full list of students

    console.log("selectedStatus :", selectedStatus)
    console.log("selectedCourseCode :", selectedCourseCode)
    console.log("students :", students)


    // Filter students based on their pass/fail status

    if (selectedStatus) {
        filteredStudents = students
            .map(student => ({
                ...student,
                courses: student.courses.filter(course =>
                    selectedStatus === "pass" ? course.status === "Pass" : course.status === "Fail"
                )
            }))
            .filter(student => student.courses.length > 0);
    }

    // Filter students based on the selected course code
    if (selectedCourseCode) {
        filteredStudents = filteredStudents.map(student => ({
            ...student,
            courses: student.courses.filter(course => course.courseCode === selectedCourseCode)
        })).filter(student => student.courses.length >= 0);
    }

    // Populate the table with the filtered students' data
    populateStudentScoresTable(filteredStudents);
}


// Function to populate the student scores table with filtered data

function populateStudentScoresTable(filteredStudents) {
    const studentScoresTable = document.getElementById("studentScoresTable");
    studentScoresTable.innerHTML = "";

    filteredStudents.forEach(student => {
        student.courses.forEach(course => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.firstName} ${student.lastName}</td>
                <td>${course.courseCode}</td>
                <td>${course.courseName}</td>
                <td>${course.midterm}</td>
                <td>${course.final}</td>
                <td>${course.score}</td>
                <td>${course.letterGrade}</td>
                <td>${course.status}</td>
            `;
            studentScoresTable.appendChild(row);
        });
    });
}


export default filterStudentScores;